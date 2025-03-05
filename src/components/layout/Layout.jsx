import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  InputBase,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  AccountCircle,
  ShoppingCart,
  Notifications,
  Mail,
  Home,
  Info,
  ContactMail,
  CompareArrows,
  Logout,
  Settings,
  Dashboard,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";

const pages = [
  { title: "Home", path: "/" },
  { title: "Products", path: "/products" },
  { title: "Exchange", path: "/exchange" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

const settings = [
  { title: "Profile", path: "/profile", icon: <AccountCircle /> },
  { title: "Messages", path: "/messages", icon: <Mail /> },
  { title: "Dashboard", path: "/admin", icon: <Dashboard /> },
  { title: "Settings", path: "/settings", icon: <Settings /> },
  { title: "Logout", path: "/logout", icon: <Logout /> },
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleCloseNavMenu();
    handleCloseUserMenu();
    setMobileDrawerOpen(false);
  };

  const toggleMobileDrawer = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo for larger screens */}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ReTech
            </Typography>

            {/* Mobile menu icon */}
            <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleMobileDrawer}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Logo for mobile screens */}
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ReTech
            </Typography>

            {/* Desktop navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.title}
                  onClick={() => handleMenuItemClick(page.path)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.title}
                </Button>
              ))}
            </Box>

            {/* Search bar */}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>

            {/* Notification icons */}
            <Box sx={{ display: "flex" }}>
              <IconButton size="large" color="inherit">
                <Badge badgeContent={4} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                color="inherit"
                component={Link}
                to="/messages"
              >
                <Badge badgeContent={3} color="error">
                  <Mail />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                color="inherit"
                component={Link}
                to="/cart"
              >
                <Badge badgeContent={2} color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Box>

            {/* User menu */}
            <Box sx={{ flexGrow: 0, ml: 2 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.title}
                    onClick={() => handleMenuItemClick(setting.path)}
                  >
                    <ListItemIcon>{setting.icon}</ListItemIcon>
                    <Typography textAlign="center">{setting.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={toggleMobileDrawer}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {pages.map((page) => (
              <ListItem
                button
                key={page.title}
                onClick={() => handleMenuItemClick(page.path)}
              >
                <ListItemIcon>
                  {page.title === "Home" ? (
                    <Home />
                  ) : page.title === "Products" ? (
                    <ShoppingCart />
                  ) : page.title === "Exchange" ? (
                    <CompareArrows />
                  ) : page.title === "About" ? (
                    <Info />
                  ) : (
                    <ContactMail />
                  )}
                </ListItemIcon>
                <ListItemText primary={page.title} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {settings.map((setting) => (
              <ListItem
                button
                key={setting.title}
                onClick={() => handleMenuItemClick(setting.path)}
              >
                <ListItemIcon>{setting.icon}</ListItemIcon>
                <ListItemText primary={setting.title} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body1" align="center">
            © {new Date().getFullYear()} ReTech. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            A platform for buying, selling, and exchanging tech products
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
