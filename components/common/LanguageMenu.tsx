import React, { useState, useLayoutEffect, useEffect } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoLanguage } from "react-icons/io5";

import { useTheme } from "@emotion/react";

type languageTypes = { value: string; displayValue: string };
const languages = [
  { value: "en", displayValue: "English" },
  { value: "fr", displayValue: "Français" },
  { value: "ar", displayValue: "العربية" },
];

const LanguageMenu = () => {
  const [language, setLanguage] = useState<languageTypes>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { locale, route, push } = useRouter();
  const theme = useTheme();
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
  }, [locale]);

  useEffect(() => {
    push(route, route, { locale: language?.value });
  }, [language]);
  return (
    <Box sx={{ minWidth: 120, color: theme.palette?.common.white }}>
      <Button
        startIcon={<IoLanguage />}
        color="inherit"
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
          <MenuItem
            key={oneLanguage.value}
            onClick={() => handleClose(oneLanguage)}
          >
            {oneLanguage.displayValue}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageMenu;
