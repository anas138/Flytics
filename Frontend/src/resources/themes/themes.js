import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Poppins",
      "sans-serif", "Roboto", "Helvetica", "Arial",
    ].join(','),
  },
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: `"Poppins","sans-serif", "Roboto", "Helvetica", "Arial"`,
      },
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#112C64",
      light: "#3265AF",
      dark: "#6E6E6E",
      contrastText: "#000",
    },
  },
  drawer: {
    width: 250,
  },
});

export default theme;
