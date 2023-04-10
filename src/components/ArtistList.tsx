import StarIcon from "@mui/icons-material/Star";
import { Box, Chip, Divider, List, Paper } from "@mui/material";
import { useStarColor } from "../hooks/useStarColor";
import { useLineup } from "../lineup";
import { ArtistListItem } from "./ArtistListItem";
import { ListSkeleton } from "./ListSkeleton";

export const ArtistList = () => {
  const { lineup, isLoading, filterStar, day } = useLineup();
  const color = useStarColor();
  if (isLoading) {
    return <ListSkeleton />;
  }

  if (Object.entries(lineup).length === 0) {
    if (filterStar) {
      return (
        <Paper sx={{ paddingBlock: 10, paddingInline: 2 }} elevation={3}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              <p>
                You have not{" "}
                <Box
                  component="span"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <StarIcon sx={{ color: color }} />
                </Box>{" "}
                any shows for {day}
              </p>
              <p>
                Select ALL above and favorite some shows that you want to see!
              </p>
            </div>
          </Box>
        </Paper>
      );
    }
    return (
      <Paper sx={{ paddingBlock: 10, paddingInline: 2 }} elevation={3}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <p>Sorry there are no shows for {day}</p>
          </div>
        </Box>
      </Paper>
    );
  }

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
