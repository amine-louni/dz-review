import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "../src/Link";

const Home: NextPage = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" gutterBottom>
          Dz Experss
        </Typography>
        <Typography variant="h2" gutterBottom>
          Dz Experss h2
        </Typography>
        <Typography variant="h3" gutterBottom>
          Dz Experss h3
        </Typography>
        <Typography variant="h4" gutterBottom>
          Dz Experss h3
        </Typography>
        <Typography variant="h5" gutterBottom>
          Dz Experss h3
        </Typography>
        <Typography variant="h6" gutterBottom>
          Dz Experss h3
        </Typography>
        <Link href="/login"> Login</Link>
      </Box>
    </Container>
  );
};

export default Home;
