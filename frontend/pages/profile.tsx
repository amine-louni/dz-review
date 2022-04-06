import { useTheme } from "@emotion/react";
import { Avatar, Button, Card, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { IoCamera, IoPeople, IoStar } from "react-icons/io5";
import { HiCake } from "react-icons/hi";
import { useAppSelector } from "../redux/hooks";
import { requireAuthentication } from "../utils/requireAuthentication";
import ReviewCard from "../components/ReviewCard";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { Masonry } from "@mui/lab";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export const Profile = () => {
  const {
    user: { userData },
  } = useAppSelector((state) => state);
  const theme = useTheme();
  const { locale } = useRouter();
  const { t } = useTranslation("common");
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
  return (
    <>
      <Navbar position="relative" color="primary" />
      <Box component="section" sx={{ marginTop: "2rem" }}>
        <Container maxWidth="md">
          <Card
            variant="outlined"
            sx={{
              backgroundColor: theme.palette?.grey["100"],
              padding: "2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Avatar
              src={userData?.profilePictureUrl}
              sx={{ height: "5rem", width: "5rem" }}
            />
            <Box>
              <Typography sx={{ marginBottom: "0rem" }}>
                {userData?.firstName} {userData?.lastName}
              </Typography>
              <Typography variant="caption">@{userData?.userName}</Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                marginTop: "2rem",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
              }}
            >
              <Box sx={{ alignItems: "center", display: "flex" }}>
                <IoStar color="gold" />
                <Typography variant="caption" sx={{ marginLeft: "4px" }}>
                  20 reviews
                </Typography>
              </Box>
              <Box sx={{ alignItems: "center", display: "flex" }}>
                <IoPeople color={theme.palette?.primary.light} />
                <Typography variant="caption" sx={{ marginLeft: "4px" }}>
                  450 friends
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
                  {userData?.dob}
                </Typography>
              </Box>
              <Button variant="outlined">Edit profile</Button>
            </Box>
          </Card>
        </Container>
      </Box>
      {userData?.bio && (
        <Box component="section" sx={{ paddingY: "2rem" }}>
          <Container maxWidth="md">
            <Typography variant="h6">Biography</Typography>
            <Typography variant="body1">{userData?.bio}</Typography>
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

          <Masonry columns={3} spacing={1}>
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

export default Profile;

export const getServerSideProps = requireAuthentication(async (_context) => {
  return {
    props: {},
  };
});
