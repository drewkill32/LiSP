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
  ListSubheader,
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
import React, { createRef, useEffect, useMemo, useRef } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { ArtistListItemText } from "../components/ArtistListItemText";
import { useLineup, Venue } from "../lineup";
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

const innerTheme = createTheme({
  palette: {
    mode: "light",
  },
});

type SubVenueButtonTextProps = {
  venueName: string;
};

const SubVenueButtonText = ({ venueName }: SubVenueButtonTextProps) => {
  const regex = /\(([^)]+)\)/;
  const match = venueName.match(regex);
  if (match) {
    const subHeading = match[1];
    return <>{subHeading}</>;
  }
  return <>{venueName}</>;
};

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

  const addressedVenues = useMemo(() => {
    const a = venues.reduce(
      (
        acc: Record<string, { lat: number; lng: number; venues: Venue[] }>,
        item
      ) => {
        const address = item.address;

        if (!acc[address]) {
          acc[address] = {
            lat: item.lat,
            lng: item.lng,
            venues: [],
          };
        }

        acc[address].venues.push(item);
        return acc;
      },
      {}
    );
    Object.entries(a).forEach(([, v]) => {
      v.venues = v.venues.sort((a, b) => a.name.localeCompare(b.name));
    });
    return a;
  }, [venues]);

  const selectedAddress =
    selectedVenueIndex === -1
      ? undefined
      : addressedVenues[venues[selectedVenueIndex].address];

  return isLoading ? (
    <Stack gap={2}>
      <Button
        sx={{ marginInline: 1, marginTop: 2 }}
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
            flex: "0 1 auto",
          }}
          center={center}
          zoom={14.8}
        >
          {Object.entries(addressedVenues).map(([address, venue]) => (
            <Marker
              onClick={() =>
                handleMarkerClick(
                  venues.findIndex((x) => x.name === venue.venues[0].name)
                )
              }
              key={address}
              position={{ lat: venue.lat, lng: venue.lng }}
            ></Marker>
          ))}
          {selectedAddress && (
            <InfoWindow
              onCloseClick={() => navigate("/map")}
              options={{
                pixelOffset: new google.maps.Size(0, -30),
              }}
              position={{
                lat: selectedAddress.lat,
                lng: selectedAddress.lng,
              }}
            >
              {selectedAddress.venues.length === 1 ? (
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
              ) : (
                <Stack gap={1}>
                  <Box sx={{ fontWeight: 700 }}>
                    {selectedAddress.venues[0].name.replace(
                      / *\([^)]*\) */g,
                      ""
                    )}
                  </Box>
                  <Box sx={{ maxWidth: "65%" }}>
                    {selectedAddress.venues[0].address}
                  </Box>
                  {selectedAddress.venues.map((v) => (
                    <>
                      <Button
                        component={RouterLink}
                        size="small"
                        variant="outlined"
                        to={v.venueSlug}
                      >
                        <SubVenueButtonText venueName={v.name} />
                      </Button>
                    </>
                  ))}
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
              )}
            </InfoWindow>
          )}
        </GoogleMap>
      </ThemeProvider>

      <Stack
        sx={{
          height: "39dvh",
          overflow: selectedVenueIndex === -1 ? "auto" : "hidden",
          marginBottom: 1,
        }}
      >
        <Box>
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
                <AccordionDetails
                  sx={{
                    height: "32.6dvh",
                    overflow: "auto",
                    position: "relative",
                  }}
                  ref={parentRef}
                >
                  {Object.entries(venue.lineups).map(([day, lineups]) => (
                    <List
                      sx={{ zIndex: 998 }}
                      key={day}
                      subheader={
                        <ListSubheader
                          sx={{
                            marginBlock: 0,
                            position: "sticky",
                            top: -8,
                            zIndex: 999,
                            borderRadius: 4,
                          }}
                        >
                          <Divider variant="middle">
                            <Chip label={day} />
                          </Divider>
                        </ListSubheader>
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
