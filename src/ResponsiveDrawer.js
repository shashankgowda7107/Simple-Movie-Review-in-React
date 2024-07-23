import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TheatersIcon from '@mui/icons-material/Theaters';
import LanguageIcon from '@mui/icons-material/Language';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { useNavigate } from 'react-router-dom';
import RoutingComponents from './RoutingComponents';
import InfoIcon from '@mui/icons-material/Info';

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleListItemClick = (text) => {
    const route = getRouteForText(text);
    // navigate(route);
    if (route === "/movielanguage") {
      navigate("movielanguage");
    }
    if (route === "/movies") {
      navigate("movies");
    }
    if (route === "/moviereviews") {
      navigate("moviereviews");
    }
    if (route === "/aboutus") {
      navigate("aboutus");
    }
  }

  function getRouteForText(text) {
    switch (text) {
      case "movielanguagesDT":
        return "/movielanguage";
      case "moviesDT":
        return "/movies";
      case "moviereviewDT":
        return "/moviereviews";
        case "aboutusDT":
        return "/aboutus";
      default:
        return "/";
    }
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItemButton
          sx={{
            pl: 3.5,
            height: "30px",
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#1976D2',
              color: 'white',
            },
          }}
          onClick={() => handleListItemClick("movielanguagesDT")}
        >
          <TheatersIcon sx={{ fontSize: 20 }} />
          <ListItemText
            primary="Movie Languages"
            sx={{ ml: 1, fontSize: 10 }}
          />
        </ListItemButton>
        <ListItemButton
          sx={{
            pl: 3.5,
            height: "30px",
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#1976D2',
              color: 'white',
            },
          }}
          onClick={() => handleListItemClick("moviesDT")}
        >
          <LanguageIcon sx={{ fontSize: 20 }} />
          <ListItemText
            primary="Movies"
            sx={{ ml: 1, fontSize: 10 }}
          />
        </ListItemButton>
        <ListItemButton
          sx={{
            pl: 3.5,
            height: "30px",
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#1976D2',
              color: 'white',
            },
          }}
          onClick={() => handleListItemClick("moviereviewDT")}
        >
          <RateReviewIcon sx={{ fontSize: 20 }} />
          <ListItemText
            primary="Movie Reviews"
            sx={{ ml: 1, fontSize: 10 }}
          />
        </ListItemButton>
        <ListItemButton
          sx={{
            pl: 3.5,
            height: "30px",
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#1976D2',
              color: 'white',
            },
          }}
          onClick={() => handleListItemClick("aboutusDT")}
        >
          <InfoIcon sx={{ fontSize: 20 }} />
          <ListItemText
            primary="About Us"
            sx={{ ml: 1, fontSize: 10 }}
          />
        </ListItemButton>
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Movie Reviews
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)`, marginTop:'10px' } }}
      >
        <RoutingComponents/>
        <Toolbar />
      </Box>
    </Box>
  );
}
