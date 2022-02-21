import { SECRET_USER_FIELDS } from "../constatns";


type secretUserFields = typeof SECRET_USER_FIELDS[number];

type forbiddendUserFieldsToUpdate =
  typeof FORBIDDEN_USER_FIELDS_TO_UPDATE[number];
export type allowFieldsType = typeof ALLOWED_USER_FIELDS_TO_UPDATE[number];
