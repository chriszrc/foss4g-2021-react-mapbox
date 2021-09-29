import * as React from "react";
import {
  createTheme,
  styled,
  ThemeProvider,
  // useTheme,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Fab from "@mui/material/Fab";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  // padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

export type LayerDrawerProps = {
  layers: { id: string; getFillColor?: (d: any) => number }[];
  activeLayerIds: string[];
  onActiveLayerChange: (activeLayerIds: string[]) => void;
};

const LayerDrawer: React.FC<LayerDrawerProps> = (props) => {
  // const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  //Handle form state
  const [state, setState] = React.useState(
    props.layers.reduce((acc, cur) => {
      acc[cur.id] = props.activeLayerIds.includes(cur.id);
      return acc;
    }, {})
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
    props.onActiveLayerChange(
      Object.entries({
        ...state,
        [event.target.name]: event.target.checked,
      })
        .filter(([, val]) => val)
        .map(([key]) => {
          return key;
        })
    );
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <Typography variant="h6" noWrap component="div">
              Layers
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {props.layers.map((l) => (
              <div key={l.id}>
                <ListItem button>
                  <FormControlLabel
                    value="end"
                    control={
                      <Checkbox
                        checked={state[l.id]}
                        onChange={handleChange}
                        name={l.id}
                      />
                    }
                    label={<ListItemText primary={l.id} />}
                    labelPlacement="end"
                  />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Drawer>
        <Main open={open}>
          {/* <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2 }}
        ></IconButton> */}
          <Fab
            color="primary"
            aria-label="add"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            size="medium"
            style={{ float: "left", zIndex: 1000, top: "10px", left: "10px" }}
            // sx={{ mr: 2 }}
          >
            <MenuIcon />
          </Fab>
          {props.children}
        </Main>
      </Box>
    </ThemeProvider>
  );
};

export default LayerDrawer;
