import GpsNotFixedIcon from "@mui/icons-material/GpsNotFixed";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { Button, ButtonProps } from "@mui/material";
import { useEffect, useState } from "react";
import { MapLatLng } from "./types";

type locationUpdated = (location: MapLatLng | null) => void;

interface ZoomButtonProps extends ButtonProps {
  onLocationUpdated?: locationUpdated;
}

const updateLocation = (
  currentLocation: MapLatLng | null,
  callback: locationUpdated
) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        if (
          currentLocation?.lat === position.coords.latitude &&
          currentLocation?.lng === position.coords.longitude
        ) {
          return;
        }
        callback({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        callback(null);
      }
    );
  } else {
    // Browser doesn't support Geolocation
    callback(null);
  }
};

export function ZoomButton({
  onLocationUpdated,
  sx,
  ...rest
}: ZoomButtonProps) {
  const [currentLocation, setCurrentLocation] = useState<MapLatLng | null>(
    null
  );

  const [tracking, setTracking] = useState<boolean>(false);

  useEffect(() => {
    onLocationUpdated?.(currentLocation);
  }, [currentLocation]);

  useEffect(() => {
    if (!tracking) {
      setCurrentLocation(null);
      return;
    }
    updateLocation(currentLocation, setCurrentLocation);
    const interval = setInterval(() => {
      updateLocation(currentLocation, setCurrentLocation);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [tracking]);

  return (
    <Button
      onClick={() => {
        setTracking((t) => !t);
      }}
      {...rest}
      variant="contained"
      sx={{
        ...sx,
        zIndex: 100,
        position: "absolute",
        right: 11,
        top: 158,
        padding: 0,
        margin: 0,
        minWidth: "40px",
        height: "40px",
        width: "40px",
        paddingBlock: "5px",
        borderRadius: 1,
        backgroundColor: "#ffffff",
        color: "#666666",
        "&:hover": {
          backgroundColor: "#ffffff",
          color: "#333333",
          boxShadow:
            "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
        },
      }}
      size="small"
    >
      {tracking ? <MyLocationIcon /> : <GpsNotFixedIcon />}
    </Button>
  );
}
