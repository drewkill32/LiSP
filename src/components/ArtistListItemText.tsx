import { Box, ListItemText, ListItemTextProps, Stack } from "@mui/material";
import { Lineup } from "../api";
import { formatTime } from "../utils";

interface ArtistListItemTextProps
  extends Omit<
    ListItemTextProps,
    "primary" | "secondaryTypographyProps" | "secondary"
  > {
  lineup: Lineup;
}

export const ArtistListItemText = ({
  lineup,
  ...rest
}: ArtistListItemTextProps) => {
  return (
    <ListItemText
      {...rest}
      primary={lineup.name}
      secondaryTypographyProps={{ component: "div" }}
      secondary={
        <>
          {Boolean(lineup.details) && <div>{lineup.details}</div>}
          <Stack direction="row" gap={1} flexWrap="wrap" alignItems="center">
            <span>{lineup.venue}</span>
            <Box component="span">
              {`${formatTime(lineup.startTime)} -  ${formatTime(
                lineup.endTime
              )}`}
            </Box>
          </Stack>
        </>
      }
    />
  );
};
