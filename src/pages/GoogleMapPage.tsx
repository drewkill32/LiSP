import { createTheme, Skeleton, Stack, ThemeProvider } from "@mui/material";
import {
  GoogleMap,
  MarkerF as Marker,
  useLoadScript,
} from "@react-google-maps/api";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MapDrawer } from "../components/map/MapDrawer";
import { MainLayout } from "../layout/MainLayout";
import { useLineup } from "../lineup";

const containerStyle = {
  width: "100%",
  height: "90dvh",
};

const center = {
  lat: 27.769115388368373,
  lng: -82.66162601334305,
};

const innerTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const createIcon = (
  selected = false
): google.maps.Symbol | google.maps.Icon => {
  return {
    url: selected ? "logo-med.svg" : "logo-sm-grey.svg",
  };
};

export function GoogleMapPage() {
  const { mapId } = useParams();
  const { isLoaded: mapLoading } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    mapIds: [import.meta.env.VITE_GOOGLE_MAP_ID],
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

  useEffect(() => {
    const index = venues.findIndex((x) => x.venueSlug === mapId);

    setSelectedVenueIndex(index);
  }, [mapId]);

  const isLoading = venuesLoading || mapLoading;

  return isLoading ? (
    <MainLayout>
      <>
        <Stack gap={2} sx={{ overflow: "hidden" }}>
          <ThemeProvider theme={innerTheme}>
            <GoogleMap
              options={{
                mapId: import.meta.env.VITE_GOOGLE_MAP_ID,
                disableDefaultUI: true,
                zoomControl: true,
              }}
              mapContainerStyle={{
                ...containerStyle,
                color: innerTheme.palette.text.primary,
                flex: "0 1 auto",
              }}
              onClick={() => {
                navigate("/map");
              }}
              center={center}
              zoom={14.8}
            >
              {venues.map((venue) => {
                const selected =
                  selectedVenueIndex !== -1 &&
                  venues[selectedVenueIndex].address === venue.address;
                if (selected) {
                  return null;
                }
                return (
                  <Marker
                    icon={createIcon()}
                    onClick={() =>
                      handleMarkerClick(
                        venues.findIndex((x) => x.address === venue.address)
                      )
                    }
                    key={venue.address}
                    position={{ lat: venue.lat, lng: venue.lng }}
                  ></Marker>
                );
              })}
              {selectedVenueIndex !== -1 && (
                <Marker
                  icon={createIcon(true)}
                  position={{
                    lat: venues[selectedVenueIndex].lat,
                    lng: venues[selectedVenueIndex].lng,
                  }}
                ></Marker>
              )}
            </GoogleMap>
          </ThemeProvider>
        </Stack>
        <MapDrawer
          open={selectedVenueIndex !== -1}
          venue={venues[selectedVenueIndex]}
          onClose={() => {
            setSelectedVenueIndex(-1);
          }}
        />
      </>
    </MainLayout>
  ) : (
    <Skeleton sx={{ height: "55vh", width: "100%" }} />
  );
}
