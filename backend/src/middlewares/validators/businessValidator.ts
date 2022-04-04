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
    .withMessage("MIN_2")
    .bail(),

  check("about")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("about can not be empty!")
    .bail()
    .isLength({ min: 8 })
    .withMessage("MIN_8")
    .bail(),

  check("state")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("REQUIRED")
    .bail()
    .isLength({ min: 3 })
    .withMessage("MIN_3")
    .bail(),

  check("city")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("REQUIRED")
    .bail()
    .isLength({ min: 3 })
    .withMessage("MIN_3")
    .bail(),

  check("googleMapsUrl")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("REQUIRED")
    .bail(),


  check("phone")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("REQUIRED")
    .bail()
    .matches(/^(0)(5|6|7)[0-9]{8}$/)
    .withMessage("INVALID")
    .bail(),


  check("cover")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("REQUIRED")
    .bail()
    .optional({ checkFalsy: true })
    .bail(),

  check("website")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("REQUIRED")
    .bail(),

  check("domains")
    .isArray()
    .isLength({ min: 1 })
    .withMessage("REQUIRED")
    .bail(),

  check("email")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("REQUIRED")
    .bail()
    .isEmail()
    .withMessage("REQUIRED")
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
    .withMessage("MIN_2")
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
    .withMessage("MIN_8")
    .optional({ checkFalsy: true })
    .bail(),

  check("state")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("REQUIRED")
    .bail()
    .optional({ checkFalsy: true })
    .bail(),

  check("city")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("REQUIRED")
    .bail()
    .optional({ checkFalsy: true })
    .bail(),

  check("googleMapsUrl")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("REQUIRED")
    .optional({ checkFalsy: true })
    .bail(),


  check("phone")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("REQUIRED")
    .bail()
    .matches(/^(0)(5|6|7)[0-9]{8}$/)
    .withMessage("INVALID")
    .optional({ checkFalsy: true })
    .bail(),




  check("cover")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("REQUIRED")
    .bail()
    .optional({ checkFalsy: true })
    .bail(),



  check("website")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("REQUIRED")
    .optional({ checkFalsy: true })
    .bail(),

  check("domains")
    .isArray()
    .isLength({ min: 1 })
    .withMessage("REQUIRED")
    .bail()
    .optional({ checkFalsy: true })
    .bail(),

  check("email")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("REQUIRED")
    .bail()
    .isEmail()
    .withMessage("INVALID")
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


