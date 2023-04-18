import HeadphonesIcon from "@mui/icons-material/Headphones";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Lineup } from "../api";
import { useAnalyticsEventTracker } from "../hooks/useEventTracker";
import { useStarColor } from "../hooks/useStarColor";
import { useLineup } from "../lineup";
import { ArtistListItemText } from "./ArtistListItemText";

type ArtistListItemParams = {
  lineup: Lineup;
};
export function ArtistListItem({ lineup }: ArtistListItemParams) {
  const { toggleStar, isStared } = useLineup();

  const labelId = `${lineup.name}-${lineup.id}`;

  const color = useStarColor();
  const tracker = useAnalyticsEventTracker("artist");

  return (
    <ListItem
      secondaryAction={
        <Stack
          direction="row"
          alignItems="center"
          gap={0.5}
          justifyContent="flex-end"
        >
          {lineup.artistBioUrl && (
            <IconButton
              component="a"
              href={lineup.artistBioUrl}
              rel="noopener"
              aria-label="artist bio"
            >
              {lineup.artistType === "Music" ? (
                <HeadphonesIcon />
              ) : (
                <TheaterComedyIcon />
              )}
            </IconButton>
          )}

          <IconButton
            component={Link}
            to={`/map/${lineup.venueSlug}`}
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
          tracker("favorite", lineup.name);
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
        <ArtistListItemText
          sx={{
            marginRight: { xs: "3.4rem" },
          }}
          id={labelId}
          lineup={lineup}
        />
      </ListItemButton>
    </ListItem>
  );
}
