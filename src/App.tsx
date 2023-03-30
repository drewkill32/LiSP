import { useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";
import { ArtistList } from "./components/ArtistList";
import { FilterDays } from "./components/FilterDays";
import { FilterStared } from "./components/FilterStared";
import { Search } from "./components/Search";
import { SortOption } from "./components/SortOption";
import { LineupProvider } from "./_Lineup";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LineupProvider fallback={<div>Loading...</div>}>
        <Stack gap={2} sx={{ margin: { xs: 2, sm: 6 } }}>
          <Search />
          <Stack
            gap={1}
            sx={{
              paddingTop: 1,
              paddingBottom: 2,
              position: "sticky",
              top: 0,
              zIndex: 999,
              backgroundColor: "background.default",
            }}
          >
            <FilterDays />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <SortOption />
              <FilterStared />
            </Stack>
          </Stack>
          <ArtistList />
        </Stack>
      </LineupProvider>
    </ThemeProvider>
  );
}

export default App;
