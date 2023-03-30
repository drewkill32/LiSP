import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useLineup } from "../lineup";

export const FilterDays = () => {
  const { day, setDay, search, lineup } = useLineup();

  return (
    <ToggleButtonGroup
      sx={{ maxWidth: "400px", margin: "auto" }}
      fullWidth
      value={day}
      exclusive
      disabled={Boolean(search)}
      onChange={(_e, x) => {
        if (x) {
          setDay(x);
        }
      }}
      aria-label="text alignment"
    >
      <ToggleButton value="Thu">Thu</ToggleButton>
      <ToggleButton value="Fri">Fri</ToggleButton>
      <ToggleButton value="Sat">Sat</ToggleButton>
      <ToggleButton value="Sun">Sun</ToggleButton>
    </ToggleButtonGroup>
  );
};
