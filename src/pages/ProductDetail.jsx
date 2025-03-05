import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Button,
  Box,
  Grid,
  Paper,
  Tabs,
  Tab,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  Chip,
  Rating,
  TextField,
  IconButton,
} from "@mui/material";
import {
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  CompareArrows,
  Share,
  ArrowBack,
  Person,
  Star,
  Message,
  Close,
} from "@mui/icons-material";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/product/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [exchangeDialogOpen, setExchangeDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Here you would fetch the product from your API
        // For now, we'll use mock data
        setTimeout(() => {
          const mockProduct = {
            id: parseInt(id),
            name: `Electronic Device ${id}`,
            description:
              "This is a high-quality electronic device with great features and excellent condition. It comes with all original accessories and packaging. The device has been well-maintained and shows minimal signs of use.",
            price: 599.99,
            originalPrice: 799.99,
            discount: 25,
            condition: "Like New",
            brand: "Samsung",
            model: "Galaxy S21",
            category: "Smartphone",
            rating: 4.5,
            reviewCount: 28,
            seller: {
              id: 1,
              name: "John Doe",
              avatar: "https://via.placeholder.com/40",
              rating: 4.8,
              joinedDate: "2022-01-15",
              verified: true,
            },
            specifications: [
              { name: "Display", value: "6.2-inch Dynamic AMOLED 2X, 120Hz" },
              { name: "Processor", value: "Exynos 2100 / Snapdragon 888" },
              { name: "RAM", value: "8GB" },
              { name: "Storage", value: "128GB" },
              {
                name: "Camera",
                value: "12MP Wide, 12MP Ultrawide, 64MP Telephoto",
              },
              { name: "Battery", value: "4000mAh" },
              { name: "OS", value: "Android 11" },
            ],
            images: [
              "https://via.placeholder.com/600x400?text=Product+Image+1",
              "https://via.placeholder.com/600x400?text=Product+Image+2",
              "https://via.placeholder.com/600x400?text=Product+Image+3",
              "https://via.placeholder.com/600x400?text=Product+Image+4",
            ],
            reviews: [
              {
                id: 1,
                user: {
                  name: "Alice Johnson",
                  avatar: "https://via.placeholder.com/40",
                },
                rating: 5,
                date: "2023-06-15",
                comment:
                  "Excellent product! Works perfectly and arrived in the condition described.",
              },
              {
                id: 2,
                user: {
                  name: "Bob Smith",
                  avatar: "https://via.placeholder.com/40",
                },
                rating: 4,
                date: "2023-05-22",
                comment:
                  "Good value for money. Minor scratches but nothing that affects functionality.",
              },
              {
                id: 3,
                user: {
                  name: "Carol White",
                  avatar: "https://via.placeholder.com/40",
                },
                rating: 5,
                date: "2023-04-10",
                comment:
                  "Seller was very responsive and the item was exactly as described. Would buy from again!",
              },
            ],
            exchangeAvailable: true,
            exchangePreferences:
              "Looking for iPhones (X or newer), iPads, or MacBooks in good condition. Open to other high-end smartphones as well.",
            inStock: 3,
            shippingOptions: [
              {
                method: "Standard",
                price: 5.99,
                duration: "3-5 business days",
              },
              {
                method: "Express",
                price: 12.99,
                duration: "1-2 business days",
              },
            ],
            warranty: "30-day seller warranty",
            returnPolicy: "Returns accepted within 14 days",
          };

          setProduct(mockProduct);

          // Mock related products
          const mockRelatedProducts = Array(4)
            .fill()
            .map((_, index) => ({
              id: 100 + index,
              name: `Related Device ${index + 1}`,
              description:
                "This is a related electronic device with similar features.",
              price: Math.floor(Math.random() * 500) + 300,
              originalPrice: Math.floor(Math.random() * 700) + 400,
              image: `https://via.placeholder.com/300x200?text=Related+${
                index + 1
              }`,
              condition: ["New", "Like New", "Good"][
                Math.floor(Math.random() * 3)
              ],
              rating: (Math.random() * 2 + 3).toFixed(1),
              reviewCount: Math.floor(Math.random() * 50),
              exchangeAvailable: Math.random() > 0.5,
            }));

          setRelatedProducts(mockRelatedProducts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product details. Please try again.");
        setLoading(false);
      }
    };

    fetchProduct();
    // Reset state when product ID changes
    setActiveTab(0);
    setQuantity(1);
    setSelectedImage(0);
    window.scrollTo(0, 0);
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (value > 0 && value <= (product?.inStock || 1)) {
      setQuantity(value);
    }
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const handleExchangeDialogOpen = () => {
    setExchangeDialogOpen(true);
  };

  const handleExchangeDialogClose = () => {
    setExchangeDialogOpen(false);
  };

  const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  if (loading) {
    return (
      <>
        <Header />
        <Container
          sx={{
            py: 8,
            minHeight: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Container>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <Container sx={{ py: 8, minHeight: "70vh" }}>
          <Alert severity="error">{error}</Alert>
          <Button
            component={Link}
            to="/products"
            startIcon={<ArrowBack />}
            sx={{ mt: 2 }}
          >
            Back to Products
          </Button>
        </Container>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <Container sx={{ py: 8, minHeight: "70vh" }}>
          <Alert severity="info">Product not found</Alert>
          <Button
            component={Link}
            to="/products"
            startIcon={<ArrowBack />}
            sx={{ mt: 2 }}
          >
            Back to Products
          </Button>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Container sx={{ py: 4 }}>
        <Button
          component={Link}
          to="/products"
          startIcon={<ArrowBack />}
          sx={{ mb: 3 }}
        >
          Back to Products
        </Button>

        <Grid container spacing={4}>
          {/* Product Images */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, mb: 2 }}>
              <Box
                sx={{
                  width: "100%",
                  height: 400,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                  mb: 2,
                }}
              >
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>

              <Box sx={{ display: "flex", gap: 1, overflowX: "auto", pb: 1 }}>
                {product.images.map((image, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 80,
                      height: 80,
                      border:
                        index === selectedImage
                          ? "2px solid #1976d2"
                          : "1px solid #ddd",
                      borderRadius: 1,
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                    onClick={() => handleImageSelect(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Paper>

            {/* Seller Information */}
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Seller Information
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar src={product.seller.avatar} sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="subtitle1">
                    {product.seller.name}
                    {product.seller.verified && (
                      <Chip
                        label="Verified"
                        size="small"
                        color="primary"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Rating
                      value={product.seller.rating}
                      precision={0.1}
                      readOnly
                      size="small"
                    />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {product.seller.rating} rating
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Member since{" "}
                    {new Date(product.seller.joinedDate).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="outlined"
                startIcon={<Message />}
                fullWidth
                component={Link}
                to={`/messages?seller=${product.seller.id}`}
              >
                Contact Seller
              </Button>
            </Paper>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box>
                  <Typography variant="h4" component="h1" gutterBottom>
                    {product.name}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Rating value={product.rating} precision={0.5} readOnly />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      ({product.reviewCount} reviews)
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                    <Chip label={product.condition} color="primary" />
                    <Chip label={product.category} />
                    <Chip label={`${product.brand} ${product.model}`} />
                  </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    onClick={handleFavoriteToggle}
                    color={isFavorite ? "error" : "default"}
                  >
                    {isFavorite ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                  <IconButton>
                    <Share />
                  </IconButton>
                </Box>
              </Box>

              <Box sx={{ my: 2 }}>
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                  <Typography variant="h4" color="primary" fontWeight="bold">
                    ${product.price.toFixed(2)}
                  </Typography>

                  {product.originalPrice && (
                    <>
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ textDecoration: "line-through" }}
                      >
                        ${product.originalPrice.toFixed(2)}
                      </Typography>

                      <Chip
                        label={`${product.discount}% OFF`}
                        color="error"
                        size="small"
                      />
                    </>
                  )}
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {product.inStock > 0 ? (
                    <>
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        In Stock
                      </span>
                      {product.inStock < 5 &&
                        ` - Only ${product.inStock} left!`}
                    </>
                  ) : (
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      Out of Stock
                    </span>
                  )}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" paragraph>
                  {product.description}
                </Typography>
              </Box>

              {product.inStock > 0 && (
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
                >
                  <TextField
                    label="Quantity"
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    InputProps={{
                      inputProps: { min: 1, max: product.inStock },
                    }}
                    sx={{ width: 100 }}
                  />
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetail;
