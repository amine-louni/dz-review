import { check, validationResult } from "express-validator";

import { Request, Response, NextFunction } from "express";
import AppError from "../../utils/AppError";
import { VALIDATION_FAILED } from "../../constatns";

export const createBusinesssValidator = [
  check("name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("name can not be empty!")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Minimum 2 characters required!")
    .bail(),

  check("about")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("about can not be empty!")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Minimum 8 characters required!")
    .bail(),

  check("state")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("state can not be empty!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!")
    .bail(),

  check("city")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("city can not be empty!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!")
    .bail(),

  check("googleMapsUrl")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("googleMapsUrl can not be empty!")
    .bail(),


  check("phone")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("phone can not be empty!")
    .bail()
    .matches(/^(0)(5|6|7)[0-9]{8}$/)
    .withMessage("Enter a valid phone number")
    .bail(),


  check("website")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("website can not be empty!")
    .bail(),

  check("domains")
    .isArray()
    .isLength({ min: 1 })
    .withMessage("domains can not be empty!")
    .bail(),

  check("email")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("email can not be empty!")
    .bail()
    .isEmail()
    .withMessage("invalid email formt")
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


export const updateBusinesssValidator = [
  check("name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("name can not be empty!")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Minimum 2 characters required!")
    .optional({ checkFalsy: true })
    .bail(),

  check("about")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("about can not be empty!")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Minimum 8 characters required!")
    .optional({ checkFalsy: true })
    .bail(),

  check("state")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("state can not be empty!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!")
    .optional({ checkFalsy: true })
    .bail(),

  check("city")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("city can not be empty!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!")
    .optional({ checkFalsy: true })
    .bail(),

  check("googleMapsUrl")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("googleMapsUrl can not be empty!")
    .optional({ checkFalsy: true })
    .bail(),


  check("phone")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("phone can not be empty!")
    .bail()
    .matches(/^(0)(5|6|7)[0-9]{8}$/)
    .withMessage("Enter a valid phone number")
    .optional({ checkFalsy: true })
    .bail(),


  check("website")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("website can not be empty!")
    .optional({ checkFalsy: true })
    .bail(),

  check("domains")
    .isArray()
    .isLength({ min: 1 })
    .withMessage("domains can not be empty!")
    .bail()
    .optional({ checkFalsy: true })
    .bail(),

  check("email")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("email can not be empty!")
    .bail()
    .isEmail()
    .withMessage("invalid email formt")
    .optional({ checkFalsy: true })
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


