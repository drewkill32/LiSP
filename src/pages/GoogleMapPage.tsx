import { Skeleton, Stack, Toolbar } from "@mui/material";
import {
  GoogleMap,
  MarkerF as Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MapDrawer } from "../components/map/MapDrawer";
import { MapLatLng } from "../components/map/types";
import { VenueMarker } from "../components/map/VenueMarker";
import { ZoomButton } from "../components/map/ZoomButton";
import { MainLayout } from "../layout/MainLayout";
import { useLineup } from "../lineup";
import { panToOffset } from "../utils";

const center = {
  lat: 27.769115388368373,
  lng: -82.66162601334305,
};

export function GoogleMapPage() {
  const { mapId } = useParams();
  const { isLoaded: mapLoading } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    mapIds: [import.meta.env.VITE_GOOGLE_MAP_ID],
  });

  const [selectedVenueIndex, setSelectedVenueIndex] = useState<number>(-1);
  const [location, setLocation] = useState<MapLatLng | null>(null);

  const [map, setMap] = useState<google.maps.Map>();

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

  const handleLocationUpdated = (latLng: MapLatLng | null) => {
    if (map && location === null && latLng !== null) {
      //first time turning location on
      map.panTo(latLng);
    }
    setLocation(latLng);
  };

  const isLoading = venuesLoading || mapLoading;

  return isLoading ? (
    <MainLayout>
      <Stack
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100dvh",
        }}
      >
        <Toolbar />
        <GoogleMap
          onLoad={(m) => setMap(m)}
          options={{
            mapId: import.meta.env.VITE_GOOGLE_MAP_ID,
            disableDefaultUI: true,
            zoomControl: true,
            zoomControlOptions: {
              position: google.maps.ControlPosition.RIGHT_TOP,
            },
          }}
          mapContainerStyle={{
            width: "100%",
            color: "#1c1c1c",
            flex: "0 1 auto",
            height: `calc(100dvh - 65px)`,
            overflow: "hidden",
          }}
          onClick={() => {
            navigate("/map");
          }}
          center={center}
          zoom={14}
        >
          {venues.map((venue) => {
            const selected =
              selectedVenueIndex !== -1 &&
              venues[selectedVenueIndex].address === venue.address;
            if (selected) {
              return null;
            }
            return (
              <VenueMarker
                onClick={() =>
                  handleMarkerClick(
                    venues.findIndex((x) => x.address === venue.address)
                  )
                }
                enabled={false}
                key={venue.address}
                position={{ lat: venue.lat, lng: venue.lng }}
              ></VenueMarker>
            );
          })}
          {selectedVenueIndex !== -1 && (
            <VenueMarker
              enabled
              position={{
                lat: venues[selectedVenueIndex].lat,
                lng: venues[selectedVenueIndex].lng,
              }}
            ></VenueMarker>
          )}
          {location && (
            <Marker
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 7,
                fillColor: "#5384ED",
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: "#ffffff",
              }}
              position={location}
            ></Marker>
          )}
        </GoogleMap>
        <ZoomButton onLocationUpdated={handleLocationUpdated} />
        <MapDrawer
          open={selectedVenueIndex !== -1}
          venue={venues[selectedVenueIndex]}
          onClose={() => {
            setSelectedVenueIndex(-1);
          }}
          centerMap={(vertical: boolean) => {
            if (selectedVenueIndex !== -1 && map) {
              const xOffset = vertical ? 0 : 120;
              const yOffset = vertical ? window.innerHeight / 4 + 10 : 0;

              panToOffset(
                map,
                new google.maps.LatLng(
                  venues[selectedVenueIndex].lat,
                  venues[selectedVenueIndex].lng
                ),
                xOffset,
                yOffset
              );
            }
          }}
        />
      </Stack>
    </MainLayout>
  ) : (
    <Skeleton sx={{ height: "55vh", width: "100%" }} />
  );
}
