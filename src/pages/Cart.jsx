// ... existing code ...

import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Rating,
  Avatar,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Delete,
  Add,
  Remove,
  ShoppingCart,
  LocalShipping,
  Payment,
  CheckCircle,
  ArrowForward,
  ArrowBack,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const Cart = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    phone: "",
    email: "",
  });
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  // Thêm state cho promo code
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [removingItemId, setRemovingItemId] = useState(null);

  // Move these functions inside the component
  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateShippingCost = () => {
    if (shippingMethod === "express") {
      return 12.99;
    } else {
      // Free shipping for orders over $100
      return calculateSubtotal() >= 100 ? 0 : 5.99;
    }
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShippingCost() - promoDiscount;
  };

  const handleQuantityChange = (itemId, change) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + change;
        // Ensure quantity is within bounds (min 1, max of item's maxQuantity)
        if (newQuantity >= 1 && newQuantity <= item.maxQuantity) {
          return { ...item, quantity: newQuantity };
        }
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleShippingMethodChange = (e) => {
    setShippingMethod(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handlePlaceOrder = () => {
    // Generate a random order number
    const randomOrderNum = "ORD-" + Math.floor(10000 + Math.random() * 90000);
    setOrderNumber(randomOrderNum);
    setOrderPlaced(true);
    setActiveStep(3);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        // Here you would fetch cart items from your API
        // For now, we'll use mock data
        setTimeout(() => {
          const mockCartItems = [
            {
              id: 1,
              name: "iPhone 13 Pro",
              price: 699.99,
              image:
                "https://i.pinimg.com/736x/48/50/67/485067d9570ba3f9a3cfd9c80dd38924.jpg",
              quantity: 1,
              seller: {
                name: "John Doe",
                rating: 4.8,
              },
              condition: "Like New",
              maxQuantity: 1,
            },
            {
              id: 2,
              name: "Sony WH-1000XM4",
              price: 249.99,
              image:
                "https://i.pinimg.com/736x/b7/70/88/b7708826382e2c61d8def1f471741c95.jpg",
              quantity: 1,
              seller: {
                name: "Jane Smith",
                rating: 4.5,
              },
              condition: "Good",
              maxQuantity: 2,
            },
          ];

          setCartItems(mockCartItems);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError("Failed to load cart items. Please try again.");
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Promo code handler
  const handleApplyPromoCode = () => {
    if (promoCode.toUpperCase() === "WELCOME10") {
      setPromoDiscount(calculateSubtotal() * 0.1);
      setPromoApplied(true);
      toast.success("Promo code applied successfully!");
    } else {
      toast.error("Invalid promo code!");
    }
  };

  const handleRemoveWithAnimation = (item) => {
    setRemovingItemId(item.id);

    // Sau khi animation hoàn tất, hiển thị dialog xác nhận
    setTimeout(() => {
      setRemovingItemId(null);
      handleRemoveItem(item);
    }, 300);
  };

  const handleRemoveItem = (item) => {
    setItemToRemove(item);
    setConfirmDialogOpen(true);
  };

  const confirmRemoveItem = () => {
    const updatedCartItems = cartItems.filter(
      (item) => item.id !== itemToRemove.id
    );
    setCartItems(updatedCartItems);
    setConfirmDialogOpen(false);
  };

  const isShippingInfoComplete = () => {
    return Object.values(shippingInfo).every((value) => value.trim() !== "");
  };

  const steps = [
    "Shopping Cart",
    "Shipping Information",
    "Payment",
    "Confirmation",
  ];

  return (
    <>
      <Header />
      <Box
        sx={{
          backgroundColor: "#111827",
          width: "100%",
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            py: 6,
            minHeight: "80vh",
            backgroundColor: "#111827",
            color: "white",
            borderRadius: 0,
            boxShadow: "none",
            maxWidth: "100% !important",
            px: { xs: 2, sm: 3, md: 4, lg: 6 },
          }}
        >
          <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                textAlign: "center",
                fontWeight: 700,
                background: "linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)",
                backgroundClip: "text",
                textFillColor: "transparent",
                mb: 5,
                letterSpacing: "-0.025em",
              }}
            >
              {activeStep === 3 && orderPlaced
                ? "Order Confirmation"
                : "Shopping Cart"}
            </Typography>

            {/* Stepper hiện đại hơn với nút tròn và biểu tượng */}
            <Box sx={{ maxWidth: 900, mx: "auto", mb: 6 }}>
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                connector={
                  <Box
                    sx={{
                      position: "relative",
                      top: "16px",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        height: "2px",
                        backgroundColor: "#1e293b",
                        width: "100%",
                        top: "50%",
                        transform: "translateY(-50%)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        height: "2px",
                        backgroundColor: "#6366f1",
                        width: `${activeStep > 0 ? "100%" : "0%"}`,
                        transition: "width 0.5s",
                      }}
                    />
                  </Box>
                }
              >
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel
                      StepIconComponent={({ active, completed }) => (
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            backgroundColor:
                              active || completed ? "#6366f1" : "#1e293b",
                            color: "white",
                            border: "2px solid",
                            borderColor: active
                              ? "#8b5cf6"
                              : completed
                              ? "#6366f1"
                              : "#1e293b",
                            boxShadow: active
                              ? "0 0 10px rgba(139, 92, 246, 0.5)"
                              : "none",
                            transition: "all 0.3s ease",
                          }}
                        >
                          {index === 0 ? (
                            <ShoppingCart fontSize="small" />
                          ) : index === 1 ? (
                            <LocalShipping fontSize="small" />
                          ) : index === 2 ? (
                            <Payment fontSize="small" />
                          ) : (
                            <CheckCircle fontSize="small" />
                          )}
                        </Avatar>
                      )}
                    >
                      <Typography
                        sx={{
                          fontWeight: activeStep === index ? 600 : 400,
                          color: activeStep === index ? "#8b5cf6" : "white",
                          mt: 1,
                        }}
                      >
                        {label}
                      </Typography>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress sx={{ color: "#6366f1" }} />
              </Box>
            ) : error ? (
              <Alert severity="error" sx={{ mb: 4 }}>
                {error}
              </Alert>
            ) : cartItems.length === 0 && activeStep === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 6,
                    textAlign: "center",
                    bgcolor: "#1e293b",
                    color: "white",
                    borderRadius: 4,
                    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                    maxWidth: "700px",
                    mx: "auto",
                    background: "linear-gradient(145deg, #1e293b, #111827)",
                    border: "1px solid",
                    borderColor: "rgba(99, 102, 241, 0.2)",
                  }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: "rgba(99, 102, 241, 0.1)",
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 3,
                        boxShadow: "0 0 30px rgba(99, 102, 241, 0.3)",
                      }}
                    >
                      <ShoppingCart sx={{ fontSize: 50, color: "#6366f1" }} />
                    </Box>
                  </motion.div>
                  <Typography variant="h4" gutterBottom fontWeight="700">
                    Your cart is empty
                  </Typography>
                  <Typography
                    variant="body1"
                    color="rgba(255,255,255,0.7)"
                    paragraph
                    sx={{
                      maxWidth: "500px",
                      mx: "auto",
                      mb: 4,
                      fontSize: "1.1rem",
                    }}
                  >
                    Looks like you haven't added any items to your cart yet.
                    Explore our products and find something you'll love!
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: 3,
                      background:
                        "linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)",
                      color: "white",
                      boxShadow: "0 8px 20px rgba(99, 102, 241, .3)",
                      fontSize: "1.1rem",
                      "&:hover": {
                        background:
                          "linear-gradient(45deg, #4f46e5 30%, #7c3aed 90%)",
                        transform: "translateY(-3px)",
                        boxShadow: "0 12px 25px rgba(99, 102, 241, .4)",
                      },
                      transition: "all 0.3s",
                    }}
                    component={Link}
                    to="/products"
                  >
                    Browse Products
                  </Button>
                </Paper>
              </motion.div>
            ) : (
              <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                  {/* Step 1: Cart Items - Thiết kế mới */}
                  {activeStep === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          overflow: "hidden",
                          borderRadius: 3,
                          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                          bgcolor: "#1e293b",
                          color: "white",
                          border: "1px solid",
                          borderColor: "rgba(99, 102, 241, 0.2)",
                        }}
                      >
                        <Box
                          sx={{
                            p: 3,
                            borderBottom: "1px solid rgba(255,255,255,0.1)",
                            background:
                              "linear-gradient(145deg, #1e293b, #111827)",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                            }}
                          >
                            <Box
                              sx={{
                                bgcolor: "rgba(99, 102, 241, 0.1)",
                                width: 36,
                                height: 36,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <ShoppingCart
                                sx={{ color: "#6366f1", fontSize: 20 }}
                              />
                            </Box>
                            Cart Items ({cartItems.length})
                          </Typography>
                        </Box>

                        <AnimatePresence>
                          {cartItems.map((item) => (
                            <motion.div
                              key={item.id}
                              layout
                              initial={{ opacity: 1 }}
                              animate={{
                                opacity: removingItemId === item.id ? 0 : 1,
                                x: removingItemId === item.id ? -100 : 0,
                                height: removingItemId === item.id ? 0 : "auto",
                              }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Box
                                sx={{
                                  py: 3,
                                  px: 3,
                                  transition: "all 0.2s",
                                  borderBottom:
                                    "1px solid rgba(255,255,255,0.05)",
                                  "&:hover": {
                                    bgcolor: "rgba(255,255,255,0.03)",
                                  },
                                }}
                              >
                                <Grid container spacing={2} alignItems="center">
                                  <Grid item xs={12} sm={2}>
                                    <Box
                                      component="img"
                                      src={item.image}
                                      alt={item.name}
                                      sx={{
                                        width: "100%",
                                        maxHeight: 80,
                                        objectFit: "contain",
                                        borderRadius: 2,
                                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                                        bgcolor: "#111827",
                                        p: 1,
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={12} sm={5}>
                                    <Typography
                                      variant="subtitle1"
                                      component={Link}
                                      to={`/products/${item.id}`}
                                      sx={{
                                        textDecoration: "none",
                                        color: "white",
                                        fontWeight: 600,
                                        fontSize: "1.1rem",
                                        display: "block",
                                        mb: 0.5,
                                        "&:hover": {
                                          color: "#6366f1",
                                        },
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
                                      <Chip
                                        label={item.condition}
                                        size="small"
                                        sx={{
                                          bgcolor: "rgba(99, 102, 241, 0.2)",
                                          color: "#a5b4fc",
                                          mr: 1,
                                          fontWeight: 500,
                                        }}
                                      />
                                      <Typography
                                        variant="body2"
                                        color="rgba(255,255,255,0.7)"
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        Seller: {item.seller.name}
                                        <Rating
                                          value={item.seller.rating}
                                          size="small"
                                          readOnly
                                          sx={{ ml: 1 }}
                                        />
                                      </Typography>
                                    </Box>
                                  </Grid>

                                  <Grid
                                    item
                                    xs={6}
                                    sm={2}
                                    sx={{
                                      textAlign: { xs: "left", sm: "center" },
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        bgcolor: "rgba(255,255,255,0.05)",
                                        borderRadius: 2,
                                        p: 0.5,
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                        border:
                                          "1px solid rgba(255,255,255,0.1)",
                                      }}
                                    >
                                      <IconButton
                                        size="small"
                                        onClick={() =>
                                          handleQuantityChange(item.id, -1)
                                        }
                                        disabled={item.quantity <= 1}
                                        sx={{
                                          color: "white",
                                          "&:hover:not(:disabled)": {
                                            bgcolor: "rgba(255,255,255,0.1)",
                                          },
                                        }}
                                      >
                                        <Remove fontSize="small" />
                                      </IconButton>

                                      <Typography
                                        sx={{
                                          mx: 2,
                                          minWidth: 20,
                                          textAlign: "center",
                                          fontWeight: 600,
                                        }}
                                      >
                                        {item.quantity}
                                      </Typography>

                                      <IconButton
                                        size="small"
                                        onClick={() =>
                                          handleQuantityChange(item.id, 1)
                                        }
                                        disabled={
                                          item.quantity >= item.maxQuantity
                                        }
                                        sx={{
                                          color: "white",
                                          "&:hover:not(:disabled)": {
                                            bgcolor: "rgba(255,255,255,0.1)",
                                          },
                                        }}
                                      >
                                        <Add fontSize="small" />
                                      </IconButton>
                                    </Box>
                                  </Grid>

                                  <Grid
                                    item
                                    xs={6}
                                    sm={3}
                                    sx={{ textAlign: "right" }}
                                  >
                                    <Typography
                                      variant="h6"
                                      sx={{
                                        fontWeight: 600,
                                        background:
                                          "linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)",
                                        backgroundClip: "text",
                                        textFillColor: "transparent",
                                        mb: 1,
                                      }}
                                    >
                                      ${(item.price * item.quantity).toFixed(2)}
                                    </Typography>

                                    <Button
                                      variant="text"
                                      size="small"
                                      startIcon={<Delete />}
                                      onClick={() =>
                                        handleRemoveWithAnimation(item)
                                      }
                                      sx={{
                                        color: "#f87171",
                                        "&:hover": {
                                          backgroundColor:
                                            "rgba(248,113,113,0.1)",
                                        },
                                      }}
                                    >
                                      Remove
                                    </Button>
                                  </Grid>
                                </Grid>
                              </Box>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </Paper>
                    </motion.div>
                  )}

                  {/* Step 2: Shipping Information */}
                  {activeStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 4,
                          bgcolor: "#1e293b",
                          color: "white",
                          borderRadius: 3,
                          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                          border: "1px solid",
                          borderColor: "rgba(99, 102, 241, 0.2)",
                        }}
                      >
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            borderBottom: "1px solid rgba(255,255,255,0.1)",
                            pb: 2,
                            mb: 3,
                          }}
                        >
                          <Box
                            sx={{
                              bgcolor: "rgba(99, 102, 241, 0.1)",
                              width: 36,
                              height: 36,
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <LocalShipping
                              sx={{ color: "#6366f1", fontSize: 20 }}
                            />
                          </Box>
                          Shipping Information
                        </Typography>

                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              fullWidth
                              label="Full Name"
                              name="fullName"
                              value={shippingInfo.fullName}
                              onChange={handleShippingInfoChange}
                              InputLabelProps={{
                                style: { color: "rgba(255,255,255,0.7)" },
                              }}
                              InputProps={{
                                style: { color: "white" },
                              }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 2,
                                  bgcolor: "rgba(255,255,255,0.03)",
                                  "& fieldset": {
                                    borderColor: "rgba(255,255,255,0.1)",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "rgba(255,255,255,0.2)",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#6366f1",
                                  },
                                },
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              fullWidth
                              label="Email"
                              name="email"
                              type="email"
                              value={shippingInfo.email || ""}
                              onChange={handleShippingInfoChange}
                              InputLabelProps={{
                                style: { color: "rgba(255,255,255,0.7)" },
                              }}
                              InputProps={{
                                style: { color: "white" },
                              }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 2,
                                  bgcolor: "rgba(255,255,255,0.03)",
                                  "& fieldset": {
                                    borderColor: "rgba(255,255,255,0.1)",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "rgba(255,255,255,0.2)",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#6366f1",
                                  },
                                },
                              }}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              label="Address"
                              name="address"
                              value={shippingInfo.address}
                              onChange={handleShippingInfoChange}
                              InputLabelProps={{
                                style: { color: "rgba(255,255,255,0.7)" },
                              }}
                              InputProps={{
                                style: { color: "white" },
                              }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 2,
                                  bgcolor: "rgba(255,255,255,0.03)",
                                  "& fieldset": {
                                    borderColor: "rgba(255,255,255,0.1)",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "rgba(255,255,255,0.2)",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#6366f1",
                                  },
                                },
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              fullWidth
                              label="Phone Number"
                              name="phone"
                              value={shippingInfo.phone}
                              onChange={handleShippingInfoChange}
                              InputLabelProps={{
                                style: { color: "rgba(255,255,255,0.7)" },
                              }}
                              InputProps={{
                                style: { color: "white" },
                              }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 2,
                                  bgcolor: "rgba(255,255,255,0.03)",
                                  "& fieldset": {
                                    borderColor: "rgba(255,255,255,0.1)",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#6366f1",
                                  },
                                },
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              fullWidth
                              label="City/Province"
                              name="city"
                              value={shippingInfo.city || ""}
                              onChange={handleShippingInfoChange}
                              InputLabelProps={{
                                style: { color: "rgba(255,255,255,0.7)" },
                              }}
                              InputProps={{
                                style: { color: "white" },
                              }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 2,
                                  bgcolor: "rgba(255,255,255,0.03)",
                                  "& fieldset": {
                                    borderColor: "rgba(255,255,255,0.1)",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "rgba(255,255,255,0.2)",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#6366f1",
                                  },
                                },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    </motion.div>
                  )}

                  {/* Step 3: Payment - Cải tiến */}
                  {activeStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 4,
                          bgcolor: "#1e293b",
                          color: "white",
                          borderRadius: 3,
                          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                          border: "1px solid",
                          borderColor: "rgba(99, 102, 241, 0.2)",
                        }}
                      >
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            borderBottom: "1px solid rgba(255,255,255,0.1)",
                            pb: 2,
                            mb: 3,
                          }}
                        >
                          <Box
                            sx={{
                              bgcolor: "rgba(99, 102, 241, 0.1)",
                              width: 36,
                              height: 36,
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Payment sx={{ color: "#6366f1", fontSize: 20 }} />
                          </Box>
                          Payment Method
                        </Typography>

                        <FormControl
                          component="fieldset"
                          sx={{ width: "100%" }}
                        >
                          <RadioGroup
                            name="paymentMethod"
                            value={paymentMethod}
                            onChange={handlePaymentMethodChange}
                          >
                            <Grid container spacing={2}>
                              {/* QR Code Payment */}
                              <Grid item xs={12} sm={6}>
                                <Paper
                                  elevation={0}
                                  sx={{
                                    p: 2,
                                    border: "1px solid",
                                    borderColor:
                                      paymentMethod === "QR"
                                        ? "#6366f1"
                                        : "rgba(255,255,255,0.1)",
                                    borderRadius: 3,
                                    transition: "all 0.2s",
                                    bgcolor: "rgba(255,255,255,0.03)",
                                    boxShadow:
                                      paymentMethod === "QR"
                                        ? "0 0 15px rgba(99, 102, 241, 0.3)"
                                        : "none",
                                    "&:hover": {
                                      borderColor: "#6366f1",
                                      transform: "translateY(-2px)",
                                    },
                                  }}
                                >
                                  <FormControlLabel
                                    value="QR"
                                    control={
                                      <Radio
                                        sx={{
                                          color: "rgba(255,255,255,0.7)",
                                          "&.Mui-checked": {
                                            color: "#6366f1",
                                          },
                                        }}
                                      />
                                    }
                                    label={
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            width: 40,
                                            height: 40,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            bgcolor: "white",
                                            borderRadius: 2,
                                            mr: 2,
                                            p: 0.5,
                                          }}
                                        >
                                          <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                                            alt="QR Code"
                                            style={{
                                              width: "100%",
                                              height: "100%",
                                              objectFit: "contain",
                                            }}
                                          />
                                        </Box>
                                        <Box>
                                          <Typography
                                            variant="subtitle1"
                                            fontWeight={500}
                                            color="white"
                                          >
                                            QR Code
                                          </Typography>
                                          <Typography
                                            variant="body2"
                                            color="rgba(255,255,255,0.6)"
                                          >
                                            Scan QR to pay
                                          </Typography>
                                        </Box>
                                      </Box>
                                    }
                                    sx={{ width: "100%" }}
                                  />
                                </Paper>
                              </Grid>

                              {/* MoMo */}
                              <Grid item xs={12} sm={6}>
                                <Paper
                                  elevation={0}
                                  sx={{
                                    p: 2,
                                    border: "1px solid",
                                    borderColor:
                                      paymentMethod === "momo"
                                        ? "#6366f1"
                                        : "rgba(255,255,255,0.1)",
                                    borderRadius: 3,
                                    transition: "all 0.2s",
                                    bgcolor: "rgba(255,255,255,0.03)",
                                    boxShadow:
                                      paymentMethod === "momo"
                                        ? "0 0 15px rgba(99, 102, 241, 0.3)"
                                        : "none",
                                    "&:hover": {
                                      borderColor: "#6366f1",
                                      transform: "translateY(-2px)",
                                    },
                                  }}
                                >
                                  <FormControlLabel
                                    value="momo"
                                    control={
                                      <Radio
                                        sx={{
                                          color: "rgba(255,255,255,0.7)",
                                          "&.Mui-checked": {
                                            color: "#6366f1",
                                          },
                                        }}
                                      />
                                    }
                                    label={
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            width: 40,
                                            height: 40,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            bgcolor: "#a50064",
                                            borderRadius: 2,
                                            mr: 2,
                                            p: 0.5,
                                          }}
                                        >
                                          <img
                                            src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                                            alt="MoMo"
                                            style={{
                                              width: "100%",
                                              height: "100%",
                                              objectFit: "contain",
                                            }}
                                          />
                                        </Box>
                                        <Box>
                                          <Typography
                                            variant="subtitle1"
                                            fontWeight={500}
                                            color="white"
                                          >
                                            MoMo
                                          </Typography>
                                          <Typography
                                            variant="body2"
                                            color="rgba(255,255,255,0.6)"
                                          >
                                            Pay with MoMo wallet
                                          </Typography>
                                        </Box>
                                      </Box>
                                    }
                                    sx={{ width: "100%" }}
                                  />
                                </Paper>
                              </Grid>

                              {/* ZaloPay */}
                              <Grid item xs={12} sm={6}>
                                <Paper
                                  elevation={0}
                                  sx={{
                                    p: 2,
                                    border: "1px solid",
                                    borderColor:
                                      paymentMethod === "zalopay"
                                        ? "#6366f1"
                                        : "rgba(255,255,255,0.1)",
                                    borderRadius: 3,
                                    transition: "all 0.2s",
                                    bgcolor: "rgba(255,255,255,0.03)",
                                    boxShadow:
                                      paymentMethod === "zalopay"
                                        ? "0 0 15px rgba(99, 102, 241, 0.3)"
                                        : "none",
                                    "&:hover": {
                                      borderColor: "#6366f1",
                                      transform: "translateY(-2px)",
                                    },
                                  }}
                                >
                                  <FormControlLabel
                                    value="zalopay"
                                    control={
                                      <Radio
                                        sx={{
                                          color: "rgba(255,255,255,0.7)",
                                          "&.Mui-checked": {
                                            color: "#6366f1",
                                          },
                                        }}
                                      />
                                    }
                                    label={
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            width: 40,
                                            height: 40,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            bgcolor: "#0068ff",
                                            borderRadius: 2,
                                            mr: 2,
                                            p: 0.5,
                                          }}
                                        >
                                          <img
                                            src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png"
                                            alt="ZaloPay"
                                            style={{
                                              width: "100%",
                                              height: "100%",
                                              objectFit: "contain",
                                            }}
                                          />
                                        </Box>
                                        <Box>
                                          <Typography
                                            variant="subtitle1"
                                            fontWeight={500}
                                            color="white"
                                          >
                                            ZaloPay
                                          </Typography>
                                          <Typography
                                            variant="body2"
                                            color="rgba(255,255,255,0.6)"
                                          >
                                            Pay with ZaloPay wallet
                                          </Typography>
                                        </Box>
                                      </Box>
                                    }
                                    sx={{ width: "100%" }}
                                  />
                                </Paper>
                              </Grid>

                              {/* VNPay */}
                              <Grid item xs={12} sm={6}>
                                <Paper
                                  elevation={0}
                                  sx={{
                                    p: 2,
                                    border: "1px solid",
                                    borderColor:
                                      paymentMethod === "vnpay"
                                        ? "#6366f1"
                                        : "rgba(255,255,255,0.1)",
                                    borderRadius: 3,
                                    transition: "all 0.2s",
                                    bgcolor: "rgba(255,255,255,0.03)",
                                    boxShadow:
                                      paymentMethod === "vnpay"
                                        ? "0 0 15px rgba(99, 102, 241, 0.3)"
                                        : "none",
                                    "&:hover": {
                                      borderColor: "#6366f1",
                                      transform: "translateY(-2px)",
                                    },
                                  }}
                                >
                                  <FormControlLabel
                                    value="vnpay"
                                    control={
                                      <Radio
                                        sx={{
                                          color: "rgba(255,255,255,0.7)",
                                          "&.Mui-checked": {
                                            color: "#6366f1",
                                          },
                                        }}
                                      />
                                    }
                                    label={
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            width: 40,
                                            height: 40,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            bgcolor: "#0f1e32",
                                            borderRadius: 2,
                                            mr: 2,
                                            p: 0.5,
                                          }}
                                        >
                                          <img
                                            src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png"
                                            alt="VNPay"
                                            style={{
                                              width: "100%",
                                              height: "100%",
                                              objectFit: "contain",
                                            }}
                                          />
                                        </Box>
                                        <Box>
                                          <Typography
                                            variant="subtitle1"
                                            fontWeight={500}
                                            color="white"
                                          >
                                            VNPay
                                          </Typography>
                                          <Typography
                                            variant="body2"
                                            color="rgba(255,255,255,0.6)"
                                          >
                                            Pay with VNPay wallet
                                          </Typography>
                                        </Box>
                                      </Box>
                                    }
                                    sx={{ width: "100%" }}
                                  />
                                </Paper>
                              </Grid>
                            </Grid>
                          </RadioGroup>
                        </FormControl>

                        {/* QR Payment Display */}
                        {paymentMethod === "QR" && (
                          <Box sx={{ mt: 4, textAlign: "center" }}>
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Paper
                                elevation={0}
                                sx={{
                                  p: 3,
                                  borderRadius: 3,
                                  bgcolor: "white",
                                  display: "inline-block",
                                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                                }}
                              >
                                <img
                                  src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                                  alt="QR Code Payment"
                                  style={{ width: 200, height: 200 }}
                                />
                              </Paper>
                            </motion.div>
                            <Typography
                              variant="body1"
                              color="rgba(255,255,255,0.8)"
                              sx={{ mt: 3 }}
                            >
                              Scan QR code to complete payment
                            </Typography>
                            <Typography
                              variant="h6"
                              sx={{
                                mt: 1,
                                background:
                                  "linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)",
                                backgroundClip: "text",
                                textFillColor: "transparent",
                                fontWeight: 600,
                              }}
                            >
                              ${calculateTotal().toFixed(2)}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="rgba(255,255,255,0.6)"
                              sx={{ mt: 0.5 }}
                            >
                              The QR code will expire in 15:00 minutes
                            </Typography>
                          </Box>
                        )}

                        {/* E-wallet Redirects */}
                        {(paymentMethod === "momo" ||
                          paymentMethod === "zalopay" ||
                          paymentMethod === "vnpay") && (
                          <Box sx={{ mt: 4 }}>
                            <Paper
                              elevation={0}
                              sx={{
                                p: 3,
                                borderRadius: 3,
                                bgcolor: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.1)",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  mb: 2,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 40,
                                    height: 40,
                                    bgcolor:
                                      paymentMethod === "momo"
                                        ? "#a50064"
                                        : paymentMethod === "zalopay"
                                        ? "#0068ff"
                                        : "#0f1e32",
                                    borderRadius: 2,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    mr: 2,
                                  }}
                                >
                                  <img
                                    src={
                                      paymentMethod === "momo"
                                        ? "https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                                        : paymentMethod === "zalopay"
                                        ? "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png"
                                        : "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png"
                                    }
                                    alt={
                                      paymentMethod === "momo"
                                        ? "MoMo"
                                        : paymentMethod === "zalopay"
                                        ? "ZaloPay"
                                        : "VNPay"
                                    }
                                    style={{ width: 30, height: 30 }}
                                  />
                                </Box>
                                <Typography variant="h6" color="white">
                                  {paymentMethod === "momo"
                                    ? "MoMo"
                                    : paymentMethod === "zalopay"
                                    ? "ZaloPay"
                                    : "VNPay"}
                                </Typography>
                              </Box>

                              <Typography
                                variant="body1"
                                paragraph
                                color="white"
                              >
                                You will be redirected to{" "}
                                <span style={{ fontWeight: 600 }}>
                                  {paymentMethod === "momo"
                                    ? "MoMo"
                                    : paymentMethod === "zalopay"
                                    ? "ZaloPay"
                                    : "VNPay"}
                                </span>{" "}
                                to complete your payment when you click "Place
                                Order".
                              </Typography>

                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  mt: 2,
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  color="rgba(255,255,255,0.6)"
                                >
                                  Order total
                                </Typography>
                                <Typography
                                  variant="h6"
                                  sx={{
                                    background:
                                      "linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)",
                                    backgroundClip: "text",
                                    textFillColor: "transparent",
                                    fontWeight: 600,
                                  }}
                                >
                                  ${calculateTotal().toFixed(2)}
                                </Typography>
                              </Box>
                            </Paper>
                          </Box>
                        )}
                      </Paper>
                    </motion.div>
                  )}

                  {/* Step 4: Confirmation - Cải tiến */}
                  {activeStep === 3 && orderPlaced && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      style={{ maxWidth: "800px" }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 5,
                          textAlign: "center",
                          justifyContent: "center",
                          bgcolor: "#1e293b",
                          color: "white",
                          borderRadius: 3,
                          boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                          border: "1px solid",
                          borderColor: "rgba(99, 102, 241, 0.2)",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        {/* Background decoration */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: -20,
                            right: -20,
                            width: 200,
                            height: 200,
                            borderRadius: "50%",
                            background:
                              "radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(99,102,241,0) 70%)",
                            zIndex: 0,
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: -30,
                            left: -30,
                            width: 180,
                            height: 180,
                            borderRadius: "50%",
                            background:
                              "radial-gradient(circle, rgba(139,92,246,0.2) 0%, rgba(139,92,246,0) 70%)",
                            zIndex: 0,
                          }}
                        />
                        <Box sx={{ position: "relative", zIndex: 1 }}>
                          <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                              delay: 0.1,
                            }}
                          >
                            <Box
                              sx={{
                                width: 90,
                                height: 90,
                                borderRadius: "50%",
                                bgcolor: "rgba(16, 185, 129, 0.1)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mx: "auto",
                                mb: 3,
                                boxShadow: "0 0 30px rgba(16, 185, 129, 0.3)",
                              }}
                            >
                              <CheckCircle
                                sx={{ fontSize: 50, color: "#10b981" }}
                              />
                            </Box>
                          </motion.div>

                          <Typography
                            variant="h4"
                            gutterBottom
                            fontWeight="700"
                          >
                            Thank you for your order!
                          </Typography>

                          <Typography
                            variant="body1"
                            color="rgba(255,255,255,0.8)"
                            paragraph
                            sx={{
                              maxWidth: "600px",
                              mx: "auto",
                              fontSize: "1.1rem",
                              mt: 2,
                            }}
                          >
                            Your order has been placed successfully. We've sent
                            a confirmation email with all the details.
                          </Typography>

                          <Box
                            sx={{
                              py: 3,
                              px: 4,
                              my: 4,
                              display: "inline-block",
                              bgcolor: "rgba(16, 185, 129, 0.05)",
                              border: "1px dashed #10b981",
                              borderRadius: 3,
                            }}
                          >
                            <Typography variant="h6" color="white">
                              Order Number:
                            </Typography>
                            <Typography
                              variant="h5"
                              sx={{
                                fontWeight: 700,
                                letterSpacing: "1px",
                                color: "#10b981",
                                my: 1,
                              }}
                            >
                              {orderNumber}
                            </Typography>
                          </Box>

                          <Grid container spacing={3} sx={{ mt: 3, mb: 4 }}>
                            <Grid item xs={12} sm={6}>
                              <Paper
                                elevation={0}
                                sx={{
                                  p: 3,
                                  backgroundColor: "rgba(255,255,255,0.03)",
                                  borderRadius: 3,
                                  height: "100%",
                                  transition: "transform 0.2s",
                                  "&:hover": {
                                    transform: "translateY(-5px)",
                                  },
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 2,
                                  }}
                                >
                                  <Box
                                    sx={{
                                      bgcolor: "rgba(99, 102, 241, 0.1)",
                                      width: 36,
                                      height: 36,
                                      borderRadius: "50%",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      mr: 1.5,
                                    }}
                                  >
                                    <LocalShipping
                                      sx={{ color: "#6366f1", fontSize: 20 }}
                                    />
                                  </Box>
                                  <Typography
                                    variant="h6"
                                    fontWeight={600}
                                    color="white"
                                  >
                                    Shipping Details
                                  </Typography>
                                </Box>
                                <Typography
                                  variant="body1"
                                  color="rgba(255,255,255,0.8)"
                                  sx={{ mb: 0.5 }}
                                >
                                  {shippingInfo.fullName}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="rgba(255,255,255,0.6)"
                                  sx={{ mb: 0.5 }}
                                >
                                  {shippingInfo.address}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="rgba(255,255,255,0.6)"
                                >
                                  {shippingInfo.phone}
                                </Typography>
                              </Paper>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <Paper
                                elevation={0}
                                sx={{
                                  p: 3,
                                  backgroundColor: "rgba(255,255,255,0.03)",
                                  borderRadius: 3,
                                  height: "100%",
                                  transition: "transform 0.2s",
                                  "&:hover": {
                                    transform: "translateY(-5px)",
                                  },
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 2,
                                  }}
                                >
                                  <Box
                                    sx={{
                                      bgcolor: "rgba(99, 102, 241, 0.1)",
                                      width: 36,
                                      height: 36,
                                      borderRadius: "50%",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      mr: 1.5,
                                    }}
                                  >
                                    <Payment
                                      sx={{ color: "#6366f1", fontSize: 20 }}
                                    />
                                  </Box>
                                  <Typography
                                    variant="h6"
                                    fontWeight={600}
                                    color="white"
                                  >
                                    Payment Information
                                  </Typography>
                                </Box>
                                <Typography
                                  variant="body1"
                                  color="rgba(255,255,255,0.8)"
                                  sx={{ mb: 0.5 }}
                                >
                                  Payment Method:
                                  <Chip
                                    label={
                                      paymentMethod === "QR"
                                        ? "QR Code"
                                        : paymentMethod === "momo"
                                        ? "MoMo"
                                        : paymentMethod === "zalopay"
                                        ? "ZaloPay"
                                        : "VNPay"
                                    }
                                    size="small"
                                    sx={{
                                      ml: 1,
                                      bgcolor: "rgba(99, 102, 241, 0.1)",
                                      color: "#a5b4fc",
                                      fontWeight: "bold",
                                      height: 20,
                                      fontSize: 10,
                                    }}
                                  />
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="rgba(255,255,255,0.6)"
                                  sx={{ mb: 0.5 }}
                                >
                                  Order Total:
                                  <span
                                    style={{
                                      marginLeft: "8px",
                                      fontWeight: 600,
                                      color: "rgba(255,255,255,0.9)",
                                    }}
                                  >
                                    ${calculateTotal().toFixed(2)}
                                  </span>
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="rgba(255,255,255,0.6)"
                                >
                                  Date: {new Date().toLocaleDateString()}
                                </Typography>
                              </Paper>
                            </Grid>
                          </Grid>

                          <Box sx={{ mt: 4 }}>
                            <Button
                              variant="contained"
                              size="large"
                              sx={{
                                mr: 2,
                                py: 1.5,
                                px: 4,
                                borderRadius: 3,
                                background:
                                  "linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)",
                                boxShadow: "0 8px 20px rgba(99, 102, 241, .3)",
                                fontSize: "1rem",
                                fontWeight: 600,
                                "&:hover": {
                                  background:
                                    "linear-gradient(45deg, #4f46e5 30%, #7c3aed 90%)",
                                  transform: "translateY(-3px)",
                                  boxShadow:
                                    "0 12px 25px rgba(99, 102, 241, .4)",
                                },
                                transition: "all 0.3s",
                              }}
                              onClick={() => navigate("/profile")}
                            >
                              View My Orders
                            </Button>

                            <Button
                              variant="outlined"
                              size="large"
                              sx={{
                                py: 1.5,
                                px: 4,
                                borderRadius: 3,
                                borderColor: "rgba(255,255,255,0.3)",
                                borderWidth: 1,
                                color: "white",
                                fontSize: "1rem",
                                fontWeight: 500,
                                "&:hover": {
                                  borderColor: "#8b5cf6",
                                  backgroundColor: "rgba(99, 102, 241, 0.1)",
                                  transform: "translateY(-3px)",
                                },
                                transition: "all 0.3s",
                              }}
                              onClick={() => navigate("/products")}
                            >
                              Continue Shopping
                            </Button>
                          </Box>
                        </Box>
                      </Paper>
                    </motion.div>
                  )}
                </Grid>

                {/* Order Summary - Only show for steps 0, 1, and 2 */}
                {activeStep < 3 && (
                  <Grid item xs={12} md={4}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 4,
                          borderRadius: 3,
                          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                          backgroundColor: "#1e293b",
                          background:
                            "linear-gradient(145deg, #1e293b, #111827)",
                          color: "white",
                          position: "sticky",
                          top: 20,
                          border: "1px solid",
                          borderColor: "rgba(99, 102, 241, 0.2)",
                        }}
                      >
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{
                            fontWeight: 600,
                            borderBottom: "2px solid",
                            borderImage:
                              "linear-gradient(to right, #6366f1, #8b5cf6) 1",
                            pb: 2,
                            mb: 3,
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <Box
                            sx={{
                              bgcolor: "rgba(99, 102, 241, 0.1)",
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <ShoppingCart
                              sx={{ color: "#6366f1", fontSize: 18 }}
                            />
                          </Box>
                          Order Summary
                        </Typography>

                        <List
                          dense
                          sx={{ "& .MuiListItem-root": { px: 0, py: 1.5 } }}
                        >
                          <ListItem>
                            <ListItemText
                              primary={
                                <Typography
                                  variant="subtitle1"
                                  color="rgba(255,255,255,0.7)"
                                >
                                  Subtotal ({cartItems.length} items)
                                </Typography>
                              }
                            />
                            <Typography variant="h6">
                              ${calculateSubtotal().toFixed(2)}
                            </Typography>
                          </ListItem>

                          {/* Hiển thị giảm giá nếu đã áp dụng promo code */}
                          {promoApplied && (
                            <ListItem>
                              <ListItemText
                                primary={
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Typography
                                      variant="subtitle1"
                                      color="rgba(255,255,255,0.7)"
                                      sx={{ mr: 1 }}
                                    >
                                      Discount
                                    </Typography>
                                    <Chip
                                      label={promoCode.toUpperCase()}
                                      size="small"
                                      sx={{
                                        backgroundColor:
                                          "rgba(16, 185, 129, 0.2)",
                                        color: "#10b981",
                                        fontWeight: "bold",
                                        height: 20,
                                        fontSize: 10,
                                      }}
                                    />
                                  </Box>
                                }
                              />
                              <Typography variant="h6" color="#10b981">
                                -${promoDiscount.toFixed(2)}
                              </Typography>
                            </ListItem>
                          )}
                          <Divider
                            sx={{
                              my: 2,
                              borderColor: "rgba(255,255,255,0.1)",
                              "&::before, &::after": {
                                borderColor: "rgba(255,255,255,0.1)",
                              },
                            }}
                          />

                          <ListItem sx={{ py: 2 }}>
                            <ListItemText
                              primary={
                                <Typography
                                  variant="h6"
                                  sx={{ fontWeight: 600 }}
                                >
                                  Total
                                </Typography>
                              }
                            />
                            <Typography
                              variant="h5"
                              sx={{
                                fontWeight: 700,
                                background:
                                  "linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)",
                                backgroundClip: "text",
                                textFillColor: "transparent",
                              }}
                            >
                              ${calculateTotal().toFixed(2)}
                            </Typography>
                          </ListItem>
                        </List>

                        {/* Buttons - Cải tiến */}
                        {activeStep < 3 && (
                          <Box
                            sx={{
                              mt: 4,
                              display: "flex",
                              justifyContent: "space-between",
                              gap: 2,
                            }}
                          >
                            <Button
                              disabled={activeStep === 0}
                              onClick={handleBack}
                              startIcon={activeStep > 0 && <ArrowBack />}
                              sx={{
                                borderRadius: 2,
                                py: 1.5,
                                px: 3,
                                textTransform: "none",
                                color: "white",
                                fontWeight: 500,
                                borderColor: "rgba(255,255,255,0.3)",
                                borderWidth: activeStep > 0 ? 1 : 0,
                                borderStyle: activeStep > 0 ? "solid" : "none",
                                "&:not(:disabled)": {
                                  "&:hover": {
                                    transform: "translateX(-4px)",
                                    transition: "transform 0.2s",
                                    backgroundColor: "rgba(255,255,255,0.05)",
                                  },
                                },
                              }}
                            >
                              Back
                            </Button>

                            <Button
                              variant="contained"
                              onClick={
                                activeStep === 2 ? handlePlaceOrder : handleNext
                              }
                              endIcon={activeStep < 2 && <ArrowForward />}
                              disabled={
                                (activeStep === 0 && cartItems.length === 0) ||
                                (activeStep === 1 && !isShippingInfoComplete())
                              }
                              sx={{
                                borderRadius: 2,
                                py: 1.5,
                                px: 3,
                                fontWeight: 600,
                                textTransform: "none",
                                background:
                                  activeStep === 2
                                    ? "linear-gradient(45deg, #10b981 30%, #059669 90%)"
                                    : "linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)",
                                boxShadow:
                                  activeStep === 2
                                    ? "0 3px 5px 2px rgba(16, 185, 129, .3)"
                                    : "0 3px 5px 2px rgba(99, 102, 241, .3)",
                                "&:not(:disabled)": {
                                  "&:hover": {
                                    background:
                                      activeStep === 2
                                        ? "linear-gradient(45deg, #059669 30%, #047857 90%)"
                                        : "linear-gradient(45deg, #4f46e5 30%, #7c3aed 90%)",
                                    transform: "translateY(-2px)",
                                    boxShadow:
                                      activeStep === 2
                                        ? "0 6px 10px 4px rgba(16, 185, 129, .3)"
                                        : "0 6px 10px 4px rgba(99, 102, 241, .3)",
                                  },
                                },
                                transition: "all 0.2s",
                              }}
                            >
                              {activeStep === 2
                                ? "Place Order"
                                : activeStep === 1
                                ? "Next"
                                : "Next"}
                            </Button>
                          </Box>
                        )}
                      </Paper>
                    </motion.div>
                  </Grid>
                )}
              </Grid>
            )}

            {/* Dialog xác nhận xóa sản phẩm - Cải tiến */}
            <Dialog
              open={confirmDialogOpen}
              onClose={() => setConfirmDialogOpen(false)}
              PaperProps={{
                sx: {
                  bgcolor: "#2a3749",
                  color: "white",
                  borderRadius: 3,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                  maxWidth: "400px",
                },
              }}
            >
              <DialogTitle
                sx={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Delete sx={{ color: "#f87171" }} />
                  <Typography variant="h6">Remove Item</Typography>
                </Box>
              </DialogTitle>
              <DialogContent sx={{ mt: 2 }}>
                <Typography variant="body1">
                  Are you sure you want to remove "{itemToRemove?.name}" from
                  your cart?
                </Typography>
              </DialogContent>
              <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button
                  onClick={() => setConfirmDialogOpen(false)}
                  variant="outlined"
                  sx={{
                    borderColor: "rgba(255,255,255,0.3)",
                    color: "white",
                    borderRadius: 2,
                    "&:hover": {
                      borderColor: "white",
                      backgroundColor: "rgba(255,255,255,0.05)",
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmRemoveItem}
                  variant="contained"
                  sx={{
                    bgcolor: "#f87171",
                    color: "white",
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "#ef4444",
                    },
                  }}
                >
                  Remove
                </Button>
              </DialogActions>
            </Dialog>

            {/* Thêm Toast Container */}
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              toastStyle={{
                borderRadius: "10px",
                background: "#2a3749",
                color: "white",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              }}
            />
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Cart;
