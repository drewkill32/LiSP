import StarIcon from "@mui/icons-material/Star";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useStarColor } from "../hooks/useStarColor";
import { useLineup } from "../lineup";

export const FilterStared = () => {
  const { filterStar, setFilterStar, search } = useLineup();
  const color = useStarColor();

  return (
    <ToggleButtonGroup
      value={filterStar ? "star" : "all"}
      exclusive
      disabled={Boolean(search)}
      onChange={(_e, x) => {
        if (x) {
          setFilterStar(x === "star");
        }
      }}
      aria-label="text alignment"
    >
      <ToggleButton value="star">
        <StarIcon sx={{ color: filterStar ? color : "inherit" }} />
      </ToggleButton>
      <ToggleButton value="all">All</ToggleButton>
    </ToggleButtonGroup>
  );
};
