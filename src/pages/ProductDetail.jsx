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
        // For now, we'll use mock data
        setTimeout(() => {
          const mockProduct = {
            id: parseInt(id),
            name: `Product ${id}`,
            description: `This is a detailed description for Product ${id}. It includes information about the features, specifications, and condition of the product. The product is in good working condition with minor signs of use.`,
            price: Math.floor(Math.random() * 1000) + 100,
            images: [
              `https://via.placeholder.com/600x400?text=Product${id}_Image1`,
              `https://via.placeholder.com/600x400?text=Product${id}_Image2`,
              `https://via.placeholder.com/600x400?text=Product${id}_Image3`,
              `https://via.placeholder.com/600x400?text=Product${id}_Image4`,
            ],
            category: [
              "Smartphones",
              "Laptops",
              "Tablets",
              "Audio",
              "Cameras",
              "Accessories",
            ][Math.floor(Math.random() * 6)],
            brand: ["Apple", "Samsung", "Sony", "Dell", "HP", "Lenovo"][
              Math.floor(Math.random() * 6)
            ],
            rating: (Math.random() * 2 + 3).toFixed(1), // Between 3 and 5
            reviews: Array(Math.floor(Math.random() * 10) + 5)
              .fill()
              .map((_, index) => ({
                id: index + 1,
                user: `User ${Math.floor(Math.random() * 100) + 1}`,
                avatar: `https://via.placeholder.com/40?text=U${index + 1}`,
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

          // Generate related products
          const mockRelatedProducts = Array(4)
            .fill()
            .map((_, index) => ({
              id: parseInt(id) + 100 + index,
              name: `Related Product ${index + 1}`,
              description: `This is a description for Related Product ${
                index + 1
              }.`,
              price: Math.floor(Math.random() * 1000) + 100,
              image: `https://via.placeholder.com/300x200?text=Related${
                index + 1
              }`,
              category: mockProduct.category,
              brand: ["Apple", "Samsung", "Sony", "Dell", "HP", "Lenovo"][
                Math.floor(Math.random() * 6)
              ],
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
    // Here you would add the product to the cart
    setSnackbar({
      open: true,
      message: `${quantity} ${
        quantity > 1 ? "items" : "item"
      } added to your cart`,
      severity: "success",
    });
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
        <Grid container spacing={4}>
          {/* Product Images */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, mb: 2, position: "relative" }}>
              <Box
                component="img"
                src={product.images[imageIndex]}
                alt={product.name}
                sx={{
                  width: "100%",
                  height: "auto",
                  cursor: "zoom-in",
                  borderRadius: 1,
                }}
                onClick={handleZoomToggle}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  transform: "translateY(-50%)",
                  zIndex: 1,
                }}
              >
                <IconButton
                  onClick={() => handleImageNavigation("prev")}
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.7)",
                    "&:hover": { bgcolor: "rgba(255, 255, 255, 0.9)" },
                  }}
                >
                  <ArrowBack />
                </IconButton>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: 0,
                  transform: "translateY(-50%)",
                  zIndex: 1,
                }}
              >
                <IconButton
                  onClick={() => handleImageNavigation("next")}
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.7)",
                    "&:hover": { bgcolor: "rgba(255, 255, 255, 0.9)" },
                  }}
                >
                  <ArrowForward />
                </IconButton>
              </Box>
            </Paper>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {product.images.map((image, index) => (
                <Box
                  key={index}
                  component="img"
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  sx={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    cursor: "pointer",
                    borderRadius: 1,
                    border:
                      index === imageIndex
                        ? "2px solid"
                        : "2px solid transparent",
                    borderColor:
                      index === imageIndex ? "primary.main" : "transparent",
                  }}
                  onClick={() => setImageIndex(index)}
                />
              ))}
            </Box>
          </Grid>

          {/* Product Info */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Rating
                value={parseFloat(product.rating)}
                precision={0.5}
                readOnly
              />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {product.rating} ({product.reviews.length} reviews)
              </Typography>
            </Box>
            <Typography variant="h5" color="primary" gutterBottom>
              ${product.price.toFixed(2)}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <Chip
                label={product.condition}
                color="primary"
                variant="outlined"
              />
              <Chip label={product.brand} variant="outlined" />
              <Chip label={product.category} variant="outlined" />
            </Box>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Seller:</strong> {product.seller.name}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Condition:</strong> {product.condition}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Warranty:</strong> {product.warranty}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Shipping:</strong>{" "}
                  {product.shipping.free ? "Free" : "Standard"} (
                  {product.shipping.estimatedDelivery})
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  color={product.stock > 0 ? "success.main" : "error.main"}
                >
                  <strong>Availability:</strong>{" "}
                  {product.stock > 0
                    ? `In Stock (${product.stock} available)`
                    : "Out of Stock"}
                </Typography>
              </Grid>
            </Grid>

            {product.stock > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Quantity:
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Remove />
                  </IconButton>
                  <TextField
                    value={quantity}
                    inputProps={{
                      readOnly: true,
                      style: { textAlign: "center" },
                    }}
                    sx={{ width: 60, mx: 1 }}
                  />
                  <IconButton
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                  >
                    <Add />
                  </IconButton>
                </Box>
              </Box>
            )}

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
              <Button
                variant="contained"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                sx={{ flex: isMobile ? "1 1 100%" : "1 1 auto" }}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                startIcon={<CompareArrows />}
                onClick={handleExchange}
                sx={{ flex: isMobile ? "1 1 100%" : "1 1 auto" }}
              >
                Propose Exchange
              </Button>
              <IconButton
                onClick={toggleFavorite}
                color={isFavorite ? "primary" : "default"}
              >
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
              <IconButton onClick={handleShare}>
                <Share />
              </IconButton>
              <IconButton color="error">
                <Flag />
              </IconButton>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {["Secure Payment", "Verified Seller", "Return Policy"].map(
                (feature, index) => (
                  <Chip
                    key={index}
                    icon={
                      index === 0 ? (
                        <Security />
                      ) : index === 1 ? (
                        <Person />
                      ) : (
                        <LocalShipping />
                      )
                    }
                    label={feature}
                    variant="outlined"
                    sx={{ borderRadius: 1 }}
                  />
                )
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Tabs Section */}
        <Box sx={{ mt: 6 }}>
          <Paper sx={{ mb: 4 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Tab icon={<Description />} label="Description" />
              <Tab icon={<Info />} label="Specifications" />
              <Tab
                icon={<Star />}
                label={`Reviews (${product.reviews.length})`}
              />
              <Tab icon={<Person />} label="Seller Information" />
            </Tabs>

            <Box sx={{ p: 3 }}>
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
                        const percentage =
                          (count / product.reviews.length) * 100;
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
                                <Typography
                                  variant="body2"
                                  color="text.primary"
                                >
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
                          <strong>Member since:</strong>{" "}
                          {product.seller.joinDate}
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
                      <Grid item xs={6} sm={3} key={relatedProduct.id}>
                        <Card
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="140"
                            image={relatedProduct.image}
                            alt={relatedProduct.name}
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle2" noWrap>
                              {relatedProduct.name}
                            </Typography>
                            <Typography variant="body2" color="primary">
                              ${relatedProduct.price.toFixed(2)}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button
                              size="small"
                              component={Link}
                              to={`/products/${relatedProduct.id}`}
                            >
                              View
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Box>
          </Paper>
        </Box>

        {/* Related Products */}
        <Box sx={{ mt: 6, mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Related Products
          </Typography>
          <Grid container spacing={3}>
            {relatedProducts.map((relatedProduct) => (
              <Grid item xs={12} sm={6} md={3} key={relatedProduct.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={relatedProduct.image}
                    alt={relatedProduct.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" noWrap>
                      {relatedProduct.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {relatedProduct.category}
                    </Typography>
                    <Typography variant="h6" color="primary" gutterBottom>
                      ${relatedProduct.price.toFixed(2)}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
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
                    <Chip size="small" label={relatedProduct.condition} />
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      component={Link}
                      to={`/products/${relatedProduct.id}`}
                    >
                      View Details
                    </Button>
                    <Button size="small" startIcon={<ShoppingCart />}>
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Image Zoom Dialog */}
      <Dialog
        open={zoomDialogOpen}
        onClose={handleZoomToggle}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {product.name}
          <IconButton onClick={handleZoomToggle}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            component="img"
            src={product.images[imageIndex]}
            alt={product.name}
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: "80vh",
              objectFit: "contain",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleImageNavigation("prev")}
            startIcon={<ArrowBack />}
          >
            Previous
          </Button>
          <Typography>
            {imageIndex + 1} / {product.images.length}
          </Typography>
          <Button
            onClick={() => handleImageNavigation("next")}
            endIcon={<ArrowForward />}
          >
            Next
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default ProductDetail;
