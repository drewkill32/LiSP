import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box, { BoxProps } from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router-dom";
import { LiSPIcon } from "../components/LiSPIcon";

type MainLayoutProps = {
  children: React.ReactNode;
};

const drawerWidth = 240;
const navItems = [
  { name: "Schedule", to: "/", type: "internal" },
  { name: "Map", to: "/map", type: "internal" },
];

const TitleLink = ({ sx, ...rest }: BoxProps) => {
  return (
    <Box
      component="a"
      href="https://www.lostinstpete.org"
      sx={{
        my: 2,
        display: "flex",
        alignItems: "center",
        color: "inherit",
        textDecoration: "none",
        justifyContent: { xs: "center", sm: "flex-start" },
        gap: 1,
        ...sx,
      }}
      {...rest}
    >
      <LiSPIcon />
      <Typography variant="h6">Lost in St. Pete</Typography>
    </Box>
  );
};
export function MainLayout({ children }: MainLayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Box onClick={handleDrawerToggle} sx={{ display: "flex" }}>
        <IconButton>
          <ChevronLeftIcon sx={{ color: "text.primary" }} />
        </IconButton>
        <TitleLink />
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              component={Link}
              to={item.to}
            >
              <ListItemText
                primary={<Typography variant="h6">{item.name}</Typography>}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <TitleLink sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                component={Link}
                to={item.to}
                key={item.name}
                sx={{ color: "#fff" }}
              >
                <Typography variant="h6">{item.name}</Typography>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            zIndex: 5000,
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ width: "100%" }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
