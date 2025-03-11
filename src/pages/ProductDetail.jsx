import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Chip,
  Rating,
  Divider,
  TextField,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  CircularProgress,
  Breadcrumbs,
  Snackbar,
  Alert,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
  CardActions,
} from "@mui/material";
import {
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  Share,
  CompareArrows,
  ArrowBack,
  ArrowForward,
  Add,
  Remove,
  Flag,
  Person,
  Star,
  Description,
  Info,
  LocalShipping,
  Security,
  Close,
} from "@mui/icons-material";
import { Link, useParams, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { alpha } from "@mui/material/styles";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [imageIndex, setImageIndex] = useState(0);
  const [zoomDialogOpen, setZoomDialogOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        // Here you would fetch data from your API
        // For now, we'll use mock data with more realistic images
        setTimeout(() => {
          const mockProduct = {
            id: parseInt(id),
            name: `Product ${id}`,
            description: `This is a detailed description for Product ${id}. It includes information about the features, specifications, and condition of the product. The product is in good working condition with minor signs of use.`,
            price: Math.floor(Math.random() * 1000) + 100,
            // Use more realistic images based on category
            images: getProductImages(id),
            category: getRandomCategory(),
            brand: getRandomBrand(),
            rating: (Math.random() * 2 + 3).toFixed(1), // Between 3 and 5
            reviews: Array(Math.floor(Math.random() * 10) + 5)
              .fill()
              .map((_, index) => ({
                id: index + 1,
                user: `User ${Math.floor(Math.random() * 100) + 1}`,
                avatar: `https://i.pravatar.cc/40?img=${index + 10}`, // More realistic avatars
                rating: Math.floor(Math.random() * 3) + 3, // Between 3 and 5
                date: new Date(
                  2023,
                  Math.floor(Math.random() * 12),
                  Math.floor(Math.random() * 28) + 1
                )
                  .toISOString()
                  .split("T")[0],
                text: `This is review ${
                  index + 1
                } for the product. The user shares their experience with the product and provides feedback.`,
              })),
            seller: {
              id: Math.floor(Math.random() * 100) + 1,
              name: `Seller ${Math.floor(Math.random() * 100) + 1}`,
              rating: (Math.random() * 2 + 3).toFixed(1), // Between 3 and 5
              totalSales: Math.floor(Math.random() * 500) + 50,
              joinDate: new Date(
                2022,
                Math.floor(Math.random() * 12),
                Math.floor(Math.random() * 28) + 1
              )
                .toISOString()
                .split("T")[0],
              responseRate: Math.floor(Math.random() * 20) + 80, // Between 80% and 100%
            },
            condition: ["New", "Like New", "Good", "Fair"][
              Math.floor(Math.random() * 4)
            ],
            warranty: Math.random() > 0.5 ? "30 days" : "None",
            shipping: {
              free: Math.random() > 0.5,
              estimatedDelivery: `${Math.floor(Math.random() * 5) + 2}-${
                Math.floor(Math.random() * 5) + 7
              } days`,
            },
            stock: Math.floor(Math.random() * 20) + 1,
            specifications: {
              Model: `Model ${Math.floor(Math.random() * 1000) + 1}`,
              Year: 2020 + Math.floor(Math.random() * 3),
              Color: ["Black", "White", "Silver", "Gold", "Blue"][
                Math.floor(Math.random() * 5)
              ],
              Storage: ["64GB", "128GB", "256GB", "512GB", "1TB"][
                Math.floor(Math.random() * 5)
              ],
              Processor: [
                "Intel Core i5",
                "Intel Core i7",
                "AMD Ryzen 5",
                "Apple M1",
                "Snapdragon 888",
              ][Math.floor(Math.random() * 5)],
              RAM: ["4GB", "8GB", "16GB", "32GB"][
                Math.floor(Math.random() * 4)
              ],
              Battery: [
                "4000mAh",
                "5000mAh",
                "Up to 10 hours",
                "Up to 12 hours",
              ][Math.floor(Math.random() * 4)],
            },
          };

          // Generate related products based on the same category
          const mockRelatedProducts = Array(6)
            .fill()
            .map((_, index) => ({
              id: parseInt(id) + 100 + index,
              name: getProductNameByCategory(mockProduct.category, index),
              description: `This is a description for a related ${mockProduct.category} product.`,
              price: Math.floor(Math.random() * 1000) + 100,
              image: getRelatedProductImage(mockProduct.category, index),
              category: mockProduct.category,
              brand: getRandomBrandByCategory(mockProduct.category),
              rating: (Math.random() * 5).toFixed(1),
              reviews: Math.floor(Math.random() * 100),
              condition: ["New", "Like New", "Good", "Fair"][
                Math.floor(Math.random() * 4)
              ],
            }));

          setProduct(mockProduct);
          setRelatedProducts(mockRelatedProducts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to load product details. Please try again.");
        setLoading(false);
      }
    };

    fetchProductDetails();
    // Reset state when product ID changes
    setTabValue(0);
    setQuantity(1);
    setImageIndex(0);
    setIsFavorite(false);
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Hiển thị thông báo thành công
    setSnackbar({
      open: true,
      message: `${quantity} ${
        quantity > 1 ? "items" : "item"
      } added to your cart`,
      severity: "success",
    });

    // Chuyển hướng đến trang cart sau 1 giây để người dùng kịp thấy thông báo
    setTimeout(() => {
      navigate("/cart");
    }, 1000);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    setSnackbar({
      open: true,
      message: isFavorite ? "Removed from favorites" : "Added to favorites",
      severity: "success",
    });
  };

  const handleShare = () => {
    // Here you would implement sharing functionality
    navigator.clipboard.writeText(window.location.href);
    setSnackbar({
      open: true,
      message: "Link copied to clipboard",
      severity: "info",
    });
  };

  const handleExchange = () => {
    navigate(`/exchange?product=${id}`);
  };

  const handleImageNavigation = (direction) => {
    if (direction === "next") {
      setImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    } else {
      setImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + product.images.length) % product.images.length
      );
    }
  };

  const handleZoomToggle = () => {
    setZoomDialogOpen(!zoomDialogOpen);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Here you would submit the review to your API
    if (reviewText.trim()) {
      setSnackbar({
        open: true,
        message: "Your review has been submitted",
        severity: "success",
      });
      setReviewText("");
      setReviewRating(5);
    } else {
      setSnackbar({
        open: true,
        message: "Please enter a review",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  // Helper functions for more realistic data
  const getRandomCategory = () => {
    const categories = [
      "Smartphones",
      "Laptops",
      "Tablets",
      "Audio",
      "Cameras",
      "Accessories",
    ];
    return categories[Math.floor(Math.random() * categories.length)];
  };

  const getRandomBrand = () => {
    const brands = ["Apple", "Samsung", "Sony", "Dell", "HP", "Lenovo"];
    return brands[Math.floor(Math.random() * brands.length)];
  };

  const getRandomBrandByCategory = (category) => {
    switch (category) {
      case "Smartphones":
        return ["Apple", "Samsung", "Google", "Xiaomi", "OnePlus"][
          Math.floor(Math.random() * 5)
        ];
      case "Laptops":
        return ["Apple", "Dell", "HP", "Lenovo", "Asus"][
          Math.floor(Math.random() * 5)
        ];
      case "Tablets":
        return ["Apple", "Samsung", "Microsoft", "Lenovo", "Huawei"][
          Math.floor(Math.random() * 5)
        ];
      case "Audio":
        return ["Sony", "Bose", "JBL", "Sennheiser", "Apple"][
          Math.floor(Math.random() * 5)
        ];
      case "Cameras":
        return ["Canon", "Nikon", "Sony", "Fujifilm", "Panasonic"][
          Math.floor(Math.random() * 5)
        ];
      default:
        return ["Apple", "Samsung", "Sony", "Anker", "Belkin"][
          Math.floor(Math.random() * 5)
        ];
    }
  };

  const getProductNameByCategory = (category, index) => {
    switch (category) {
      case "Smartphones":
        return [
          "iPhone 13 Pro",
          "Galaxy S22 Ultra",
          "Pixel 6 Pro",
          "OnePlus 10",
          "Xiaomi Mi 12",
        ][index % 5];
      case "Laptops":
        return [
          'MacBook Pro 16"',
          "Dell XPS 15",
          "HP Spectre x360",
          "ThinkPad X1 Carbon",
          "Asus ZenBook Pro",
        ][index % 5];
      case "Tablets":
        return [
          'iPad Pro 12.9"',
          "Galaxy Tab S8",
          "Surface Pro 8",
          "Lenovo Tab P12 Pro",
          "Huawei MatePad Pro",
        ][index % 5];
      case "Audio":
        return [
          "Sony WH-1000XM4",
          "Bose QuietComfort 45",
          "AirPods Pro",
          "JBL Flip 6",
          "Sennheiser Momentum 3",
        ][index % 5];
      case "Cameras":
        return [
          "Canon EOS R5",
          "Sony A7 IV",
          "Nikon Z6 II",
          "Fujifilm X-T4",
          "Panasonic Lumix GH6",
        ][index % 5];
      default:
        return [
          "AirTag",
          "Galaxy SmartTag",
          "Anker PowerBank",
          "Belkin Charger",
          "Sony Portable SSD",
        ][index % 5];
    }
  };

  const getProductImages = (id) => {
    // Return realistic product images based on ID
    // In a real app, you would use actual product images
    return [
      `https://source.unsplash.com/500x400/?electronics&sig=${id}1`,
      `https://source.unsplash.com/500x400/?gadget&sig=${id}2`,
      `https://source.unsplash.com/500x400/?tech&sig=${id}3`,
      `https://source.unsplash.com/500x400/?device&sig=${id}4`,
    ];
  };

  const getRelatedProductImage = (category, index) => {
    // Return realistic product images based on category
    const categoryKeywords = {
      Smartphones: "smartphone",
      Laptops: "laptop",
      Tablets: "tablet",
      Audio: "headphones",
      Cameras: "camera",
      Accessories: "tech-accessory",
    };

    const keyword = categoryKeywords[category] || "electronics";
    return `https://source.unsplash.com/300x200/?${keyword}&sig=${category}${index}`;
  };

  if (loading) {
    return (
      <Layout>
        <Container sx={{ py: 8, display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Container>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Container sx={{ py: 8 }}>
          <Typography color="error" sx={{ textAlign: "center" }}>
            {error}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button component={Link} to="/products" variant="contained">
              Back to Products
            </Button>
          </Box>
        </Container>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <Container sx={{ py: 8 }}>
          <Typography sx={{ textAlign: "center" }}>
            Product not found
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button component={Link} to="/products" variant="contained">
              Back to Products
            </Button>
          </Box>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Home
          </Link>
          <Link
            to="/products"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Products
          </Link>
          <Link
            to={`/products?category=${product.category}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {product.category}
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        {/* Product Details */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              letterSpacing: "-0.5px",
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            {product.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Rating
                value={parseFloat(product.rating)}
                precision={0.5}
                readOnly
                sx={{ mr: 1 }}
              />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {product.rating}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({product.reviews.length} reviews)
              </Typography>
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 1, height: 16 }}
            />
            <Typography variant="body2" color="text.secondary">
              Sold by{" "}
              <Link
                to={`/seller/${product.seller.id}`}
                style={{
                  textDecoration: "none",
                  color: theme.palette.primary.main,
                }}
              >
                {product.seller.name}
              </Link>
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
            <Chip
              label={product.brand}
              size="small"
              sx={{
                borderRadius: 1.5,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                fontWeight: 500,
                border: "none",
              }}
            />
            <Chip
              label={product.category}
              size="small"
              sx={{
                borderRadius: 1.5,
                bgcolor: alpha(theme.palette.secondary.main, 0.1),
                color: theme.palette.secondary.main,
                fontWeight: 500,
                border: "none",
              }}
            />
            <Chip
              label={product.condition}
              size="small"
              color={
                product.condition === "New"
                  ? "success"
                  : product.condition === "Like New"
                  ? "info"
                  : product.condition === "Good"
                  ? "primary"
                  : "warning"
              }
              sx={{
                borderRadius: 1.5,
                fontWeight: 500,
                border: "none",
              }}
            />
          </Box>
        </Box>

        <Grid container spacing={4}>
          {/* Product Images */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                position: "relative",
                mb: 2,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  paddingTop: "75%", // 4:3 aspect ratio
                  cursor: "zoom-in",
                  overflow: "hidden",
                }}
                onClick={handleZoomToggle}
              >
                <img
                  src={product.images[imageIndex]}
                  alt={`${product.name} - Image ${imageIndex + 1}`}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    transition: "transform 0.5s ease",
                  }}
                  className="product-image-zoom"
                />
                <style jsx>{`
                  .product-image-zoom:hover {
                    transform: scale(1.05);
                  }
                `}</style>
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: 16,
                  transform: "translateY(-50%)",
                  zIndex: 1,
                }}
              >
                <IconButton
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.9)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    "&:hover": { bgcolor: "rgba(255, 255, 255, 1)" },
                    transition: "all 0.2s ease",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageNavigation(-1);
                  }}
                >
                  <ArrowBack />
                </IconButton>
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: 16,
                  transform: "translateY(-50%)",
                  zIndex: 1,
                }}
              >
                <IconButton
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.9)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    "&:hover": { bgcolor: "rgba(255, 255, 255, 1)" },
                    transition: "all 0.2s ease",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageNavigation(1);
                  }}
                >
                  <ArrowForward />
                </IconButton>
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  bottom: 16,
                  left: 16,
                  bgcolor: "rgba(0, 0, 0, 0.7)",
                  color: "white",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  backdropFilter: "blur(4px)",
                }}
              >
                {imageIndex + 1} / {product.images.length}
              </Box>
            </Paper>

            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {product.images.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 80,
                    height: 60,
                    borderRadius: 2,
                    overflow: "hidden",
                    border:
                      index === imageIndex
                        ? `2px solid ${theme.palette.primary.main}`
                        : `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    opacity: index === imageIndex ? 1 : 0.7,
                    "&:hover": {
                      opacity: 1,
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    },
                  }}
                  onClick={() => setImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Product Info */}
          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                variant="h5"
                color="primary"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontSize: "2rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                ${product.price.toFixed(2)}
                {product.shipping.free && (
                  <Chip
                    label="Free Shipping"
                    size="small"
                    color="success"
                    sx={{ ml: 2, fontWeight: 500 }}
                  />
                )}
              </Typography>

              <Box
                sx={{
                  p: 2.5,
                  mb: 3,
                  borderRadius: 3,
                  bgcolor: alpha(theme.palette.background.paper, 0.7),
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                }}
              >
                <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
                  {product.description}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 3,
                  p: 2,
                  borderRadius: 3,
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                }}
              >
                <Typography variant="body1" fontWeight={500}>
                  Quantity:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    sx={{
                      borderRadius: 0,
                      bgcolor: alpha(theme.palette.background.paper, 0.7),
                    }}
                  >
                    <Remove />
                  </IconButton>
                  <Typography
                    variant="body1"
                    sx={{
                      mx: 2,
                      minWidth: 24,
                      textAlign: "center",
                      fontWeight: 600,
                    }}
                  >
                    {quantity}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    sx={{
                      borderRadius: 0,
                      bgcolor: alpha(theme.palette.background.paper, 0.7),
                    }}
                  >
                    <Add />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {product.stock} available
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCart />}
                  onClick={handleAddToCart}
                  sx={{
                    flex: 1,
                    borderRadius: 2,
                    py: 1.5,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    transition: "all 0.3s ease",
                    fontWeight: 600,
                    "&:hover": {
                      boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Add to Cart
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<CompareArrows />}
                  onClick={handleExchange}
                  sx={{
                    flex: 1,
                    borderRadius: 2,
                    py: 1.5,
                    fontWeight: 500,
                    borderWidth: "1.5px",
                    "&:hover": {
                      borderWidth: "1.5px",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
                    },
                  }}
                >
                  Propose Exchange
                </Button>

                <IconButton
                  color={isFavorite ? "error" : "default"}
                  onClick={toggleFavorite}
                  sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  {isFavorite ? <Favorite /> : <FavoriteBorder />}
                </IconButton>

                <IconButton
                  onClick={handleShare}
                  sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Share />
                </IconButton>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Condition
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {product.condition}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Warranty
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {product.warranty}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Shipping
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {product.shipping.free ? "Free Shipping" : "Standard"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Estimated Delivery
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {product.shipping.estimatedDelivery}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        {/* Tabs Section */}
        <Box sx={{ mt: 6 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              mb: 4,
              borderBottom: 1,
              borderColor: "divider",
              "& .MuiTab-root": {
                minWidth: 120,
                fontWeight: 600,
                fontSize: "0.95rem",
                textTransform: "none",
                transition: "all 0.2s ease",
                mx: 0.5,
                "&.Mui-selected": {
                  color: theme.palette.primary.main,
                },
              },
              "& .MuiTabs-indicator": {
                height: 3,
                borderRadius: 1.5,
              },
            }}
          >
            <Tab
              label="Description"
              icon={<Description />}
              iconPosition="start"
            />
            <Tab label="Specifications" icon={<Info />} iconPosition="start" />
            <Tab label="Reviews" icon={<Star />} iconPosition="start" />
            <Tab label="Seller Info" icon={<Person />} iconPosition="start" />
            <Tab
              label="Shipping"
              icon={<LocalShipping />}
              iconPosition="start"
            />
          </Tabs>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              minHeight: 300,
            }}
          >
            {tabValue === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Product Description
                </Typography>
                <Typography variant="body1" paragraph>
                  {product.description}
                </Typography>
                <Typography variant="body1">
                  This product is in {product.condition.toLowerCase()}{" "}
                  condition.{" "}
                  {product.condition === "New"
                    ? "It is brand new and unused with original packaging."
                    : product.condition === "Like New"
                    ? "It shows minimal signs of use and is in excellent working condition."
                    : product.condition === "Good"
                    ? "It shows some signs of use but is in good working condition."
                    : "It shows significant signs of use but is still functional."}
                </Typography>
              </Box>
            )}

            {tabValue === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Technical Specifications
                </Typography>
                <Grid container spacing={2}>
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <Grid item xs={12} sm={6} key={key}>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            {key}
                          </Typography>
                          <Typography variant="body1">{value}</Typography>
                        </Paper>
                      </Grid>
                    )
                  )}
                </Grid>
              </Box>
            )}

            {tabValue === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Customer Reviews
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Box sx={{ mr: 3 }}>
                    <Typography variant="h3" component="div">
                      {product.rating}
                    </Typography>
                    <Rating
                      value={parseFloat(product.rating)}
                      precision={0.5}
                      readOnly
                    />
                    <Typography variant="body2" color="text.secondary">
                      {product.reviews.length} reviews
                    </Typography>
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = product.reviews.filter(
                        (review) => Math.floor(review.rating) === star
                      ).length;
                      const percentage = (count / product.reviews.length) * 100;
                      return (
                        <Box
                          key={star}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 0.5,
                          }}
                        >
                          <Typography variant="body2" sx={{ minWidth: 30 }}>
                            {star}★
                          </Typography>
                          <Box sx={{ flexGrow: 1, mx: 1 }}>
                            <Box
                              sx={{
                                width: "100%",
                                backgroundColor: "grey.300",
                                height: 8,
                                borderRadius: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  width: `${percentage}%`,
                                  backgroundColor: "primary.main",
                                  height: 8,
                                  borderRadius: 1,
                                }}
                              />
                            </Box>
                          </Box>
                          <Typography variant="body2" sx={{ minWidth: 40 }}>
                            {count} ({percentage.toFixed(0)}%)
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Typography variant="h6" gutterBottom>
                  Write a Review
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleReviewSubmit}
                  sx={{ mb: 4 }}
                >
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Your Rating:
                    </Typography>
                    <Rating
                      value={reviewRating}
                      onChange={(event, newValue) => {
                        setReviewRating(newValue);
                      }}
                      precision={1}
                    />
                  </Box>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Your Review"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience with this product..."
                    sx={{ mb: 2 }}
                  />
                  <Button type="submit" variant="contained">
                    Submit Review
                  </Button>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Typography variant="h6" gutterBottom>
                  Customer Reviews ({product.reviews.length})
                </Typography>
                <List>
                  {product.reviews.map((review) => (
                    <React.Fragment key={review.id}>
                      <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                        <ListItemAvatar>
                          <Avatar src={review.avatar} alt={review.user} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Typography variant="subtitle1">
                                {review.user}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {review.date}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Box sx={{ mt: 1 }}>
                              <Rating
                                value={review.rating}
                                size="small"
                                readOnly
                                sx={{ mb: 1 }}
                              />
                              <Typography variant="body2" color="text.primary">
                                {review.text}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              </Box>
            )}

            {tabValue === 3 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  About the Seller
                </Typography>
                <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Avatar sx={{ width: 60, height: 60, mr: 2 }}>
                          {product.seller.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="h6">
                            {product.seller.name}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Rating
                              value={parseFloat(product.seller.rating)}
                              precision={0.5}
                              size="small"
                              readOnly
                            />
                            <Typography variant="body2" sx={{ ml: 1 }}>
                              ({product.seller.rating})
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Typography variant="body2" paragraph>
                        <strong>Member since:</strong> {product.seller.joinDate}
                      </Typography>
                      <Typography variant="body2" paragraph>
                        <strong>Total sales:</strong>{" "}
                        {product.seller.totalSales} items
                      </Typography>
                      <Typography variant="body2">
                        <strong>Response rate:</strong>{" "}
                        {product.seller.responseRate}%
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant="outlined"
                        fullWidth
                        component={Link}
                        to={`/messages?seller=${product.seller.id}`}
                        sx={{ mb: 2 }}
                      >
                        Contact Seller
                      </Button>
                      <Button
                        variant="outlined"
                        fullWidth
                        component={Link}
                        to={`/profile/${product.seller.id}`}
                        sx={{ mb: 2 }}
                      >
                        View Profile
                      </Button>
                      <Button variant="outlined" color="error" fullWidth>
                        Report Seller
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>

                <Typography variant="h6" gutterBottom>
                  Other Items from this Seller
                </Typography>
                <Grid container spacing={2}>
                  {relatedProducts.map((relatedProduct) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={2}
                      key={relatedProduct.id}
                    >
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          borderRadius: 3,
                          overflow: "hidden",
                          transition: "all 0.3s ease",
                          boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                          "&:hover": {
                            transform: "translateY(-8px)",
                            boxShadow: "0 12px 25px rgba(0,0,0,0.1)",
                          },
                          position: "relative",
                        }}
                        component={Link}
                        to={`/products/${relatedProduct.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Box sx={{ position: "relative" }}>
                          <CardMedia
                            component="img"
                            height="160"
                            image={relatedProduct.image}
                            alt={relatedProduct.name}
                            sx={{
                              transition: "transform 0.5s ease",
                              "&:hover": {
                                transform: "scale(1.05)",
                              },
                            }}
                          />
                          <Chip
                            label={relatedProduct.condition}
                            size="small"
                            color={
                              relatedProduct.condition === "New"
                                ? "success"
                                : relatedProduct.condition === "Like New"
                                ? "info"
                                : relatedProduct.condition === "Good"
                                ? "primary"
                                : "warning"
                            }
                            sx={{
                              position: "absolute",
                              top: 10,
                              right: 10,
                              fontWeight: 500,
                              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                            }}
                          />
                        </Box>

                        <CardContent sx={{ flexGrow: 1, p: 2 }}>
                          <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{
                              fontWeight: 600,
                              mb: 0.5,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              lineHeight: 1.3,
                              height: 42,
                            }}
                          >
                            {relatedProduct.name}
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            {relatedProduct.brand}
                          </Typography>

                          <Typography
                            variant="h6"
                            color="primary"
                            sx={{
                              fontWeight: 700,
                              mb: 1,
                            }}
                          >
                            ${relatedProduct.price.toFixed(2)}
                          </Typography>

                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Rating
                              value={parseFloat(relatedProduct.rating)}
                              precision={0.5}
                              size="small"
                              readOnly
                            />
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ ml: 1 }}
                            >
                              ({relatedProduct.reviews})
                            </Typography>
                          </Box>
                        </CardContent>

                        <CardActions sx={{ p: 2, pt: 0 }}>
                          <Button
                            size="small"
                            variant="outlined"
                            fullWidth
                            sx={{
                              borderRadius: 2,
                              textTransform: "none",
                              fontWeight: 600,
                              py: 0.5,
                            }}
                          >
                            View Details
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {tabValue === 4 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Shipping Information
                </Typography>
                <Typography variant="body1" paragraph>
                  {product.shipping.free ? "Free Shipping" : "Standard"}
                </Typography>
                <Typography variant="body1">
                  Estimated Delivery: {product.shipping.estimatedDelivery}
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>

        {/* Related Products */}
        <Box sx={{ mt: 8, mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: 0,
                  width: 60,
                  height: 3,
                  borderRadius: 1.5,
                  bgcolor: theme.palette.secondary.main,
                },
              }}
            >
              You May Also Like
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              pb: 2,
              "&::-webkit-scrollbar": {
                height: 8,
              },
              "&::-webkit-scrollbar-track": {
                bgcolor: alpha(theme.palette.divider, 0.1),
                borderRadius: 4,
              },
              "&::-webkit-scrollbar-thumb": {
                bgcolor: alpha(theme.palette.primary.main, 0.2),
                borderRadius: 4,
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.3),
                },
              },
            }}
          >
            {Array(8)
              .fill()
              .map((_, index) => {
                const randomCategory = [
                  "Smartphones",
                  "Laptops",
                  "Tablets",
                  "Audio",
                  "Cameras",
                  "Accessories",
                ][Math.floor(Math.random() * 6)];
                const randomBrand = getRandomBrandByCategory(randomCategory);
                const randomName = getProductNameByCategory(
                  randomCategory,
                  index % 5
                );
                const randomPrice = Math.floor(Math.random() * 1000) + 100;
                const randomRating = (Math.random() * 2 + 3).toFixed(1);
                const randomReviews = Math.floor(Math.random() * 100);

                return (
                  <Card
                    key={index}
                    sx={{
                      minWidth: 220,
                      maxWidth: 220,
                      borderRadius: 3,
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 25px rgba(0,0,0,0.1)",
                      },
                      flexShrink: 0,
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={`https://source.unsplash.com/300x200/?${randomCategory.toLowerCase()}&sig=${index}`}
                      alt={randomName}
                    />
                    <CardContent sx={{ p: 2 }}>
                      <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{
                          fontWeight: 600,
                          mb: 0.5,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {randomName}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        {randomBrand}
                      </Typography>

                      <Typography
                        variant="h6"
                        color="primary"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                        }}
                      >
                        ${randomPrice.toFixed(2)}
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Rating
                          value={parseFloat(randomRating)}
                          precision={0.5}
                          size="small"
                          readOnly
                        />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ ml: 1 }}
                        >
                          ({randomReviews})
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        fullWidth
                        component={Link}
                        to={`/products/${1000 + index}`}
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 600,
                          py: 0.5,
                        }}
                      >
                        View Details
                      </Button>
                    </CardActions>
                  </Card>
                );
              })}
          </Box>
        </Box>

        <Box sx={{ mt: 6, mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 3,
              position: "relative",
              "&:after": {
                content: '""',
                position: "absolute",
                bottom: -8,
                left: 0,
                width: 60,
                height: 3,
                borderRadius: 1.5,
                bgcolor: theme.palette.primary.main,
              },
            }}
          >
            Product Highlights
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  height: "100%",
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      mr: 2,
                    }}
                  >
                    <Info />
                  </Avatar>
                  <Typography variant="h6" fontWeight={600}>
                    Key Features
                  </Typography>
                </Box>

                <List disablePadding>
                  {Object.entries(product.specifications)
                    .slice(0, 4)
                    .map(([key, value]) => (
                      <ListItem key={key} disablePadding sx={{ mb: 1 }}>
                        <ListItemText
                          primary={
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {key}
                              </Typography>
                              <Typography variant="body2" fontWeight={500}>
                                {value}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  height: "100%",
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: alpha(theme.palette.success.main, 0.1),
                      color: theme.palette.success.main,
                      mr: 2,
                    }}
                  >
                    <LocalShipping />
                  </Avatar>
                  <Typography variant="h6" fontWeight={600}>
                    Shipping
                  </Typography>
                </Box>

                <List disablePadding>
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Method
                          </Typography>
                          <Typography variant="body2" fontWeight={500}>
                            {product.shipping.free
                              ? "Free Shipping"
                              : "Standard"}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Estimated Delivery
                          </Typography>
                          <Typography variant="body2" fontWeight={500}>
                            {product.shipping.estimatedDelivery}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Return Policy
                          </Typography>
                          <Typography variant="body2" fontWeight={500}>
                            30 days
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  height: "100%",
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: alpha(theme.palette.warning.main, 0.1),
                      color: theme.palette.warning.main,
                      mr: 2,
                    }}
                  >
                    <Security />
                  </Avatar>
                  <Typography variant="h6" fontWeight={600}>
                    Warranty
                  </Typography>
                </Box>

                <List disablePadding>
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Coverage
                          </Typography>
                          <Typography variant="body2" fontWeight={500}>
                            {product.warranty}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Condition
                          </Typography>
                          <Typography variant="body2" fontWeight={500}>
                            {product.condition}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Support
                          </Typography>
                          <Typography variant="body2" fontWeight={500}>
                            Available
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Image Zoom Dialog */}
      <Dialog
        open={zoomDialogOpen}
        onClose={handleZoomToggle}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
          },
        }}
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              {product.name}
            </Typography>
            <IconButton
              onClick={handleZoomToggle}
              sx={{
                bgcolor: alpha(theme.palette.divider, 0.1),
                "&:hover": {
                  bgcolor: alpha(theme.palette.divider, 0.2),
                },
              }}
            >
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              minHeight: "70vh",
              bgcolor: "#000",
            }}
          >
            <img
              src={product.images[imageIndex]}
              alt={`${product.name} - Image ${imageIndex + 1}`}
              style={{
                maxWidth: "100%",
                maxHeight: "70vh",
                objectFit: "contain",
              }}
            />

            <IconButton
              sx={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.3)",
                },
              }}
              onClick={() => handleImageNavigation(-1)}
            >
              <ArrowBack />
            </IconButton>

            <IconButton
              sx={{
                position: "absolute",
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.3)",
                },
              }}
              onClick={() => handleImageNavigation(1)}
            >
              <ArrowForward />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1.5,
              p: 2,
              bgcolor: "#f5f5f5",
            }}
          >
            {product.images.map((image, index) => (
              <Box
                key={index}
                sx={{
                  width: 80,
                  height: 60,
                  borderRadius: 1,
                  overflow: "hidden",
                  border:
                    index === imageIndex
                      ? `2px solid ${theme.palette.primary.main}`
                      : `1px solid ${theme.palette.divider}`,
                  cursor: "pointer",
                  opacity: index === imageIndex ? 1 : 0.6,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
                onClick={() => setImageIndex(index)}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            ))}
          </Box>
        </DialogContent>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ mb: 2, mr: 2 }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            "& .MuiAlert-icon": {
              fontSize: "1.5rem",
            },
            "& .MuiAlert-message": {
              fontSize: "0.95rem",
              fontWeight: 500,
            },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default ProductDetail;
