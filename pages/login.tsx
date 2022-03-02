import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import * as yup from "yup";
import Link from "../src/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { css } from "@emotion/react";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useTheme } from "@mui/system";
import { Formik, FormikValues, Form } from "formik";
import { auth } from "../api";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUser } from "../redux/slices/userSlice";
import { Alert } from "@mui/material";
import { authed } from "../utils/authed";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

const Login: React.FunctionComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const [apiError, setApiError] = useState(null);
  const router = useRouter();
  const { t } = useTranslation("auth");
  const title = t("sign-in");

  console.log(title);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const handleLogin = async ({ email, password }: FormikValues) => {
    try {
      const res = await auth.post("/login", {
        email,
        password,
      });

      if (res.data.status === "success") {
        const { data } = res;
        dispatch(setUser(data));
        setApiError(null);
        router.replace("/");
      }
    } catch (error: any) {
      setApiError(error?.response.data.code);
    }
  };

  const theme = useTheme();
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <Box
      component="main"
      sx={{
        height: "100vh",
        padding: { xs: 0, md: 4 },
        background: theme.palette.grey["200"],
      }}
    >
      <Grid
        container
        component={Paper}
        sx={{ height: "100%", overflow: "hidden", borderRadius: 3 }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          sx={{ paddingX: { xs: "1rem", md: "4rem" } }}
        >
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
              }}
            >
              <Typography component="h1" variant="h3" marginBottom={1}>
                {t("sign-in")}
              </Typography>
              <Typography component="p" variant="caption" marginBottom={2}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium, quos?
              </Typography>
              <Box component="main" sx={{ mt: 1 }}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleLogin}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    errors,
                    values,
                    isSubmitting,
                  }) => (
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
                        label="Email"
                        name="email"
                        autoFocus
                      />
                      <TextField
                        error={!!errors.password}
                        helperText={errors.password}
                        size="small"
                        margin="dense"
                        fullWidth
                        onChange={handleChange}
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        autoComplete="current-password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              css={css`
                                background: ${theme.palette.grey["200"]};
                              `}
                            >
                              <IconButton
                                css={css`
                                  background: ${theme.palette.grey["200"]};
                                `}
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />

                      <Grid container>
                        <Grid item xs>
                          <Link href="#" variant="caption">
                            {"Don't have an account?"}
                          </Link>
                        </Grid>
                        <Grid item>
                          <Link href="#" variant="caption">
                            Forgot password?
                          </Link>
                        </Grid>
                      </Grid>

                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Sign In
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          md={6}
          sx={{
            display: { xs: "none", md: "flex" },
            backgroundRepeat: "no-repeat",
            background: (theme) =>
              theme.palette.mode === "light"
                ? "linear-gradient(180deg, rgba(18,57,143,1) 0%, rgba(0,212,255,0.5690651260504201) 100%);"
                : theme.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <Box
            css={css`
              box-shadow: inset 0 0 0 3000px rgba(255, 255, 255, 0.3);
              border-radius: 20px;
              height: 80%;
              width: 70%;
              padding: 3rem;
              position: relative;

              :before {
                box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.5);
                filter: blur(10px);
              }
              :after {
                content: "💯";
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.7rem;
                bottom: 3rem;
                left: -2rem;
                height: 5rem;
                width: 5rem;
                background-color: ${theme.palette.common.white};
                border-radius: 5rem;
              }
            `}
          >
            <Typography
              variant="h3"
              css={css`
                color: ${theme.palette.common.white};
                margin-bottom: 1rem;
              `}
            >
              We are waiting for your to share your review 🤞
            </Typography>
          </Box>
          <Box
            css={css`
              position: absolute;
              bottom: 0;
              right: 0;
            `}
          >
            <Image
              src={require("../public/png/login.png")}
              height={400}
              width={280}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;

export const getServerSideProps = authed(async (_context) => {
  // Your normal `getServerSideProps` code here
  const email = "test";
  return {
    props: {
      email,
    },
  };
});
