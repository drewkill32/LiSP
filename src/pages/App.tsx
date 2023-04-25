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
        <Typography variant="h1" textAlign="center">
          Powered By:
        </Typography>
        <Box
          component="ul"
          sx={{
            listStyleType: "none",
            margin: 0,
            padding: 0,
            backgroundColor: "#e5e5e5",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 2,
          }}
        >
          {imgData.map((item) => (
            <Box component="li" key={item.src}>
              <img {...item} loading="lazy" width={150} />
            </Box>
          ))}
        </Box>
      </Stack>
    </MainLayout>
  );
}

const imgData = [
  {
    src: "/imgs/sponsors/1._Lost_Logo.png",
    alt: "Lost in St. Pete",
  },
  {
    src: "/imgs/sponsors/2._DEA+AND+SAINT.png",
    alt: "Dea & Saint",
  },
  {
    src: "/imgs/sponsors/3._LITTLE_SAINT_NICK.png",
    alt: "Little Saint Nick",
  },
  {
    src: "/imgs/sponsors/4._Gobioff Foundation.png",
    alt: "Gobioff Foundation",
  },
  {
    src: "/imgs/sponsors/5._pcf-logo.png",
    alt: "Pinellas Community Foundation",
  },
  {
    src: "/imgs/sponsors/6. RGR-Logo-2015-v2-black.png",
    alt: "Rock Garden Recording",
  },
  {
    src: "/imgs/sponsors/7. Convicted printing logo no light.png",
    alt: "Convicted Printing",
  },
  {
    src: "/imgs/sponsors/8._Bad_Company.png",
    alt: "Bad Company Tech Solutions",
  },
  {
    src: "/imgs/sponsors/9._Daddy_Kool.png",
    alt: "Daddy Kool Records",
  },
  {
    src: "/imgs/sponsors/10._Imagine360Video_Edge_Logo_Full.png",
    alt: "Imagine 360 Video",
  },
  {
    src: "/imgs/sponsors/11. Symphonic_Logo.png",
    alt: "Symphonic",
  },
  {
    src: "/imgs/sponsors/13. PIZZA BOX LOGO.PNG",
    alt: "Pizza Box",
  },
];

export default App;
