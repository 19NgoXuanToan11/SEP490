import React, { useState, useEffect } from "react";
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
  Chip,
  Stack,
  Button,
  alpha,
  styled,
  Switch,
  Fade,
  Zoom,
  Collapse,
  LinearProgress,
  Skeleton,
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
  Devices as DevicesIcon,
  PhoneAndroid as PhoneIcon,
  Computer as ComputerIcon,
  Headphones as HeadphonesIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Analytics as AnalyticsIcon,
  LocalOffer as LocalOfferIcon,
  Storefront as StorefrontIcon,
  Speed as SpeedIcon,
  Bolt as BoltIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Favorite as FavoriteIcon,
  VerifiedUser as VerifiedUserIcon,
  Autorenew as AutorenewIcon,
  Savings as SavingsIcon,
  Sell as SellIcon,
  BarChart as BarChartIcon,
  Palette as PaletteIcon,
  AddCircleOutline,
  Inventory,
} from "@mui/icons-material";
import { motion } from "framer-motion";

// Styled components với hiệu ứng nâng cao
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backdropFilter: "blur(12px)",
  backgroundColor: alpha(theme.palette.background.default, 0.7),
  color: theme.palette.text.primary,
  boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)",
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha(theme.palette.background.paper, 0.9)
        : "#ffffff",
    backgroundImage:
      theme.palette.mode === "dark"
        ? `linear-gradient(to bottom, ${alpha("#1a1a2e", 0.8)}, ${alpha(
            "#16213e",
            0.8
          )})`
        : `linear-gradient(to bottom, ${alpha("#ffffff", 0.97)}, ${alpha(
            "#f8f9fa",
            0.97
          )})`,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 0 20px rgba(0,0,0,0.5)"
        : "0 0 20px rgba(0,0,0,0.05)",
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const GlassCard = styled(Paper)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.7),
  backdropFilter: "blur(10px)",
  borderRadius: 16,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.1)}`,
  transition: "all 0.3s ease",
  overflow: "hidden",
  "&:hover": {
    boxShadow: `0 8px 25px ${alpha(theme.palette.common.black, 0.15)}`,
    transform: "translateY(-5px)",
  },
}));

const AnimatedIconButton = styled(IconButton)(({ theme }) => ({
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "scale(1.1)",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
}));

const GradientButton = styled(Button)(({ theme, colorStart, colorEnd }) => ({
  background: `linear-gradient(45deg, ${
    colorStart || theme.palette.primary.main
  } 30%, ${colorEnd || theme.palette.primary.light} 90%)`,
  borderRadius: 12,
  border: 0,
  color: theme.palette.common.white,
  padding: "10px 15px",
  boxShadow: `0 3px 10px ${alpha(
    colorStart || theme.palette.primary.main,
    0.5
  )}`,
  transition: "all 0.3s ease",
  textTransform: "none",
  fontWeight: 600,
  "&:hover": {
    boxShadow: `0 6px 15px ${alpha(
      colorStart || theme.palette.primary.main,
      0.7
    )}`,
    transform: "translateY(-2px)",
  },
  "&:active": {
    boxShadow: `0 2px 5px ${alpha(
      colorStart || theme.palette.primary.main,
      0.5
    )}`,
    transform: "translateY(1px)",
  },
}));

const NeumorphicBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#2d2d3a" : "#f0f0f5",
  borderRadius: 16,
  padding: theme.spacing(2),
  boxShadow:
    theme.palette.mode === "dark"
      ? "inset 5px 5px 10px #222230, inset -5px -5px 10px #383844"
      : "inset 5px 5px 10px #d9d9d9, inset -5px -5px 10px #ffffff",
}));

const GlowingAvatar = styled(Avatar)(({ theme, glowColor }) => ({
  boxShadow: `0 0 15px ${alpha(glowColor || theme.palette.primary.main, 0.5)}`,
  border: `2px solid ${alpha(glowColor || theme.palette.primary.main, 0.6)}`,
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: `0 0 20px ${alpha(
      glowColor || theme.palette.primary.main,
      0.7
    )}`,
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: 12,
  transition: "all 0.2s ease",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
    transform: "translateX(-100%)",
    transition: "transform 0.6s ease",
  },
  "&:hover::before": {
    transform: "translateX(100%)",
  },
  "&.Mui-selected": {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.18),
    },
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      top: "20%",
      height: "60%",
      width: 4,
      backgroundColor: theme.palette.primary.main,
      borderRadius: "0 4px 4px 0",
    },
  },
}));

// Hiệu ứng chuyển động cho các thành phần
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Các theme màu sắc hiện đại
const colorThemes = [
  {
    name: "Ocean Blue",
    primary: "#1a73e8",
    secondary: "#7c4dff",
    success: "#00c853",
    error: "#f44336",
    background: "#f8faff",
    dark: {
      background: "#0d1117",
      paper: "#161b22",
    },
  },
  {
    name: "Emerald Green",
    primary: "#00897b",
    secondary: "#4db6ac",
    success: "#4caf50",
    error: "#ff5252",
    background: "#f1f8e9",
    dark: {
      background: "#0f1e17",
      paper: "#1a2e25",
    },
  },
  {
    name: "Royal Purple",
    primary: "#6200ea",
    secondary: "#b388ff",
    success: "#00e676",
    error: "#ff1744",
    background: "#f3e5f5",
    dark: {
      background: "#12005e",
      paper: "#1a0088",
    },
  },
  {
    name: "Sunset Orange",
    primary: "#ff6d00",
    secondary: "#ffab40",
    success: "#00c853",
    error: "#d50000",
    background: "#fff8e1",
    dark: {
      background: "#1f1200",
      paper: "#2d1a00",
    },
  },
];

const drawerWidth = 280;

const AdminLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(!isMobile);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [mode, setMode] = useState("light");
  const [loading, setLoading] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [themeMenuAnchorEl, setThemeMenuAnchorEl] = useState(null);
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  // Hiệu ứng loading khi chuyển trang
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

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
    // Hiệu ứng loading khi đăng xuất
    setLoading(true);
    setTimeout(() => {
      handleProfileMenuClose();
      navigate("/login");
    }, 800);
  };

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const handleExpandMenu = (menuId) => {
    setExpandedMenu(expandedMenu === menuId ? null : menuId);
  };

  const handleThemeMenuOpen = (event) => {
    setThemeMenuAnchorEl(event.currentTarget);
  };

  const handleThemeMenuClose = () => {
    setThemeMenuAnchorEl(null);
  };

  const handleThemeChange = (index) => {
    setSelectedTheme(index);
    handleThemeMenuClose();
  };

  const toggleThemeSelector = () => {
    setShowThemeSelector((prev) => !prev);
  };

  const menuItems = [
    {
      id: "dashboard",
      text: "Dashboard",
      path: "/admin",
      icon: <DashboardIcon />,
      description: "Tổng quan hệ thống",
      badge: 3,
      badgeColor: "info",
    },
    {
      id: "products",
      text: "Sản phẩm",
      path: "/admin/products",
      icon: <DevicesIcon />,
      description: "Quản lý thiết bị điện tử",
      subItems: [
        {
          text: "Tất cả sản phẩm",
          path: "/admin/products/all",
          icon: <Inventory />,
          badge: 120,
        },
        {
          text: "Thêm sản phẩm mới",
          path: "/admin/products/new",
          icon: <AddCircleOutline />,
        },
        {
          text: "Sản phẩm nổi bật",
          path: "/admin/products/featured",
          icon: <StarIcon />,
          badge: 8,
          badgeColor: "warning",
        },
      ],
    },
    {
      id: "stores",
      text: "Cửa hàng",
      path: "/admin/stores",
      icon: <StorefrontIcon />,
      description: "Quản lý cửa hàng",
      badge: 2,
      badgeColor: "success",
    },
    {
      id: "categories",
      text: "Danh mục",
      path: "/admin/categories",
      icon: <InventoryIcon />,
      description: "Phân loại sản phẩm",
      subItems: [
        {
          text: "Điện thoại",
          path: "/admin/categories/phones",
          icon: <PhoneIcon />,
          badge: 24,
        },
        {
          text: "Máy tính",
          path: "/admin/categories/computers",
          icon: <ComputerIcon />,
          badge: 18,
        },
        {
          text: "Phụ kiện",
          path: "/admin/categories/accessories",
          icon: <HeadphonesIcon />,
          badge: 32,
        },
      ],
    },
    {
      id: "exchanges",
      text: "Trao đổi",
      path: "/admin/exchanges",
      icon: <ExchangesIcon />,
      description: "Quản lý giao dịch trao đổi",
      badge: 5,
      badgeColor: "error",
    },
    {
      id: "users",
      text: "Người dùng",
      path: "/admin/users",
      icon: <PeopleIcon />,
      description: "Quản lý tài khoản",
      badge: 12,
    },
    {
      id: "analytics",
      text: "Phân tích",
      path: "/admin/analytics",
      icon: <AnalyticsIcon />,
      description: "Thống kê và báo cáo",
      subItems: [
        {
          text: "Doanh thu",
          path: "/admin/analytics/revenue",
          icon: <BarChartIcon />,
        },
        {
          text: "Người dùng",
          path: "/admin/analytics/users",
          icon: <PeopleIcon />,
        },
        {
          text: "Sản phẩm",
          path: "/admin/analytics/products",
          icon: <DevicesIcon />,
        },
      ],
    },
    {
      id: "promotions",
      text: "Khuyến mãi",
      path: "/admin/promotions",
      icon: <LocalOfferIcon />,
      description: "Quản lý ưu đãi",
      badge: 3,
      badgeColor: "secondary",
    },
    {
      id: "trends",
      text: "Xu hướng",
      path: "/admin/trends",
      icon: <TrendingUpIcon />,
      description: "Phân tích thị trường",
    },
    {
      id: "settings",
      text: "Cài đặt",
      path: "/admin/settings",
      icon: <SettingsIcon />,
      description: "Thiết lập hệ thống",
    },
  ];


  const drawer = (
    <>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: [2],
          py: 1.5,
          background: "transparent",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <GlowingAvatar
            sx={{
              width: 38,
              height: 38,
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
              mr: 1.5,
            }}
            glowColor={theme.palette.primary.main}
          >
            <RefreshIcon sx={{ fontSize: 20 }} />
          </GlowingAvatar>
          <Box>
            <Typography variant="h6" fontWeight="700" noWrap component="div">
              ReTech
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Admin Portal
            </Typography>
          </Box>
        </Box>
        <AnimatedIconButton
          onClick={handleDrawerToggle}
          sx={{
            color: "text.secondary",
            borderRadius: 1.5,
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
            },
          }}
        >
          <ChevronLeftIcon />
        </AnimatedIconButton>
      </Toolbar>
      <Divider sx={{ opacity: 0.5 }} />

      <Box sx={{ p: 2.5 }}>
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              p: 1.5,
              borderRadius: 3,
              backgroundColor: alpha(theme.palette.primary.main, 0.04),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                transform: "translateY(-2px)",
                boxShadow: `0 5px 15px ${alpha(
                  theme.palette.primary.main,
                  0.1
                )}`,
              },
            }}
          >
            <GlowingAvatar
              src="/admin-avatar.jpg"
              sx={{
                width: 48,
                height: 48,
                mr: 2,
              }}
              glowColor={theme.palette.primary.main}
            >
              A
            </GlowingAvatar>
            <Box>
              <Typography variant="subtitle1" fontWeight="600">
                Admin User
              </Typography>
              <Typography variant="caption" color="text.secondary">
                admin@retech.com
              </Typography>
            </Box>
          </Box>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Chip
              label="Quản trị viên"
              size="small"
              color="primary"
              sx={{
                borderRadius: 1,
                fontWeight: 500,
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                  transform: "translateY(-2px)",
                },
              }}
              icon={<VerifiedUserIcon style={{ fontSize: 14 }} />}
            />
            <Chip
              label="Cấp cao"
              size="small"
              sx={{
                borderRadius: 1,
                fontWeight: 500,
                backgroundColor: alpha(theme.palette.success.main, 0.1),
                color: theme.palette.success.main,
                border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.success.main, 0.2),
                  transform: "translateY(-2px)",
                },
              }}
              icon={<StarIcon style={{ fontSize: 14 }} />}
            />
          </Box>
        </motion.div>
      </Box>

      <Divider sx={{ opacity: 0.5 }} />

      <Box sx={{ px: 2, py: 1.5 }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ px: 1, fontWeight: 600, letterSpacing: 1 }}
        >
          MENU CHÍNH
        </Typography>
      </Box>

      <List sx={{ px: 1.5 }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {menuItems.map((item) => (
            <motion.div key={item.id} variants={fadeInUp}>
              <React.Fragment>
                <ListItem disablePadding sx={{ mb: 0.5 }}>
                  <StyledListItemButton
                    component={RouterLink}
                    to={item.path}
                    selected={location.pathname === item.path}
                    onClick={() => item.subItems && handleExpandMenu(item.id)}
                    sx={{
                      py: 1.2,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 40,
                        color:
                          location.pathname === item.path
                            ? theme.palette.primary.main
                            : alpha(theme.palette.text.primary, 0.6),
                      }}
                    >
                      {item.badge ? (
                        <Badge
                          badgeContent={item.badge}
                          color={item.badgeColor || "primary"}
                          sx={{
                            "& .MuiBadge-badge": {
                              fontSize: 10,
                              height: 16,
                              minWidth: 16,
                              fontWeight: "bold",
                              boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
                            },
                          }}
                        >
                          {item.icon}
                        </Badge>
                      ) : (
                        item.icon
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          fontWeight={
                            location.pathname === item.path ? 600 : 400
                          }
                        >
                          {item.text}
                        </Typography>
                      }
                      secondary={
                        item.description && (
                          <Typography variant="caption" color="text.secondary">
                            {item.description}
                          </Typography>
                        )
                      }
                    />
                    {item.subItems &&
                      (expandedMenu === item.id ? (
                        <ExpandLessIcon fontSize="small" />
                      ) : (
                        <ExpandMoreIcon fontSize="small" />
                      ))}
                  </StyledListItemButton>
                </ListItem>

                {item.subItems && (
                  <Collapse
                    in={expandedMenu === item.id}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem) => (
                        <ListItem
                          key={subItem.text}
                          disablePadding
                          sx={{ mb: 0.5 }}
                        >
                          <StyledListItemButton
                            component={RouterLink}
                            to={subItem.path}
                            selected={location.pathname === subItem.path}
                            sx={{
                              py: 1,
                              pl: 5,
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 36,
                                color:
                                  location.pathname === subItem.path
                                    ? theme.palette.primary.main
                                    : alpha(theme.palette.text.primary, 0.6),
                              }}
                            >
                              {subItem.badge ? (
                                <Badge
                                  badgeContent={subItem.badge}
                                  color={subItem.badgeColor || "info"}
                                  sx={{
                                    "& .MuiBadge-badge": {
                                      fontSize: 10,
                                      height: 16,
                                      minWidth: 16,
                                      fontWeight: "bold",
                                      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
                                    },
                                  }}
                                >
                                  {subItem.icon}
                                </Badge>
                              ) : (
                                subItem.icon
                              )}
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography
                                  variant="body2"
                                  fontWeight={
                                    location.pathname === subItem.path
                                      ? 600
                                      : 400
                                  }
                                >
                                  {subItem.text}
                                </Typography>
                              }
                            />
                          </StyledListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            </motion.div>
          ))}
        </motion.div>
      </List>

      <Divider sx={{ mt: 2, opacity: 0.5 }} />

      <Box sx={{ p: 2.5, mt: "auto" }}>
        <Collapse in={showThemeSelector}>
          <GlassCard
            elevation={0}
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 3,
            }}
          >
            <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 2 }}>
              Chọn giao diện
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
              {colorThemes.map((colorTheme, index) => (
                <Tooltip key={colorTheme.name} title={colorTheme.name}>
                  <Box
                    onClick={() => handleThemeChange(index)}
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: `linear-gradient(45deg, ${colorTheme.primary} 30%, ${colorTheme.secondary} 90%)`,
                      cursor: "pointer",
                      border:
                        selectedTheme === index
                          ? `2px solid ${theme.palette.primary.main}`
                          : "2px solid transparent",
                      boxShadow:
                        selectedTheme === index
                          ? `0 0 0 2px ${alpha(
                              theme.palette.background.paper,
                              0.8
                            )}`
                          : "none",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  />
                </Tooltip>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body2">Chế độ tối</Typography>
              <Switch
                checked={mode === "dark"}
                onChange={toggleColorMode}
                size="small"
                color="primary"
              />
            </Box>
          </GlassCard>
        </Collapse>

        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <GlassCard
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              background: "linear-gradient(45deg, #3f51b5 30%, #7986cb 90%)",
              color: "#ffffff",
              position: "relative",
              overflow: "hidden",
              mb: 3,
            }}
          >
            <Box
              sx={{ position: "absolute", top: -20, right: -20, opacity: 0.2 }}
            >
              <BoltIcon sx={{ fontSize: 100 }} />
            </Box>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
              Tăng tốc giao dịch
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
              Nâng cấp lên gói Premium để mở khóa tính năng trao đổi nhanh
            </Typography>
            <GradientButton
              size="small"
              startIcon={<SpeedIcon />}
              colorStart="#ffffff"
              colorEnd="#f5f5f5"
              sx={{
                color: "#3f51b5",
                fontWeight: 600,
              }}
            >
              Nâng cấp ngay
            </GradientButton>
          </GlassCard>
        </motion.div>

        <Stack spacing={2}>
          <GradientButton
            startIcon={<RefreshIcon />}
            fullWidth
            colorStart="#2e7d32"
            colorEnd="#4caf50"
          >
            Tạo trao đổi mới
          </GradientButton>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              ReTech Admin v2.0
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <AnimatedIconButton
                size="small"
                onClick={toggleThemeSelector}
                sx={{
                  color: theme.palette.primary.main,
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                }}
              >
                <PaletteIcon fontSize="small" />
              </AnimatedIconButton>
              <AnimatedIconButton
                size="small"
                onClick={toggleColorMode}
                sx={{
                  color: theme.palette.primary.main,
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                }}
              >
                {mode === "dark" ? (
                  <LightModeIcon fontSize="small" />
                ) : (
                  <DarkModeIcon fontSize="small" />
                )}
              </AnimatedIconButton>
            </Box>
          </Box>
        </Stack>
      </Box>
    </>
  );

  return (
    <Box sx={{ display: "flex", bgcolor: alpha("#f5f5f7", 0.5) }}>
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: theme.zIndex.drawer + 2,
          }}
        >
          <LinearProgress
            color="primary"
            sx={{
              height: 3,
              background: "transparent",
              "& .MuiLinearProgress-bar": {
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              },
            }}
          />
        </Box>
      )}

      <StyledAppBar
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
        <Toolbar sx={{ height: 70 }}>
          <AnimatedIconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              borderRadius: 1.5,
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              },
            }}
          >
            <MenuIcon />
          </AnimatedIconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <SpeedIcon color="primary" />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="subtitle1" fontWeight={600}>
                ReTech Exchange
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {location.pathname
                  .split("/")
                  .filter(Boolean)
                  .pop()
                  ?.charAt(0)
                  .toUpperCase() +
                  location.pathname
                    .split("/")
                    .filter(Boolean)
                    .pop()
                    ?.slice(1) || "Dashboard"}
              </Typography>
            </Box>
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <GradientButton
              variant="outlined"
              size="small"
              startIcon={<RefreshIcon />}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                background: "transparent",
                color: theme.palette.primary.main,
                boxShadow: "none",
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  background: alpha(theme.palette.primary.main, 0.04),
                },
              }}
            >
              Tạo trao đổi
            </GradientButton>

            <AnimatedIconButton
              sx={{
                borderRadius: 1.5,
                p: 1,
                backgroundColor: alpha(theme.palette.primary.main, 0.04),
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
              onClick={toggleColorMode}
            >
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </AnimatedIconButton>

            <Tooltip title="Thông báo">
              <AnimatedIconButton
                sx={{
                  borderRadius: 1.5,
                  p: 1,
                  backgroundColor: alpha(theme.palette.error.main, 0.04),
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.error.main, 0.08),
                  },
                }}
                onClick={handleNotificationsOpen}
              >
                <StyledBadge badgeContent={4} color="error">
                  <NotificationsIcon />
                </StyledBadge>
              </AnimatedIconButton>
            </Tooltip>

            <Tooltip title="Tài khoản">
              <AnimatedIconButton
                sx={{
                  ml: 1,
                  borderRadius: 1.5,
                  p: 0.75,
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.04),
                    borderColor: alpha(theme.palette.primary.main, 0.5),
                  },
                }}
                onClick={handleProfileMenuOpen}
              >
                <GlowingAvatar
                  src="/admin-avatar.jpg"
                  sx={{
                    width: 32,
                    height: 32,
                  }}
                  glowColor={theme.palette.primary.main}
                >
                  A
                </GlowingAvatar>
              </AnimatedIconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </StyledAppBar>

      <StyledDrawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onClose={isMobile ? handleDrawerToggle : undefined}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid rgba(0, 0, 0, 0.05)",
          },
        }}
      >
        {drawer}
      </StyledDrawer>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 5,
          sx: {
            borderRadius: 3,
            minWidth: 220,
            mt: 1.5,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            overflow: "hidden",
            "& .MuiMenuItem-root": {
              borderRadius: 1,
              mx: 0.5,
              my: 0.25,
              px: 1.5,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                transform: "translateX(5px)",
              },
            },
          },
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 1.5,
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            background: alpha(theme.palette.primary.main, 0.03),
          }}
        >
          <Typography variant="subtitle1" fontWeight="600">
            Admin User
          </Typography>
          <Typography variant="caption" color="text.secondary">
            admin@retech.com
          </Typography>
        </Box>

        <MenuItem
          component={RouterLink}
          to="/profile"
          onClick={handleProfileMenuClose}
        >
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Hồ sơ cá nhân</ListItemText>
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="/admin/settings"
          onClick={handleProfileMenuClose}
        >
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Cài đặt tài khoản</ListItemText>
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="/admin/analytics"
          onClick={handleProfileMenuClose}
        >
          <ListItemIcon>
            <AnalyticsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Hoạt động của tôi</ListItemText>
        </MenuItem>

        <Box
          sx={{
            px: 2,
            py: 1,
            mt: 1,
            backgroundColor: alpha(theme.palette.primary.main, 0.03),
          }}
        >
          <Typography
            variant="overline"
            color="text.secondary"
            fontWeight={500}
          >
            Trạng thái
          </Typography>
        </Box>

        <MenuItem onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <FavoriteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primary="Sức khỏe hệ thống" secondary="Hoạt động tốt" />
        </MenuItem>

        <MenuItem onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <SavingsIcon fontSize="small" color="success" />
          </ListItemIcon>
          <ListItemText primary="Doanh thu hôm nay" secondary="12.5M VND" />
        </MenuItem>

        <Divider sx={{ my: 1, opacity: 0.6 }} />

        <MenuItem
          onClick={handleLogout}
          sx={{
            color: theme.palette.error.main,
            "&:hover": {
              backgroundColor: alpha(theme.palette.error.main, 0.08),
            },
          }}
        >
          <ListItemIcon sx={{ color: theme.palette.error.main }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Đăng xuất</ListItemText>
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
          elevation: 5,
          sx: {
            width: 340,
            maxHeight: 480,
            borderRadius: 3,
            mt: 1.5,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            overflow: "hidden",
          },
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 1.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            backgroundColor: alpha(theme.palette.background.paper, 0.5),
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            Thông báo
          </Typography>
          <Chip
            label="4 mới"
            size="small"
            color="error"
            sx={{
              height: 24,
              fontWeight: 500,
              "&:hover": {
                backgroundColor: theme.palette.error.dark,
              },
            }}
          />
        </Box>

        <Box sx={{ maxHeight: 350, overflow: "auto" }}>
          <MenuItem
            onClick={handleNotificationsClose}
            sx={{
              py: 1.5,
              borderLeft: "4px solid transparent",
              borderLeftColor: theme.palette.primary.main,
              backgroundColor: alpha(theme.palette.primary.main, 0.04),
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              },
              transition: "all 0.2s ease",
            }}
          >
            <ListItemIcon>
              <Avatar
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                }}
              >
                <PeopleIcon fontSize="small" />
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" fontWeight={600}>
                    Đăng ký người dùng mới
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    5 phút trước
                  </Typography>
                </Box>
              }
              secondary={
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  Nguyễn Văn A vừa đăng ký tài khoản mới
                </Typography>
              }
            />
          </MenuItem>

          <MenuItem
            onClick={handleNotificationsClose}
            sx={{
              py: 1.5,
              borderLeft: "4px solid transparent",
              borderLeftColor: theme.palette.secondary.main,
              backgroundColor: alpha(theme.palette.secondary.main, 0.04),
              "&:hover": {
                backgroundColor: alpha(theme.palette.secondary.main, 0.08),
              },
              transition: "all 0.2s ease",
            }}
          >
            <ListItemIcon>
              <Avatar
                sx={{
                  bgcolor: alpha(theme.palette.secondary.main, 0.1),
                  color: theme.palette.secondary.main,
                }}
              >
                <ExchangesIcon fontSize="small" />
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" fontWeight={600}>
                    Đề xuất trao đổi mới
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    30 phút trước
                  </Typography>
                </Box>
              }
              secondary={
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  Trao đổi #123 cần được phê duyệt gấp
                </Typography>
              }
            />
          </MenuItem>

          <MenuItem
            onClick={handleNotificationsClose}
            sx={{
              py: 1.5,
              borderLeft: "4px solid transparent",
              borderLeftColor: theme.palette.error.main,
              "&:hover": {
                backgroundColor: alpha(theme.palette.error.main, 0.04),
              },
              transition: "all 0.2s ease",
            }}
          >
            <ListItemIcon>
              <Avatar
                sx={{
                  bgcolor: alpha(theme.palette.error.main, 0.1),
                  color: theme.palette.error.main,
                }}
              >
                <SettingsIcon fontSize="small" />
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" fontWeight={600}>
                    Cảnh báo hệ thống
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    2 giờ trước
                  </Typography>
                </Box>
              }
              secondary={
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  Dung lượng ổ đĩa đang thấp, cần dọn dẹp
                </Typography>
              }
            />
          </MenuItem>

          <MenuItem
            onClick={handleNotificationsClose}
            sx={{
              py: 1.5,
              borderLeft: "4px solid transparent",
              borderLeftColor: theme.palette.success.main,
              "&:hover": {
                backgroundColor: alpha(theme.palette.success.main, 0.04),
              },
              transition: "all 0.2s ease",
            }}
          >
            <ListItemIcon>
              <Avatar
                sx={{
                  bgcolor: alpha(theme.palette.success.main, 0.1),
                  color: theme.palette.success.main,
                }}
              >
                <DevicesIcon fontSize="small" />
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" fontWeight={600}>
                    Sản phẩm mới được thêm
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    1 ngày trước
                  </Typography>
                </Box>
              }
              secondary={
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  iPhone 13 Pro đã được thêm bởi Người dùng #42
                </Typography>
              }
            />
          </MenuItem>
        </Box>

        <Box
          sx={{
            p: 1.5,
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: alpha(theme.palette.background.paper, 0.5),
          }}
        >
          <GradientButton
            size="small"
            colorStart={theme.palette.primary.main}
            colorEnd={theme.palette.primary.light}
            onClick={handleNotificationsClose}
          >
            Xem tất cả
          </GradientButton>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
            }}
            onClick={handleNotificationsClose}
          >
            Đánh dấu đã đọc
          </Button>
        </Box>
      </Menu>

      {/* Theme Menu */}
      <Menu
        anchorEl={themeMenuAnchorEl}
        open={Boolean(themeMenuAnchorEl)}
        onClose={handleThemeMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 5,
          sx: {
            borderRadius: 3,
            minWidth: 180,
            mt: 1.5,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ px: 2, py: 1.5, fontWeight: "bold" }}
        >
          Chọn giao diện
        </Typography>
        <Divider />
        {colorThemes.map((colorTheme, index) => (
          <MenuItem
            key={colorTheme.name}
            onClick={() => handleThemeChange(index)}
            selected={selectedTheme === index}
            sx={{
              py: 1.5,
              "&.Mui-selected": {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              },
            }}
          >
            <ListItemIcon>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: `linear-gradient(45deg, ${colorTheme.primary} 30%, ${colorTheme.secondary} 90%)`,
                }}
              />
            </ListItemIcon>
            <ListItemText primary={colorTheme.name} />
            {selectedTheme === index && (
              <StarIcon fontSize="small" color="primary" />
            )}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default AdminLayout;
