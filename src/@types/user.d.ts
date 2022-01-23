import { SECRET_USER_FIELDS } from "../constatns";

export interface IUser {
  uuid: string;
  firstName: string;
  lastName: string;
  userName: string;
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
  isActive: boolean;
  profilePictureUrl: string;
  emailValidationPin: string | undefined;
  emailValidationPinExpiresAt: Date | undefined;
  passwordResetPinExpiresAt: Date | undefined;
}

type secretUserFields = typeof SECRET_USER_FIELDS[number];

type forbiddendUserFieldsToUpdate =
  typeof FORBIDDEN_USER_FIELDS_TO_UPDATE[number];
export type allowFieldsType = typeof ALLOWED_USER_FIELDS_TO_UPDATE[number];
