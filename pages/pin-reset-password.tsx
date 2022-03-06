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

const PinResetPassword: NextPage = () => {
  const [apiError, setApiError] = useState(null);
  const router = useRouter();
  const { t } = useTranslation("auth");
  const { t: tCommon } = useTranslation("common");

  const initialValues = {
    email: "",
  };

  const validationSchema = yup.object({
    email: yup.string().email(t("invalid-email")).required(t("required")),
  });

  const handleRequest = async ({ email, password }: FormikValues) => {
    try {
      setApiError(null);
      const res = await auth.patch("/reset-password", {
        email,
      });

      if (res.data.status === "success") {
        console.log("navigate to enter pin");
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
              <Typography component="h1" variant="h3" marginBottom={1}>
                {t("forgot-password")}
              </Typography>
              <Typography component="p" variant="caption" marginBottom={2}>
                {t("forgot-password-description")}
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
                        error={!!errors.email}
                        helperText={errors.email}
                        size="small"
                        margin="dense"
                        onChange={handleChange}
                        fullWidth
                        id="email"
                        label={t("email")}
                        name="email"
                        autoFocus
                      />

                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        {tCommon("submit")}
                      </Button>
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
