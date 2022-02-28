import { sign } from 'jsonwebtoken'
import { User } from '../entities/User';
import { Request, Response } from 'express'
import { filterobj } from '../controllers/authController';
import { SECRET_USER_FIELDS } from '../constatns';

export const singingToken = (id: string, key: string, expiredIn: string): string => {
    return sign(
        {
            id,
        },
        key,
        { expiresIn: expiredIn }
    );
};

export const createSendToken = async (
    user: User,
    status: number,
    req: Request,
    res: Response
) => {
    const accessToken = singingToken(user.uuid, process.env.JWT_ACCESS_SECRET_KEY, process.env.JWT_ACCESS_EXPIRED_IN);
    const refreshToken = singingToken(user.uuid, process.env.JWT_REFRESH_SECRET_KEY, process.env.JWT_REFRESH_EXPIRED_IN);


    res.cookie("jid", refreshToken, {
        secure: req.secure || req.headers["x-forwarded-proto"] === "https",
        httpOnly: true,
    });

    // remove sensetive data
    filterobj(user, [...SECRET_USER_FIELDS]);

    return res.status(status).json({
        status: "success",
        accessToken,
        data: {
            ...user,
        },
    });
};