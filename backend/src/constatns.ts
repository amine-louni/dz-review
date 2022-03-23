import { config } from "dotenv";
config();

export const __prod__ = process.env.NODE_ENV === "production";
export const __test__ = process.env.NODE_ENV === "test";
export const __dev__ = process.env.NODE_ENV === "development";

export const ALLOWED_DOMAINS = ['http://localhost']

export const EMAIL_PIN_EXPIRATION_IN_MINUTES = 10;
export const PASSWORD_PIN_EXPIRATION_IN_MINUTES = 10;

export const ALLOWED_USER_FIELDS = [
  "uuid",
  "firstName",
  "lastName",
  "userName",
  "email",
  "dob",
  "phoneNumber",
  "emailValidateAt",
  "bio",
  "id_verified_at",
  "isActive",
  "profilePictureUrl",
  "role"
] as const;

export const SECRET_USER_FIELDS = [
  "password",
  "passwordChangedAt",
  "passwordResetToken",
  "passwordResetPin",
  "passwordResetPinExpiresAt",

  "emailValidateAt",
  "emailValidationPin",
  "emailValidationPinExpiresAt",
] as const;

export const FORBIDDEN_USER_FIELDS_TO_UPDATE = [
  ...SECRET_USER_FIELDS,
  "email",
  "isActive",
] as const;

export const ALLOWED_USER_FIELDS_TO_UPDATE = [
  "firstName",
  "lastName",
  "userName",
  "dob",
  "phoneNumber",
  "bio",
  "profilePictureUrl",
] as const;

export const passwordRegExValidator = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// code erros
export const BAD_AUTH = "bad_auth";
export const BAD_INPUT = "bad_input";
export const NOT_FOUND = "not_found";
export const USER_NOT_FOUND = "user_not_found";
export const EMAIL_NOT_FOUND = "email_not_found";
export const NOT_AUTHORIZED = "not_authorized";
export const INVALID_TOKEN = "invalid_token";
export const EXPIRED_TOKEN = "expired_token";
export const VALIDATION_FAILED = "validation_failed";
export const VALIDATION_EMAIL_PIN_EXPIRED = "validation_email_pin_expired";
export const passwordResetPin_EXPIRED = "passwordResetPin_expired";
export const EMAIL_ALREADY_VALIDATED = "email_already_validated";
export const QUERY_FAILED = "QUERY_FAILED";
export const DUPLICATED = "DUPLICATED";
export const SERVER_ERROR = "server_error";
