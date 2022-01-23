import { config } from "dotenv";
config();

export const __prod__ = process.env.NODE_ENV === "production";
export const __test__ = process.env.NODE_ENV === "test";
export const __dev__ = process.env.NODE_ENV === "development";

export const EMAIL_PIN_EXPIRATION_IN_MINUTES = 10;
export const PASSWORD_PIN_EXPIRATION_IN_MINUTES = 10;

export const ALLOWED_USER_FIELDS = [
  "uuid",
  "first_name",
  "last_name",
  "user_name",
  "email",
  "dob",
  "phoneNumber",
  "emailValidateAt",
  "bio",
  "id_verified_at",
  "is_active",
  "profilePictureUrl",
] as const;

export const SECRET_USER_FIELDS = [
  "password",
  "passwordChangedAt",
  "passwordResetToken",
  "passwordResetPin",
  "passwordResetPinExpiresAt",

  "emailValidateAt",
  "emailValidationPin",
  "emailValidationPin_expires_at",
] as const;

export const FORBIDDEN_USER_FIELDS_TO_UPDATE = [
  ...SECRET_USER_FIELDS,
  "email",
  "is_active",
] as const;

export const ALLOWED_USER_FIELDS_TO_UPDATE = [
  "first_name",
  "last_name",
  "user_name",
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
export const INVALID_TOKEN = "invalid_token";
export const EXPIRED_TOKEN = "expired_token";
export const VALIDATION_FAILED = "validation_failed";
export const VALIDATION_EMAIL_PIN_EXPIRED = "validation_email_pin_expired";
export const passwordResetPin_EXPIRED = "passwordResetPin_expired";
export const EMAIL_ALREADY_VALIDATED = "email_already_validated";
export const SERVER_ERROR = "server_error";
