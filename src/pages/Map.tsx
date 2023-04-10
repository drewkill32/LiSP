import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NightlifeIcon from "@mui/icons-material/Nightlife";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  createTheme,
  Divider,
  List,
  ListItem,
  Skeleton,
  Stack,
  ThemeProvider,
} from "@mui/material";
import {
  GoogleMap,
  InfoWindowF as InfoWindow,
  MarkerF as Marker,
  useLoadScript,
} from "@react-google-maps/api";
import React, { createRef, useEffect, useRef } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { ArtistListItemText } from "../components/ArtistListItemText";
import { useLineup } from "../lineup";
import { getGoogleMapsUrl } from "../utils";

const containerStyle = {
  width: "100%",
  height: "50dvh",
};

const openTimeout = 400;

const center = {
  lat: 27.769115388368373,
  lng: -82.66162601334305,
};

const divStyle = {
  background: `white`,
  border: `1px solid #ccc`,
  padding: 15,
};

const innerTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export function Map() {
  const { mapId } = useParams();
  const { isLoaded: mapLoading } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  const [selectedVenueIndex, setSelectedVenueIndex] =
    React.useState<number>(-1);

  const navigate = useNavigate();

  const { isLoading: venuesLoading, venues } = useLineup();

  const handleMarkerClick = (index: number) => {
    if (selectedVenueIndex === index) {
      navigate("/map");
    } else {
      navigate(venues[index].venueSlug);
    }
  };

  const itemRefs = useRef(venues.map(() => createRef<HTMLDivElement>()));
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const index = venues.findIndex((x) => x.venueSlug === mapId);

    setSelectedVenueIndex(index);
  }, [mapId]);

  useEffect(() => {
    if (selectedVenueIndex > -1) {
      const targetElement = itemRefs.current[selectedVenueIndex].current;
      if (targetElement) {
        console.log(targetElement);
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, openTimeout - 10);
      }
    }
  }, [selectedVenueIndex]);

  const isLoading = venuesLoading || mapLoading;

  return isLoading ? (
    <Stack gap={2} sx={{ maxHeight: "100dvh" }}>
      <Button
        sx={{ marginX: 1, marginTop: { xs: 2, sm: 1 } }}
        variant="contained"
        size="large"
        to="/"
        component={RouterLink}
        endIcon={<NightlifeIcon />}
      >
        View All Artists
      </Button>
      <ThemeProvider theme={innerTheme}>
        <GoogleMap
          mapContainerStyle={{
            ...containerStyle,
            color: innerTheme.palette.text.primary,
          }}
          center={center}
          zoom={14.8}
        >
          {venues.map((venue, index) => (
            <Marker
              onClick={() => handleMarkerClick(index)}
              key={venue.name}
              position={{ lat: venue.lat, lng: venue.lng }}
            ></Marker>
          ))}
          {selectedVenueIndex > -1 && (
            <InfoWindow
              onCloseClick={() => navigate("/map")}
              options={{
                pixelOffset: new google.maps.Size(0, -30),
              }}
              position={{
                lat: venues[selectedVenueIndex].lat,
                lng: venues[selectedVenueIndex].lng,
              }}
            >
              <Stack gap={1}>
                <Box sx={{ fontWeight: 700 }}>
                  {venues[selectedVenueIndex].name}
                </Box>
                <Box sx={{ maxWidth: "65%" }}>
                  {venues[selectedVenueIndex].address}
                </Box>
                <a
                  target="_blank"
                  tabIndex={0}
                  href={getGoogleMapsUrl(
                    venues[selectedVenueIndex].address,
                    venues[selectedVenueIndex].name
                  )}
                >
                  View on Google Maps
                </a>
              </Stack>
            </InfoWindow>
          )}
        </GoogleMap>
      </ThemeProvider>
      <Stack
        sx={{
          overflowY: selectedVenueIndex === -1 ? "auto" : "hidden",
          height: "40dvh",
        }}
      >
        <Box ref={parentRef} id="boundingRect">
          {venues.map((venue, index) => {
            return (
              <Accordion
                key={venue.name}
                ref={itemRefs.current[index]}
                TransitionProps={{ timeout: openTimeout }}
                expanded={
                  selectedVenueIndex === -1
                    ? false
                    : venue.name === venues[selectedVenueIndex].name
                }
                onChange={(e, isExpanded) => {
                  if (isExpanded) {
                    navigate(venues[index].venueSlug);
                  } else {
                    navigate("/map");
                  }
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  {venue.name}
                </AccordionSummary>
                <AccordionDetails>
                  {Object.entries(venue.lineups).map(([day, lineups]) => (
                    <List
                      key={day}
                      subheader={
                        <Divider variant="middle" sx={{ marginBlock: 1 }}>
                          <Chip label={day} />
                        </Divider>
                      }
                    >
                      {lineups.map((l) => (
                        <ListItem key={l.id}>
                          <ArtistListItemText lineup={l} />
                        </ListItem>
                      ))}
                    </List>
                  ))}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      </Stack>
    </Stack>
  ) : (
    <Skeleton sx={{ height: "55vh", width: "100%" }} />
  );
}

export default React.memo(Map);
