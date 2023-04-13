import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { Box, Fab, Zoom } from "@mui/material";
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
      </Stack>
    </MainLayout>
  );
}

export default App;
