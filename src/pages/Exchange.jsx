import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  TextField,
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
  FormControlLabel,
  Checkbox,
  useMediaQuery,
  useTheme,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  CompareArrows,
  Search,
  Add,
  ArrowForward,
  Check,
  Close,
  Info,
  ArrowBack,
  AttachMoney,
  Send,
  Star,
  CheckCircle,
} from "@mui/icons-material";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { alpha } from "@mui/material/styles";

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
              reviewCount: Math.floor(Math.random() * 100),
              seller: {
                id: Math.floor(Math.random() * 100) + 1,
                name: `Seller ${Math.floor(Math.random() * 100) + 1}`,
                rating: (Math.random() * 2 + 3).toFixed(1), // Between 3 and 5
                exchangeCount: Math.floor(Math.random() * 50),
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
              reviewCount: Math.floor(Math.random() * 100),
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

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box
            className="bg-[#1e2a3b] rounded-lg text-white p-6"
            sx={{
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "inset 0 0 20px rgba(99, 102, 241, 0.1)",
              },
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              className="text-white"
              sx={{
                position: "relative",
                display: "inline-block",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: "30%",
                  height: "3px",
                  bottom: -5,
                  left: 0,
                  backgroundColor: "#6366f1",
                  borderRadius: "2px",
                },
              }}
            >
              Select a Product to Exchange For
            </Typography>
            <Typography variant="body1" paragraph className="text-gray-400">
              Browse products and select one that you'd like to propose an
              exchange for.
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/products"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all mb-6 shadow-lg hover:shadow-indigo-500/50 transform hover:-translate-y-1 hover:scale-105"
              sx={{
                mb: 3,
                position: "relative",
                overflow: "hidden",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  transition: "all 0.5s ease",
                },
                "&:hover::after": {
                  left: "100%",
                },
              }}
            >
              Browse Products
            </Button>
            <Typography variant="body2" className="text-gray-400">
              Or, if you already know which product you want to exchange for,
              enter its ID below:
            </Typography>
            <Box sx={{ display: "flex", mt: 2 }}>
              <TextField
                label="Product ID"
                variant="outlined"
                size="small"
                sx={{
                  mr: 2,
                  "& .MuiOutlinedInput-root": {
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.3)",
                    },
                    "&.Mui-focused": {
                      boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.5)",
                    },
                  },
                }}
                className="bg-[#273548] rounded-lg"
                InputProps={{
                  className: "text-white",
                }}
                InputLabelProps={{
                  className: "text-gray-400",
                }}
              />

              <Button
                variant="outlined"
                className="border border-indigo-500 text-indigo-300 hover:bg-indigo-900/30 transition-all duration-300 hover:shadow-md hover:shadow-indigo-500/30 transform hover:-translate-y-1"
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(99, 102, 241, 0.2)",
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.3s ease",
                  },
                  "&:hover::before": {
                    transform: "scaleX(1)",
                  },
                }}
              >
                Find Product
              </Button>
            </Box>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom className="text-white">
              Choose Your Offer
            </Typography>

            {targetProduct && (
              <Paper
                sx={{ p: 3, mb: 4 }}
                className="bg-[#1e2a3b] rounded-lg border border-gray-800"
              >
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  className="text-gray-300"
                >
                  You want to exchange for:
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <img
                      src={targetProduct.image}
                      alt={targetProduct.name}
                      className="w-full rounded-lg"
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Typography variant="h6" className="text-white">
                      {targetProduct.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-gray-400"
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
                        className="text-gray-400 ml-1"
                      >
                        ({targetProduct.reviewCount} reviews)
                      </Typography>
                    </Box>
                    <Typography variant="h6" className="text-indigo-400 mb-2">
                      ${targetProduct.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" className="text-gray-300">
                      Seller: {targetProduct.seller.name}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      to={`/products/${targetProduct.id}`}
                      sx={{ mt: 2 }}
                      className="border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors"
                    >
                      View Details
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            )}

            <Typography variant="subtitle1" gutterBottom className="text-white">
              Select one of your products to offer in exchange:
            </Typography>

            <TextField
              fullWidth
              placeholder="Search your products..."
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#273548",
                  borderRadius: "0.5rem",
                  transition: "all 0.3s ease",
                  border: "1px solid rgba(99, 102, 241, 0.3)",
                  "&:hover": {
                    boxShadow: "0 0 15px rgba(99, 102, 241, 0.3)",
                    borderColor: "rgba(99, 102, 241, 0.5)",
                  },
                  "&.Mui-focused": {
                    boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)",
                    borderColor: "#6366f1",
                    backgroundColor: "#2d3c54",
                  },
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent",
                  },
                },
                "& .MuiInputBase-input": {
                  padding: "12px 16px",
                  fontSize: "1rem",
                  color: "white",
                  "&::placeholder": {
                    color: "rgba(156, 163, 175, 0.8)",
                    opacity: 1,
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mr: 1,
                      animation: "pulse 2s infinite",
                      "@keyframes pulse": {
                        "0%": {
                          opacity: 0.6,
                        },
                        "50%": {
                          opacity: 1,
                        },
                        "100%": {
                          opacity: 0.6,
                        },
                      },
                    }}
                  >
                    <Search className="text-indigo-400" fontSize="medium" />
                  </Box>
                ),
                className: "text-white",
              }}
            />

            {filteredProducts.length === 0 ? (
              <Paper
                sx={{ p: 3, textAlign: "center" }}
                className="bg-[#1e2a3b] rounded-lg border border-gray-800"
              >
                <Typography variant="body1" paragraph className="text-gray-300">
                  No products found matching your search.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  component={Link}
                  to="/products/new"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all"
                >
                  Add New Product
                </Button>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {filteredProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <motion.div
                      whileHover={{ y: -8 }}
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
                              : "1px solid",
                          borderColor:
                            selectedProduct?.id === product.id
                              ? "#6366f1"
                              : "#1f2937",
                          transition: "all 0.3s ease",
                          position: "relative",
                          overflow: "hidden",
                          "&:hover": {
                            boxShadow:
                              selectedProduct?.id === product.id
                                ? "0 0 20px rgba(99, 102, 241, 0.5)"
                                : "0 0 15px rgba(99, 102, 241, 0.3)",
                          },
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "4px",
                            background:
                              selectedProduct?.id === product.id
                                ? "linear-gradient(90deg, #6366f1, #a855f7)"
                                : "transparent",
                            opacity: selectedProduct?.id === product.id ? 1 : 0,
                            transition: "opacity 0.3s ease",
                          },
                          "&:hover::before": {
                            opacity: 1,
                          },
                        }}
                        className="bg-[#1e2a3b] rounded-lg overflow-hidden"
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
                              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                            }}
                            className="shadow-lg"
                          />
                        </Box>

                        <CardContent
                          sx={{
                            flexGrow: 1,
                            p: 2.5,
                            background:
                              selectedProduct?.id === product.id
                                ? "linear-gradient(180deg, rgba(99, 102, 241, 0.1), transparent)"
                                : "transparent",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 1.5,
                              flexWrap: "wrap",
                            }}
                          >
                            <Chip
                              label={product.category}
                              size="small"
                              sx={{
                                height: 20,
                                fontSize: "0.7rem",
                                backgroundColor: "rgba(99, 102, 241, 0.2)",
                                color: "#a5b4fc",
                              }}
                            />
                            <Chip
                              label={product.brand}
                              size="small"
                              sx={{
                                height: 20,
                                fontSize: "0.7rem",
                                backgroundColor: "rgba(99, 102, 241, 0.1)",
                                color: "#a5b4fc",
                              }}
                            />
                          </Box>

                          <Typography
                            variant="h6"
                            className="text-indigo-400"
                            gutterBottom
                            sx={{
                              fontWeight: 700,
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                              mb: 1.5,
                            }}
                          >
                            $ {product.price.toFixed(2)}
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
                              sx={{
                                "& .MuiRating-iconFilled": {
                                  color: "#f59e0b",
                                },
                              }}
                            />
                            <Typography
                              variant="body2"
                              className="text-gray-400 ml-1"
                            >
                              ({product.reviewCount})
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
                              position: "relative",
                              overflow: "hidden",
                              transition: "all 0.3s ease",
                              "&::after": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: "-100%",
                                width: "100%",
                                height: "100%",
                                background:
                                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                                transition: "all 0.5s ease",
                              },
                              "&:hover": {
                                transform: "translateY(-2px)",
                                boxShadow:
                                  selectedProduct?.id === product.id
                                    ? "0 5px 15px rgba(99, 102, 241, 0.4)"
                                    : "0 5px 15px rgba(31, 41, 55, 0.4)",
                              },
                              "&:hover::after": {
                                left: "100%",
                              },
                              backgroundColor:
                                selectedProduct?.id === product.id
                                  ? "#4f46e5"
                                  : "transparent",
                            }}
                            className={
                              selectedProduct?.id === product.id
                                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                                : "border border-indigo-500 text-indigo-300 hover:bg-indigo-900/30"
                            }
                            startIcon={
                              selectedProduct?.id === product.id ? (
                                <CheckCircle />
                              ) : null
                            }
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
                    className="text-indigo-400"
                  />
                }
                label="Add cash to your offer"
                className="text-white font-medium"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    color: "white",
                    fontWeight: 500,
                  },
                }}
              />

              {cashOption && (
                <TextField
                  label="Additional Cash Amount ($)"
                  type="text"
                  value={additionalCash}
                  onChange={handleAdditionalCashChange}
                  fullWidth
                  sx={{
                    mt: 2,
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "white",
                    },
                  }}
                  InputProps={{
                    inputProps: { min: 0 },
                    className: "text-white",
                    sx: {
                      "&::placeholder": {
                        color: "white",
                        opacity: 0.7,
                      },
                    },
                  }}
                  className="bg-[#273548] rounded-lg"
                />
              )}
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom className="text-white">
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
                    backgroundColor: "#1e2a3b",
                    border: "1px solid #1f2937",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    fontWeight="600"
                    className="text-indigo-400"
                  >
                    Your Offer:
                  </Typography>
                  {selectedProduct ? (
                    <Box>
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        style={{
                          width: "100%",
                          borderRadius: "8px",
                          marginBottom: "16px",
                        }}
                      />
                      <Typography
                        variant="h6"
                        className="text-white"
                        gutterBottom
                      >
                        {selectedProduct.name}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                        <Chip
                          label={selectedProduct.category}
                          size="small"
                          sx={{
                            height: 24,
                            fontSize: "0.75rem",
                            backgroundColor: "rgba(99, 102, 241, 0.2)",
                            color: "#a5b4fc",
                          }}
                        />
                        <Chip
                          label={selectedProduct.brand}
                          size="small"
                          sx={{
                            height: 24,
                            fontSize: "0.75rem",
                            backgroundColor: "rgba(99, 102, 241, 0.1)",
                            color: "#a5b4fc",
                          }}
                        />
                      </Box>
                      <Typography
                        variant="h6"
                        className="text-indigo-400"
                        gutterBottom
                      >
                        $ {selectedProduct.price.toFixed(2)}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Rating
                          value={parseFloat(selectedProduct.rating)}
                          precision={0.5}
                          size="small"
                          readOnly
                        />
                        <Typography
                          variant="body2"
                          className="text-gray-400 ml-1"
                        >
                          ({selectedProduct.reviewCount})
                        </Typography>
                      </Box>

                      {cashOption && additionalCash > 0 && (
                        <Box
                          sx={{
                            mt: 2,
                            p: 2,
                            borderRadius: 2,
                            backgroundColor: "rgba(16, 185, 129, 0.1)",
                            border: "1px solid rgba(16, 185, 129, 0.3)",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            gutterBottom
                            className="text-gray-300"
                          >
                            Additional Cash:
                          </Typography>
                          <Typography
                            variant="h6"
                            className="text-green-400"
                            fontWeight="600"
                          >
                            + ${additionalCash.toFixed(2)}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  ) : (
                    <Typography variant="body1" color="error" sx={{ mt: 2 }}>
                      Please go back and select a product to offer.
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
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <CompareArrows
                    sx={{
                      fontSize: 36,
                      color: "#6366f1",
                      transform: "rotate(90deg)",
                      mb: 2,
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={5}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: "100%",
                    borderRadius: 3,
                    backgroundColor: "#1e2a3b",
                    border: "1px solid #1f2937",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    fontWeight="600"
                    className="text-indigo-400"
                  >
                    In exchange for:
                  </Typography>
                  {targetProduct ? (
                    <Box>
                      <img
                        src={targetProduct.image}
                        alt={targetProduct.name}
                        style={{
                          width: "100%",
                          borderRadius: "8px",
                          marginBottom: "16px",
                        }}
                      />
                      <Typography
                        variant="h6"
                        className="text-white"
                        gutterBottom
                      >
                        {targetProduct.name}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                        <Chip
                          label={targetProduct.category}
                          size="small"
                          sx={{
                            height: 24,
                            fontSize: "0.75rem",
                            backgroundColor: "rgba(99, 102, 241, 0.2)",
                            color: "#a5b4fc",
                          }}
                        />
                        <Chip
                          label={targetProduct.brand}
                          size="small"
                          sx={{
                            height: 24,
                            fontSize: "0.75rem",
                            backgroundColor: "rgba(99, 102, 241, 0.1)",
                            color: "#a5b4fc",
                          }}
                        />
                      </Box>
                      <Typography
                        variant="h6"
                        className="text-indigo-400"
                        gutterBottom
                      >
                        $ {targetProduct.price.toFixed(2)}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Rating
                          value={parseFloat(targetProduct.rating)}
                          precision={0.5}
                          size="small"
                          readOnly
                        />
                        <Typography
                          variant="body2"
                          className="text-gray-400 ml-1"
                        >
                          ({targetProduct.reviewCount})
                        </Typography>
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
                backgroundColor: "#1e2a3b",
                border: "1px solid #1f2937",
              }}
            >
              <Typography
                variant="subtitle1"
                gutterBottom
                className="text-white"
              >
                Add message (Optional):
              </Typography>
              <Typography variant="body2" className="text-gray-400" paragraph>
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
                    backgroundColor: "#273548",
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "white",
                  },
                }}
              />
            </Paper>

            <Box
              sx={{
                mt: 4,
                p: 3,
                borderRadius: 3,
                backgroundColor: "rgba(30, 58, 138, 0.3)",
                border: "1px solid rgba(30, 64, 175, 0.5)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <Info sx={{ mr: 2, mt: 0.5 }} className="text-blue-400" />
                <Box>
                  <Typography
                    variant="subtitle2"
                    fontWeight="600"
                    gutterBottom
                    className="text-white"
                  >
                    Terms of exchange
                  </Typography>
                  <Typography variant="body2" className="text-gray-300">
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
      <>
        <Header />
        <Box className="bg-[#121a29] min-h-screen">
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
              <CircularProgress
                size={60}
                thickness={4}
                className="text-indigo-500"
              />
              <Typography
                variant="h6"
                sx={{ mt: 3, fontWeight: 500 }}
                className="text-white"
              >
                Loading exchange data...
              </Typography>
              <Typography
                variant="body2"
                className="text-gray-400"
                sx={{ mt: 1 }}
              >
                Please wait a moment
              </Typography>
            </Box>
          </Container>
        </Box>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <Box className="bg-[#121a29] min-h-screen">
          <Container maxWidth="lg" sx={{ py: 8 }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                textAlign: "center",
              }}
              className="bg-[#1e2a3b] border border-gray-800"
            >
              <Typography color="error" variant="h6" sx={{ mb: 2 }}>
                {error}
              </Typography>
              <Typography className="text-gray-400" paragraph>
                An error occurred while loading data. Please try again later.
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
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              >
                Back to Products
              </Button>
            </Paper>
          </Container>
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Box className="bg-[#121a29] min-h-screen">
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
              sx={{ mb: 2 }}
              className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent"
            >
              Proposed Exchange
            </Typography>
            <Typography
              variant="subtitle1"
              className="text-gray-400"
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
                  color: "white",
                },
                "& .MuiStepIcon-root": {
                  fontSize: 36,
                  transition: "all 0.3s ease",
                  "&.Mui-active": {
                    transform: "scale(1.2)",
                    color: "#6366f1",
                  },
                  "&.Mui-completed": {
                    color: "#6366f1",
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
                  borderColor: "rgba(99, 102, 241, 0.3)",
                },
                "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line, & .MuiStepConnector-root.Mui-completed .MuiStepConnector-line":
                  {
                    borderColor: "#6366f1",
                  },
              }}
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>
                    <Typography
                      variant="body2"
                      fontWeight={activeStep >= index ? 600 : 400}
                      className={
                        activeStep >= index ? "text-white" : "text-gray-500"
                      }
                    >
                      {label}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          <Box className="bg-[#1e2a3b] border border-gray-800 rounded-lg p-4 md:p-6">
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
                  transition: "all 0.3s ease",
                  "&:hover:not(:disabled)": {
                    borderWidth: "1.5px",
                    transform: "translateX(-5px)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  },
                }}
                className={
                  activeStep === 0
                    ? "border-gray-700 text-gray-500"
                    : "border-indigo-500 text-indigo-300 hover:bg-indigo-900/30"
                }
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
                    transition: "all 0.3s ease",
                    position: "relative",
                    overflow: "hidden",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                      transition: "all 0.5s ease",
                    },
                    "&:hover": {
                      transform: "translateY(-3px) translateX(3px)",
                      boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)",
                    },
                    "&:hover::after": {
                      left: "100%",
                    },
                  }}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg"
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
                    transition: "all 0.3s ease",
                    position: "relative",
                    overflow: "hidden",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                      transition: "all 0.5s ease",
                    },
                    "&:hover": {
                      transform: "translateY(-3px) translateX(3px)",
                      boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)",
                    },
                    "&:hover::after": {
                      left: "100%",
                    },
                  }}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg"
                >
                  Continue
                </Button>
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
          },
          className: "bg-[#1e2a3b] border border-gray-800",
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
          className="text-white"
        >
          Confirm Exchange Proposal
        </DialogTitle>
        <DialogContent sx={{ px: 4 }}>
          <Typography
            variant="body1"
            align="center"
            paragraph
            className="text-gray-300"
          >
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
                  borderRadius: 2,
                }}
                className="shadow-lg"
              />
              <Typography
                variant="body2"
                sx={{ mt: 1, fontWeight: 500 }}
                className="text-gray-300"
              >
                Your Product
              </Typography>
            </Box>

            <CompareArrows sx={{ fontSize: 30 }} className="text-gray-400" />

            <Box sx={{ textAlign: "center" }}>
              <Avatar
                src={targetProduct?.image}
                variant="rounded"
                sx={{
                  width: 80,
                  height: 80,
                  mx: "auto",
                  borderRadius: 2,
                }}
                className="shadow-lg"
              />
              <Typography
                variant="body2"
                sx={{ mt: 1, fontWeight: 500 }}
                className="text-gray-300"
              >
                Their Product
              </Typography>
            </Box>
          </Box>

          {cashOption && additionalCash > 0 && (
            <Box
              sx={{
                textAlign: "center",
                p: 2,
                borderRadius: 2,
                mb: 2,
              }}
              className="bg-green-900/30 border border-green-800"
            >
              <Typography
                variant="body2"
                fontWeight={500}
                className="text-gray-300"
              >
                Plus additional cash:
              </Typography>
              <Typography
                variant="h6"
                className="text-green-400"
                fontWeight={700}
              >
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
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmExchange}
            variant="contained"
            startIcon={<Check />}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: "none",
              fontWeight: 600,
            }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notifications */}
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
            "& .MuiAlert-icon": {
              fontSize: "1.5rem",
            },
            "& .MuiAlert-message": {
              fontSize: "0.95rem",
              fontWeight: 500,
            },
          }}
          className={
            snackbar.severity === "success"
              ? "bg-gradient-to-r from-green-600 to-emerald-600"
              : "bg-gradient-to-r from-red-600 to-rose-600"
          }
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Footer />
    </>
  );
};

export default Exchange;
