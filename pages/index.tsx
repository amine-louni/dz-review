import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "../src/Link";
import Navbar from "../components/common/Navbar";
import Hero from "../components/Hero";

const Home: NextPage = () => {
  return (
    <Box component={"main"}>
      <Navbar />

      <Hero />
    </Box>
  );
};

export default Home;
