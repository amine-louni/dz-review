import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import Link from "../src/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { css } from "@emotion/react";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import { Formik, FormikValues, Form } from "formik";
import { auth } from "../api";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/slices/userSlice";
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { authed } from "../utils/authed";
import { useRouter } from "next/router";
import { IApiError } from "../@types";
import { NextPage } from "next";
import ShowErrors from "../components/common/ShowErrors";

const generateYears = (startYear: number = 1970): number[] => {
  var currentYear = new Date().getFullYear(),
    years = [];

  while (startYear <= currentYear) {
    years.push(startYear++);
  }
  return years;
};

const Footer: React.FC = () => {
  const languages: { key: string; display: string }[] = [
    { key: "ar", display: "عربي" },
    { key: "fr", display: "Français" },
    { key: "en", display: "English" },
  ];

  const theme = useTheme();

  return (
    <Box
      css={css`
        background: ${theme.palette.grey["200"]};
        padding: 2rem;
        text-align: left;
      `}
    >
      {languages.map((oneLang) => {
        return (
          <Link
            key={oneLang.key}
            css={css`
              margin-right: 1rem;
            `}
            href="#"
            locale={oneLang.key}
          >
            {oneLang.display}
          </Link>
        );
      })}
    </Box>
  );
};
const Register: NextPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const [apiError, setApiError] = useState<IApiError | null>(null);
  const router = useRouter();
  const { t } = useTranslation("auth");
  const { t: tCommon } = useTranslation("common");
  const initialValues = {
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    day: 10,
    month: 10,
    year: "1990",
  };

  const validationSchema = yup.object({
    userName: yup.string().required(t("required")),
    firstName: yup.string().required(t("required")),
    lastName: yup.string().required(t("required")),
    email: yup.string().email(t("invalid-email")).required(t("required")),
    password: yup.string().min(8, t("too-short")).required(t("required")),
    day: yup.number().required(t("required")),
    month: yup.number().required(t("required")),
    year: yup.number().required(t("required")),
  });

  const handleRegister = async (values: FormikValues) => {
    try {
      setApiError(null);
      const res = await auth.post("/register", {
        ...values,
        dob: `${values.year}-${values.month}-${values.day}`,
      });

      if (res.data.status === "success") {
        const { data } = res;
        dispatch(setUser(data));
        setApiError(null);
        router.replace("/");
      }
    } catch (error: any) {
      setApiError(error?.response.data);
    }
  };

  const theme = useTheme();
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <>
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
          {/* First row  start*/}
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
                <Box component="main" sx={{ mt: 1 }}>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                  >
                    {({
                      handleChange,
                      errors,
                      isSubmitting,
                      values,
                      touched,
                      handleBlur,
                    }) => (
                      <Form>
                        <ShowErrors apiErrors={apiError} screen="register" />
                        <TextField
                          error={touched.userName && !!errors.userName}
                          helperText={touched.userName && errors.userName}
                          size="small"
                          margin="dense"
                          onChange={handleChange}
                          fullWidth
                          id="userName"
                          label={t("username")}
                          name="userName"
                          onBlur={handleBlur}
                        />
                        <Grid
                          spacing={{ xs: 0, sm: 1 }}
                          container
                          justifyContent={"space-between"}
                        >
                          <Grid item sm={6} xs={12}>
                            <TextField
                              error={touched.firstName && !!errors.firstName}
                              helperText={touched.firstName && errors.firstName}
                              size="small"
                              margin="dense"
                              onChange={handleChange}
                              fullWidth
                              id="firstName"
                              label={t("firstname")}
                              name="firstName"
                            />
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <TextField
                              error={touched.lastName && !!errors.lastName}
                              helperText={touched.lastName && errors.lastName}
                              size="small"
                              margin="dense"
                              onChange={handleChange}
                              fullWidth
                              id="lastName"
                              label={t("lastname")}
                              name="lastName"
                            />
                          </Grid>
                        </Grid>
                        <TextField
                          error={touched.email && !!errors.email}
                          helperText={touched.email && errors.email}
                          size="small"
                          margin="dense"
                          onChange={handleChange}
                          fullWidth
                          id="email"
                          label={t("email")}
                          name="email"
                        />
                        <TextField
                          error={touched.password && !!errors.password}
                          helperText={touched.password && errors.password}
                          size="small"
                          margin="dense"
                          fullWidth
                          onChange={handleChange}
                          label={t("password")}
                          name="password"
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
                        {/* DOB composer */}
                        <Box
                          css={css`
                            margin-top: 8px;
                            margin-bottom: 4px;
                          `}
                        >
                          <InputLabel
                            css={css`
                              margin-bottom: 8px;
                            `}
                            id="day"
                          >
                            {t("date-of-birth")}
                          </InputLabel>

                          <Box
                            css={css`
                              display: flex;
                              justify-content: space-between;
                            `}
                          >
                            <FormControl
                              css={css`
                                margin-left: 4px;
                                flex: 1;
                              `}
                            >
                              <InputLabel id="day">{t("day")}</InputLabel>
                              <Select
                                size="small"
                                name="day"
                                labelId="day of birth"
                                id="day"
                                value={values.day}
                                label={t("day")}
                                placeholder={t("day")}
                                onChange={handleChange}
                              >
                                {Array(31)
                                  .fill(1)
                                  .map((x, y) => x + y)
                                  .map((item) => (
                                    <MenuItem key={item} value={item}>
                                      {item}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                            <FormControl
                              css={css`
                                margin-left: 4px;
                                flex: 1;
                              `}
                            >
                              <InputLabel id="month">{t("month")}</InputLabel>
                              <Select
                                variant="outlined"
                                size="small"
                                name="month"
                                labelId="month of birth"
                                id="month"
                                value={values.month}
                                label={t("month")}
                                placeholder={t("month")}
                                onChange={handleChange}
                              >
                                {Array(12)
                                  .fill(1)
                                  .map((x, y) => x + y)
                                  .map((item) => (
                                    <MenuItem key={item} value={item}>
                                      {item}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                            <FormControl
                              css={css`
                                margin-left: 4px;
                                flex: 2;
                              `}
                            >
                              <InputLabel id="year">{t("year")}</InputLabel>
                              <Select
                                variant="outlined"
                                size="small"
                                name="year"
                                labelId="year of birth"
                                id="year"
                                value={values.year}
                                label={t("year")}
                                placeholder={t("year")}
                                onChange={handleChange}
                              >
                                {generateYears().map((item) => (
                                  <MenuItem key={item} value={item}>
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Box>
                        </Box>
                        {/* DOB composer */}
                        <Grid container>
                          <Grid item xs>
                            <Link href="/login" variant="caption">
                              {t("have-account")}
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
                          {t("sign-up")}
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </Box>
              </Box>
            </Box>
          </Grid>
          {/* First row  end*/}
          {/* Second row  start*/}
          <Grid
            item
            md={6}
            sx={{
              display: { xs: "none", md: "flex" },
              backgroundRepeat: "no-repeat",
              background: (theme) =>
                theme.palette.mode === "light"
                  ? "linear-gradient(180deg, rgba(155,219,35,1) 0%, rgba(18,57,143,1) 100%);"
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
                  content: "🔊";
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
                {tCommon("slug")}
              </Typography>
            </Box>
            <Box
              css={css`
                position: absolute;
                bottom: 0;
                right: 0;
              `}
            />
          </Grid>
          {/* Second row  end*/}
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default Register;

export const getServerSideProps = authed(async (_context) => {
  // Your normal `getServerSideProps` code here
  const email = "test";
  return {
    props: {
      email,
    },
  };
});
