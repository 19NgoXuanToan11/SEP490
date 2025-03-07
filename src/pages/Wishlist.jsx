import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
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
} from "@mui/icons-material";
import Layout from "../components/layout/Layout";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import InstagramIcon from "@mui/icons-material/Instagram";

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
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Page header with animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box mb={4}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: theme.palette.text.secondary,
              }}
            >
              Home
            </Link>
            <Typography color="text.primary">Wishlist</Typography>
          </Breadcrumbs>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
          >
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              gutterBottom
            >
              My Wishlist
            </Typography>

            <Box display="flex" alignItems="center">
              <Chip
                icon={<FavoriteIcon />}
                label={`${wishlistItems.length} items`}
                color="primary"
                variant="outlined"
                sx={{ mr: 2 }}
              />
              {wishlistItems.length > 0 && (
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={clearWishlist}
                  size={isMobile ? "small" : "medium"}
                >
                  Clear All
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </motion.div>

      {/* Search, sort and filter controls */}
      <Paper
        elevation={0}
        sx={{ p: 2, mb: 4, borderRadius: 2, bgcolor: "background.paper" }}
      >
        <Grid container spacing={2} alignItems="center">
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
                sx: { borderRadius: 2 },
              }}
              size="small"
            />
          </Grid>

          <Grid item xs={6} md={3.5}>
            <FormControl fullWidth size="small">
              <InputLabel id="filter-label">Filter By</InputLabel>
              <Select
                labelId="filter-label"
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
                label="Filter By"
                startAdornment={
                  <FilterListIcon sx={{ mr: 1, color: "text.secondary" }} />
                }
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
              <InputLabel id="sort-label">Sort By</InputLabel>
              <Select
                labelId="sort-label"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                label="Sort By"
                startAdornment={
                  <SortIcon sx={{ mr: 1, color: "text.secondary" }} />
                }
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
                  <Skeleton variant="rectangular" height={36} width="100%" />
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
              component={Link}
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
                        <Box sx={{ position: "absolute", top: 10, left: 10 }}>
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
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
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
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
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
              component={Link}
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

                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
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

                  <Box sx={{ display: "flex", alignItems: "baseline", mb: 2 }}>
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
                          quickViewItem.inStock ? "success.main" : "error.main"
                        }
                      >
                        {quickViewItem.inStock ? "In Stock" : "Out of Stock"}
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
                    sx={{ display: "flex", justifyContent: "space-between" }}
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
                      component={Link}
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
          sx: { borderRadius: 2 },
        }}
      >
        <DialogTitle>Share this product</DialogTitle>
        <DialogContent>
          {selectedItem && (
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Box
                component="img"
                src={getProductImage(selectedItem.category, selectedItem.brand)}
                alt={selectedItem.name}
                sx={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 2,
                  mr: 2,
                  boxShadow: 1,
                }}
              />
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {selectedItem.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
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
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    borderRadius: 1,
                    background:
                      "linear-gradient(90deg, #3f51b5 0%, #2196f3 100%)",
                  }}
                >
                  Copy
                </Button>
              ),
            }}
            sx={{ mb: 4 }}
          />

          <Typography variant="h6" gutterBottom fontWeight="medium">
            Share on social media
          </Typography>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<FacebookIcon />}
              sx={{
                bgcolor: "#3b5998",
                "&:hover": { bgcolor: "#2d4373" },
                borderRadius: 2,
                flex: { xs: "1 0 45%", sm: "0 0 auto" },
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
                borderRadius: 2,
                flex: { xs: "1 0 45%", sm: "0 0 auto" },
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
                borderRadius: 2,
                flex: { xs: "1 0 45%", sm: "0 0 auto" },
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
                borderRadius: 2,
                flex: { xs: "1 0 45%", sm: "0 0 auto" },
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
                borderRadius: 2,
                flex: { xs: "1 0 45%", sm: "0 0 auto" },
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
                borderRadius: 2,
                flex: { xs: "1 0 45%", sm: "0 0 auto" },
              }}
            >
              Instagram
            </Button>
          </Box>

          <Typography variant="h6" gutterBottom fontWeight="medium">
            Share via email
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            label="Email address"
            placeholder="Enter recipient's email"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            variant="outlined"
            label="Message (optional)"
            placeholder="Add a personal message"
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={handleCloseShareDialog}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 2,
              background: "linear-gradient(90deg, #3f51b5 0%, #2196f3 100%)",
              "&:hover": {
                background: "linear-gradient(90deg, #303f9f 0%, #1976d2 100%)",
              },
            }}
          >
            Send Email
          </Button>
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
              boxShadow: 3,
              background: "linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)",
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
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: 2,
            boxShadow: 3,
            "& .MuiAlert-icon": {
              fontSize: 28,
            },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Wishlist;
