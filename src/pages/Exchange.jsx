import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  TextField,
  Divider,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Rating,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
  useTheme,
  Breadcrumbs,
  Tabs,
  Tab,
} from "@mui/material";
import {
  CompareArrows,
  Search,
  Add,
  Delete,
  ArrowForward,
  Check,
  Close,
  Message,
  Info,
  Star,
  ArrowBack,
  AttachMoney,
  Send,
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  Share,
  LocalShipping,
  Remove,
  Description,
  Person,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { alpha } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";

const Exchange = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialProductId = queryParams.get("product");

  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [targetProduct, setTargetProduct] = useState(null);
  const [myProducts, setMyProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [additionalCash, setAdditionalCash] = useState(0);
  const [cashOption, setCashOption] = useState(false);
  const [message, setMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [exchangeValue, setExchangeValue] = useState({
    fair: false,
    difference: 0,
  });
  const [tabValue, setTabValue] = useState(0);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const steps = [
    "Select Target Product",
    "Choose Your Offer",
    "Review & Submit",
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Here you would fetch data from your API
        // For now, we'll use mock data
        setTimeout(() => {
          // Generate target product if ID is provided
          if (initialProductId) {
            const mockTargetProduct = {
              id: parseInt(initialProductId),
              name: `Product ${initialProductId}`,
              description: `This is a detailed description for Product ${initialProductId}. It includes information about the features, specifications, and condition of the product.`,
              price: Math.floor(Math.random() * 1000) + 100,
              image: `https://via.placeholder.com/300x200?text=Product${initialProductId}`,
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
              reviews: Math.floor(Math.random() * 100),
              seller: {
                id: Math.floor(Math.random() * 100) + 1,
                name: `Seller ${Math.floor(Math.random() * 100) + 1}`,
                rating: (Math.random() * 2 + 3).toFixed(1), // Between 3 and 5
              },
              condition: ["New", "Like New", "Good", "Fair"][
                Math.floor(Math.random() * 4)
              ],
              features: ["Feature 1", "Feature 2", "Feature 3"],
            };
            setTargetProduct(mockTargetProduct);
            setActiveStep(1); // Skip to step 2 if product is provided
          }

          // Generate my products
          const mockMyProducts = Array(8)
            .fill()
            .map((_, index) => ({
              id: index + 1,
              name: `My Product ${index + 1}`,
              description: `This is a description for My Product ${index + 1}.`,
              price: Math.floor(Math.random() * 1000) + 100,
              image: `https://via.placeholder.com/300x200?text=MyProduct${
                index + 1
              }`,
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
              rating: (Math.random() * 5).toFixed(1),
              reviews: Math.floor(Math.random() * 100),
              condition: ["New", "Like New", "Good", "Fair"][
                Math.floor(Math.random() * 4)
              ],
              features: [
                `Feature 1 of Product ${index + 1}`,
                `Feature 2 of Product ${index + 1}`,
              ],
            }));

          setMyProducts(mockMyProducts);
          setFilteredProducts(mockMyProducts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching exchange data:", error);
        setError("Failed to load exchange data. Please try again.");
        setLoading(false);
      }
    };

    fetchData();
  }, [initialProductId]);

  useEffect(() => {
    // Filter my products based on search query
    if (searchQuery.trim() === "") {
      setFilteredProducts(myProducts);
    } else {
      const filtered = myProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, myProducts]);

  useEffect(() => {
    // Tính toán giá trị trao đổi
    if (selectedProduct && targetProduct) {
      const offerValue =
        selectedProduct.price + (cashOption ? additionalCash : 0);
      const targetValue = targetProduct.price;
      const difference = offerValue - targetValue;

      // Xác định xem đề xuất có công bằng không (trong phạm vi ±10%)
      const isFair = Math.abs(difference) <= targetValue * 0.1;

      setExchangeValue({
        fair: isFair,
        difference: difference,
      });
    }
  }, [selectedProduct, targetProduct, additionalCash, cashOption]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleAdditionalCashChange = (event) => {
    const value = event.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setAdditionalCash(value === "" ? 0 : parseInt(value));
    }
  };

  const handleCashOptionChange = (event) => {
    setCashOption(event.target.checked);
    if (!event.target.checked) {
      setAdditionalCash(0);
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmitExchange = () => {
    // Here you would submit the exchange proposal to your API
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmExchange = () => {
    setDialogOpen(false);
    setSnackbar({
      open: true,
      message: "Exchange proposal submitted successfully!",
      severity: "success",
    });
    // Redirect to exchanges page after a delay
    setTimeout(() => {
      navigate("/profile?tab=exchanges");
    }, 2000);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewText.trim() === "") {
      setSnackbar({
        open: true,
        message: "Please enter a review text",
        severity: "error",
      });
      return;
    }

    // In a real app, you would submit the review to your API
    // For now, we'll just show a snackbar and clear the form
    setSnackbar({
      open: true,
      message: "Your review has been submitted",
      severity: "success",
    });
    setReviewText("");
    setReviewRating(5);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Select a Product to Exchange For
            </Typography>
            <Typography variant="body1" paragraph>
              Browse products and select one that you'd like to propose an
              exchange for.
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/products"
              sx={{ mb: 3 }}
            >
              Browse Products
            </Button>
            <Typography variant="body2" color="text.secondary">
              Or, if you already know which product you want to exchange for,
              enter its ID below:
            </Typography>
            <Box sx={{ display: "flex", mt: 2 }}>
              <TextField
                label="Product ID"
                variant="outlined"
                size="small"
                sx={{ mr: 2 }}
              />
              <Button variant="outlined">Find Product</Button>
            </Box>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Choose Your Offer
            </Typography>

            {targetProduct && (
              <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="subtitle1" gutterBottom>
                  You want to exchange for:
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <img
                      src={targetProduct.image}
                      alt={targetProduct.name}
                      style={{ width: "100%", borderRadius: 8 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Typography variant="h6">{targetProduct.name}</Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      {targetProduct.category} • {targetProduct.brand} •{" "}
                      {targetProduct.condition}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Rating
                        value={parseFloat(targetProduct.rating)}
                        precision={0.5}
                        size="small"
                        readOnly
                      />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ ml: 1 }}
                      >
                        ({targetProduct.reviews} reviews)
                      </Typography>
                    </Box>
                    <Typography variant="h6" color="primary" gutterBottom>
                      ${targetProduct.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body2">
                      Seller: {targetProduct.seller.name}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      to={`/products/${targetProduct.id}`}
                      sx={{ mt: 2 }}
                    >
                      View Details
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            )}

            <Typography variant="subtitle1" gutterBottom>
              Select one of your products to offer in exchange:
            </Typography>

            <TextField
              fullWidth
              placeholder="Search your products..."
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <Search sx={{ color: "action.active", mr: 1 }} />
                ),
              }}
            />

            {filteredProducts.length === 0 ? (
              <Paper sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="body1" paragraph>
                  No products found matching your search.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  component={Link}
                  to="/products/new"
                >
                  Add New Product
                </Button>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {filteredProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <motion.div
                      whileHover={{ y: -10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          border:
                            selectedProduct?.id === product.id
                              ? "2px solid"
                              : "none",
                          borderColor: "primary.main",
                          borderRadius: 3,
                          overflow: "hidden",
                          boxShadow:
                            selectedProduct?.id === product.id
                              ? `0 8px 24px ${alpha(
                                  theme.palette.primary.main,
                                  0.4
                                )}`
                              : "0 4px 12px rgba(0,0,0,0.05)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            boxShadow: "0 12px 28px rgba(0,0,0,0.15)",
                          },
                        }}
                        onClick={() => handleSelectProduct(product)}
                      >
                        <Box sx={{ position: "relative" }}>
                          <CardMedia
                            component="img"
                            height="160"
                            image={product.image}
                            alt={product.name}
                            sx={{
                              objectFit: "cover",
                              transition: "transform 0.5s ease",
                              "&:hover": {
                                transform: "scale(1.05)",
                              },
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
                              position: "absolute",
                              top: 10,
                              right: 10,
                              fontWeight: 500,
                              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                            }}
                          />
                        </Box>
                        <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                          <Typography
                            variant="h6"
                            component="div"
                            noWrap
                            sx={{
                              fontWeight: 600,
                              fontSize: "1rem",
                              mb: 0.5,
                            }}
                          >
                            {product.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                            sx={{ mb: 1.5 }}
                          >
                            {product.category} • {product.brand}
                          </Typography>
                          <Typography
                            variant="h6"
                            color="primary"
                            gutterBottom
                            sx={{
                              fontWeight: 700,
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <AttachMoney sx={{ fontSize: 20 }} />
                            {product.price.toFixed(2)}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            <Rating
                              value={parseFloat(product.rating)}
                              precision={0.5}
                              size="small"
                              readOnly
                            />
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ ml: 1 }}
                            >
                              ({product.reviews})
                            </Typography>
                          </Box>
                        </CardContent>
                        <CardActions sx={{ p: 2, pt: 0 }}>
                          <Button
                            size="medium"
                            variant={
                              selectedProduct?.id === product.id
                                ? "contained"
                                : "outlined"
                            }
                            fullWidth
                            onClick={() => handleSelectProduct(product)}
                            sx={{
                              borderRadius: 2,
                              py: 1,
                              textTransform: "none",
                              fontWeight: 600,
                            }}
                          >
                            {selectedProduct?.id === product.id
                              ? "Selected"
                              : "Select"}
                          </Button>
                        </CardActions>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            )}

            <Box sx={{ mt: 4 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={cashOption}
                    onChange={handleCashOptionChange}
                  />
                }
                label="Add cash to your offer"
              />

              {cashOption && (
                <TextField
                  label="Additional Cash Amount ($)"
                  type="number"
                  value={additionalCash}
                  onChange={handleAdditionalCashChange}
                  fullWidth
                  sx={{ mt: 2 }}
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                />
              )}
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review & Submit Your Exchange Proposal
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12} md={5}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: "100%",
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${alpha(
                      theme.palette.background.paper,
                      0.9
                    )}, ${alpha(theme.palette.background.paper, 0.7)})`,
                    backdropFilter: "blur(20px)",
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 15px 50px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    fontWeight="600"
                    color="secondary.main"
                  >
                    Your Offer:
                  </Typography>
                  {selectedProduct ? (
                    <Box>
                      <Box
                        sx={{
                          position: "relative",
                          borderRadius: 3,
                          overflow: "hidden",
                          mb: 2,
                          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                        }}
                      >
                        <img
                          src={selectedProduct.image}
                          alt={selectedProduct.name}
                          style={{
                            width: "100%",
                            aspectRatio: "4/3",
                            objectFit: "cover",
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            p: 1.5,
                            background:
                              "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            color="white"
                            fontWeight="600"
                          >
                            {selectedProduct.name}
                          </Typography>
                          <Box sx={{ display: "flex", gap: 0.5 }}>
                            <Chip
                              label={selectedProduct.category}
                              size="small"
                              sx={{
                                borderRadius: 1,
                                height: 20,
                                fontSize: "0.7rem",
                                backgroundColor: "rgba(255,255,255,0.3)",
                                color: "white",
                              }}
                            />
                            <Chip
                              label={selectedProduct.condition}
                              size="small"
                              sx={{
                                borderRadius: 1,
                                height: 20,
                                fontSize: "0.7rem",
                                backgroundColor: "rgba(255,255,255,0.3)",
                                color: "white",
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          paragraph
                        >
                          {selectedProduct.description.length > 120
                            ? `${selectedProduct.description.substring(
                                0,
                                120
                              )}...`
                            : selectedProduct.description}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 0.5,
                            mb: 1,
                          }}
                        >
                          {selectedProduct.features.map((feature, index) => (
                            <Typography
                              key={index}
                              variant="body2"
                              sx={{ display: "flex", alignItems: "center" }}
                            >
                              <Check
                                sx={{
                                  fontSize: 16,
                                  mr: 0.5,
                                  color: "success.main",
                                }}
                              />
                              {feature}
                            </Typography>
                          ))}
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          p: 2,
                          bgcolor: alpha(theme.palette.background.paper, 0.5),
                          borderRadius: 2,
                          mb: 2,
                        }}
                      >
                        <Typography variant="subtitle2" gutterBottom>
                          Giá trị sản phẩm:
                        </Typography>
                        <Typography
                          variant="h5"
                          color="primary"
                          fontWeight="600"
                        >
                          ${selectedProduct.price.toFixed(2)}
                        </Typography>
                      </Box>

                      {cashOption && additionalCash > 0 && (
                        <Box
                          sx={{
                            mt: 2,
                            p: 2,
                            bgcolor: alpha(theme.palette.success.main, 0.1),
                            borderRadius: 2,
                            border: `1px solid ${alpha(
                              theme.palette.success.main,
                              0.2
                            )}`,
                          }}
                        >
                          <Typography variant="subtitle2" gutterBottom>
                            Tiền mặt bổ sung:
                          </Typography>
                          <Typography
                            variant="h5"
                            color="success.main"
                            fontWeight="600"
                          >
                            + ${additionalCash.toFixed(2)}
                          </Typography>
                        </Box>
                      )}

                      <Box
                        sx={{
                          mt: 3,
                          p: 2,
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          borderRadius: 2,
                          border: `1px solid ${alpha(
                            theme.palette.primary.main,
                            0.2
                          )}`,
                        }}
                      >
                        <Typography variant="subtitle2" gutterBottom>
                          Tổng giá trị đề xuất:
                        </Typography>
                        <Typography
                          variant="h4"
                          color="primary.dark"
                          fontWeight="700"
                        >
                          ${(selectedProduct.price + additionalCash).toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    <Typography variant="body1" color="error" sx={{ mt: 2 }}>
                      Please go back and select a product to recommend.
                    </Typography>
                  )}
                </Paper>
              </Grid>

              <Grid
                item
                xs={12}
                md={2}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: isMobile ? "row" : "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: "50%",
                      bgcolor: alpha(theme.palette.background.paper, 0.7),
                      backdropFilter: "blur(10px)",
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 60,
                      height: 60,
                    }}
                  >
                    <CompareArrows
                      sx={{
                        fontSize: 30,
                        transform: isMobile ? "none" : "rotate(90deg)",
                        color: theme.palette.text.secondary,
                      }}
                    />
                  </Paper>

                  {exchangeValue.fair && (
                    <Chip
                      label="Đề xuất công bằng"
                      color="success"
                      sx={{
                        mt: 2,
                        fontWeight: 500,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      }}
                    />
                  )}

                  {!exchangeValue.fair && exchangeValue.difference > 0 && (
                    <Chip
                      label="Đề xuất cao hơn"
                      color="info"
                      sx={{
                        mt: 2,
                        fontWeight: 500,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      }}
                    />
                  )}

                  {!exchangeValue.fair && exchangeValue.difference < 0 && (
                    <Chip
                      label="Đề xuất thấp hơn"
                      color="warning"
                      sx={{
                        mt: 2,
                        fontWeight: 500,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      }}
                    />
                  )}
                </Box>
              </Grid>

              <Grid item xs={12} md={5}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: "100%",
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${alpha(
                      theme.palette.secondary.light,
                      0.1
                    )}, ${alpha(theme.palette.secondary.main, 0.05)})`,
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${alpha(
                      theme.palette.secondary.main,
                      0.1
                    )}`,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    fontWeight="600"
                    color="secondary.main"
                  >
                    In exchange:
                  </Typography>
                  {targetProduct ? (
                    <Box>
                      <Box
                        sx={{
                          position: "relative",
                          borderRadius: 3,
                          overflow: "hidden",
                          mb: 2,
                          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                        }}
                      >
                        <img
                          src={targetProduct.image}
                          alt={targetProduct.name}
                          style={{
                            width: "100%",
                            aspectRatio: "4/3",
                            objectFit: "cover",
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            p: 1.5,
                            background:
                              "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            color="white"
                            fontWeight="600"
                          >
                            {targetProduct.name}
                          </Typography>
                          <Box sx={{ display: "flex", gap: 0.5 }}>
                            <Chip
                              label={targetProduct.category}
                              size="small"
                              sx={{
                                borderRadius: 1,
                                height: 20,
                                fontSize: "0.7rem",
                                backgroundColor: "rgba(255,255,255,0.3)",
                                color: "white",
                              }}
                            />
                            <Chip
                              label={targetProduct.condition}
                              size="small"
                              sx={{
                                borderRadius: 1,
                                height: 20,
                                fontSize: "0.7rem",
                                backgroundColor: "rgba(255,255,255,0.3)",
                                color: "white",
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          paragraph
                        >
                          {targetProduct.description.length > 120
                            ? `${targetProduct.description.substring(
                                0,
                                120
                              )}...`
                            : targetProduct.description}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 0.5,
                            mb: 1,
                          }}
                        >
                          {targetProduct.features.map((feature, index) => (
                            <Typography
                              key={index}
                              variant="body2"
                              sx={{ display: "flex", alignItems: "center" }}
                            >
                              <Check
                                sx={{
                                  fontSize: 16,
                                  mr: 0.5,
                                  color: "success.main",
                                }}
                              />
                              {feature}
                            </Typography>
                          ))}
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          p: 2,
                          bgcolor: alpha(theme.palette.background.paper, 0.5),
                          borderRadius: 2,
                          mb: 2,
                        }}
                      >
                        <Typography variant="subtitle2" gutterBottom>
                          Giá trị sản phẩm:
                        </Typography>
                        <Typography
                          variant="h5"
                          color="secondary"
                          fontWeight="600"
                        >
                          ${targetProduct.price.toFixed(2)}
                        </Typography>
                      </Box>

                      <Box
                        sx={{ display: "flex", alignItems: "center", mt: 3 }}
                      >
                        <Avatar
                          src={targetProduct.seller.avatar}
                          sx={{ width: 40, height: 40, mr: 1.5 }}
                        />
                        <Box>
                          <Typography variant="body1" fontWeight="500">
                            {targetProduct.seller.name}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Star
                              sx={{ color: "#FFB400", fontSize: 16, mr: 0.5 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {targetProduct.seller.rating} •{" "}
                              {targetProduct.seller.exchangeCount} trao đổi
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    <Typography variant="body1" color="error" sx={{ mt: 2 }}>
                      Please go back and select a target product.
                    </Typography>
                  )}
                </Paper>
              </Grid>
            </Grid>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                mt: 4,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(
                  theme.palette.background.paper,
                  0.9
                )}, ${alpha(theme.palette.background.paper, 0.7)})`,
                backdropFilter: "blur(10px)",
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              }}
            >
              <Typography variant="subtitle1" gutterBottom fontWeight="600">
                Add message (Optional):
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Explain why you think this is a fair exchange, or provide more
                information about your proposal.
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="For example: I am offering my MacBook Air M2 in exchange for your iPhone 13 Pro Max. My computer is 3 months old, under full warranty, and in like-new condition. I am willing to add $50 to balance the trade-in value..."
                value={message}
                onChange={handleMessageChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Paper>

            <Box
              sx={{
                mt: 4,
                p: 3,
                borderRadius: 3,
                bgcolor: alpha(theme.palette.info.main, 0.1),
                border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <Info sx={{ color: "info.main", mr: 2, mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2" fontWeight="600" gutterBottom>
                    Terms of exchange
                  </Typography>
                  <Typography variant="body2">
                    By submitting this proposal, you agree to our terms and
                    conditions of exchange. The other party will have 7 days to
                    respond to your proposal. If accepted, you will be guided on
                    the next steps to complete the exchange.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "60vh",
            }}
          >
            <CircularProgress size={60} thickness={4} />
            <Typography variant="h6" sx={{ mt: 3, fontWeight: 500 }}>
              Loading exchange data...
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Please wait a moment
            </Typography>
          </Box>
        </Container>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              textAlign: "center",
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography color="error" variant="h6" sx={{ mb: 2 }}>
              {error}
            </Typography>
            <Typography color="text.secondary" paragraph>
              Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.
            </Typography>
            <Button
              component={Link}
              to="/products"
              variant="contained"
              sx={{
                mt: 2,
                borderRadius: 2,
                px: 3,
                py: 1,
              }}
            >
              Quay lại Sản phẩm
            </Button>
          </Paper>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          pb: 8,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100%",
            backgroundImage: `radial-gradient(circle at 30% 20%, ${alpha(
              theme.palette.primary.main,
              0.15
            )}, transparent 25%), 
                          radial-gradient(circle at 70% 60%, ${alpha(
                            theme.palette.secondary.main,
                            0.1
                          )}, transparent 25%)`,
            backgroundSize: "100% 100%",
            opacity: 0.8,
            zIndex: -1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box
            sx={{
              mb: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              align="center"
              fontWeight="800"
              sx={{
                mb: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                backgroundClip: "text",
                textFillColor: "transparent",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.5px",
                textShadow: "0 2px 10px rgba(0,0,0,0.08)",
              }}
            >
              Proposed Exchange
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              align="center"
              sx={{
                maxWidth: 600,
                mb: 4,
                lineHeight: 1.6,
                fontSize: "1.1rem",
              }}
            >
              Trade your products with others easily and securely. Create
              compelling offers to increase your chances of success.
            </Typography>

            <Stepper
              activeStep={activeStep}
              alternativeLabel
              sx={{
                width: "100%",
                maxWidth: 800,
                "& .MuiStepLabel-label": {
                  mt: 1,
                  fontWeight: 500,
                },
                "& .MuiStepIcon-root": {
                  fontSize: 36,
                  filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.1))",
                  transition: "all 0.3s ease",
                  "&.Mui-active": {
                    transform: "scale(1.2)",
                  },
                },
                "& .MuiStepIcon-text": {
                  fill: "#fff",
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                },
                "& .MuiStepConnector-line": {
                  borderTopWidth: 3,
                  borderRadius: 1,
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                },
                "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line, & .MuiStepConnector-root.Mui-completed .MuiStepConnector-line":
                  {
                    borderColor: theme.palette.primary.main,
                  },
              }}
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>
                    <Typography
                      variant="body2"
                      fontWeight={activeStep >= index ? 600 : 400}
                    >
                      {label}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 4 },
              borderRadius: 4,
              background: `linear-gradient(135deg, ${alpha(
                theme.palette.background.paper,
                0.9
              )}, ${alpha(theme.palette.background.paper, 0.7)})`,
              backdropFilter: "blur(10px)",
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              boxShadow: "0 10px 40px rgba(0,0,0,0.07)",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent(activeStep)}
              </motion.div>
            </AnimatePresence>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 5,
                gap: 2,
              }}
            >
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<ArrowBack />}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1.2,
                  textTransform: "none",
                  fontWeight: 600,
                  boxShadow: "none",
                  borderWidth: "1.5px",
                  "&:hover": {
                    borderWidth: "1.5px",
                  },
                }}
              >
                Back
              </Button>

              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleSubmitExchange}
                  endIcon={<Send />}
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    py: 1.2,
                    textTransform: "none",
                    fontWeight: 600,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Submit Exchange Proposal
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={<ArrowForward />}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    py: 1.2,
                    textTransform: "none",
                    fontWeight: 600,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Continue
                </Button>
              )}
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* Hộp thoại xác nhận */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.background.paper,
              0.95
            )}, ${alpha(theme.palette.background.paper, 0.9)})`,
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <DialogTitle
          sx={{
            pb: 1,
            pt: 3,
            textAlign: "center",
            fontWeight: 700,
            fontSize: "1.5rem",
          }}
        >
          Confirm Exchange Proposal
        </DialogTitle>
        <DialogContent sx={{ px: 4 }}>
          <Typography variant="body1" align="center" paragraph>
            Are you sure you want to submit this exchange proposal? Once
            submitted, the other party will be notified and can accept or
            decline your offer.
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              my: 3,
              gap: 3,
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Avatar
                src={selectedProduct?.image}
                variant="rounded"
                sx={{
                  width: 80,
                  height: 80,
                  mx: "auto",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  borderRadius: 2,
                }}
              />
              <Typography variant="body2" sx={{ mt: 1, fontWeight: 500 }}>
                Your Product
              </Typography>
            </Box>

            <CompareArrows sx={{ fontSize: 30, color: "text.secondary" }} />

            <Box sx={{ textAlign: "center" }}>
              <Avatar
                src={targetProduct?.image}
                variant="rounded"
                sx={{
                  width: 80,
                  height: 80,
                  mx: "auto",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  borderRadius: 2,
                }}
              />
              <Typography variant="body2" sx={{ mt: 1, fontWeight: 500 }}>
                Their Product
              </Typography>
            </Box>
          </Box>

          {cashOption && additionalCash > 0 && (
            <Box
              sx={{
                textAlign: "center",
                p: 2,
                bgcolor: alpha(theme.palette.success.main, 0.1),
                borderRadius: 2,
                mb: 2,
              }}
            >
              <Typography variant="body2" fontWeight={500}>
                Plus additional cash:
              </Typography>
              <Typography variant="h6" color="success.main" fontWeight={700}>
                ${additionalCash.toFixed(2)}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 4, pb: 3, justifyContent: "center", gap: 2 }}>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            startIcon={<Close />}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmExchange}
            variant="contained"
            color="primary"
            startIcon={<Check />}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

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

export default Exchange;
