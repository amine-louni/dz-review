import { NextPage } from "next";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { css } from "@emotion/react";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import { Formik, FormikValues, Form } from "formik";
import { useState } from "react";
import { Alert } from "@mui/material";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import Link from "../src/Link";
import { auth } from "../api";
import { useAppDispatch } from "../redux/hooks";
import { setToast } from "../redux/slices/toastSlice";
import { setUser } from "../redux/slices/userSlice";
import { authed } from "../utils/authed";

const PinResetPassword: NextPage = () => {
  const [apiError, setApiError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { query } = useRouter();
  const dispatch = useAppDispatch();

  const { target: email } = query;
  const { t } = useTranslation("auth");
  const { t: tCommon } = useTranslation("common");

  const initialValues = {
    pin: "",
    password: "",
    passwordConfirm: "",
  };

  const validationSchema = yup.object({
    pin: yup.string().required(t("required")),
    password: yup.string().required(t("required")).min(2, t("too-short")),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const handleRequest = async ({ pin, password }: FormikValues) => {
    try {
      setApiError(null);
      const { data } = await auth.patch("/reset-password", {
        email,
        pin,
        password,
      });

      if (data.status === "success") {
        setSuccess(true);
        dispatch(setUser(data));
        dispatch(
          setToast({
            message: t("password-changed"),
            autoHideDuration: 5000,
            open: true,
          })
        );

        setTimeout(() => {
          router.push(`${router.locale}/`);
        }, 1000);
      }
    } catch (error: any) {
      setApiError(t(error?.response.data.code));
    }
  };

  const theme = useTheme();

  return (
    <Box
      component="main"
      sx={{
        height: "100vh",

        background: theme.palette.grey["200"],
      }}
    >
      <Grid
        container
        justifyContent={"center"}
        component={Paper}
        sx={{ height: "100%", overflow: "hidden", borderRadius: 3 }}
      >
        <Grid item xs={12} sm={12} md={6}>
          <Box
            css={css`
              display: flex;
              height: 100%;
              align-items: center;
              justify-content: center;
            `}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: { xs: 4 },
              }}
            >
              <Typography component="h1" variant="h4" marginBottom={1}>
                {t("reset-password")}
              </Typography>
              <Typography component="p" variant="caption" marginBottom={2}>
                {t("reset-password-description", {
                  email: email,
                })}
              </Typography>
              <Box component="main" sx={{ mt: 1 }}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleRequest}
                >
                  {({ handleChange, errors, isSubmitting }) => (
                    <Form>
                      {apiError && (
                        <Alert
                          severity="error"
                          css={css`
                            margin-bottom: 0.5rem;
                          `}
                        >
                          {apiError}
                        </Alert>
                      )}

                      <TextField
                        error={!!errors.pin}
                        helperText={errors.pin}
                        size="small"
                        margin="dense"
                        onChange={handleChange}
                        fullWidth
                        id="pin"
                        label={t("pin")}
                        name="pin"
                      />

                      <TextField
                        error={!!errors.password}
                        helperText={errors.password}
                        size="small"
                        margin="dense"
                        onChange={handleChange}
                        fullWidth
                        id="password"
                        label={t("password")}
                        name="password"
                      />

                      <TextField
                        error={!!errors.passwordConfirm}
                        helperText={errors.passwordConfirm}
                        size="small"
                        margin="dense"
                        onChange={handleChange}
                        fullWidth
                        id="passwordConfirm"
                        label={t("password-confirm")}
                        name="passwordConfirm"
                      />

                      {!success ? (
                        <Button
                          disabled={isSubmitting}
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          {tCommon("submit")}
                        </Button>
                      ) : null}
                    </Form>
                  )}
                </Formik>
                <Grid container>
                  <Grid item xs>
                    <Link href="/login" variant="caption">
                      {t("sign-in")}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PinResetPassword;
export const getServerSideProps = authed(async (_context) => {
  return {
    props: {},
  };
});
