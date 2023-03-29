import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import { Day } from "../utils";

export const FilterDays = () => {
  const [day, setDay] = useState<Day>("Fri");
  return (
    <ToggleButtonGroup
      sx={{ maxWidth: "400px", margin: "auto" }}
      fullWidth
      value={day}
      exclusive
      onChange={(_e, x) => {
        setDay(x);
      }}
      aria-label="text alignment"
    >
      <ToggleButton value="Fri">Fri</ToggleButton>
      <ToggleButton value="Sat">Sat</ToggleButton>
      <ToggleButton value="Sun">Sun</ToggleButton>
    </ToggleButtonGroup>
  );
};
