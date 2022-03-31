import { NextPage } from "next";
import { IApiError } from "../@types";
import React, { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import { Formik, FormikValues, Form } from "formik";
import * as yup from "yup";
import { css } from "@emotion/react";
import useTranslation from "next-translate/useTranslation";
import LocationSelect from "../components/common/LocationSelect";

const BusinessForm: NextPage = () => {
  const [apiError, setApiError] = useState<IApiError | null>(null);
  const { t: tAuth } = useTranslation("auth");
  const { t } = useTranslation("business");
  const initialValues = {
    name: "",
    about: "",
    state: "",
    city: "",
    phone: "",
    website: "",
    email: "",
    googleMapsUrl: "",
    domains: [],
  };

  const validationSchema = yup.object({
    name: yup.string().required(tAuth("required")),
    about: yup.string().required(tAuth("required")),
    city: yup.string().required(tAuth("required")),
    state: yup.string().required(tAuth("required")),
    phone: yup.string().required(tAuth("required")),
    website: yup.string().required(tAuth("required")),
    email: yup
      .string()
      .email(tAuth("invalid-email"))
      .required(tAuth("required")),
    googleMapsUrl: yup.string(),
    domains: yup.array().required(tAuth("required")),
  });
  return (
    <>
      <Box component="section" sx={{ paddingY: "3rem" }}>
        <Container maxWidth="sm">
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {t("add-business")}
          </Typography>
          <Typography variant="subtitle2" sx={{ marginBottom: "2rem" }}>
            {t("add-business-description")}
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => console.log(values)}
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
                {apiError &&
                  apiError?.errors?.map((oneError) => (
                    <Alert
                      severity="error"
                      css={css`
                        margin-bottom: 0.5rem;
                      `}
                    >
                      {oneError.field} : {oneError.code}
                    </Alert>
                  ))}
                <TextField
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  size="small"
                  margin="dense"
                  onChange={handleChange}
                  fullWidth
                  id="name"
                  label={t("name")}
                  name="name"
                  onBlur={handleBlur}
                />
                <TextField
                  multiline
                  rows={4}
                  error={touched.about && !!errors.about}
                  helperText={touched.about && errors.about}
                  size="small"
                  margin="dense"
                  onChange={handleChange}
                  fullWidth
                  id="about"
                  label={t("about")}
                  name="about"
                  onBlur={handleBlur}
                />
                <LocationSelect
                  selectCommuneCb={(city) => console.log(city, "handle")}
                  selectWilayaCb={(state) => console.log(state, "handle")}
                />
              </Form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default BusinessForm;
