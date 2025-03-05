import React, { useState } from "react";
import {
  Outlet,
  Link as RouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  useMediaQuery,
  useTheme,
  Badge,
  Breadcrumbs,
  Link,
  Paper,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  CompareArrows as ExchangesIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Home as HomeIcon,
} from "@mui/icons-material";

const drawerWidth = 240;

const AdminLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(!isMobile);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

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

  const handleLogout = () => {
    // Handle logout logic
    handleProfileMenuClose();
    navigate("/login");
  };

  const menuItems = [
    { text: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
    { text: "Users", path: "/admin/users", icon: <PeopleIcon /> },
    { text: "Products", path: "/admin/products", icon: <InventoryIcon /> },
    { text: "Exchanges", path: "/admin/exchanges", icon: <ExchangesIcon /> },
    { text: "Settings", path: "/admin/settings", icon: <SettingsIcon /> },
  ];

  // Generate breadcrumbs based on current path
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} to="/" color="inherit">
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          // Format the breadcrumb text
          const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

          return isLast ? (
            <Typography key={name} color="text.primary">
              {formattedName}
            </Typography>
          ) : (
            <Link
              key={name}
              component={RouterLink}
              to={routeTo}
              color="inherit"
            >
              {formattedName}
            </Link>
          );
        })}
      </Breadcrumbs>
    );
  };

  const drawer = (
    <>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: [1],
        }}
      >
        <Typography variant="h6" noWrap component="div">
          ReTech Admin
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2, mt: "auto" }}>
        <Typography variant="body2" color="text.secondary" align="center">
          Admin Panel v1.0
        </Typography>
      </Box>
    </>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip title="Notifications">
              <IconButton
                color="inherit"
                aria-label="show notifications"
                onClick={handleNotificationsOpen}
              >
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Account">
              <IconButton
                color="inherit"
                aria-label="account"
                onClick={handleProfileMenuOpen}
                sx={{ ml: 1 }}
              >
                <Avatar
                  sx={{ width: 32, height: 32, bgcolor: "secondary.main" }}
                >
                  A
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onClose={isMobile ? handleDrawerToggle : undefined}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        <Paper sx={{ p: 2, mb: 3 }}>{generateBreadcrumbs()}</Paper>
        <Outlet />
      </Box>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
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
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="/admin/settings"
          onClick={handleProfileMenuClose}
        >
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationsAnchorEl}
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
        <MenuItem onClick={handleNotificationsClose}>
          <ListItemText
            primary="New user registration"
            secondary="John Doe just signed up"
            primaryTypographyProps={{ variant: "body2" }}
            secondaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        <MenuItem onClick={handleNotificationsClose}>
          <ListItemText
            primary="New exchange proposal"
            secondary="Exchange #123 needs approval"
            primaryTypographyProps={{ variant: "body2" }}
            secondaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        <MenuItem onClick={handleNotificationsClose}>
          <ListItemText
            primary="System alert"
            secondary="Disk space is running low"
            primaryTypographyProps={{ variant: "body2" }}
            secondaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        <MenuItem onClick={handleNotificationsClose}>
          <ListItemText
            primary="New product added"
            secondary="iPhone 13 Pro was added by User #42"
            primaryTypographyProps={{ variant: "body2" }}
            secondaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
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
    </Box>
  );
};

export default AdminLayout;
