import Stack from "@mui/material/Stack";
import { ArtistList } from "./components/ArtistList";
import { FilterDays } from "./components/FilterDays";
import { FilterStared } from "./components/FilterStared";
import { Search } from "./components/Search";
import { SortOption } from "./components/SortOption";
import { LineupProvider } from "./Lineup";

function App() {
  return (
    <LineupProvider fallback={<div>Loading...</div>}>
      <Stack gap={2} sx={{ padding: { sm: 1, md: 6 } }}>
        <Search />
        <FilterDays />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <SortOption />
          <FilterStared />
        </Stack>
        <ArtistList />
      </Stack>
    </LineupProvider>
  );
}

export default App;
