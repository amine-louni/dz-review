import { GetServerSideProps, GetServerSidePropsContext } from "next";

import { userHTTP } from "../../api";
import { useTheme } from "@emotion/react";
import { Avatar, Button, Card, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { IoCamera, IoPeople, IoStar } from "react-icons/io5";
import { HiCake } from "react-icons/hi";
import { useAppSelector } from "../../redux/hooks";
import ReviewCard from "../../components/ReviewCard";

import { Masonry } from "@mui/lab";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

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

export const Profile = ({ userProfile, notFound }: ProfileDetailsProps) => {
  if (notFound) return <h1>Not found !</h1>;
  const {
    user: { userData },
  } = useAppSelector((state) => state);
  const theme = useTheme();
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

  return (
    <>
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
                  {user?.dob}
                </Typography>
              </Box>
              {user?.uuid == userData?.uuid && (
                <Button variant="outlined">Edit profile</Button>
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

export default Profile;
