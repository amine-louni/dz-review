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
            <ReviewCard />
          </Grid>
          <Grid item md={6} lg={4}>
            <ReviewCard />
          </Grid>
          <Grid item md={6} lg={4}>
            <ReviewCard />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Recent;
