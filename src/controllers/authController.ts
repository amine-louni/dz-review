import jwt, { JwtPayload, verify } from "jsonwebtoken";
import crypto from "crypto";

import { catchAsync } from "../utils/catchAsync";
import { User } from "../entities/User";

import crypt from "bcryptjs";
import AppError from "../utils/AppError";
import {
  ALLOWED_USER_FIELDS,
  BAD_AUTH,
  BAD_INPUT,
  EMAIL_ALREADY_VALIDATED,
  EMAIL_NOT_FOUND,
  EMAIL_PIN_EXPIRATION_IN_MINUTES,
  INVALID_TOKEN,
  NOT_FOUND,
  passwordResetPin_EXPIRED,
  SERVER_ERROR,
  VALIDATION_EMAIL_PIN_EXPIRED,
  VALIDATION_FAILED,
} from "../constatns";
import { validate } from "class-validator";
import formatValidationErrors from "../utils/formatValidationErrors";
import changedPasswordAfter from "../utils/changedPasswordAfter";
import EmailSender from "../utils/EmailSender";
import { createSendToken } from "../utils/jwt.utils";


export const filterobj = (objToFilter: any, itemsToFilterOut: string[]) => {
  itemsToFilterOut.forEach((secretField) => {
    delete objToFilter[secretField];
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

  // 1 ) Check if user & password exits

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

  // 2 ) Every thing is okay !
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
    return next(new AppError("user not found", 404, EMAIL_NOT_FOUND));
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


  theUser.password = hashed_password;
  theUser.passwordResetPin = null;
  theUser.passwordResetPinExpiresAt = null;
  theUser.passwordChangedAt = new Date();

  await theUser.save()

  createSendToken(theUser, 201, req, res)

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
      passwordChangedAt: new Date(),
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

  let token;
  if (
    headerTokens &&
    headerTokens.startsWith("Bearer")
  ) {
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



  let decoded: JwtPayload;

  try {
    decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY) as JwtPayload
  } catch {
    return next(
      new AppError(
        "invalid access token.",
        401,
        BAD_AUTH
      )
    );
  }

  // 3) Check if user still exists
  const currentUser = await User.findOne({ uuid: decoded.id }, {
    select: [...ALLOWED_USER_FIELDS, 'passwordChangedAt']
  });

  if (!currentUser) {
    return next(
      new AppError(
        "the user belonging to this token does no longer exist.",
        401,
        INVALID_TOKEN
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (
    currentUser.passwordChangedAt &&
    decoded.iat &&
    changedPasswordAfter(decoded.iat, currentUser.passwordChangedAt)
  ) {
    return next(
      new AppError(
        "invalid token! Please log in again.",
        401,
        INVALID_TOKEN
      )
    );
  }


  // GRANT ACCESS TO PROTECTED ROUTE
  req.currentUser = currentUser;

  next();
});

export const isAdmin = catchAsync(async (req, _res, next) => {

  if (!req.currentUser) {
    return next(
      new AppError(
        "Need authorization to preform this action",
        401,
        BAD_AUTH
      )
    );
  }

  if (req.currentUser.role !== 'admin') {
    return next(
      new AppError(
        "Need admin authorization to preform this action",
        401,
        BAD_AUTH
      )
    );
  }

  return next()

})


export const refreshAccessToken = catchAsync(async (req, res, next) => {

  // jwt verify token
  const { jid } = req.cookies;

  //check if there is not coockie
  if (!jid) {
    return next(new AppError('jwt malfomred', 403, BAD_AUTH))
  }
  const payload = verify(jid, process.env.JWT_REFRESH_SECRET_KEY) as { id: string, iat: number, exp: number };



  const user = await User.findOne({ uuid: payload.id });

  if (!user) {
    return next(new AppError('user not found', 404, NOT_FOUND))
  }


  // Check the expixration based on passwordChangedAT

  //Ok!
  createSendToken(user, 200, req, res)
}
)