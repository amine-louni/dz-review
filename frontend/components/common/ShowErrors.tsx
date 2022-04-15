import { Alert } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { IApiError } from "../../@types";

interface IShowErrors {
  apiErrors: IApiError | null;
  screen: string;
}

const ShowErrors = ({ apiErrors, screen }: IShowErrors) => {
  const { t: tApiErrors } = useTranslation("apiErrors");
  const { t: tScreen } = useTranslation(screen);
  if (!apiErrors) return null;

  if (apiErrors.code === "validation_failed") {
    return (
      <>
        {apiErrors?.errors.map((oneError) => {
          if ("param" in oneError)
            return (
              <Alert severity="error" sx={{ marginBlock: ".3rem" }}>
                {tScreen(oneError?.param)} : {tApiErrors(oneError?.msg)}
              </Alert>
            );
        })}
      </>
    );
  }
  if (!apiErrors?.errors) {
    return (
      <Alert severity="error" sx={{ marginBlock: ".3rem" }}>
        {tApiErrors(apiErrors?.code)}
      </Alert>
    );
  }

  return (
    <>
      {apiErrors?.errors.map((oneError) => {
        if ("field" in oneError)
          return (
            <Alert severity="error" sx={{ marginBlock: ".3rem" }}>
              {tScreen(oneError?.field.replace(/"+/g, ""))} :{" "}
              {tApiErrors(oneError?.code)}
            </Alert>
          );
      })}
    </>
  );
};

export default ShowErrors;
