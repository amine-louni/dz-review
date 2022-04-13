import { Box } from "@mui/system";
import { useTheme } from "@emotion/react";
import { Container, Typography } from "@mui/material";
import LanguageMenu from "./LanguageMenu";

const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        marginTop: "3rem",
        paddingY: "1rem",
        backgroundColor: theme.palette?.grey["200"],
        color: theme.palette?.common.black,
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="caption">Footer text</Typography>
          <LanguageMenu mode="light" />
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
