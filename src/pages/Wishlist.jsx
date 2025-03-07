import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link, Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { keyframes, alpha } from "@mui/system";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Divider,
  Box,
  Tooltip,
  Chip,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme,
  Skeleton,
  Badge,
  Paper,
  Breadcrumbs,
  Pagination,
  CircularProgress,
  Fab,
  Zoom,
  Fade,
  Avatar,
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Delete as DeleteIcon,
  ShoppingCart as ShoppingCartIcon,
  Share as ShareIcon,
  Compare as CompareIcon,
  Visibility as VisibilityIcon,
  Sort as SortIcon,
  FilterList as FilterListIcon,
  Close as CloseIcon,
  ArrowUpward as ArrowUpwardIcon,
  Search as SearchIcon,
  Folder as FolderIcon,
  LocalOffer as LocalOfferIcon,
  AccessTime as AccessTimeIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  AddShoppingCart as AddShoppingCartIcon,
  RemoveShoppingCart as RemoveShoppingCartIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Pinterest as PinterestIcon,
  WhatsApp as WhatsAppIcon,
  LinkedIn as LinkedInIcon,
  MoreVert as MoreVertIcon,
  Tune as TuneIcon,
  GridView as GridViewIcon,
  ViewList as ViewListIcon,
  ArrowForward as ArrowForwardIcon,
  Refresh as RefreshIcon,
  Clear as ClearIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import Layout from "../components/layout/Layout";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

// Mock data for wishlist items
const initialWishlistItems = [
  {
    id: 1,
    name: "Premium Mechanical Keyboard",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.8,
    reviewCount: 124,
    image: "/path/to/keyboard.jpg",
    category: "Electronics",
    brand: "KeyMaster",
    condition: "New",
    dateAdded: "2023-03-01T12:00:00Z",
    inStock: true,
    discount: 19,
    description:
      "Professional mechanical keyboard with RGB lighting and customizable keys.",
  },
  {
    id: 2,
    name: "Wireless Gaming Mouse",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.6,
    reviewCount: 98,
    image: "/path/to/mouse.jpg",
    category: "Electronics",
    brand: "GameTech",
    condition: "New",
    dateAdded: "2023-03-05T14:30:00Z",
    inStock: true,
    discount: 20,
    description:
      "Ultra-responsive wireless gaming mouse with adjustable DPI and ergonomic design.",
  },
  {
    id: 3,
    name: "27-inch 4K Monitor",
    price: 349.99,
    originalPrice: 399.99,
    rating: 4.9,
    reviewCount: 156,
    image: "/path/to/monitor.jpg",
    category: "Electronics",
    brand: "ViewMax",
    condition: "New",
    dateAdded: "2023-03-10T09:15:00Z",
    inStock: false,
    discount: 13,
    description:
      "Ultra HD 4K monitor with HDR support and adjustable stand for optimal viewing angles.",
  },
  {
    id: 4,
    name: "Noise-Cancelling Headphones",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.7,
    reviewCount: 203,
    image: "/path/to/headphones.jpg",
    category: "Audio",
    brand: "SoundMaster",
    condition: "New",
    dateAdded: "2023-03-15T16:45:00Z",
    inStock: true,
    discount: 20,
    description:
      "Premium wireless headphones with active noise cancellation and 30-hour battery life.",
  },
  {
    id: 5,
    name: "Portable SSD 1TB",
    price: 149.99,
    originalPrice: 179.99,
    rating: 4.5,
    reviewCount: 87,
    image: "/path/to/ssd.jpg",
    category: "Storage",
    brand: "DataPro",
    condition: "New",
    dateAdded: "2023-03-20T11:30:00Z",
    inStock: true,
    discount: 17,
    description:
      "Ultra-fast portable SSD with 1TB capacity and shock-resistant design for data protection.",
  },
];

// Create custom styled components for enhanced buttons and UI elements
const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const PremiumButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: "10px 24px",
  fontWeight: 600,
  letterSpacing: "0.5px",
  textTransform: "none",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "200%",
    height: "100%",
    background: `linear-gradient(90deg, 
      transparent 0%, 
      rgba(255, 255, 255, 0.2) 25%, 
      rgba(255, 255, 255, 0.2) 50%, 
      transparent 100%)`,
    animation: `${shimmer} 2s infinite`,
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
    "&::before": {
      opacity: 1,
    },
  },
  "&:active": {
    transform: "translateY(1px)",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  },
}));

const PrimaryButton = styled(PremiumButton)(({ theme }) => ({
  background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
  color: "white",
  "&:hover": {
    background: "linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)",
    transform: "translateY(-3px)",
    boxShadow: "0 10px 25px rgba(79, 70, 229, 0.3)",
  },
}));

const SecondaryButton = styled(PremiumButton)(({ theme }) => ({
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(135deg, #334155 0%, #1e293b 100%)"
      : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
  color: theme.palette.mode === "dark" ? "white" : "#334155",
  border: `1px solid ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"
  }`,
  "&:hover": {
    background:
      theme.palette.mode === "dark"
        ? "linear-gradient(135deg, #3f4e63 0%, #263449 100%)"
        : "linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)",
  },
}));

const DangerButton = styled(PremiumButton)(({ theme }) => ({
  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
  color: "white",
  "&:hover": {
    background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
    boxShadow: "0 10px 25px rgba(220, 38, 38, 0.3)",
  },
}));

const IconActionButton = styled(IconButton)(({ theme }) => ({
  borderRadius: "12px",
  padding: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  backdropFilter: "blur(8px)",
  background:
    theme.palette.mode === "dark"
      ? "rgba(30, 41, 59, 0.8)"
      : "rgba(255, 255, 255, 0.9)",
  border: `1px solid ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"
  }`,
  transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.12)",
  },
  "&:active": {
    transform: "translateY(1px)",
  },
}));

const PremiumCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  overflow: "hidden",
  transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
  border: `1px solid ${
    theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.05)"
      : "rgba(0,0,0,0.02)"
  }`,
  "&:hover": {
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.12)",
  },
}));

const PremiumTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(30, 41, 59, 0.95)"
        : "rgba(15, 23, 42, 0.95)",
    backdropFilter: "blur(8px)",
    borderRadius: 8,
    padding: "8px 12px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
    border: `1px solid ${
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.1)"
        : "rgba(0,0,0,0.05)"
    }`,
    fontSize: "0.8rem",
    fontWeight: 500,
    maxWidth: 250,
  },
  [`& .MuiTooltip-arrow`]: {
    color:
      theme.palette.mode === "dark"
        ? "rgba(30, 41, 59, 0.95)"
        : "rgba(15, 23, 42, 0.95)",
  },
}));

const GlassPanel = styled(Paper)(({ theme }) => ({
  backdropFilter: "blur(10px)",
  background:
    theme.palette.mode === "dark"
      ? "rgba(30, 41, 59, 0.7)"
      : "rgba(255, 255, 255, 0.8)",
  borderRadius: 16,
  border: `1px solid ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"
  }`,
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
}));

const Wishlist = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // State management
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("dateAdded");
  const [filterOption, setFilterOption] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openShareDialog, setOpenShareDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [compareItems, setCompareItems] = useState([]);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Fetch wishlist items (simulated)
  useEffect(() => {
    const fetchWishlistItems = async () => {
      // Simulate API call
      setTimeout(() => {
        setWishlistItems(initialWishlistItems);
        setLoading(false);
      }, 1000);
    };

    fetchWishlistItems();
  }, []);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter and sort wishlist items
  const filteredItems = wishlistItems
    .filter((item) => {
      if (filterOption === "all") return true;
      if (filterOption === "inStock") return item.inStock;
      if (filterOption === "outOfStock") return !item.inStock;
      return item.category.toLowerCase() === filterOption.toLowerCase();
    })
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "priceAsc":
          return a.price - b.price;
        case "priceDesc":
          return b.price - a.price;
        case "nameAsc":
          return a.name.localeCompare(b.name);
        case "nameDesc":
          return b.name.localeCompare(a.name);
        case "ratingDesc":
          return b.rating - a.rating;
        case "discountDesc":
          return b.discount - a.discount;
        default: // dateAdded
          return new Date(b.dateAdded) - new Date(a.dateAdded);
      }
    });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Remove item from wishlist
  const removeFromWishlist = (itemId) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== itemId));
    setSnackbar({
      open: true,
      message: "Item removed from wishlist",
      severity: "success",
    });
  };

  // Add item to cart
  const addToCart = (item) => {
    // Implement cart functionality here
    setSnackbar({
      open: true,
      message: `${item.name} added to cart`,
      severity: "success",
    });
  };

  // Share item
  const handleShare = (item) => {
    setSelectedItem(item);
    setOpenShareDialog(true);
  };

  // Close share dialog
  const handleCloseShareDialog = () => {
    setOpenShareDialog(false);
  };

  // Toggle compare
  const toggleCompare = (item) => {
    if (compareItems.some((i) => i.id === item.id)) {
      setCompareItems(compareItems.filter((i) => i.id !== item.id));
    } else {
      if (compareItems.length >= 4) {
        setSnackbar({
          open: true,
          message: "You can compare up to 4 items",
          severity: "warning",
        });
        return;
      }
      setCompareItems([...compareItems, item]);
    }
  };

  // Quick view
  const handleQuickView = (item) => {
    setQuickViewItem(item);
  };

  // Close quick view
  const handleCloseQuickView = () => {
    setQuickViewItem(null);
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Clear all items
  const clearWishlist = () => {
    setWishlistItems([]);
    setSnackbar({
      open: true,
      message: "Wishlist cleared",
      severity: "success",
    });
  };

  // Get unique categories for filtering
  const categories = [
    "all",
    "inStock",
    "outOfStock",
    ...new Set(wishlistItems.map((item) => item.category)),
  ];

  // Handle snackbar close
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Add this function inside the Wishlist component before the return statement
  const getProductImage = (category, brand) => {
    // Generate a consistent image based on category and brand
    const categories = {
      Electronics: [
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1588508065123-287b28e013da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1201&q=80",
      ],
      Audio: [
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1165&q=80",
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      ],
      Storage: [
        "https://images.unsplash.com/photo-1618410320928-25c9832dc2e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1592982551635-42cbe5f99d24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1602526429747-ac387a91d43b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      ],
    };

    // Default category if not found
    const defaultImages = [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80",
    ];

    // Generate a consistent index based on brand name
    const brandHash = brand
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const images = categories[category] || defaultImages;
    const index = brandHash % images.length;

    return images[index];
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          pt: { xs: 2, md: 4 },
          pb: { xs: 6, md: 8 },
        }}
      >
        <Container
          maxWidth={isMobile ? "xl" : "lg"}
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* Page header with animation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box mb={4}>
              <Box
                sx={{
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  background: alpha(theme.palette.background.paper, 0.6),
                  backdropFilter: "blur(8px)",
                  borderRadius: 2,
                  p: 1.5,
                  boxShadow: `0 2px 8px ${alpha(
                    theme.palette.primary.main,
                    0.08
                  )}`,
                  border: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
                }}
              >
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: alpha(theme.palette.primary.main, 0.8),
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    transition: "all 0.2s ease",
                  }}
                  className="hover-effect"
                >
                  <HomeIcon sx={{ fontSize: 18, mr: 0.5 }} />
                  Home
                </Link>
                <ArrowForwardIcon
                  sx={{
                    mx: 1,
                    fontSize: 16,
                    color: alpha(theme.palette.text.secondary, 0.6),
                  }}
                />
                <Typography
                  sx={{
                    fontWeight: 600,
                    background:
                      "linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Wishlist
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  position: "relative",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h4"
                  component="h1"
                  fontWeight="800"
                  sx={{
                    background:
                      "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "-0.5px",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -8,
                      left: 0,
                      width: 60,
                      height: 3,
                      borderRadius: 4,
                      background:
                        "linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)",
                    },
                  }}
                >
                  My Wishlist
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Chip
                    icon={
                      <FavoriteIcon
                        sx={{ fontSize: "0.9rem", color: "white" }}
                      />
                    }
                    label={`${wishlistItems.length} items`}
                    color="primary"
                    sx={{
                      borderRadius: "16px",
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                      border: "none",
                      fontWeight: 800,
                      px: 1.5,
                      py: 0.7,
                      backdropFilter: "blur(4px)",
                      transition: "all 0.3s ease",
                      boxShadow: `0 3px 10px ${alpha(
                        theme.palette.primary.main,
                        0.4
                      )}`,
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: `0 5px 15px ${alpha(
                          theme.palette.primary.main,
                          0.5
                        )}`,
                      },
                      "& .MuiChip-icon": {
                        color: "white",
                        animation: "pulse 1.5s infinite ease-in-out",
                      },
                      "& .MuiChip-label": {
                        color: "white",
                        letterSpacing: "0.5px",
                        fontWeight: 700,
                      },
                      "@keyframes pulse": {
                        "0%": { opacity: 0.8 },
                        "50%": { opacity: 1 },
                        "100%": { opacity: 0.8 },
                      },
                    }}
                  />
                  {wishlistItems.length > 0 && (
                    <PremiumButton
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={clearWishlist}
                      size={isMobile ? "small" : "medium"}
                      sx={{
                        borderRadius: "12px",
                        background: alpha(theme.palette.error.main, 0.05),
                        borderColor: alpha(theme.palette.error.main, 0.3),
                        "&:hover": {
                          background: alpha(theme.palette.error.main, 0.1),
                          borderColor: theme.palette.error.main,
                        },
                      }}
                    >
                      Clear All
                    </PremiumButton>
                  )}
                </Box>
              </Box>
            </Box>
          </motion.div>

          {/* Search, sort and filter controls */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 3,
              bgcolor: "background.paper",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 4px 20px rgba(0,0,0,0.2)"
                  : "0 4px 20px rgba(0,0,0,0.05)",
              backdropFilter: "blur(8px)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 6px 25px rgba(0,0,0,0.25)"
                    : "0 6px 25px rgba(0,0,0,0.08)",
              },
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search your wishlist..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                    ),
                    sx: {
                      borderRadius: 3,
                      background: alpha(theme.palette.background.default, 0.7),
                      backdropFilter: "blur(8px)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: alpha(
                          theme.palette.background.default,
                          0.9
                        ),
                        transform: "translateY(-2px)",
                      },
                      "&.Mui-focused": {
                        boxShadow: `0 0 0 2px ${alpha(
                          theme.palette.primary.main,
                          0.3
                        )}`,
                        transform: "translateY(-2px)",
                      },
                    },
                  }}
                  size="small"
                />
              </Grid>

              <Grid item xs={6} md={3.5}>
                <FormControl fullWidth size="small">
                  <InputLabel id="filter-label" sx={{ fontWeight: 500 }}>
                    Filter By
                  </InputLabel>
                  <Select
                    labelId="filter-label"
                    value={filterOption}
                    onChange={(e) => setFilterOption(e.target.value)}
                    label="Filter By"
                    startAdornment={
                      <FilterListIcon sx={{ mr: 1, color: "text.secondary" }} />
                    }
                    sx={{
                      borderRadius: 3,
                      background: alpha(theme.palette.background.default, 0.7),
                      backdropFilter: "blur(8px)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: alpha(
                          theme.palette.background.default,
                          0.9
                        ),
                        transform: "translateY(-2px)",
                      },
                      "&.Mui-focused": {
                        boxShadow: `0 0 0 2px ${alpha(
                          theme.palette.primary.main,
                          0.3
                        )}`,
                        transform: "translateY(-2px)",
                      },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          borderRadius: 2,
                          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                        },
                      },
                    }}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category === "all"
                          ? "All Items"
                          : category === "inStock"
                          ? "In Stock"
                          : category === "outOfStock"
                          ? "Out of Stock"
                          : category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6} md={3.5}>
                <FormControl fullWidth size="small">
                  <InputLabel id="sort-label" sx={{ fontWeight: 500 }}>
                    Sort By
                  </InputLabel>
                  <Select
                    labelId="sort-label"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    label="Sort By"
                    startAdornment={
                      <SortIcon sx={{ mr: 1, color: "text.secondary" }} />
                    }
                    sx={{
                      borderRadius: 3,
                      background: alpha(theme.palette.background.default, 0.7),
                      backdropFilter: "blur(8px)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: alpha(
                          theme.palette.background.default,
                          0.9
                        ),
                        transform: "translateY(-2px)",
                      },
                      "&.Mui-focused": {
                        boxShadow: `0 0 0 2px ${alpha(
                          theme.palette.primary.main,
                          0.3
                        )}`,
                        transform: "translateY(-2px)",
                      },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          borderRadius: 2,
                          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                        },
                      },
                    }}
                  >
                    <MenuItem value="dateAdded">Date Added (Newest)</MenuItem>
                    <MenuItem value="priceAsc">Price (Low to High)</MenuItem>
                    <MenuItem value="priceDesc">Price (High to Low)</MenuItem>
                    <MenuItem value="nameAsc">Name (A to Z)</MenuItem>
                    <MenuItem value="nameDesc">Name (Z to A)</MenuItem>
                    <MenuItem value="ratingDesc">Highest Rated</MenuItem>
                    <MenuItem value="discountDesc">Biggest Discount</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>

          {/* Wishlist items */}
          {loading ? (
            <Grid container spacing={3}>
              {[...Array(4)].map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card sx={{ height: "100%", borderRadius: 2, boxShadow: 2 }}>
                    <Skeleton variant="rectangular" height={200} />
                    <CardContent>
                      <Skeleton variant="text" height={30} width="80%" />
                      <Skeleton variant="text" height={24} width="40%" />
                      <Skeleton variant="text" height={24} width="60%" />
                    </CardContent>
                    <CardActions>
                      <Skeleton
                        variant="rectangular"
                        height={36}
                        width="100%"
                      />
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : wishlistItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  py: 8,
                  px: 2,
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              >
                <FavoriteBorderIcon
                  sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
                />
                <Typography variant="h5" gutterBottom>
                  Your wishlist is empty
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Items you add to your wishlist will appear here.
                </Typography>
                <Button
                  component={RouterLink}
                  to="/products"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, borderRadius: 2 }}
                >
                  Explore Products
                </Button>
              </Box>
            </motion.div>
          ) : (
            <>
              <AnimatePresence>
                <Grid container spacing={3}>
                  {currentItems.map((item) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: 2,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-8px)",
                              boxShadow: 6,
                            },
                          }}
                        >
                          <Box sx={{ position: "relative" }}>
                            <CardMedia
                              component="img"
                              height="200"
                              image={getProductImage(item.category, item.brand)}
                              alt={item.name}
                              sx={{ objectFit: "cover" }}
                            />

                            {/* Overlay actions */}
                            <Box
                              sx={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                p: 1,
                                display: "flex",
                                flexDirection: "column",
                                gap: 0.5,
                              }}
                            >
                              <Tooltip title="Remove from wishlist">
                                <IconButton
                                  onClick={() => removeFromWishlist(item.id)}
                                  sx={{
                                    bgcolor: "rgba(255,255,255,0.9)",
                                    "&:hover": {
                                      bgcolor: "error.main",
                                      color: "white",
                                    },
                                  }}
                                  size="small"
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>

                              <Tooltip title="Quick view">
                                <IconButton
                                  onClick={() => handleQuickView(item)}
                                  sx={{
                                    bgcolor: "rgba(255,255,255,0.9)",
                                    "&:hover": {
                                      bgcolor: "primary.main",
                                      color: "white",
                                    },
                                  }}
                                  size="small"
                                >
                                  <VisibilityIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>

                              <Tooltip
                                title={
                                  compareItems.some((i) => i.id === item.id)
                                    ? "Remove from compare"
                                    : "Add to compare"
                                }
                              >
                                <IconButton
                                  onClick={() => toggleCompare(item)}
                                  sx={{
                                    bgcolor: "rgba(255,255,255,0.9)",
                                    color: compareItems.some(
                                      (i) => i.id === item.id
                                    )
                                      ? "primary.main"
                                      : "inherit",
                                    "&:hover": {
                                      bgcolor: "primary.main",
                                      color: "white",
                                    },
                                  }}
                                  size="small"
                                >
                                  <CompareIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>

                            {/* Status badges */}
                            <Box
                              sx={{ position: "absolute", top: 10, left: 10 }}
                            >
                              {item.discount > 0 && (
                                <Chip
                                  label={`-${item.discount}%`}
                                  color="error"
                                  size="small"
                                  sx={{ mb: 1, fontWeight: "bold" }}
                                />
                              )}

                              {!item.inStock && (
                                <Chip
                                  label="Out of Stock"
                                  color="default"
                                  size="small"
                                  sx={{
                                    bgcolor: "rgba(0,0,0,0.7)",
                                    color: "white",
                                  }}
                                />
                              )}
                            </Box>
                          </Box>

                          <CardContent sx={{ flexGrow: 1, pt: 2 }}>
                            <Typography
                              variant="subtitle1"
                              component="h3"
                              fontWeight="bold"
                              sx={{
                                mb: 1,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                height: "48px",
                              }}
                            >
                              {item.name}
                            </Typography>

                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <Rating
                                value={item.rating}
                                precision={0.1}
                                size="small"
                                readOnly
                              />
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ ml: 1 }}
                              >
                                ({item.reviewCount})
                              </Typography>
                            </Box>

                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <Typography
                                variant="h6"
                                component="span"
                                fontWeight="bold"
                                color="primary.main"
                              >
                                ${item.price.toFixed(2)}
                              </Typography>

                              {item.originalPrice > item.price && (
                                <Typography
                                  variant="body2"
                                  component="span"
                                  color="text.secondary"
                                  sx={{ ml: 1, textDecoration: "line-through" }}
                                >
                                  ${item.originalPrice.toFixed(2)}
                                </Typography>
                              )}
                            </Box>

                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                                flexWrap: "wrap",
                                gap: 1,
                              }}
                            >
                              <Chip
                                icon={<FolderIcon fontSize="small" />}
                                label={item.category}
                                size="small"
                                variant="outlined"
                              />
                              <Chip
                                icon={<LocalOfferIcon fontSize="small" />}
                                label={item.brand}
                                size="small"
                                variant="outlined"
                              />
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <AccessTimeIcon fontSize="small" color="action" />
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ ml: 0.5 }}
                              >
                                Added{" "}
                                {new Date(item.dateAdded).toLocaleDateString()}
                              </Typography>
                            </Box>
                          </CardContent>

                          <Divider />

                          <CardActions sx={{ p: 2 }}>
                            <Button
                              variant="contained"
                              color="primary"
                              fullWidth
                              startIcon={<ShoppingCartIcon />}
                              onClick={() => addToCart(item)}
                              disabled={!item.inStock}
                              sx={{ borderRadius: 2 }}
                            >
                              {item.inStock ? "Add to Cart" : "Out of Stock"}
                            </Button>
                          </CardActions>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </AnimatePresence>

              {/* Pagination */}
              {filteredItems.length > itemsPerPage && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                  <Pagination
                    count={pageCount}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size={isMobile ? "small" : "medium"}
                    showFirstButton
                    showLastButton
                  />
                </Box>
              )}
            </>
          )}

          {/* Compare drawer */}
          {compareItems.length > 0 && (
            <Paper
              elevation={3}
              sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                p: 2,
                bgcolor: "background.paper",
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" component="h3">
                  Compare Products ({compareItems.length})
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/compare"
                  state={{ items: compareItems }}
                >
                  Compare Now
                </Button>
              </Box>

              <Grid container spacing={2}>
                {compareItems.map((item) => (
                  <Grid item xs={6} sm={3} key={item.id}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        component="img"
                        src={getProductImage(item.category, item.brand)}
                        alt={item.name}
                        sx={{
                          width: 50,
                          height: 50,
                          objectFit: "cover",
                          borderRadius: 1,
                          mr: 1,
                        }}
                      />
                      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography variant="body2" noWrap title={item.name}>
                          {item.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="primary.main"
                          fontWeight="bold"
                        >
                          ${item.price.toFixed(2)}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => toggleCompare(item)}
                        color="default"
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}

          {/* Quick view dialog */}
          <Dialog
            open={quickViewItem !== null}
            onClose={handleCloseQuickView}
            maxWidth="md"
            fullWidth
            PaperProps={{
              sx: { borderRadius: 2 },
            }}
          >
            {quickViewItem && (
              <>
                <DialogTitle
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" component="h2">
                    {quickViewItem.name}
                  </Typography>
                  <IconButton onClick={handleCloseQuickView} size="small">
                    <CloseIcon />
                  </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <img
                        src={getProductImage(
                          quickViewItem.category,
                          quickViewItem.brand
                        )}
                        alt={quickViewItem.name}
                        style={{
                          width: "100%",
                          borderRadius: 8,
                          objectFit: "cover",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h5"
                        component="h3"
                        gutterBottom
                        fontWeight="bold"
                      >
                        {quickViewItem.name}
                      </Typography>

                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Rating
                          value={quickViewItem.rating}
                          precision={0.1}
                          readOnly
                        />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ ml: 1 }}
                        >
                          ({quickViewItem.reviewCount} reviews)
                        </Typography>
                      </Box>

                      <Box
                        sx={{ display: "flex", alignItems: "baseline", mb: 2 }}
                      >
                        <Typography
                          variant="h4"
                          component="span"
                          color="primary.main"
                          fontWeight="bold"
                        >
                          ${quickViewItem.price.toFixed(2)}
                        </Typography>

                        {quickViewItem.originalPrice > quickViewItem.price && (
                          <Typography
                            variant="h6"
                            component="span"
                            color="text.secondary"
                            sx={{ ml: 2, textDecoration: "line-through" }}
                          >
                            ${quickViewItem.originalPrice.toFixed(2)}
                          </Typography>
                        )}

                        {quickViewItem.discount > 0 && (
                          <Chip
                            label={`Save ${quickViewItem.discount}%`}
                            color="error"
                            size="small"
                            sx={{ ml: 2 }}
                          />
                        )}
                      </Box>

                      <Typography variant="body1" paragraph>
                        {quickViewItem.description}
                      </Typography>

                      <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Brand:
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {quickViewItem.brand}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Category:
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {quickViewItem.category}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Condition:
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {quickViewItem.condition}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Availability:
                          </Typography>
                          <Typography
                            variant="body1"
                            fontWeight="medium"
                            color={
                              quickViewItem.inStock
                                ? "success.main"
                                : "error.main"
                            }
                          >
                            {quickViewItem.inStock
                              ? "In Stock"
                              : "Out of Stock"}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          startIcon={<ShoppingCartIcon />}
                          onClick={() => addToCart(quickViewItem)}
                          disabled={!quickViewItem.inStock}
                        >
                          Add to Cart
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => {
                            removeFromWishlist(quickViewItem.id);
                            handleCloseQuickView();
                          }}
                          startIcon={<DeleteIcon />}
                        >
                          Remove
                        </Button>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          variant="text"
                          startIcon={<ShareIcon />}
                          onClick={() => {
                            handleShare(quickViewItem);
                            handleCloseQuickView();
                          }}
                        >
                          Share
                        </Button>
                        <Button
                          variant="text"
                          component={RouterLink}
                          to={`/products/${quickViewItem.id}`}
                          onClick={handleCloseQuickView}
                        >
                          View Full Details
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </DialogContent>
              </>
            )}
          </Dialog>

          {/* Share dialog */}
          <Dialog
            open={openShareDialog}
            onClose={handleCloseShareDialog}
            maxWidth="sm"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: 4,
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
                    : "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
              },
            }}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 300 }}
          >
            <DialogTitle sx={{ pb: 1 }}>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                  background:
                    "linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Share this product
              </Typography>
            </DialogTitle>
            <DialogContent>
              {selectedItem && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 3,
                    p: 2,
                    borderRadius: 3,
                    bgcolor: alpha(theme.palette.background.paper, 0.5),
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.02)"
                    }`,
                  }}
                >
                  <Box
                    component="img"
                    src={getProductImage(
                      selectedItem.category,
                      selectedItem.brand
                    )}
                    alt={selectedItem.name}
                    sx={{
                      width: 80,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: 3,
                      mr: 2,
                      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                      border: `1px solid ${
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(255,255,255,0.8)"
                      }`,
                    }}
                  />
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        color:
                          theme.palette.mode === "dark" ? "white" : "black",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {selectedItem.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      sx={{
                        background:
                          "linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      ${selectedItem.price.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              )}

              <TextField
                fullWidth
                variant="outlined"
                label="Share link"
                value={
                  selectedItem
                    ? `https://yourwebsite.com/products/${selectedItem.id}`
                    : ""
                }
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <PrimaryButton size="small" sx={{ borderRadius: 2 }}>
                      Copy
                    </PrimaryButton>
                  ),
                  sx: {
                    borderRadius: 3,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.08)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.2)"
                          : "rgba(0,0,0,0.12)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.primary.main,
                      borderWidth: 2,
                    },
                  },
                }}
                sx={{ mb: 4 }}
              />

              <Typography
                variant="h6"
                gutterBottom
                fontWeight="medium"
                sx={{
                  color: theme.palette.mode === "dark" ? "white" : "black",
                }}
              >
                Share on social media
              </Typography>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
                <Button
                  variant="contained"
                  startIcon={<FacebookIcon />}
                  sx={{
                    bgcolor: "#3b5998",
                    "&:hover": { bgcolor: "#2d4373" },
                    borderRadius: 12,
                    boxShadow: "0 6px 15px rgba(59, 89, 152, 0.3)",
                    padding: "10px 16px",
                    textTransform: "none",
                    fontWeight: 600,
                    flex: { xs: "1 0 45%", sm: "0 0 auto" },
                    transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                    "&:hover": {
                      bgcolor: "#2d4373",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 20px rgba(59, 89, 152, 0.4)",
                    },
                    "&:active": {
                      transform: "translateY(1px)",
                    },
                  }}
                >
                  Facebook
                </Button>
                <Button
                  variant="contained"
                  startIcon={<TwitterIcon />}
                  sx={{
                    bgcolor: "#1da1f2",
                    "&:hover": { bgcolor: "#0c85d0" },
                    borderRadius: 12,
                    boxShadow: "0 6px 15px rgba(29, 161, 242, 0.3)",
                    padding: "10px 16px",
                    textTransform: "none",
                    fontWeight: 600,
                    flex: { xs: "1 0 45%", sm: "0 0 auto" },
                    transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                    "&:hover": {
                      bgcolor: "#0c85d0",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 20px rgba(29, 161, 242, 0.4)",
                    },
                    "&:active": {
                      transform: "translateY(1px)",
                    },
                  }}
                >
                  Twitter
                </Button>
                <Button
                  variant="contained"
                  startIcon={<WhatsAppIcon />}
                  sx={{
                    bgcolor: "#25D366",
                    "&:hover": { bgcolor: "#128C7E" },
                    borderRadius: 12,
                    boxShadow: "0 6px 15px rgba(37, 211, 102, 0.3)",
                    padding: "10px 16px",
                    textTransform: "none",
                    fontWeight: 600,
                    flex: { xs: "1 0 45%", sm: "0 0 auto" },
                    transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                    "&:hover": {
                      bgcolor: "#128C7E",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 20px rgba(37, 211, 102, 0.4)",
                    },
                    "&:active": {
                      transform: "translateY(1px)",
                    },
                  }}
                >
                  WhatsApp
                </Button>
                <Button
                  variant="contained"
                  startIcon={<LinkedInIcon />}
                  sx={{
                    bgcolor: "#0077b5",
                    "&:hover": { bgcolor: "#00669c" },
                    borderRadius: 12,
                    boxShadow: "0 6px 15px rgba(0, 119, 181, 0.3)",
                    padding: "10px 16px",
                    textTransform: "none",
                    fontWeight: 600,
                    flex: { xs: "1 0 45%", sm: "0 0 auto" },
                    transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                    "&:hover": {
                      bgcolor: "#00669c",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 20px rgba(0, 119, 181, 0.4)",
                    },
                    "&:active": {
                      transform: "translateY(1px)",
                    },
                  }}
                >
                  LinkedIn
                </Button>
                <Button
                  variant="contained"
                  startIcon={<PinterestIcon />}
                  sx={{
                    bgcolor: "#E60023",
                    "&:hover": { bgcolor: "#c5001f" },
                    borderRadius: 12,
                    boxShadow: "0 6px 15px rgba(230, 0, 35, 0.3)",
                    padding: "10px 16px",
                    textTransform: "none",
                    fontWeight: 600,
                    flex: { xs: "1 0 45%", sm: "0 0 auto" },
                    transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                    "&:hover": {
                      bgcolor: "#c5001f",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 20px rgba(230, 0, 35, 0.4)",
                    },
                    "&:active": {
                      transform: "translateY(1px)",
                    },
                  }}
                >
                  Pinterest
                </Button>
                <Button
                  variant="contained"
                  startIcon={<InstagramIcon />}
                  sx={{
                    background:
                      "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(45deg, #d8852d 0%, #cc5c35 25%, #c4233b 50%, #b31f5a 75%, #a7167a 100%)",
                    },
                    borderRadius: 12,
                    boxShadow: "0 6px 15px rgba(220, 39, 67, 0.3)",
                    padding: "10px 16px",
                    textTransform: "none",
                    fontWeight: 600,
                    flex: { xs: "1 0 45%", sm: "0 0 auto" },
                    transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 20px rgba(220, 39, 67, 0.4)",
                    },
                    "&:active": {
                      transform: "translateY(1px)",
                    },
                  }}
                >
                  Instagram
                </Button>
              </Box>

              <Typography
                variant="h6"
                gutterBottom
                fontWeight="medium"
                sx={{
                  color: theme.palette.mode === "dark" ? "white" : "black",
                }}
              >
                Share via email
              </Typography>

              <TextField
                fullWidth
                variant="outlined"
                label="Email address"
                placeholder="Enter recipient's email"
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.08)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.2)"
                          : "rgba(0,0,0,0.12)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.primary.main,
                      borderWidth: 2,
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                variant="outlined"
                label="Message (optional)"
                placeholder="Add a personal message"
                multiline
                rows={3}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.08)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.2)"
                          : "rgba(0,0,0,0.12)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.primary.main,
                      borderWidth: 2,
                    },
                  },
                }}
              />
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <SecondaryButton onClick={handleCloseShareDialog}>
                Cancel
              </SecondaryButton>
              <PrimaryButton>Send Email</PrimaryButton>
            </DialogActions>
          </Dialog>

          {/* Scroll to top button */}
          <Zoom in={showScrollTop}>
            <Box
              onClick={scrollToTop}
              role="presentation"
              sx={{
                position: "fixed",
                bottom: compareItems.length > 0 ? 100 : 20,
                right: 20,
                zIndex: 2,
              }}
            >
              <Fab
                color="primary"
                size="medium"
                aria-label="scroll back to top"
                sx={{
                  boxShadow: "0 6px 20px rgba(79, 70, 229, 0.4)",
                  background:
                    "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)",
                  },
                }}
              >
                <ArrowUpwardIcon />
              </Fab>
            </Box>
          </Zoom>

          {/* Snackbar for notifications */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            TransitionComponent={Fade}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbar.severity}
              variant="filled"
              sx={{
                width: "100%",
                borderRadius: 3,
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                backdropFilter: "blur(10px)",
                "& .MuiAlert-icon": {
                  fontSize: 28,
                },
                background:
                  snackbar.severity === "success"
                    ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                    : snackbar.severity === "error"
                    ? "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
                    : snackbar.severity === "warning"
                    ? "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                    : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
              }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default Wishlist;
