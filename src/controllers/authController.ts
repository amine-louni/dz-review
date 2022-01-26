import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import crypto from "crypto";

import { catchAsync } from "../helpers/catchAsync";
import { User } from "../entities/User";

import crypt from "bcryptjs";
import AppError from "../helpers/AppError";
import {
  ALLOWED_USER_FIELDS,
  BAD_AUTH,
  BAD_INPUT,
  EMAIL_ALREADY_VALIDATED,
  EMAIL_PIN_EXPIRATION_IN_MINUTES,
  NOT_FOUND,
  passwordResetPin_EXPIRED,
  SECRET_USER_FIELDS,
  SERVER_ERROR,
  VALIDATION_EMAIL_PIN_EXPIRED,
  VALIDATION_FAILED,
} from "../constatns";
import { validate } from "class-validator";
import formatValidationErrors from "../helpers/formatValidationErrors";
import changedPasswordAfter from "../helpers/changedPasswordAfter";
import EmailSender from "../helpers/EmailSender";

export const filterobj = (objToFilter: any, itemsToFilterOut: string[]) => {
  itemsToFilterOut.forEach((secretField) => {
    delete objToFilter[secretField];
  });
};

const singingToken = (id: string): string => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRED_IN }
  );
};

const createSendToken = async (
  user: User,
  status: number,
  req: Request,
  res: Response
) => {
  const token = singingToken(user.uuid);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRED_IN * 24 * 60 * 60 * 1000
    ),
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    httpOnly: true,
  });

  // remove sensetive data
  filterobj(user, [...SECRET_USER_FIELDS]);

  res.status(status).json({
    status: "success",
    token,
    data: {
      ...user,
    },
  });
};

export const register = catchAsync(async (req, res, next) => {
  const { firstName, lastName, userName, email, dob, password } = req.body;

  // create user
  const newUser = await User.create({
    firstName,
    lastName,
    userName,
    email,
    dob,
    password,
  });

  const errors = await validate(newUser);
  if (errors.length > 0) {
    next(
      new AppError(
        "validationFailed",
        400,
        VALIDATION_FAILED,
        formatValidationErrors(errors)
      )
    );
    return;
  }
  await newUser.save();
  // const url = `${req.protocol}://${req.get('host')}/me`;

  createSendToken(newUser, 201, req, res);
  return;
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password, userName } = req.body;

  // 2 ) Check if user & password exits

  const theUser = await User.findOne({
    select: [...ALLOWED_USER_FIELDS, "password"],
    where: {
      ...(userName && { userName: userName }),
      ...(email && { email: email }),
    },
  });

  if (!theUser || !(await crypt.compare(password, theUser?.password))) {
    return next(new AppError("wrong login credeintials", 401, BAD_AUTH));
  }

  // 3 ) Every thing is okay !
  createSendToken(theUser, 200, req, res);
});

export const validateEmail = catchAsync(async (req, res, next) => {
  const { pin } = req.body;

  // 2 ) Check if user exits
  const theUser = await User.findOne({
    select: [
      ...ALLOWED_USER_FIELDS,
      "password",
      "emailValidationPin",
      "emailValidationPinExpiresAt",
    ],
    where: {
      uuid: req.currentUser?.uuid,
    },
  });

  // 3)  Check if the user is not email validated yet

  if (theUser?.emailValidateAt) {
    return next(
      new AppError("wrong validation pin", 422, EMAIL_ALREADY_VALIDATED)
    );
  }

  // 4 ) Check the correctness
  if (
    !theUser ||
    !theUser?.emailValidationPin ||
    !(await crypt.compare(pin, theUser?.emailValidationPin))
  ) {
    return next(new AppError("wrong validation pin", 422, BAD_INPUT));
  }

  // 4 ) Check if the pin still valid ⏲️

  if (
    theUser.emailValidationPinExpiresAt &&
    new Date() > theUser.emailValidationPinExpiresAt
  ) {
    return next(
      new AppError("validation key expired", 422, VALIDATION_EMAIL_PIN_EXPIRED)
    );
  }

  // return res.json({
  //     status: 'testign yo'
  // })
  //  3 )  validate the email 👌

  const updatedUser = User.update(theUser.uuid, {
    emailValidationPin: undefined,
    emailValidationPinExpiresAt: undefined,
    emailValidateAt: new Date(),
  });

  res.status(201).json({
    user: updatedUser,
  });
});

export const forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const theUser = await User.findOne({ email: req.body.email });
  if (!theUser) {
    return next(new AppError("user not found", 404, NOT_FOUND));
  }

  // 2) Generate the random reset token
  await theUser.createAndSendPasswordResetPin().catch((e) => {
    return next(
      new AppError(
        `There was an error sending the email : ${e}`,
        500,
        SERVER_ERROR
      )
    );
  });

  res.status(201).json({
    status: "success",
    message: `email sent to ${theUser.email}`,
  });
});

export const resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const { pin, email, password } = req.body;

  const theUser = await User.findOne({
    select: [
      ...ALLOWED_USER_FIELDS,
      "passwordResetPin",
      "passwordResetPinExpiresAt",
    ],
    where: {
      email,
    },
  });

  if (!theUser) {
    return next(new AppError("user not found", 404, NOT_FOUND));
  }

  // 2)  Check if the user is not email validated yet

  if (!theUser?.passwordResetPin) {
    return next(
      new AppError(
        "this user didn't requests to reset the password",
        422,
        BAD_INPUT
      )
    );
  }

  // 3 ) Check the correctness
  if (
    !theUser ||
    !theUser?.passwordResetPin ||
    !(await crypt.compare(pin, theUser?.passwordResetPin))
  ) {
    return next(new AppError("wrong validation pin", 422, BAD_INPUT));
  }

  // 4 ) Check if the pin still valid ⏲️

  if (
    theUser.passwordResetPinExpiresAt &&
    new Date() > theUser.passwordResetPinExpiresAt
  ) {
    return next(
      new AppError("validation key expired", 422, passwordResetPin_EXPIRED)
    );
  }

  const hashed_password = await crypt.hash(password, 12);

  const updatedUser = User.update(theUser.uuid, {
    password: hashed_password,
    passwordResetPin: undefined,
    passwordResetPinExpiresAt: undefined,
    passwordChangedAt: new Date(),
  });

  res.status(201).json({
    user: updatedUser,
  });
});

export const updatePassword = catchAsync(async (req, res, next) => {
  const { password, currentPassword } = req.body;

  // 1) Get user from collection
  const theUser = await User.findOne({
    select: [...ALLOWED_USER_FIELDS, "password"],
    where: {
      uuid: req.currentUser?.uuid,
    },
  });

  // 2) Check if POSTed current password is correct
  if (!theUser || !(await crypt.compare(currentPassword, theUser?.password))) {
    return next(new AppError("wrong login credeintials", 401, BAD_AUTH));
  }

  // 3) If so, update password

  await User.update(
    { uuid: theUser.uuid },
    {
      password: await crypt.hash(password, 12),
    }
  ).catch((e) =>
    next(
      new AppError(`error while updating the password ${e}`, 500, SERVER_ERROR)
    )
  );

  const updatedUser = await User.findOne({ uuid: theUser.uuid });

  //  4) Log user in, send JWT
  if (updatedUser) createSendToken(updatedUser, 200, req, res);
});

export const updateEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  // 1) Get user from collection
  const theUser = await User.findOne({
    select: [...ALLOWED_USER_FIELDS, "password"],
    where: {
      uuid: req.currentUser?.uuid,
    },
  });

  // 2) Check if POSTed current password is correct
  if (!theUser) {
    return next(new AppError("wrong login credeintials", 401, BAD_AUTH));
  }

  // 3) update the user  and make validate email to null

  await User.update(
    { uuid: theUser.uuid },
    {
      email,
      emailValidateAt: null
    }
  ).catch((e) =>
    next(
      new AppError(`error while updating the password ${e}`, 500, SERVER_ERROR)
    )
  );


  // 4) send validation email
  const pin = crypto.randomBytes(4).toString("hex");
  theUser.emailValidationPin = await crypt.hash(pin, 12);
  theUser.emailValidationPinExpiresAt = await new Date(
    new Date().getTime() + EMAIL_PIN_EXPIRATION_IN_MINUTES * 60000
  );
  new EmailSender(theUser, "", pin).sendValidationChangedEmail();

  const updatedUser = await User.findOne({ uuid: theUser.uuid });

  // 5) Ok !
  return res.json({
    status: "success",
    user: updatedUser,
  });

});

export const protect = catchAsync(async (req, _res, next) => {
  // 1) Getting token and check of it's there

  const headerTokens = req?.headers?.authorization;
  console.log(headerTokens, 'token');
  let token;
  if (
    headerTokens &&
    headerTokens.startsWith("Bearer")
  ) {
    console.log('passed here');
    token = headerTokens.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError(
        "you are not logged in! Please log in to get access.",
        401,
        BAD_AUTH
      )
    );
  }

  console.log('passed here also');
  // 2) Verification token
  const decoded = jwt_decode<{ id: string; iat: number; exp: number }>(token);

  // 3) Check if user still exists
  const currentUser = await User.findOne({ uuid: decoded.id });

  if (!currentUser) {
    return next(
      new AppError(
        "the user belonging to this token does no longer exist.",
        401,
        BAD_AUTH
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (
    currentUser.passwordChangedAt &&
    changedPasswordAfter(decoded.iat, currentUser.passwordChangedAt)
  ) {
    return next(
      new AppError(
        "user recently changed password! Please log in again.",
        401,
        BAD_AUTH
      )
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.currentUser = currentUser;

  next();
});
