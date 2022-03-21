import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ReviewCard from "./ReviewCard";

const Recent = () => {
  return (
    <Box className="recent" sx={{ paddingY: "4rem" }}>
      <Container>
        <Typography variant="h2" sx={{ marginBottom: "2rem" }}>
          Recent activity
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={6} lg={4}>
            <ReviewCard
              reviewerFullName="John doe"
              avgRating={4}
              companyName="Net company"
              createdAt="September, 200"
              text="In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available"
              image="place holder"
            />
          </Grid>
          <Grid item md={6} lg={4}>
            <ReviewCard
              reviewerFullName="John doe"
              avgRating={4}
              companyName="Net company"
              createdAt="September, 200"
              text="typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available"
              image="place holder"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Recent;
