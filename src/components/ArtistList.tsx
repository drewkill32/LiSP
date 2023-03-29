import HeadphonesIcon from "@mui/icons-material/Headphones";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Box, Divider, Stack } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { useStarColor } from "../hooks/useStarColor";
import { useLineup } from "../Lineup";
import { formatTime } from "../utils";

export const ArtistList = () => {
  const { lineup } = useLineup();
  const [checked, setChecked] = React.useState<Set<number>>(new Set<number>());
  const color = useStarColor();

  const handleToggle = (value: number) => () => {
    setChecked((prevChecked) => {
      const newChecked = new Set(prevChecked);
      if (prevChecked.has(value)) {
        newChecked.delete(value);
      } else {
        newChecked.add(value);
      }
      return newChecked;
    });
  };

  return (
    <List sx={{ width: "100%" }}>
      {lineup.map((value, index) => {
        const labelId = `checkbox-list-label-${value}`;

        const encodedAddress = encodeURIComponent(value.venueAddress);
        const encodedLocationName = encodeURIComponent(value.venue);
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}+${encodedLocationName}`;

        return (
          <div key={value.id}>
            <ListItem
              key={value.id}
              secondaryAction={
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={0.5}
                  justifyContent="flex-end"
                >
                  <IconButton
                    component="a"
                    href={value.artistBioUrl}
                    rel="noopener"
                    aria-label="artist bio"
                  >
                    <HeadphonesIcon />
                  </IconButton>
                  <IconButton
                    component="a"
                    href={googleMapsUrl}
                    rel="noopener"
                    aria-label="map"
                  >
                    <LocationOnIcon />
                  </IconButton>
                </Stack>
              }
              disablePadding
            >
              <ListItemButton
                role={undefined}
                onClick={handleToggle(value.id)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.has(value.id)}
                    tabIndex={-1}
                    disableRipple
                    icon={<StarBorderIcon />}
                    checkedIcon={<StarIcon sx={{ color: color }} />}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{ maxWidth: "165px" }}
                  id={labelId}
                  primary={value.name}
                  secondaryTypographyProps={{ component: "div" }}
                  secondary={
                    <Stack direction="row" flexWrap="wrap" alignItems="center">
                      <span>{value.venue}</span>
                      <Box
                        component="span"
                        sx={{ maxWidth: "165px", overflow: "hidden" }}
                      >
                        {`${formatTime(value.startTime)} -  ${formatTime(
                          value.endTime
                        )}`}
                      </Box>
                    </Stack>
                  }
                />
              </ListItemButton>
            </ListItem>
            {index < lineup.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </div>
        );
      })}
    </List>
  );
};
