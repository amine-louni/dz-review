import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const BootstrapInputStyled = styled(InputBase)(({ theme }) => ({
  width: "100%",
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,

    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),

    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    "&::placeholder": {
      fontWeight: "600",
    },
  },
}));

const BootstrapInput = ({ placeholder }: { placeholder: string }) => {
  return (
    <BootstrapInputStyled id="bootstrap-input" placeholder={placeholder} />
  );
};

export default BootstrapInput;
