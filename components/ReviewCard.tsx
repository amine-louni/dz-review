import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Rating } from "@mui/material";
import { useTheme } from "@mui/system";

interface IReviewCard {
  reviewerFullName: string;
  createdAt: string;
  image: string;
  companyName: string;
  avgRating: number;
  text: string;
}

const ReviewCard = ({
  reviewerFullName,
  createdAt,
  image,
  companyName,
  avgRating,
  text,
}: IReviewCard) => {
  const theme = useTheme();
  return (
    <Card
      variant="outlined"
      sx={{ backgroundColor: theme.palette.grey["200"], cursor: "pointer" }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={reviewerFullName}
        subheader={createdAt}
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
        <Rating name="read-only" value={4} readOnly />
        <Typography variant="body2" color="text.secondary">
          {text.substring(0, 140)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
