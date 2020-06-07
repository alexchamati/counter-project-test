import React from "react";
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme,
} from "@material-ui/core/styles";
import Main from "./layouts/Main";
import "./App.css";

export const purple = {
  50: "#ece0fd",
  100: "#d0b3fa",
  200: "#b080f6",
  300: "#904df2",
  400: "#7926f0",
  500: "#6100ed",
  600: "#5900eb",
  700: "#4f00e8",
  800: "#4500e5",
  900: "#3300e0",
  A100: "#ffffff",
  A200: "#dbd4ff",
  A400: "#b1a1ff",
  A700: "#9b88ff",
  contrastDefaultColor: "light",
};

const theme = unstable_createMuiStrictModeTheme({
  palette: {
    primary: purple,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  );
}

export default App;
