import { SECRET_USER_FIELDS } from "../constatns";

export interface IUser {
  uuid: string;
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  dob: Date;
  phoneNumber: string | undefined;
  emailValidateAt: Date | undefined;
  bio: string | undefined;
  password?: string;
  id_verified_at: Date | undefined;
  passwordChangedAt?: Date | undefined;
  passwordResetToken?: string | undefined;
  passwordResetPin?: string | undefined;
  is_active: boolean;
  profilePictureUrl: string;
  emailValidationPin: string | undefined;
  emailValidationPin_expires_at: Date | undefined;
  passwordResetPinExpiresAt: Date | undefined;
}

type secretUserFields = typeof SECRET_USER_FIELDS[number];

type forbiddendUserFieldsToUpdate =
  typeof FORBIDDEN_USER_FIELDS_TO_UPDATE[number];
export type allowFieldsType = typeof ALLOWED_USER_FIELDS_TO_UPDATE[number];
