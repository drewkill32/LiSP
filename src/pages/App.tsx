import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { Box, Fab, Typography, Zoom } from "@mui/material";
import Stack from "@mui/material/Stack";
import { ArtistList } from "../components/ArtistList";
import { FilterDays } from "../components/FilterDays";
import { FilterStared } from "../components/FilterStared";
import { Search } from "../components/Search";
import { SortOption } from "../components/SortOption";
import { MainLayout } from "../layout/MainLayout";
import { useLineup } from "../lineup";

function App() {
  const { search, setSearch } = useLineup();
  return (
    <MainLayout>
      <Stack gap={2} sx={{ margin: { xs: 2, sm: 6 } }}>
        <Search />

        <Stack
          gap={1}
          sx={{
            paddingTop: 2,
            paddingBottom: 2,
            position: "sticky",
            top: 55,
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
        {Boolean(search) && <Box sx={{ height: "20px" }}></Box>}
        <Zoom
          in={Boolean(search)}
          unmountOnExit
          {...(Boolean(search) ? { timeout: 500 } : {})}
        >
          <Fab
            sx={{ position: "fixed", right: "30px", bottom: "20px" }}
            size="small"
            aria-label="remove-filter"
            onClick={() => setSearch("")}
          >
            <FilterAltOffIcon />
          </Fab>
        </Zoom>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: 0,
            padding: 0,
            backgroundColor: "#e5e5e5",
            borderRadius: "10px",
          }}
        >
          <img
            src="/imgs/sponsors/sponsers-2025.png"
            alt="Lost in St. Pete Sponsors"
            loading="lazy"
            style={{
              width: "100%",
              minHeight: "200px",
              maxHeight: "500px",
              objectFit: "contain",
            }}
          />
        </Box>
      </Stack>
    </MainLayout>
  );
}

export default App;
