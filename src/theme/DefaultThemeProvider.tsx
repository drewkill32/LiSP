import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1c1c1c",
      light: "#4b4b4b",
      dark: "#000000",
      contrastText: "#fafafa",
    },
  },
  typography: {
    fontSize: 16,
    fontFamily: ["dcc-ash", "Impact", "Roboto"].join(","),
    h1: {
      fontSize: 24,
      fontFamily: "white-on-black",
    },
    h2: {
      fontSize: 22,
      fontFamily: "white-on-black",
    },
    h3: {
      fontSize: 20,
      fontFamily: "white-on-black",
    },
    h4: {
      fontSize: 18,
      fontFamily: "white-on-black",
    },
    h5: {
      fontSize: 16,
      fontFamily: "white-on-black",
    },
    h6: {
      fontSize: 16,
      fontFamily: "white-on-black",
    },
    subtitle1: {
      fontFamily: ["white-on-black", "Impact", "Roboto"].join(","),
    },
    subtitle2: {
      fontFamily: ["dcc-ash", "Impact", "Roboto"].join(","),
    },
    body1: {
      fontFamily: ["dcc-ash", "destroy", "Roboto"].join(","),
    },
    body2: {
      fontFamily: ["dcc-ash", "destroy", "Roboto"].join(","),
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'dcc-ash';
          src: local('dcc-ash'), local('DCC - Ash'), url(fonts/dcc-ash.woff) format('woff');
          font-style: normal;
          font-weight: normal;
          font-display: swap;
        }
        
        @font-face {
          font-family: 'gesso';
          src: url('fonts/gesso.woff') format('woff');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'white-on-black';
          src: url('fonts/white-on-black.woff') format('woff');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'destroy';
          src: url('fonts/destroy.woff') format('woff');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
      `,
    },
  },
});
export const DefaultThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
