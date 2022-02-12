import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import { VALIDATION_FAILED } from "../../constatns";
import AppError from "../../helpers/AppError";

export const createReviewValidtaor = [
    check("text")
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage("text can not be empty!")
        .bail()
        .isLength({ min: 2, max: 3000 })
        .withMessage("Minimum 2 characters required!")
        .bail(),

    check("stars")
        .isFloat({ min: 0, max: 5 })
        .withMessage('Must be numeric value between 0 and 5')
        .bail()
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage("stars can not be empty!")
        .bail(),


    (req: Request, _res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return next(
                new AppError(
                    "validation  error",
                    422,
                    VALIDATION_FAILED,
                    errors.array()
                )
            );
        return next();
    },
];

