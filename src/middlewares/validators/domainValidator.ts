import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import { VALIDATION_FAILED } from "../../constatns";
import AppError from "../../helpers/AppError";

export const domainValidator = [
    check("name")
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage("name can not be empty!")
        .bail()
        .isLength({ min: 2 })
        .withMessage("Minimum 5 characters required!")
        .bail()

        .withMessage("Minimum eight characters, at least one letter and one number")
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