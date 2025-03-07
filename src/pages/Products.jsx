import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  Rating,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Pagination,
  IconButton,
  CircularProgress,
  Paper,
  Drawer,
  useMediaQuery,
  useTheme,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Tabs,
  Tab,
  Tooltip,
  Badge,
  Avatar,
  Fade,
  Zoom,
  Divider,
  SwipeableDrawer,
  Backdrop,
  Skeleton,
  Stack,
} from "@mui/material";
import {
  Search,
  FilterList,
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  Close,
  Sort,
  ViewModule,
  ViewList,
  LocalOffer,
  Tune,
  TrendingUp,
  Star,
  StarBorder,
  ArrowUpward,
  CompareArrows,
  Share,
  Info,
  ShoppingBag,
  Visibility,
  AddShoppingCart,
  FlashOn,
  LocalShipping,
  Verified,
  VerifiedUser,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { motion } from "framer-motion";

// Hàm lấy hình ảnh thực tế cho sản phẩm
const getProductImage = (category, brand) => {
  const imageMap = {
    Smartphones: {
      Apple:
        "https://images.unsplash.com/photo-1603891128711-11b4b03bb138?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      Samsung:
        "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      Sony: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      default:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    Laptops: {
      Apple:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      Dell: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      HP: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      Lenovo:
        "https://images.unsplash.com/photo-1585247226801-bc613c441316?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      default:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    Tablets: {
      Apple:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      Samsung:
        "https://images.unsplash.com/photo-1589739900243-4b52cd9dd8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      default:
        "https://images.unsplash.com/photo-1527698266440-12104e498b76?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    Audio: {
      Bose: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      Sony: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      Apple:
        "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      default:
        "https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    Cameras: {
      Canon:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      Nikon:
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      Sony: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      default:
        "https://images.unsplash.com/photo-1480365501497-199581be0e66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    Accessories: {
      Apple:
        "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      Samsung:
        "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      default:
        "https://images.unsplash.com/photo-1563770660941-10a2b3654e41?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    default:
      "https://images.unsplash.com/photo-1519183071298-a2962feb14f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  };

  if (imageMap[category]) {
    return imageMap[category][brand] || imageMap[category].default;
  }
  return imageMap.default;
};

// Component chính
const Products = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const scrollRef = useRef(null);

  // State for products and filtering
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [compareProducts, setCompareProducts] = useState([]);

  // Pagination
  const [page, setPage] = useState(1);
  const [productsPerPage] = useState(12);

  // Filter states
  const [searchQuery, setSearchQuery] = useState(
    queryParams.get("search") || ""
  );
  const [category, setCategory] = useState(
    queryParams.get("category") || "all"
  );
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState("newest");
  const [condition, setCondition] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(!isMobile);

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Here you would fetch data from your API
        // For now, we'll use mock data
        setTimeout(() => {
          const categories = [
            "Smartphones",
            "Laptops",
            "Tablets",
            "Audio",
            "Cameras",
            "Accessories",
          ];
          const brandsList = [
            "Apple",
            "Samsung",
            "Sony",
            "Dell",
            "HP",
            "Lenovo",
            "Bose",
            "Canon",
            "Nikon",
            "Microsoft",
          ];
          const conditionOptions = ["New", "Like New", "Good", "Fair"];

          // Generate products
          const mockProducts = Array(50)
            .fill()
            .map((_, index) => {
              const brand =
                brandsList[Math.floor(Math.random() * brandsList.length)];
              const productCategory =
                categories[Math.floor(Math.random() * categories.length)];
              const productCondition =
                conditionOptions[
                  Math.floor(Math.random() * conditionOptions.length)
                ];
              const discount =
                Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : 0;
              const price = Math.floor(Math.random() * 1900) + 100;
              const discountedPrice =
                discount > 0 ? Math.round(price * (1 - discount / 100)) : price;
              const isFeatured = Math.random() > 0.8;
              const isNew = Math.random() > 0.7;
              const stock = Math.floor(Math.random() * 50);
              const isLowStock = stock < 5 && stock > 0;

              return {
                id: index + 1,
                name: `${brand} ${productCategory} Model ${Math.floor(
                  Math.random() * 1000
                )}`,
                description: `This is a description for a ${productCategory} from ${brand}. It's in ${productCondition} condition.`,
                price: price,
                discountedPrice: discountedPrice,
                discount: discount,
                image: getProductImage(productCategory, brand),
                category: productCategory,
                brand: brand,
                rating: (Math.random() * 5).toFixed(1),
                reviews: Math.floor(Math.random() * 100),
                seller: `User ${Math.floor(Math.random() * 20) + 1}`,
                condition: productCondition,
                dateAdded: new Date(
                  2023,
                  Math.floor(Math.random() * 12),
                  Math.floor(Math.random() * 28) + 1
                ).toISOString(),
                isFeatured: isFeatured,
                isNew: isNew,
                stock: stock,
                isLowStock: isLowStock,
                sold: Math.floor(Math.random() * 200),
                specs: {
                  color: ["Black", "White", "Silver"][
                    Math.floor(Math.random() * 3)
                  ],
                  weight: `${(Math.random() * 2 + 0.2).toFixed(1)} kg`,
                  dimensions: `${Math.floor(Math.random() * 30) + 10}cm x ${
                    Math.floor(Math.random() * 20) + 5
                  }cm x ${Math.floor(Math.random() * 5) + 1}cm`,
                  warranty: `${Math.floor(Math.random() * 24) + 6} months`,
                },
              };
            });

          setProducts(mockProducts);
          setBrands(
            [...new Set(mockProducts.map((product) => product.brand))].sort()
          );
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...products];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (category && category !== "all") {
      result = result.filter((product) => product.category === category);
    }

    // Apply price range filter
    result = result.filter(
      (product) =>
        product.discountedPrice >= priceRange[0] &&
        product.discountedPrice <= priceRange[1]
    );

    // Apply condition filter
    if (condition.length > 0) {
      result = result.filter((product) =>
        condition.includes(product.condition)
      );
    }

    // Apply brand filter
    if (selectedBrands.length > 0) {
      result = result.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    // Apply tab filtering
    if (activeTab === 1) {
      // Featured products
      result = result.filter((product) => product.isFeatured);
    } else if (activeTab === 2) {
      // New arrivals
      result = result.filter((product) => product.isNew);
    } else if (activeTab === 3) {
      // On sale
      result = result.filter((product) => product.discount > 0);
    } else if (activeTab === 4) {
      // Best sellers
      result.sort((a, b) => b.sold - a.sold);
      result = result.slice(0, 20);
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low-high":
        result.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case "price-high-low":
        result.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "popularity":
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case "newest":
      default:
        result.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
    }

    setFilteredProducts(result);
    // Reset to first page when filters change
    setPage(1);
  }, [
    products,
    searchQuery,
    category,
    priceRange,
    condition,
    selectedBrands,
    sortBy,
    activeTab,
  ]);

  // Update URL with filters
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (category && category !== "all") params.set("category", category);
    if (activeTab !== 0) params.set("tab", activeTab);

    const newUrl = `${location.pathname}?${params.toString()}`;
    navigate(newUrl, { replace: true });
  }, [searchQuery, category, activeTab, navigate, location.pathname]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleConditionChange = (event) => {
    const value = event.target.value;
    if (condition.includes(value)) {
      setCondition(condition.filter((c) => c !== value));
    } else {
      setCondition([...condition, value]);
    }
  };

  const handleBrandChange = (event) => {
    const value = event.target.value;
    if (selectedBrands.includes(value)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== value));
    } else {
      setSelectedBrands([...selectedBrands, value]);
    }
  };

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleFilterDrawer = () => {
    setFilterDrawerOpen(!filterDrawerOpen);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
    setShowQuickView(true);
  };

  const handleCloseQuickView = () => {
    setShowQuickView(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const toggleCompare = (product) => {
    if (compareProducts.some((p) => p.id === product.id)) {
      setCompareProducts(compareProducts.filter((p) => p.id !== product.id));
    } else {
      if (compareProducts.length < 4) {
        setCompareProducts([...compareProducts, product]);
      } else {
        // Show notification that max 4 products can be compared
        alert("You can compare up to 4 products at a time");
      }
    }
  };

  // Calculate pagination
  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Filter sidebar content
  const filterContent = (
    <Box sx={{ p: 3, width: isMobile ? "100%" : 280 }}>
      {isMobile && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Filters
          </Typography>
          <IconButton onClick={toggleFilterDrawer} size="large">
            <Close />
          </IconButton>
        </Box>
      )}

      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{ fontWeight: 600, color: "primary.main" }}
      >
        Categories
      </Typography>
      <FormControl fullWidth size="small" sx={{ mb: 4 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          label="Category"
          onChange={handleCategoryChange}
          sx={{ borderRadius: 2 }}
        >
          <MenuItem value="all">All Categories</MenuItem>
          {[
            "Smartphones",
            "Laptops",
            "Tablets",
            "Audio",
            "Cameras",
            "Accessories",
          ].map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{ fontWeight: 600, color: "primary.main" }}
      >
        Price Range
      </Typography>
      <Box sx={{ px: 1, mb: 4 }}>
        <Slider
          value={priceRange}
          onChange={handlePriceRangeChange}
          valueLabelDisplay="auto"
          min={0}
          max={2000}
          step={50}
          sx={{
            color: "primary.main",
            "& .MuiSlider-thumb": {
              height: 20,
              width: 20,
            },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Chip label={`$${priceRange[0]}`} size="small" />
          <Chip label={`$${priceRange[1]}`} size="small" />
        </Box>
      </Box>

      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{ fontWeight: 600, color: "primary.main" }}
      >
        Condition
      </Typography>
      <FormGroup sx={{ mb: 4 }}>
        {["New", "Like New", "Good", "Fair"].map((cond) => (
          <FormControlLabel
            key={cond}
            control={
              <Checkbox
                checked={condition.includes(cond)}
                onChange={handleConditionChange}
                value={cond}
                size="small"
                sx={{ color: "primary.main" }}
              />
            }
            label={cond}
          />
        ))}
      </FormGroup>

      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{ fontWeight: 600, color: "primary.main" }}
      >
        Brands
      </Typography>
      <FormGroup sx={{ mb: 4, maxHeight: 200, overflow: "auto" }}>
        {brands.map((brand) => (
          <FormControlLabel
            key={brand}
            control={
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onChange={handleBrandChange}
                value={brand}
                size="small"
                sx={{ color: "primary.main" }}
              />
            }
            label={brand}
          />
        ))}
      </FormGroup>

      {isMobile && (
        <Button
          variant="contained"
          fullWidth
          onClick={toggleFilterDrawer}
          sx={{
            mt: 2,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            background:
              "linear-gradient(90deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)",
          }}
        >
          Apply Filters
        </Button>
      )}
    </Box>
  );

  // Grid view product card
  const GridProductCard = ({ product }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 4,
          overflow: "hidden",
          position: "relative",
          transition: "all 0.3s",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          "&:hover": {
            transform: "translateY(-10px)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
          },
        }}
      >
        {/* Badges */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {product.discount > 0 && (
            <Chip
              label={`-${product.discount}%`}
              size="small"
              sx={{
                bgcolor: "#ff4757",
                color: "white",
                fontWeight: 700,
                fontSize: "0.75rem",
              }}
            />
          )}
          {product.isNew && (
            <Chip
              label="NEW"
              size="small"
              sx={{
                bgcolor: "#2ed573",
                color: "white",
                fontWeight: 700,
                fontSize: "0.75rem",
              }}
            />
          )}
          {product.isLowStock && (
            <Chip
              label="LOW STOCK"
              size="small"
              sx={{
                bgcolor: "#ffa502",
                color: "white",
                fontWeight: 700,
                fontSize: "0.75rem",
              }}
            />
          )}
        </Box>

        {/* Product Image */}
        <Box sx={{ position: "relative", overflow: "hidden", pt: "75%" }}>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.6s",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />

          {/* Quick actions overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: "rgba(0,0,0,0.02)",
              transition: "all 0.3s",
              opacity: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                opacity: 1,
                bgcolor: "rgba(0,0,0,0.15)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1,
                transform: "translateY(20px)",
                transition: "all 0.3s",
                ".MuiCard-root:hover &": {
                  transform: "translateY(0)",
                },
              }}
            >
              <Tooltip title="Quick view">
                <IconButton
                  onClick={() => handleQuickView(product)}
                  sx={{
                    bgcolor: "white",
                    "&:hover": { bgcolor: "primary.main", color: "white" },
                  }}
                >
                  <Visibility />
                </IconButton>
              </Tooltip>
              <Tooltip
                title={
                  favorites.includes(product.id)
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
              >
                <IconButton
                  onClick={() => toggleFavorite(product.id)}
                  sx={{
                    bgcolor: "white",
                    color: favorites.includes(product.id)
                      ? "error.main"
                      : "inherit",
                    "&:hover": { bgcolor: "error.main", color: "white" },
                  }}
                >
                  {favorites.includes(product.id) ? (
                    <Favorite />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip
                title={
                  compareProducts.some((p) => p.id === product.id)
                    ? "Remove from compare"
                    : "Add to compare"
                }
              >
                <IconButton
                  onClick={() => toggleCompare(product)}
                  sx={{
                    bgcolor: "white",
                    color: compareProducts.some((p) => p.id === product.id)
                      ? "primary.main"
                      : "inherit",
                    "&:hover": { bgcolor: "primary.main", color: "white" },
                  }}
                >
                  <CompareArrows />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>

        {/* Product Info */}
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            gutterBottom
            sx={{
              textTransform: "uppercase",
              letterSpacing: 1,
              fontSize: "0.7rem",
            }}
          >
            {product.brand}
          </Typography>

          <Typography
            variant="h6"
            component={Link}
            to={`/products/${product.id}`}
            sx={{
              fontWeight: 600,
              textDecoration: "none",
              color: "text.primary",
              display: "block",
              mb: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              height: 48,
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            {product.name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
            <Rating
              value={parseFloat(product.rating)}
              precision={0.5}
              size="small"
              readOnly
              sx={{ mr: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              ({product.reviews})
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
            {product.discount > 0 && (
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "line-through",
                  color: "text.secondary",
                }}
              >
                ${product.price.toFixed(2)}
              </Typography>
            )}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: product.discount > 0 ? "#ff4757" : "primary.main",
              }}
            >
              ${product.discountedPrice.toFixed(2)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 1.5,
              color: product.stock > 0 ? "#2ed573" : "error.main",
              fontSize: "0.875rem",
            }}
          >
            {product.stock > 0 ? (
              <>
                <VerifiedUser fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="body2">
                  {product.isLowStock
                    ? `Only ${product.stock} left in stock`
                    : "In Stock"}
                </Typography>
              </>
            ) : (
              <>
                <Info fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="body2">Out of Stock</Typography>
              </>
            )}
          </Box>
        </CardContent>

        {/* Actions */}
        <CardActions sx={{ p: 3, pt: 0 }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<AddShoppingCart />}
            sx={{
              borderRadius: 2,
              py: 1,
              background:
                product.stock > 0
                  ? "linear-gradient(90deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)"
                  : "grey.500",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              fontWeight: 600,
              "&:hover": {
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s",
            }}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );

  // List view product card
  const ListProductCard = ({ product }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          borderRadius: 4,
          overflow: "hidden",
          position: "relative",
          transition: "all 0.3s",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
          },
          mb: 3,
        }}
      >
        {/* Badges */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {product.discount > 0 && (
            <Chip
              label={`-${product.discount}%`}
              size="small"
              sx={{
                bgcolor: "#ff4757",
                color: "white",
                fontWeight: 700,
                fontSize: "0.75rem",
              }}
            />
          )}
          {product.isNew && (
            <Chip
              label="NEW"
              size="small"
              sx={{
                bgcolor: "#2ed573",
                color: "white",
                fontWeight: 700,
                fontSize: "0.75rem",
              }}
            />
          )}
        </Box>

        {/* Product Image */}
        <Box
          sx={{
            position: "relative",
            width: { xs: "100%", sm: 280 },
            minWidth: { sm: 280 },
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
            sx={{
              height: { xs: 200, sm: "100%" },
              objectFit: "cover",
              transition: "transform 0.6s",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />

          {/* Quick actions overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: "rgba(0,0,0,0.02)",
              transition: "all 0.3s",
              opacity: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                opacity: 1,
                bgcolor: "rgba(0,0,0,0.15)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              <Tooltip title="Quick view">
                <IconButton
                  onClick={() => handleQuickView(product)}
                  sx={{
                    bgcolor: "white",
                    "&:hover": { bgcolor: "primary.main", color: "white" },
                  }}
                >
                  <Visibility />
                </IconButton>
              </Tooltip>
              <Tooltip
                title={
                  favorites.includes(product.id)
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
              >
                <IconButton
                  onClick={() => toggleFavorite(product.id)}
                  sx={{
                    bgcolor: "white",
                    color: favorites.includes(product.id)
                      ? "error.main"
                      : "inherit",
                    "&:hover": { bgcolor: "error.main", color: "white" },
                  }}
                >
                  {favorites.includes(product.id) ? (
                    <Favorite />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip
                title={
                  compareProducts.some((p) => p.id === product.id)
                    ? "Remove from compare"
                    : "Add to compare"
                }
              >
                <IconButton
                  onClick={() => toggleCompare(product)}
                  sx={{
                    bgcolor: "white",
                    color: compareProducts.some((p) => p.id === product.id)
                      ? "primary.main"
                      : "inherit",
                    "&:hover": { bgcolor: "primary.main", color: "white" },
                  }}
                >
                  <CompareArrows />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>

        {/* Product Info */}
        <Box
          sx={{ display: "flex", flexDirection: "column", flexGrow: 1, p: 3 }}
        >
          <Box sx={{ mb: "auto" }}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              gutterBottom
              sx={{
                textTransform: "uppercase",
                letterSpacing: 1,
                fontSize: "0.7rem",
              }}
            >
              {product.brand} • {product.category}
            </Typography>

            <Typography
              variant="h6"
              component={Link}
              to={`/products/${product.id}`}
              sx={{
                fontWeight: 600,
                textDecoration: "none",
                color: "text.primary",
                display: "block",
                mb: 1,
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              {product.name}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
              <Rating
                value={parseFloat(product.rating)}
                precision={0.5}
                size="small"
                readOnly
                sx={{ mr: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                ({product.reviews})
              </Typography>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}
            >
              {product.description}
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
              <Chip
                icon={<LocalShipping fontSize="small" />}
                label="Free Shipping"
                size="small"
                variant="outlined"
              />
              {product.condition && (
                <Chip
                  label={product.condition}
                  size="small"
                  variant="outlined"
                />
              )}
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Box>
              <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                {product.discount > 0 && (
                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration: "line-through",
                      color: "text.secondary",
                    }}
                  >
                    ${product.price.toFixed(2)}
                  </Typography>
                )}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: product.discount > 0 ? "#ff4757" : "primary.main",
                  }}
                >
                  ${product.discountedPrice.toFixed(2)}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 0.5,
                  color: product.stock > 0 ? "#2ed573" : "error.main",
                  fontSize: "0.875rem",
                }}
              >
                {product.stock > 0 ? (
                  <>
                    <VerifiedUser fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">
                      {product.isLowStock
                        ? `Only ${product.stock} left in stock`
                        : "In Stock"}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Info fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">Out of Stock</Typography>
                  </>
                )}
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  borderWidth: 2,
                  fontWeight: 600,
                  "&:hover": {
                    borderWidth: 2,
                  },
                }}
                component={Link}
                to={`/products/${product.id}`}
              >
                Details
              </Button>
              <Button
                variant="contained"
                startIcon={<AddShoppingCart />}
                sx={{
                  borderRadius: 2,
                  py: 1,
                  px: 2,
                  background:
                    product.stock > 0
                      ? "linear-gradient(90deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)"
                      : "grey.500",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  fontWeight: 600,
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s",
                }}
                disabled={product.stock === 0}
              >
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>
    </motion.div>
  );

  // Quick View Modal
  const QuickViewModal = () => (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={showQuickView}
      onClick={handleCloseQuickView}
    >
      <Zoom in={showQuickView}>
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            position: "relative",
            width: { xs: "95%", sm: "90%", md: "80%", lg: "70%" },
            maxWidth: 1000,
            maxHeight: "90vh",
            overflowY: "auto",
            bgcolor: "background.paper",
            borderRadius: 4,
            boxShadow: 24,
            p: { xs: 2, sm: 4 },
          }}
        >
          {quickViewProduct && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={quickViewProduct.image}
                    alt={quickViewProduct.name}
                    sx={{
                      width: "100%",
                      borderRadius: 3,
                      height: { xs: 300, sm: 400, md: 500 },
                      objectFit: "cover",
                    }}
                  />
                  {quickViewProduct.discount > 0 && (
                    <Chip
                      label={`-${quickViewProduct.discount}%`}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        bgcolor: "#ff4757",
                        color: "white",
                        fontWeight: 700,
                      }}
                    />
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <IconButton
                  onClick={handleCloseQuickView}
                  sx={{ position: "absolute", top: 8, right: 8 }}
                >
                  <Close />
                </IconButton>

                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                  sx={{ textTransform: "uppercase", letterSpacing: 1 }}
                >
                  {quickViewProduct.brand} • {quickViewProduct.category}
                </Typography>

                <Typography
                  variant="h4"
                  component="h2"
                  gutterBottom
                  sx={{ fontWeight: 700 }}
                >
                  {quickViewProduct.name}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Rating
                    value={parseFloat(quickViewProduct.rating)}
                    precision={0.5}
                    readOnly
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    ({quickViewProduct.reviews} reviews)
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 1,
                    mb: 3,
                  }}
                >
                  {quickViewProduct.discount > 0 && (
                    <Typography
                      variant="h6"
                      sx={{
                        textDecoration: "line-through",
                        color: "text.secondary",
                      }}
                    >
                      ${quickViewProduct.price.toFixed(2)}
                    </Typography>
                  )}
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color:
                        quickViewProduct.discount > 0
                          ? "#ff4757"
                          : "primary.main",
                    }}
                  >
                    ${quickViewProduct.discountedPrice.toFixed(2)}
                  </Typography>
                </Box>

                <Typography variant="body1" paragraph>
                  {quickViewProduct.description}
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Condition
                    </Typography>
                    <Typography variant="body1">
                      {quickViewProduct.condition}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Color
                    </Typography>
                    <Typography variant="body1">
                      {quickViewProduct.specs.color}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Weight
                    </Typography>
                    <Typography variant="body1">
                      {quickViewProduct.specs.weight}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Warranty
                    </Typography>
                    <Typography variant="body1">
                      {quickViewProduct.specs.warranty}
                    </Typography>
                  </Grid>
                </Grid>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 3,
                    color:
                      quickViewProduct.stock > 0 ? "#2ed573" : "error.main",
                  }}
                >
                  {quickViewProduct.stock > 0 ? (
                    <>
                      <VerifiedUser sx={{ mr: 1 }} />
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {quickViewProduct.isLowStock
                          ? `Only ${quickViewProduct.stock} left in stock - order soon`
                          : "In Stock"}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Info sx={{ mr: 1 }} />
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        Out of Stock
                      </Typography>
                    </>
                  )}
                </Box>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<AddShoppingCart />}
                    fullWidth
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      background:
                        quickViewProduct.stock > 0
                          ? "linear-gradient(90deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)"
                          : "grey.500",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                      fontWeight: 600,
                      "&:hover": {
                        boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                      },
                    }}
                    disabled={quickViewProduct.stock === 0}
                  >
                    Add to Cart
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Favorite />}
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      borderWidth: 2,
                      fontWeight: 600,
                      color: favorites.includes(quickViewProduct.id)
                        ? "error.main"
                        : "inherit",
                      borderColor: favorites.includes(quickViewProduct.id)
                        ? "error.main"
                        : "inherit",
                      "&:hover": {
                        borderWidth: 2,
                        borderColor: "error.main",
                        color: "error.main",
                      },
                    }}
                    onClick={() => toggleFavorite(quickViewProduct.id)}
                  >
                    {favorites.includes(quickViewProduct.id) ? "Saved" : "Save"}
                  </Button>
                </Box>

                <Button
                  component={Link}
                  to={`/products/${quickViewProduct.id}`}
                  variant="text"
                  fullWidth
                  sx={{ mt: 2, fontWeight: 600 }}
                >
                  View Full Details
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
      </Zoom>
    </Backdrop>
  );

  // Compare Products Drawer
  const CompareDrawer = () => (
    <SwipeableDrawer
      anchor="bottom"
      open={compareProducts.length > 0}
      onClose={() => setCompareProducts([])}
      onOpen={() => {}}
      sx={{
        "& .MuiDrawer-paper": {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          maxHeight: "80vh",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Compare Products ({compareProducts.length})
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setCompareProducts([])}
            sx={{ borderRadius: 2 }}
          >
            Clear All
          </Button>
        </Box>

        <Grid container spacing={2}>
          {compareProducts.map((product) => (
            <Grid item xs={6} sm={4} md={3} key={product.id}>
              <Card sx={{ position: "relative", borderRadius: 3 }}>
                <IconButton
                  size="small"
                  onClick={() => toggleCompare(product)}
                  sx={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    bgcolor: "rgba(255,255,255,0.8)",
                  }}
                >
                  <Close fontSize="small" />
                </IconButton>
                <CardMedia
                  component="img"
                  height={120}
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ p: 1.5 }}>
                  <Typography variant="body2" noWrap>
                    {product.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="primary.main"
                    sx={{ fontWeight: 600 }}
                  >
                    ${product.discountedPrice.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {compareProducts.length >= 2 && (
          <Button
            variant="contained"
            fullWidth
            component={Link}
            to={`/compare?ids=${compareProducts.map((p) => p.id).join(",")}`}
            sx={{
              mt: 2,
              borderRadius: 2,
              py: 1.5,
              background:
                "linear-gradient(90deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)",
              fontWeight: 600,
            }}
          >
            Compare Now
          </Button>
        )}
      </Box>
    </SwipeableDrawer>
  );

  return (
    <Layout>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          pt: 2,
          pb: 8,
        }}
        ref={scrollRef}
      >
        <Container maxWidth="xl">
          {/* Hero Section */}
          <Paper
            elevation={0}
            sx={{
              mb: 4,
              borderRadius: 4,
              overflow: "hidden",
              position: "relative",
              height: { xs: 200, sm: 300, md: 400 },
              backgroundImage:
                "url(https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: "rgba(0,0,0,0.4)",
                zIndex: 1,
              }}
            />
            <Box
              sx={{
                position: "relative",
                zIndex: 2,
                textAlign: "center",
                color: "white",
                p: 3,
              }}
            >
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                  fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
                }}
              >
                Discover Quality Tech
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  maxWidth: 800,
                  mx: "auto",
                  mb: 4,
                  textShadow: "0 2px 5px rgba(0,0,0,0.3)",
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                }}
              >
                Find the perfect device from our curated collection of premium
                electronics
              </Typography>
              <TextField
                placeholder="What are you looking for?"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "primary.main" }} />
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: "white",
                    borderRadius: 3,
                    width: { xs: "100%", sm: 400, md: 500 },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "transparent",
                    },
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  },
                }}
              />
            </Box>
          </Paper>

          {/* Category Tabs */}
          <Box sx={{ mb: 4 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                "& .MuiTab-root": {
                  fontWeight: 600,
                  fontSize: "1rem",
                  textTransform: "none",
                  minWidth: "auto",
                  px: 3,
                  py: 2,
                },
                "& .Mui-selected": {
                  color: "primary.main",
                },
                "& .MuiTabs-indicator": {
                  height: 3,
                  borderRadius: 1.5,
                },
                bgcolor: "white",
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <Tab
                label="All Products"
                icon={<ViewModule />}
                iconPosition="start"
              />
              <Tab label="Featured" icon={<Star />} iconPosition="start" />
              <Tab
                label="New Arrivals"
                icon={<LocalOffer />}
                iconPosition="start"
              />
              <Tab label="On Sale" icon={<LocalOffer />} iconPosition="start" />
              <Tab
                label="Best Sellers"
                icon={<TrendingUp />}
                iconPosition="start"
              />
            </Tabs>
          </Box>

          {/* Toolbar */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 4,
              borderRadius: 3,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              bgcolor: "white",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                startIcon={<Tune />}
                variant={showFilters ? "contained" : "outlined"}
                onClick={() =>
                  isMobile ? toggleFilterDrawer() : setShowFilters(!showFilters)
                }
                sx={{
                  borderRadius: 2,
                  display: { xs: "flex", md: showFilters ? "none" : "flex" },
                }}
              >
                Filters
              </Button>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  onClick={() => handleViewModeChange("grid")}
                  color={viewMode === "grid" ? "primary" : "default"}
                  sx={{
                    bgcolor:
                      viewMode === "grid"
                        ? "rgba(25, 118, 210, 0.1)"
                        : "transparent",
                  }}
                >
                  <ViewModule />
                </IconButton>
                <IconButton
                  onClick={() => handleViewModeChange("list")}
                  color={viewMode === "list" ? "primary" : "default"}
                  sx={{
                    bgcolor:
                      viewMode === "list"
                        ? "rgba(25, 118, 210, 0.1)"
                        : "transparent",
                  }}
                >
                  <ViewList />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Showing{" "}
                {filteredProducts.length > 0 ? indexOfFirstProduct + 1 : 0}-
                {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
                {filteredProducts.length} results
              </Typography>

              <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={handleSortChange}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="newest">Newest First</MenuItem>
                  <MenuItem value="price-low-high">Price: Low to High</MenuItem>
                  <MenuItem value="price-high-low">Price: High to Low</MenuItem>
                  <MenuItem value="rating">Highest Rated</MenuItem>
                  <MenuItem value="popularity">Most Popular</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Paper>

          {/* Main Content */}
          <Grid container spacing={3}>
            {/* Filter Sidebar */}
            {showFilters && (
              <Grid
                item
                md={3}
                lg={2.5}
                sx={{ display: { xs: "none", md: "block" } }}
              >
                <Paper
                  sx={{
                    position: "sticky",
                    top: 20,
                    borderRadius: 3,
                    overflow: "hidden",
                    bgcolor: "white",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  }}
                >
                  <Box
                    sx={{ p: 3, borderBottom: "1px solid rgba(0,0,0,0.06)" }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Filters
                    </Typography>
                    {(category !== "all" ||
                      condition.length > 0 ||
                      selectedBrands.length > 0 ||
                      priceRange[0] > 0 ||
                      priceRange[1] < 2000) && (
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => {
                          setCategory("all");
                          setCondition([]);
                          setSelectedBrands([]);
                          setPriceRange([0, 2000]);
                        }}
                        sx={{ mt: 1, fontWeight: 500 }}
                      >
                        Clear All
                      </Button>
                    )}
                  </Box>
                  {filterContent}
                </Paper>
              </Grid>
            )}

            {/* Products Grid */}
            <Grid
              item
              xs={12}
              md={showFilters ? 9 : 12}
              lg={showFilters ? 9.5 : 12}
            >
              {/* Active Filters */}
              {(category !== "all" ||
                condition.length > 0 ||
                selectedBrands.length > 0 ||
                searchQuery) && (
                <Box sx={{ mb: 3, display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {category !== "all" && (
                    <Chip
                      label={`Category: ${category}`}
                      onDelete={() => setCategory("all")}
                      size="medium"
                      sx={{ borderRadius: 2 }}
                    />
                  )}
                  {condition.map((cond) => (
                    <Chip
                      key={cond}
                      label={`Condition: ${cond}`}
                      onDelete={() =>
                        setCondition(condition.filter((c) => c !== cond))
                      }
                      size="medium"
                      sx={{ borderRadius: 2 }}
                    />
                  ))}
                  {selectedBrands.map((brand) => (
                    <Chip
                      key={brand}
                      label={`Brand: ${brand}`}
                      onDelete={() =>
                        setSelectedBrands(
                          selectedBrands.filter((b) => b !== brand)
                        )
                      }
                      size="medium"
                      sx={{ borderRadius: 2 }}
                    />
                  ))}
                  {searchQuery && (
                    <Chip
                      label={`Search: ${searchQuery}`}
                      onDelete={() => setSearchQuery("")}
                      size="medium"
                      sx={{ borderRadius: 2 }}
                    />
                  )}
                </Box>
              )}

              {loading ? (
                <Box sx={{ py: 4 }}>
                  <Grid container spacing={3}>
                    {Array.from(new Array(8)).map((_, index) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card
                          sx={{
                            borderRadius: 4,
                            overflow: "hidden",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                          }}
                        >
                          <Skeleton variant="rectangular" height={200} />
                          <CardContent>
                            <Skeleton variant="text" height={30} width="80%" />
                            <Skeleton variant="text" height={20} width="60%" />
                            <Skeleton variant="text" height={40} width="40%" />
                            <Skeleton variant="text" height={20} width="70%" />
                          </CardContent>
                          <CardActions>
                            <Skeleton
                              variant="rectangular"
                              height={40}
                              width="100%"
                            />
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ) : error ? (
                <Paper
                  sx={{
                    p: 5,
                    textAlign: "center",
                    borderRadius: 3,
                    bgcolor: "white",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  }}
                >
                  <Typography variant="h6" color="error" gutterBottom>
                    {error}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ mt: 2, borderRadius: 2 }}
                    onClick={() => window.location.reload()}
                  >
                    Try Again
                  </Button>
                </Paper>
              ) : filteredProducts.length === 0 ? (
                <Paper
                  sx={{
                    p: 5,
                    textAlign: "center",
                    borderRadius: 3,
                    bgcolor: "white",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  }}
                >
                  <Box sx={{ mb: 3 }}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
                      alt="No results"
                      style={{ width: 120, height: 120, opacity: 0.7 }}
                    />
                  </Box>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    No products found
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    Try adjusting your filters or search query to find what
                    you're looking for.
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      borderRadius: 2,
                      background:
                        "linear-gradient(90deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)",
                    }}
                    onClick={() => {
                      setCategory("all");
                      setCondition([]);
                      setSelectedBrands([]);
                      setSearchQuery("");
                      setPriceRange([0, 2000]);
                    }}
                  >
                    Clear All Filters
                  </Button>
                </Paper>
              ) : (
                <>
                  {viewMode === "grid" ? (
                    <Grid container spacing={3}>
                      {currentProducts.map((product) => (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}
                          key={product.id}
                        >
                          <GridProductCard product={product} />
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Stack spacing={3}>
                      {currentProducts.map((product) => (
                        <ListProductCard key={product.id} product={product} />
                      ))}
                    </Stack>
                  )}
                </>
              )}

              {/* Pagination */}
              {filteredProducts.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 6,
                    mb: 2,
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1.5,
                      borderRadius: 3,
                      bgcolor: "white",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                    }}
                  >
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={handlePageChange}
                      color="primary"
                      showFirstButton
                      showLastButton
                      size="large"
                      sx={{
                        "& .MuiPaginationItem-root": {
                          borderRadius: 2,
                          fontWeight: 600,
                        },
                      }}
                    />
                  </Paper>
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Filter Drawer - Mobile */}
      <SwipeableDrawer
        anchor="left"
        open={filterDrawerOpen}
        onClose={toggleFilterDrawer}
        onOpen={() => setFilterDrawerOpen(true)}
        sx={{
          display: { md: "none" },
          "& .MuiDrawer-paper": {
            width: "85%",
            maxWidth: 350,
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
            boxShadow: "5px 0 25px rgba(0,0,0,0.1)",
          },
        }}
      >
        {filterContent}
      </SwipeableDrawer>

      {/* Quick View Modal */}
      {quickViewProduct && <QuickViewModal />}

      {/* Compare Products Drawer */}
      <CompareDrawer />

      {/* Scroll to Top Button */}
      <Zoom in={showScrollTop}>
        <Box
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 10,
            bgcolor: "white",
            color: "primary.main",
            borderRadius: "50%",
            width: 50,
            height: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            cursor: "pointer",
            transition: "all 0.3s",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 6px 25px rgba(0,0,0,0.15)",
              bgcolor: "primary.main",
              color: "white",
            },
          }}
        >
          <ArrowUpward />
        </Box>
      </Zoom>
    </Layout>
  );
};

export default Products;
