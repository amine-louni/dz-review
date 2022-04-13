import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { Container, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import ReviewCard from "./ReviewCard";

const Recents = () => {
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
    <Box sx={{ paddingY: "4rem" }}>
      <Container maxWidth="lg">
        <Typography variant="h2">{t("recent-activities")}</Typography>
        <Typography
          variant="subtitle2"
          sx={{ marginBottom: "2rem" }}
          color="text.secondary"
        >
          {t("recent-activities-description")}
        </Typography>
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={1}>
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
  );
};

export default Recents;
