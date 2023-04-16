import {
  Box,
  ListItemText,
  ListItemTextProps,
  Stack,
  Typography,
} from "@mui/material";
import { formatTime } from "../utils";
import { TicketIcon } from "./TicketIcon";

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
    ticketUrl?: string;
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
      primary={<Typography variant="h6">{lineup.name}</Typography>}
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
          {lineup.ticketUrl && (
            <Stack
              sx={{ marginTop: 1 }}
              component="a"
              target="_blank"
              href={lineup.ticketUrl}
              direction="row"
              gap={1}
              onClick={(e) => e.stopPropagation()}
            >
              <TicketIcon />
              <Typography>Buy Tickets</Typography>
            </Stack>
          )}
        </>
      }
    />
  );
};
