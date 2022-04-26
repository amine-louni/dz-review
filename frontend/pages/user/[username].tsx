import { GetServerSideProps, GetServerSidePropsContext } from "next";
import * as yup from "yup";
import { setAuthToken, userHTTP } from "../../api";
import { css, useTheme } from "@emotion/react";
import {
  Avatar,
  Button,
  Card,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { IoCamera, IoMap, IoPeople, IoStar } from "react-icons/io5";
import { HiCake } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ReviewCard from "../../components/ReviewCard";
import { Masonry } from "@mui/lab";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { Form, Formik, FormikValues } from "formik";
import ShowErrors from "../../components/common/ShowErrors";
import LocationSelect from "../../components/common/LocationSelect";
import { generateYears } from "../register";
import { setUser } from "../../redux/slices/userSlice";
import { IApiError } from "../../@types";
import FileInputAvatar from "../../components/common/FileInputAvatar";

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  try {
    const response = await userHTTP.get(`/${ctx.params?.username}`);

    return {
      props: {
        userProfile: response.data,
      },
    };
  } catch (e) {
    return {
      props: {
        notFound: true,
      },
    };
  }
};

type ProfileDetailsProps = {
  userProfile: any;
  notFound?: boolean;
};
type EditPrfileProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export const Profile = ({ userProfile, notFound }: ProfileDetailsProps) => {
  if (notFound) return <h1>Not found !</h1>;
  const {
    user: { userData },
  } = useAppSelector((state) => state);
  const theme = useTheme();
  const [openEditProfileModal, setOpenEditProfileModal] =
    useState<boolean>(false);
  const { t: tCommon } = useTranslation("common");
  const user = userProfile?.user ?? null;

  const dummyReviews = [
    {
      reviewerFullName: "John doe",
      avgRating: 4,
      companyName: "Net company",
      action: "Wrote a review",
      text: "design,rem ipsum is a placeholder text commonln publishing and graphic design, Lorem ipsum is a placeholder text commonln publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available",
      image: "place holder",
    },
    {
      reviewerFullName: "Jane doe",
      avgRating: 4,
      companyName: "Net company",
      action: "Wrote a review",
      text: " placeholder  before the final copy is ava  Lorem ipsum is a placeholder text commonln publishing and graphic design, Lo Lorem ipsum is a placeholder text commonln publishing and graphic design, Loilable",
      image: "place holder",
    },
    {
      reviewerFullName: "Stewrat marlo",
      avgRating: 4,
      companyName: "Net company",
      action: "Wrote a review",
      text: "In publishing and gra n, Lorem ipsum is a placeholder text commonly used to demonstrate!",
      image: "place holder",
    },
    {
      reviewerFullName: "Jane doe",
      avgRating: 4,
      companyName: "Net company",
      action: "Wrote a review",
      text: " placeholder  before the final copy is ava  Lorem ipsum is a placeholder text commonln publishing and graphic design, Lo Lorem ipsum is a placeholder text commonln publishing and graphic design, Loilable",
      image: "place holder",
    },
    {
      reviewerFullName: "Stewrat marlon",
      avgRating: 4,
      companyName: "Net company",
      action: "Wrote a review",
      text: "In publishing and gra n, Lorem ipsum is a placeholder text commonly used to demonstrate!",
      image: "place holder",
    },
    {
      reviewerFullName: "جمال براندزن",
      avgRating: 4,
      companyName: "Net company",
      action: "Wrote a review",
      text: "In publishing and gra n, Lorem ipsum is a placeholder text commonly used to demonstrate!",
      image: "place holder",
    },
  ];

  const handleClose = () => {
    setOpenEditProfileModal(false);
  };

  return (
    <>
      <EditProfileModal
        isOpen={openEditProfileModal}
        handleClose={handleClose}
      />
      <Navbar position="relative" color="primary" />
      <Box component="section" sx={{ marginTop: "2rem" }}>
        <Container maxWidth="md">
          <Card
            variant="outlined"
            sx={{
              backgroundColor: theme.palette?.grey["100"],
              padding: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Avatar
              src={user?.profilePictureUrl}
              sx={{ height: "5rem", width: "5rem" }}
            />
            <Box>
              <Typography sx={{ marginBottom: "0rem" }}>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="caption">@{user?.userName}</Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                marginTop: ".5rem",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ alignItems: "center", display: "flex" }}>
                <IoMap color={theme.palette?.primary.light} />
                <Typography variant="caption" sx={{ marginLeft: "4px" }}>
                  {user?.city}, {user?.state}
                </Typography>
              </Box>
              <Box sx={{ alignItems: "center", display: "flex" }}>
                <IoStar color={theme.palette?.primary.light} />
                <Typography variant="caption" sx={{ marginLeft: "4px" }}>
                  20 reviews
                </Typography>
              </Box>

              <Box sx={{ alignItems: "center", display: "flex" }}>
                <IoCamera color={theme.palette?.primary.light} />
                <Typography variant="caption" sx={{ marginLeft: "4px" }}>
                  25 photos
                </Typography>
              </Box>

              <Box sx={{ alignItems: "center", display: "flex" }}>
                <HiCake color={theme.palette?.primary.light} />
                <Typography variant="caption" sx={{ marginLeft: "4px" }}>
                  {user?.dob}
                </Typography>
              </Box>
              {user?.uuid == userData?.uuid && (
                <Button
                  onClick={() => setOpenEditProfileModal(true)}
                  variant="outlined"
                >
                  {tCommon("edit-profile")}
                </Button>
              )}
            </Box>
          </Card>
        </Container>
      </Box>
      {user?.bio && (
        <Box component="section" sx={{ paddingY: "2rem" }}>
          <Container maxWidth="md">
            <Typography variant="h6">Biography</Typography>
            <Typography variant="body1">{user?.bio}</Typography>
          </Container>
        </Box>
      )}

      <Box component="section" sx={{ paddingY: "2rem" }}>
        <Container maxWidth="md">
          <Typography
            variant="h5"
            sx={{ fontWeight: "semibold", marginBottom: "1rem" }}
          >
            Recent Reviews
          </Typography>

          <Masonry columns={{ xs: 1, sm: 2, md: 3 }}>
            {dummyReviews.map((oneReview) => (
              <ReviewCard
                key={oneReview.reviewerFullName}
                action={oneReview.action}
                avgRating={oneReview.avgRating}
                companyName={oneReview.companyName}
                reviewerFullName={oneReview.reviewerFullName}
                image={oneReview.image}
                text={oneReview.text}
              />
            ))}
          </Masonry>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

// 🧵 Sub component
const EditProfileModal = ({ isOpen, handleClose }: EditPrfileProps) => {
  const { t: tCommon } = useTranslation("common");
  const { t: tAuth } = useTranslation("auth");
  const { user } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [apiError, setApiError] = useState<IApiError | null>(null);

  const initialValues = {
    userName: user.userData?.userName,
    firstName: user.userData?.firstName,
    lastName: user.userData?.lastName,
    bio: user.userData?.bio,
    profilePictureUrl: user?.userData?.profilePictureUrl,
    phoneNumber: user.userData?.phoneNumber,
    city: user.userData?.city,
    state: user.userData?.state,
    email: user.userData?.email,
    day: user.userData?.dob.split("-")[2],
    month: user.userData?.dob.split("-")[1],
    year: user.userData?.dob.split("-")[0],
  };

  const validationSchema = yup.object({
    profilePictureUrl: yup.string().required(tAuth("required")),
    userName: yup.string().required(tAuth("required")),
    firstName: yup.string().required(tAuth("required")),
    lastName: yup.string().required(tAuth("required")),
    bio: yup.string().nullable(),
    phoneNumber: yup.string().nullable(),
    city: yup.string().required(tAuth("required")).nullable(),
    state: yup.string().required(tAuth("required")),
    email: yup
      .string()
      .email(tAuth("invalid-email"))
      .required(tAuth("required")),
    day: yup.number().required(tAuth("required")),
    month: yup.number().required(tAuth("required")),
    year: yup.number().required(tAuth("required")),
  });

  const handleEditUser = async (values: FormikValues) => {
    try {
      setApiError(null);
      const response = await userHTTP.patch("/update-me", {
        ...values,
        dob: `${values.year}-${values.month}-${values.day}`,
      });
      if (response) {
        dispatch(setUser(response.data));
        handleClose();
      }
    } catch (error: any) {
      setApiError(error?.response.data);
      console.error(error);
    } finally {
      setApiError(null);
    }
  };
  const onClose = () => {
    setApiError(null);
    handleClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby={tCommon("edit-profile")}
      aria-describedby={tCommon("edit-profile")}
      sx={{ overflow: "auto" }}
    >
      <Card
        sx={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translate(-50%, -0%)",
          width: "80%",
          margin: "auto",
          padding: "2rem",
        }}
      >
        <Container maxWidth="md">
          <Typography
            id="modal-modal-title"
            sx={{ marginBottom: "2rem", fontWeight: "semibold" }}
            variant="h5"
            component="h2"
          >
            {tCommon("edit-profile")}
          </Typography>
          <ShowErrors apiErrors={apiError} screen="auth" />
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleEditUser}
          >
            {({
              handleChange,
              errors,
              isSubmitting,
              values,
              touched,
              setFieldValue,
              handleBlur,
            }) => (
              <Form>
                <Box
                  sx={{
                    padding: "1rem 0",
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <FileInputAvatar
                      defaultUrl={user?.userData?.profilePictureUrl}
                      getUrl={(url) => setFieldValue("profilePictureUrl", url)}
                    />
                  </Box>
                </Box>
                <TextField
                  value={values.userName}
                  error={touched.userName && !!errors.userName}
                  helperText={touched.userName && errors.userName}
                  size="small"
                  margin="dense"
                  onChange={handleChange}
                  fullWidth
                  id="userName"
                  label={tAuth("username")}
                  name="userName"
                  onBlur={handleBlur}
                />

                <TextField
                  value={values.firstName}
                  error={touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  size="small"
                  margin="dense"
                  onChange={handleChange}
                  fullWidth
                  id="firstName"
                  label={tAuth("firstname")}
                  name="firstName"
                />

                <TextField
                  value={values.lastName}
                  error={touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                  size="small"
                  margin="dense"
                  onChange={handleChange}
                  fullWidth
                  id="lastName"
                  label={tAuth("lastname")}
                  name="lastName"
                />

                <TextField
                  value={values.email}
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  size="small"
                  margin="dense"
                  onChange={handleChange}
                  fullWidth
                  id="email"
                  label={tAuth("email")}
                  name="email"
                />

                <TextField
                  multiline
                  rows={3}
                  value={values.bio}
                  error={touched.bio && !!errors.bio}
                  helperText={touched.bio && errors.bio}
                  size="small"
                  margin="dense"
                  onChange={handleChange}
                  fullWidth
                  id="bio"
                  label={tAuth("bio")}
                  name="bio"
                />

                <TextField
                  value={values.phoneNumber}
                  error={touched.phoneNumber && !!errors.phoneNumber}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  size="small"
                  margin="dense"
                  onChange={handleChange}
                  fullWidth
                  id="phoneNumber"
                  label={tCommon("phone-number")}
                  name="phoneNumber"
                />

                <FormControl sx={{ marginY: ".6rem" }} fullWidth>
                  <LocationSelect
                    defaultWilayaValue={values.state}
                    defaultCommuneValue={values.city}
                    caption={errors.state || errors?.city}
                    selectCommuneCb={(city) => setFieldValue("city", city)}
                    selectWilayaCb={(state) => setFieldValue("state", state)}
                  />
                </FormControl>
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
                    {tAuth("date-of-birth")}
                  </InputLabel>

                  <Box
                    css={css`
                      display: flex;
                      justify-content: space-between;
                    `}
                  >
                    <FormControl
                      size="small"
                      css={css`
                        margin-left: 4px;
                        flex: 1;
                      `}
                    >
                      <InputLabel id="day">{tAuth("day")}</InputLabel>
                      <Select
                        name="day"
                        labelId="day of birth"
                        id="day"
                        label={tAuth("day")}
                        placeholder={tAuth("day")}
                        onChange={handleChange}
                        defaultValue={Number(values.day)}
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
                      size="small"
                      css={css`
                        margin-left: 4px;
                        flex: 1;
                      `}
                    >
                      <InputLabel id="month">{tAuth("month")}</InputLabel>
                      <Select
                        variant="outlined"
                        name="month"
                        labelId="month of birth"
                        id="month"
                        label={tAuth("month")}
                        placeholder={tAuth("month")}
                        onChange={handleChange}
                        defaultValue={Number(values.month)}
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
                      <InputLabel id="year">{tAuth("year")}</InputLabel>
                      <Select
                        variant="outlined"
                        size="small"
                        name="year"
                        labelId="year of birth"
                        id="year"
                        defaultValue={values.year}
                        value={values.year}
                        label={tAuth("year")}
                        placeholder={tAuth("year")}
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
        </Container>
      </Card>
    </Modal>
  );
};

export default Profile;
