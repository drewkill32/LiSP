import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DirectionsIcon from "@mui/icons-material/Directions";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  Slide,
  SwipeableDrawer,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import grey from "@mui/material/colors/grey";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Venue } from "../../lineup";
import { createGoogleMapsUrl } from "../../utils";
import { ArtistListItemText } from "../ArtistListItemText";

type MapDrawerProps = {
  open?: boolean;
  onClose?: () => void;
  venue: Venue;
  centerMap?: (vertical: boolean) => void;
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  width: 390,
  maxWidth: 390,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const drawerBleeding = 56;

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

interface ResponsiveDrawerProps extends Omit<MapDrawerProps, "venue"> {
  children: React.ReactNode;
  title: string;
}

const ResponsiveDrawer = ({
  children,
  open: enabled,
  title,
  centerMap,
  onClose,
}: ResponsiveDrawerProps) => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  const [open, setOpen] = useState(false);
  const touchSupported = "ontouchstart" in window;

  useEffect(() => {
    setOpen(Boolean(enabled));
  }, [enabled]);

  useEffect(() => {
    if (open && enabled && typeof centerMap === "function") {
      centerMap(isSmallScreen);
    }
  }, [open, enabled, isSmallScreen]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  if (isSmallScreen) {
    return (
      <>
        <Box
          sx={{
            position: "absolute",
            height: drawerBleeding,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: 9999,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            cursor: "pointer",
            display: enabled && !open && !touchSupported ? "block" : "none",
          }}
          onClick={(e) => {
            if (!touchSupported) {
              setOpen((o) => !o);
            }
          }}
        ></Box>
        <SwipeableDrawer
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              height: `calc(65% - ${drawerBleeding}px)`,
              overflow: "visible",
              zIndex: 10,
            },
          }}
        >
          <Slide direction="up" in={enabled} timeout={200}>
            <StyledBox
              sx={{
                position: "absolute",
                top: enabled ? -drawerBleeding : 0,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                visibility: "visible",
                right: 0,
                left: 0,
              }}
            >
              <Puller />
              <Typography sx={{ p: 3 }} variant="h3">
                {title}
              </Typography>
            </StyledBox>
          </Slide>
          <StyledBox
            sx={{
              px: 2,
              pb: 2,
              height: "100%",
              overflow: "auto",
            }}
          >
            {children}
          </StyledBox>
        </SwipeableDrawer>
      </>
    );
  }
  return (
    <Slide direction="left" in={enabled} timeout={200}>
      <Drawer
        open={enabled}
        variant="persistent"
        anchor="left"
        sx={{ width: 390, maxWidth: 390 }}
      >
        <DrawerHeader>
          <IconButton
            onClick={() => {
              onClose?.();
            }}
          >
            <ChevronLeftIcon sx={{ color: "primary.contrastText" }} />
          </IconButton>
          <Box sx={{ ml: 1 }}>{title}</Box>
        </DrawerHeader>
        <Divider />
        {children}
      </Drawer>
    </Slide>
  );
};

export const MapDrawer = ({ venue, ...rest }: MapDrawerProps) => {
  //variant="persistent" anchor="left" sx={{ width: 350 }}
  return (
    <ResponsiveDrawer {...rest} title={venue?.name || ""}>
      {venue && (
        <List sx={{ mt: 2, mx: 1, maxWidth: { sm: "100%", md: 360 } }}>
          <ListItem>
            <ListItemText
              primaryTypographyProps={{
                fontSize: 20,
                fontWeight: "medium",
              }}
            >
              Address
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <IconButton
                component="a"
                href={createGoogleMapsUrl(venue.address, venue.name)}
              >
                <DirectionsIcon />
              </IconButton>
            </ListItemIcon>
            <ListItemText>{venue.address}</ListItemText>
          </ListItem>
          <Divider />
          {venue.stages.map((s) => (
            <div key={s.name}>
              {venue.stages.length > 1 && (
                <>
                  <ListItem
                    sx={{
                      position: "sticky",
                      top: -2,
                      backgroundColor: "background.paper",
                      zIndex: 20,
                    }}
                  >
                    <ListItemText
                      primaryTypographyProps={{
                        fontSize: 20,
                        fontWeight: "medium",
                      }}
                    >
                      {`${s.name}`}
                    </ListItemText>
                  </ListItem>
                  <Divider />
                </>
              )}

              {s.grpPerformance.map((x) => (
                <div key={x.day}>
                  <ListItem
                    sx={{
                      position: "sticky",
                      top: venue.stages.length > 1 ? 40 : -2,
                      backgroundColor: "background.paper",
                      zIndex: 10,
                    }}
                  >
                    <ListItemText
                      primaryTypographyProps={{
                        fontSize: 16,
                        fontWeight: "medium",
                      }}
                    >
                      {x.day}
                    </ListItemText>
                  </ListItem>
                  <Divider />
                  {x.performances.map((y) => (
                    <ListItem dense key={y.name}>
                      <ArtistListItemText
                        hideVenue
                        lineup={{
                          details: y.details,
                          name: y.name,
                          startTime: y.startTime,
                          endTime: y.endTime,
                          venue: venue.name,
                        }}
                      />
                    </ListItem>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </List>
      )}
    </ResponsiveDrawer>
  );
};
