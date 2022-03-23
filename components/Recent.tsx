import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Button, Container, Typography } from "@mui/material";

import { Box } from "@mui/system";
import ReviewCard from "./ReviewCard";
import Slider, { Settings } from "react-slick";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

const Recent = () => {
  const { locale } = useRouter();
  const { t } = useTranslation("common");
  var settings: Settings = {
    dots: false,
    infinite: false,
    centerMode: false,
    slidesToShow: 2.9,
    slidesToScroll: 2,

    nextArrow: locale === "ar" ? <ChevronLeft /> : <ChevronRight />,
    prevArrow: locale === "ar" ? <ChevronRight /> : <ChevronLeft />,

    className: "react__slick__slider__parent",
  };

  return (
    <Box className="recent" sx={{ paddingY: "4rem" }}>
      <Container>
        <Typography variant="h2">{t("recent-activities")}</Typography>
        <Typography
          variant="subtitle2"
          sx={{ marginBottom: "2rem" }}
          color="text.secondary"
        >
          {t("recent-activities-description")}
        </Typography>
        <Slider {...settings}>
          <ReviewCard
            reviewerFullName="John doe"
            avgRating={4}
            companyName="Net company"
            action="Wrote a review"
            text="In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available"
            image="place holder"
          />
          <ReviewCard
            reviewerFullName="John doe"
            avgRating={4}
            companyName="Net company"
            action="Wrote a review"
            text="In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available"
            image="place holder"
          />
          <ReviewCard
            reviewerFullName="John doe"
            avgRating={4}
            companyName="Net company"
            action="Wrote a review"
            text="In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available"
            image="place holder"
          />
          <ReviewCard
            reviewerFullName="John doe"
            avgRating={4}
            companyName="Net company"
            action="Wrote a review"
            text="In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available"
            image="place holder"
          />
        </Slider>

        <Box sx={{ textAlign: "center", marginTop: "2rem" }}>
          <Button variant="outlined">{t("show-more-activites")}</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Recent;
