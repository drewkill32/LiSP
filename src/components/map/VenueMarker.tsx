import { MarkerF as Marker } from "@react-google-maps/api";
import { MapLatLng } from "./types";

type VenueMarkerProps = {
  position: MapLatLng;
  onClick?: ((e: google.maps.MapMouseEvent) => void) | undefined;
  enabled?: boolean;
};

export const VenueMarker = ({
  position,
  onClick,
  enabled,
}: VenueMarkerProps) => {
  return (
    <Marker
      icon={{
        url: enabled ? "map-pin-selected.svg" : "map-pin.svg",
      }}
      onClick={onClick}
      position={{ lat: position.lat, lng: position.lng }}
    />
  );
};
