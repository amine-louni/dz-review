import type { NextPage } from "next";
import Box from "@mui/material/Box";
import Navbar from "../components/common/Navbar";
import Hero from "../components/Hero";
import Recent from "../components/Recent";

const Home: NextPage = () => {
  return (
    <Box component={"main"}>
      <Navbar />

      <Hero />
      <Recent />
    </Box>
  );
};

export default Home;
