import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Badge,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  InputBase,
  useMediaQuery,
  useTheme,
  Container,
  Tooltip,
  alpha,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCart,
  Notifications,
  Mail,
  Person,
  Home,
  Info,
  ContactSupport,
  Logout,
  Settings,
  Dashboard,
  CompareArrows,
  Category,
  Close,
} from "@mui/icons-material";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/pictures/logo/original.png"; 

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);

  const isLoggedIn = true; // Replace with actual auth state
  const isAdmin = true; // Replace with actual admin check

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close drawer when route changes
    setDrawerOpen(false);
  }, [location.pathname]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (searchOpen) {
      setSearchQuery("");
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    // Handle logout logic here
    handleProfileMenuClose();
  };

  const menuItems = [
    { text: "Home", path: "/", icon: <Home /> },
    { text: "Products", path: "/products", icon: <Category /> },
    { text: "Exchange", path: "/exchange", icon: <CompareArrows /> },
    { text: "About", path: "/about", icon: <Info /> },
    { text: "Contact", path: "/contact", icon: <ContactSupport /> },
  ];

  const profileMenuId = "primary-search-account-menu";
  const renderProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      id={profileMenuId}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleProfileMenuClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem
        component={RouterLink}
        to="/profile"
        onClick={handleProfileMenuClose}
      >
        <ListItemIcon>
          <Person fontSize="small" />
        </ListItemIcon>
        <ListItemText>Profile</ListItemText>
      </MenuItem>
      <MenuItem
        component={RouterLink}
        to="/settings"
        onClick={handleProfileMenuClose}
      >
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        <ListItemText>Settings</ListItemText>
      </MenuItem>
      {isAdmin && (
        <MenuItem
          component={RouterLink}
          to="/admin"
          onClick={handleProfileMenuClose}
        >
          <ListItemIcon>
            <Dashboard fontSize="small" />
          </ListItemIcon>
          <ListItemText>Admin Dashboard</ListItemText>
        </MenuItem>
      )}
      <Divider />
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </Menu>
  );

  const notificationsMenuId = "primary-search-notifications-menu";
  const renderNotificationsMenu = (
    <Menu
      anchorEl={notificationsAnchorEl}
      id={notificationsMenuId}
      keepMounted
      open={Boolean(notificationsAnchorEl)}
      onClose={handleNotificationsClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      PaperProps={{
        sx: { width: 320, maxHeight: 400 },
      }}
    >
      <MenuItem>
        <Typography variant="subtitle1" fontWeight="bold">
          Notifications
        </Typography>
      </MenuItem>
      <Divider />
      {[1, 2, 3].map((notification) => (
        <MenuItem key={notification} onClick={handleNotificationsClose}>
          <ListItemIcon>
            <Avatar sx={{ width: 32, height: 32 }}>{notification}</Avatar>
          </ListItemIcon>
          <ListItemText
            primary={`Notification ${notification}`}
            secondary={`This is notification ${notification} description`}
            primaryTypographyProps={{ variant: "body2" }}
            secondaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
      ))}
      <Divider />
      <MenuItem
        onClick={handleNotificationsClose}
        sx={{ justifyContent: "center" }}
      >
        <Typography variant="body2" color="primary">
          View All Notifications
        </Typography>
      </MenuItem>
    </Menu>
  );

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo || "https://via.placeholder.com/40?text=RT"}
            alt="ReTech Logo"
            style={{ height: 40, marginRight: 10 }}
          />
          <Typography variant="h6" component="div">
            ReTech
          </Typography>
        </Box>
        <IconButton onClick={toggleDrawer(false)}>
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={RouterLink}
            to={item.path}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      {isLoggedIn ? (
        <List>
          <ListItem button component={RouterLink} to="/profile">
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button component={RouterLink} to="/cart">
            <ListItemIcon>
              <Badge badgeContent={3} color="error">
                <ShoppingCart />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Cart" />
          </ListItem>
          <ListItem button component={RouterLink} to="/messages">
            <ListItemIcon>
              <Badge badgeContent={5} color="error">
                <Mail />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItem>
          {isAdmin && (
            <ListItem button component={RouterLink} to="/admin">
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Admin Dashboard" />
            </ListItem>
          )}
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem button component={RouterLink} to="/login">
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button component={RouterLink} to="/register">
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Register" />
          </ListItem>
        </List>
      )}
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        color="primary"
        sx={{
          boxShadow: scrolled ? 3 : 0,
          transition: "box-shadow 0.3s ease",
          bgcolor: scrolled ? "primary.main" : "primary.main",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo and Brand */}
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <img
                src={logo || "https://via.placeholder.com/40?text=RT"}
                alt="ReTech Logo"
                style={{ height: 40, marginRight: 10 }}
              />
              <Typography
                variant="h6"
                noWrap
                component={RouterLink}
                to="/"
                sx={{
                  display: { xs: "none", sm: "block" },
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "bold",
                }}
              >
                ReTech
              </Typography>
            </Box>

            {/* Mobile Menu Icon */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer(true)}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Search Bar - Desktop */}
            {!isMobile && (
              <Box
                component="form"
                onSubmit={handleSearchSubmit}
                sx={{
                  position: "relative",
                  borderRadius: 1,
                  backgroundColor: alpha(theme.palette.common.white, 0.15),
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.common.white, 0.25),
                  },
                  mr: 2,
                  ml: 0,
                  width: "auto",
                  flexGrow: 1,
                  maxWidth: 500,
                }}
              >
                <Box
                  sx={{
                    padding: theme.spacing(0, 2),
                    height: "100%",
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <SearchIcon />
                </Box>
                <InputBase
                  placeholder="Search products…"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  sx={{
                    color: "inherit",
                    padding: theme.spacing(1, 1, 1, 0),
                    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                    transition: theme.transitions.create("width"),
                    width: "100%",
                  }}
                />
              </Box>
            )}

            {/* Navigation Links - Desktop */}
            {!isMobile && (
              <Box sx={{ display: "flex", flexGrow: 0 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    component={RouterLink}
                    to={item.path}
                    color="inherit"
                    sx={{
                      mx: 0.5,
                      borderBottom:
                        location.pathname === item.path
                          ? "2px solid white"
                          : "none",
                      borderRadius: 0,
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}

            {/* Search Icon - Mobile */}
            {isMobile && (
              <IconButton color="inherit" onClick={toggleSearch}>
                <SearchIcon />
              </IconButton>
            )}

            <Box sx={{ flexGrow: 1 }} />

            {/* Action Icons */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {isLoggedIn ? (
                <>
                  {!isSmall && (
                    <>
                      <Tooltip title="Cart">
                        <IconButton
                          color="inherit"
                          component={RouterLink}
                          to="/cart"
                        >
                          <Badge badgeContent={3} color="error">
                            <ShoppingCart />
                          </Badge>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Messages">
                        <IconButton
                          color="inherit"
                          component={RouterLink}
                          to="/messages"
                        >
                          <Badge badgeContent={5} color="error">
                            <Mail />
                          </Badge>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Notifications">
                        <IconButton
                          color="inherit"
                          aria-label="show notifications"
                          aria-controls={notificationsMenuId}
                          aria-haspopup="true"
                          onClick={handleNotificationsOpen}
                        >
                          <Badge badgeContent={7} color="error">
                            <Notifications />
                          </Badge>
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                  <Tooltip title="Account">
                    <IconButton
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={profileMenuId}
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                      color="inherit"
                    >
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: "secondary.main",
                        }}
                      >
                        U
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <>
                  <Button
                    color="inherit"
                    component={RouterLink}
                    to="/login"
                    sx={{ ml: 1 }}
                  >
                    Login
                  </Button>
                  {!isSmall && (
                    <Button
                      variant="outlined"
                      color="inherit"
                      component={RouterLink}
                      to="/register"
                      sx={{
                        ml: 1,
                        borderColor: "white",
                        "&:hover": {
                          borderColor: "white",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        },
                      }}
                    >
                      Register
                    </Button>
                  )}
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Search Bar */}
      {isMobile && searchOpen && (
        <Box
          component="form"
          onSubmit={handleSearchSubmit}
          sx={{
            position: "fixed",
            top: 56,
            left: 0,
            right: 0,
            zIndex: 1100,
            backgroundColor: "white",
            boxShadow: 3,
            p: 1,
          }}
        >
          <InputBase
            autoFocus
            fullWidth
            placeholder="Search products…"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ color: "text.primary", pl: 2, pr: 1 }}
            endAdornment={
              <IconButton type="submit" sx={{ p: 1 }}>
                <SearchIcon />
              </IconButton>
            }
          />
        </Box>
      )}

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawer}
      </Drawer>

      {renderProfileMenu}
      {renderNotificationsMenu}
    </>
  );
};

export default Header;
