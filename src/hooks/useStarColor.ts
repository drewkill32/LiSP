import { useTheme } from "@mui/material";
import yellow from "@mui/material/colors/yellow";

export const useStarColor = () => {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === "dark";
  return isDarkTheme ? yellow[500] : yellow[800];
};
