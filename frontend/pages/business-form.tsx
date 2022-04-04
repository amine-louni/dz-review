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
import { useRouter } from "next/router";
import ShowErrors from "../components/common/ShowErrors";
import { requireAuthentication } from "../utils/requireAuthentication";
import FileInput from "../components/common/FileInput";

const BusinessForm: NextPage = () => {
  const [apiErrors, setApiErrors] = useState<IApiError | null>(null);
  const [allDomains, setAllDomains] = useState<IDomain[] | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | undefined>("");
  const { user } = useAppSelector((state) => state);
  const { t: tAuth } = useTranslation("auth");
  const { t } = useTranslation("business");
  const { t: tCommon } = useTranslation("common");
  const { t: tApiErrors } = useTranslation("apiErrors");

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
    about: yup.string().min(8, tApiErrors("MIN_8")).required(tAuth("required")),
    city: yup.string().required(tAuth("required")),
    state: yup.string().required(tAuth("required")),
    phone: yup
      .string()
      .required(tAuth("required"))
      .matches(/^(0)(5|6|7)[0-9]{8}$/, tApiErrors("INVALID")),
    website: yup
      .string()
      .url(tApiErrors("INVALID"))
      .required(tAuth("required")),
    email: yup
      .string()
      .email(tAuth("invalid-email"))
      .required(tAuth("required")),
    googleMapsUrl: yup.string(),
    domains: yup.array().required(tAuth("required")),
  });

  const router = useRouter();

  const getAllDomains = useCallback(async () => {
    const response = await domain.get("/");

    setAllDomains(response.data?.data);
  }, []);

  useEffect(() => {
    getAllDomains();
  }, []);

  useEffect(() => {
    if (!user?.accessToken) return;
    setAuthToken(user?.accessToken);
  }, [user.accessToken]);

  const createBusiness = async (values: FormikValues) => {
    try {
      const response = await businessHTTP.post("/", values);
      if (response.data.status === "success") {
        setApiErrors(null);
        router.push(`/business/${response.data.data.uuid}`);
      }
    } catch (error: any) {
      setApiErrors(error?.response.data);
    }
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
          <Grid container justifyContent="center">
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
                  touched,
                  handleBlur,
                  setFieldValue,
                }) => (
                  <Form>
                    <ShowErrors screen="business" apiErrors={apiErrors} />
                    <FormControl fullWidth>
                      <FileInput
                        getUrl={(url) => console.log(url, "get url")}
                        label={"business main image"}
                      />
                    </FormControl>
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
                        caption={errors.state || errors?.city}
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

export const getServerSideProps = requireAuthentication(async (_context) => {
  return {
    props: {},
  };
});
