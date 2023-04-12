import { Box, ListItemText, ListItemTextProps, Stack } from "@mui/material";
import { formatTime } from "../utils";

interface ArtistListItemTextProps
  extends Omit<
    ListItemTextProps,
    "primary" | "secondaryTypographyProps" | "secondary"
  > {
  lineup: {
    name: string;
    details?: string;
    venue: string;
    startTime: Date;
    endTime: Date;
  };
  hideVenue?: boolean;
}

export const ArtistListItemText = ({
  lineup,
  hideVenue = false,
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
            {!hideVenue && <span>{lineup.venue}</span>}
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
