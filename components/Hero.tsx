import { useTheme } from "@emotion/react";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import useTranslation from "next-translate/useTranslation";
import { useCallback, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IDomain } from "../@types";
import { domain } from "../api";
import { getAllWilayas } from "../utils/wilayasConfig";

const Hero = () => {
  const theme = useTheme();
  const { t } = useTranslation("common");
  const [allDomains, setAllDomains] = useState<IDomain[] | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | undefined>("");
  const [selectedWilaya, setSelectedWilaya] = useState<string | undefined>("");
  const handleDomainChange = (event: SelectChangeEvent) => {
    setSelectedDomain(event.target.value);
  };

  const handleWilayaChange = (event: SelectChangeEvent) => {
    setSelectedWilaya(event.target.value);
  };
  const getAllDomains = useCallback(async () => {
    const response = await domain.get("/");

    setAllDomains(response.data?.data);
  }, []);

  useEffect(() => {
    getAllDomains();
  }, []);
  return (
    <Box
      sx={{
        height: "100vh",
        background: "red",
        backgroundImage: 'url("/jpg/hero.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center center",
        position: "relative",
        display: "flex",
        alignItems: "center",
        color: theme.palette?.common.white,
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: theme.palette?.primary.main,
          opacity: 0.57,
          zIndex: 3,
        },
      }}
    >
      <Container sx={{ zIndex: 4 }} maxWidth="md">
        <Typography variant="h2" sx={{ marginBottom: ".4rem" }}>
          {t("slug")}
        </Typography>
        <Typography variant="body1">{t("slug-description")}</Typography>
        <Box
          sx={{
            display: "flex",
            marginTop: "2rem",
            backgroundColor: theme.palette?.common.white,
            padding: "2rem",
            borderRadius: "4px",
          }}
        >
          <FormControl sx={{ flex: 1, marginRight: "1rem" }}>
            <InputLabel id="select-domain"> {t("select-domain")}</InputLabel>

            <Select
              labelId={t("select-domain")}
              label={t("select-domain")}
              variant="outlined"
              value={selectedDomain}
              onChange={handleDomainChange}
              displayEmpty
              inputProps={{ "aria-label": t("select-domain") }}
            >
              {allDomains?.map((oneDomain) => (
                <MenuItem key={oneDomain.uuid} value={oneDomain.uuid}>
                  {t(oneDomain.name)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ flex: 1, marginRight: "1rem" }}>
            <InputLabel id="select-wilaya">{t("select-wilaya")}</InputLabel>

            <Select
              labelId="select-wilaya"
              label={t("select-wilaya")}
              variant="outlined"
              value={selectedWilaya}
              onChange={handleWilayaChange}
              displayEmpty
              inputProps={{ "aria-label": t("select-wilaya") }}
            >
              {getAllWilayas().map((oneWilaya) => (
                <MenuItem key={oneWilaya} value={oneWilaya}>
                  {oneWilaya}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            endIcon={<IoSearch />}
            sx={{ fontWeight: "600" }}
            variant="contained"
            color="secondary"
            aria-label="Search"
          >
            {t("search-now")}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
