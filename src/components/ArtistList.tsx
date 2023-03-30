import { Box, Chip, Divider } from "@mui/material";
import List from "@mui/material/List";
import { useLineup } from "../_Lineup";
import { ArtistListItem } from "./ArtistListItem";

export const ArtistList = () => {
  const { lineup } = useLineup();

  return (
    <List sx={{ width: "100%" }}>
      {Object.entries(lineup).map(([key, lineups]) => {
        return (
          <Box key={key}>
            <Box
              sx={{
                position: "sticky",
                top: "125px",
                paddingBlock: 2,
                zIndex: 888,
                backgroundColor: "background.default",
                width: "100%",
              }}
            >
              <Divider variant="middle">
                <Chip label={key} />
              </Divider>
            </Box>
            {lineups.map((value, index) => {
              return (
                <div key={value.id}>
                  <ArtistListItem key={value.id} lineup={value} />
                  {index < lineups.length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </div>
              );
            })}
          </Box>
        );
      })}
    </List>
  );
};
