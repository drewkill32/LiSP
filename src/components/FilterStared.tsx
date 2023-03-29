import StarIcon from "@mui/icons-material/Star";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import { useStarColor } from "../hooks/useStarColor";

export const FilterStared = () => {
  const [star, setStar] = useState<"star" | "all">("all");
  const color = useStarColor();

  return (
    <ToggleButtonGroup
      value={star}
      exclusive
      onChange={(_e, x) => {
        setStar(x);
      }}
      aria-label="text alignment"
    >
      <ToggleButton value="star">
        <StarIcon sx={{ color: star === "star" ? color : "inherit" }} />
      </ToggleButton>
      <ToggleButton value="all">All</ToggleButton>
    </ToggleButtonGroup>
  );
};
