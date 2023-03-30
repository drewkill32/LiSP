import HeadphonesIcon from "@mui/icons-material/Headphones";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  Box,
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { Lineup } from "../api";
import { useStarColor } from "../hooks/useStarColor";
import { useLineup } from "../lineup";
import { formatTime } from "../utils";

type ArtistListItemParams = {
  lineup: Lineup;
};
export function ArtistListItem({ lineup }: ArtistListItemParams) {
  const { toggleStar, isStared } = useLineup();

  const labelId = `${lineup.name}-${lineup.id}`;

  const encodedAddress = encodeURIComponent(lineup.venueAddress);
  const encodedLocationName = encodeURIComponent(lineup.venue);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}+${encodedLocationName}`;

  const color = useStarColor();

  return (
    <ListItem
      secondaryAction={
        <Stack
          direction="row"
          alignItems="center"
          gap={0.5}
          justifyContent="flex-end"
        >
          <IconButton
            component="a"
            href={lineup.artistBioUrl}
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
        onClick={() => {
          toggleStar(lineup.id);
        }}
        dense
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={isStared(lineup.id)}
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
          primary={lineup.name}
          secondaryTypographyProps={{ component: "div" }}
          secondary={
            <Stack direction="row" flexWrap="wrap" alignItems="center">
              <span>{lineup.venue}</span>
              <Box
                component="span"
                sx={{ maxWidth: "165px", overflow: "hidden" }}
              >
                {`${formatTime(lineup.startTime)} -  ${formatTime(
                  lineup.endTime
                )}`}
              </Box>
            </Stack>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
