
import { createTheme } from "@mui/material/styles";
import { grey, red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#12398F',
    },
    secondary: {
      light: "#ffd5cc",
      main: '#DB4123',

    },
    grey: {
      "200": "#F4F5F4",
      "500": "#636770",
      "600": "#737B7D"
    },
    error: {
      main: red.A400,
    },
    common: {
      white: '#F5F6F7',
      black: "#2B2A2E"
    }
  },
  typography: {
    allVariants: {
      fontFamily: 'Poppins, Cairo'
    },
    h1: {

      fontSize: 72,
      fontWeight: 'bold'
    },
    h2: {
      fontSize: 42,
      fontWeight: 'bold'
    },
    h3: {
      fontSize: 35,
      fontWeight: '600',
    },
    h4: {
      fontSize: 28,
    },
    h5: {
      fontSize: 22
    },
    h6: {
      fontSize: 18
    },
    button: {
      textTransform: 'none',

    }
  },
  components: {

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          background: '#FFF',
          margin: 0
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          background: "#F4F5F4",
          ":webkit-autofill": {
            boxShadow: '0 0 0 30px white inset'


          },

        }
      }
    },
    MuiSelect: {
      styleOverrides: {

        outlined: {
          background: "#F4F5F4",

        }

      }

    }
  }

});

export default theme;
