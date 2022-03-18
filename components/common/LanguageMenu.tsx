import React, { useState, useLayoutEffect, useEffect } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoLanguage } from "react-icons/io5";
import useTranslation from "next-translate/useTranslation";

type languageTypes = { value: string; displayValue: string };
const languages = [
  { value: "en", displayValue: "English" },
  { value: "fr", displayValue: "Français" },
  { value: "ar", displayValue: "العربية" },
];

const LanguageMenu = () => {
  const [language, setLanguage] = useState<languageTypes>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { lang } = useTranslation();
  const { locale, route, push } = useRouter();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (selectedLanguage: languageTypes) => {
    setLanguage(selectedLanguage);
    setAnchorEl(null);
  };

  useLayoutEffect(() => {
    if (!locale) return;
    setLanguage({
      value: locale,
      displayValue: languages.filter(
        (oneLanguage) => oneLanguage.value === locale
      )[0].displayValue,
    });
    console.log(route, "route initial");
  }, [locale]);

  useEffect(() => {
    push(route, route, { locale: language?.value });
  }, [language]);
  return (
    <Box sx={{ minWidth: 120 }}>
      <Button
        startIcon={<IoLanguage />}
        color="info"
        id="language-button"
        aria-controls={open ? "language-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="text"
      >
        {language?.displayValue ?? "not set"}
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "language-button",
        }}
      >
        {languages.map((oneLanguage) => (
          <MenuItem onClick={() => handleClose(oneLanguage)}>
            {oneLanguage.displayValue}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageMenu;
