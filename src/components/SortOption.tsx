import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useState } from "react";

const sortOptions = ["Time", "Venue", "Artist"];

export const SortOption = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState("Time");

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (sortBy: string | undefined) => {
    if (sortBy) {
      setSelected(sortBy);
    }
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="demo-customized-button"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        sx={{ width: "180px", minWidth: "180px", paddingBlock: "11px" }}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <Stack
          direction="row"
          alignItems="flex-end"
          justifyContent="space-between"
        >
          <div>Sort By:</div>
          <Box sx={{ pl: 1, fontWeight: "bold" }}>{selected}</Box>
        </Stack>
      </Button>
      <Menu
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(undefined)}
      >
        {sortOptions.map((o) => {
          return (
            <MenuItem
              onClick={() => {
                handleClose(o);
              }}
              disableRipple
            >
              {o}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};
