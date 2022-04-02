import { NextPage } from "next";
import { IApiError, IDomain } from "../@types";
import React, { useCallback, useEffect, useState } from "react";
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
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { Box } from "@mui/system";
import { Formik, FormikValues, Form } from "formik";
import * as yup from "yup";
import { css } from "@emotion/react";
import useTranslation from "next-translate/useTranslation";
import LocationSelect from "../components/common/LocationSelect";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import { businessHTTP, domain, setAuthToken } from "../api";
import { useAppSelector } from "../redux/hooks";

const BusinessForm: NextPage = () => {
  const [apiError, setApiError] = useState<IApiError | null>(null);
  const [allDomains, setAllDomains] = useState<IDomain[] | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | undefined>("");
  const { user } = useAppSelector((state) => state);
  const { t: tAuth } = useTranslation("auth");
  const { t } = useTranslation("business");
  const { t: tCommon } = useTranslation("common");
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

  const getAllDomains = useCallback(async () => {
    const response = await domain.get("/");

    setAllDomains(response.data?.data);
  }, []);

  const handleDomainChange = (event: SelectChangeEvent) => {
    setSelectedDomain(event.target.value);
  };
  useEffect(() => {
    getAllDomains();
  }, []);
  useEffect(() => {
    if (!user?.accessToken) return;
    console.log("run here");
    setAuthToken(user?.accessToken);
  }, [user.accessToken]);
  const createBusiness = async (values: FormikValues) => {
    const response = await businessHTTP.post("/", values);

    console.log(response, "response------------------");
  };
  return (
    <>
      <Navbar color="primary" position="relative" />
      <Box component="section" sx={{ paddingTop: "3rem" }}>
        <Container maxWidth="md">
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {t("add-business")}
          </Typography>
          <Typography variant="subtitle2" sx={{ marginBottom: "2rem" }}>
            {t("add-business-description")}
          </Typography>
          <Grid container>
            <Grid item md={4}>
              guides
            </Grid>
            <Grid item md={8}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={createBusiness}
              >
                {({
                  handleChange,
                  errors,
                  isSubmitting,
                  values,
                  touched,
                  handleBlur,
                  setFieldValue,
                }) => (
                  <Form>
                    {apiError &&
                      apiError?.errors?.map((oneError) => (
                        <Alert
                          severity="error"
                          css={css`
                            margin-bottom: 0.2rem;
                          `}
                        >
                          {oneError.field} : {oneError.code}
                        </Alert>
                      ))}
                    <FormControl fullWidth>
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
                    </FormControl>
                    <FormControl fullWidth>
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
                    </FormControl>
                    <FormControl
                      fullWidth
                      css={css`
                        margin: 8px 0px 4px 0px;
                      `}
                    >
                      <LocationSelect
                        selectCommuneCb={(city) => setFieldValue("city", city)}
                        selectWilayaCb={(state) =>
                          setFieldValue("state", state)
                        }
                      />
                    </FormControl>

                    <FormControl fullWidth>
                      <TextField
                        rows={4}
                        error={touched.phone && !!errors.phone}
                        helperText={touched.phone && errors.phone}
                        size="small"
                        margin="dense"
                        onChange={handleChange}
                        fullWidth
                        id="phone"
                        label={t("phone")}
                        name="phone"
                        onBlur={handleBlur}
                      />
                    </FormControl>

                    <FormControl fullWidth>
                      <TextField
                        error={touched.website && !!errors.website}
                        helperText={touched.website && errors.website}
                        size="small"
                        margin="dense"
                        onChange={handleChange}
                        fullWidth
                        id="website"
                        label={t("website")}
                        name="website"
                        onBlur={handleBlur}
                      />
                    </FormControl>

                    <FormControl fullWidth>
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
                        onBlur={handleBlur}
                      />
                    </FormControl>

                    <FormControl fullWidth>
                      <TextField
                        error={touched.googleMapsUrl && !!errors.googleMapsUrl}
                        helperText={
                          touched.googleMapsUrl && errors.googleMapsUrl
                        }
                        size="small"
                        margin="dense"
                        onChange={handleChange}
                        fullWidth
                        id="googleMapsUrl"
                        label={t("google-maps-url")}
                        name="googleMapsUrl"
                        onBlur={handleBlur}
                      />
                    </FormControl>

                    <FormControl
                      fullWidth
                      css={css`
                        margin: 8px 0px 4px 0px;
                      `}
                    >
                      <InputLabel id="select-domain">
                        {" "}
                        {t("select-domain")}
                      </InputLabel>

                      <Select
                        size="small"
                        labelId={t("select-domain")}
                        label={t("select-domain")}
                        variant="outlined"
                        value={selectedDomain}
                        onChange={(event) => {
                          setSelectedDomain(event.target.value);
                          setFieldValue("domains", [event.target.value]);
                        }}
                        displayEmpty
                        inputProps={{ "aria-label": t("select-domain") }}
                      >
                        {allDomains?.map((oneDomain) => (
                          <MenuItem key={oneDomain.uuid} value={oneDomain.uuid}>
                            {tCommon(oneDomain.name)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      sx={{ marginTop: "2rem" }}
                      variant="contained"
                      fullWidth
                    >
                      {tCommon("submit")}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default BusinessForm;
