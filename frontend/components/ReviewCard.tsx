import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Rating } from "@mui/material";
import { useRouter } from "next/router";
import { useTheme } from "@emotion/react";

interface IReviewCard {
  reviewerFullName: string;
  action: string;
  image: string;
  companyName: string;
  avgRating: number;
  text: string;
}

const ReviewCard = ({
  reviewerFullName,
  action,
  image,
  companyName,
  avgRating,
  text,
}: IReviewCard) => {
  const theme = useTheme();
  const { locale } = useRouter();
  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: theme.palette?.grey["200"],
        cursor: "pointer",
        marginRight: locale === "ar" ? 0 : "1rem",
        marginLeft: locale === "ar" ? "1rem" : "0",
        transition: "all .3s ease-in-out",
        ":hover": {
          transform: "translateY(3px)",
        },
        textAlign: locale === "ar" ? "right" : "left",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="avatar">
            R
          </Avatar>
        }
        title={reviewerFullName}
        subheader={action}
        style={{ textAlign: locale === "ar" ? "right" : "left" }}
      />
      <CardMedia
        component="img"
        height="194"
        image="/png/review-image-sample.png"
        alt={companyName}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "600" }}>
          {companyName}
        </Typography>
        <Rating name="read-only" value={avgRating} readOnly />
        <Typography variant="body2" color="text.secondary">
          {text?.substring(0, 200)} {text?.length > 200 && "..."}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
