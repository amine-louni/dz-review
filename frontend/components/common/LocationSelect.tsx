import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { IState } from "../../@types";
import {
  getAllWilayas,
  getCommunsForWilayaByName,
} from "../../utils/wilayasConfig";

interface ILocationSelect {
  selectWilayaCb: (state: string) => void;
  selectCommuneCb: (city: string) => void;
}

const LocationSelect = ({
  selectWilayaCb,
  selectCommuneCb,
}: ILocationSelect) => {
  const { t } = useTranslation("common");
  const [selectedWilaya, setSelectedWilaya] = useState<string | undefined>("");
  const [selectedCommune, setSelectedCommune] = useState<string | undefined>(
    ""
  );
  const [communs, setCommuns] = useState<string[] | null>(null);

  const handleWilayaChange = (event: SelectChangeEvent) => {
    setSelectedWilaya(event.target.value);
    selectWilayaCb(event.target.value);
    setCommuns(null);
  };
  const handleCityChange = (event: SelectChangeEvent) => {
    setSelectedCommune(event.target.value);
    selectCommuneCb(event.target.value);
  };

  useEffect(() => {
    if (!selectedWilaya) return;

    setCommuns(getCommunsForWilayaByName(selectedWilaya));
  }, [selectedWilaya]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <FormControl fullWidth sx={{ flex: 1 }}>
          <InputLabel id="select-wilaya">{t("select-wilaya")}</InputLabel>

          <Select
            fullWidth
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
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth sx={{ flex: 1 }}>
          <InputLabel id="select-city">{t("select-city")}</InputLabel>

          <Select
            disabled={!Boolean(selectedWilaya)}
            fullWidth
            labelId="select-city"
            label={t("select-city")}
            variant="outlined"
            value={selectedCommune}
            onChange={handleCityChange}
            displayEmpty
            inputProps={{ "aria-label": t("select-cityu") }}
          >
            {communs?.map((oneCity) => (
              <MenuItem key={oneCity} value={oneCity}>
                {oneCity}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="caption" color="text.secondary">
          {t("select-loaction-disclaimer")}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LocationSelect;
