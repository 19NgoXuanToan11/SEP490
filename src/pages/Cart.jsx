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
} from "@mui/material";
import {
  Delete,
  Add,
  Remove,
  ShoppingCart,
  LocalShipping,
  Payment,
  CheckCircle,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    phone: "",
  });
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

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
              image: "https://via.placeholder.com/100",
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
              image: "https://via.placeholder.com/100",
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };

  const handleShippingMethodChange = (e) => {
    setShippingMethod(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleQuantityChange = (id, change) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        if (newQuantity > 0 && newQuantity <= item.maxQuantity) {
          return { ...item, quantity: newQuantity };
        }
      }
      return item;
    });

    setCartItems(updatedCartItems);
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

  const handlePlaceOrder = () => {
    // Here you would send the order to your API
    console.log("Placing order:", {
      items: cartItems,
      shippingInfo,
      shippingMethod,
      paymentMethod,
    });

    // Simulate order placement
    setLoading(true);
    setTimeout(() => {
      setOrderNumber(`ORD-${Math.floor(100000 + Math.random() * 900000)}`);
      setOrderPlaced(true);
      setLoading(false);
      setActiveStep(3);
    }, 2000);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateShippingCost = () => {
    const subtotal = calculateSubtotal();
    if (subtotal === 0) return 0;

    if (shippingMethod === "express") {
      return 12.99;
    } else if (shippingMethod === "standard") {
      return subtotal >= 100 ? 0 : 5.99;
    }

    return 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShippingCost();
  };

  const steps = [
    "Shopping Cart",
    "Shipping Information",
    "Payment",
    "Confirmation",
  ];

  const isShippingInfoComplete = () => {
    return Object.values(shippingInfo).every((value) => value.trim() !== "");
  };

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
          sx={{
            py: 6,
            minHeight: "70vh",
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
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                textAlign: "center",
                fontWeight: 600,
                background: "linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)",
                backgroundClip: "text",
                textFillColor: "transparent",
                mb: 4,
              }}
            >
              {activeStep === 3 && orderPlaced
                ? "Order Confirmation"
                : "Shopping Cart"}
            </Typography>

            <Stepper
              activeStep={activeStep}
              sx={{
                mb: 6,
                "& .MuiStepLabel-root .Mui-completed": {
                  color: "#8b5cf6",
                },
                "& .MuiStepLabel-root .Mui-active": {
                  color: "#6366f1",
                },
                "& .MuiStepLabel-label": {
                  color: "white",
                },
                "& .MuiStepIcon-root": {
                  color: "rgba(255, 255, 255, 0.3)",
                },
                "& .MuiStepConnector-line": {
                  borderColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress sx={{ color: "#6366f1" }} />
              </Box>
            ) : error ? (
              <Alert severity="error" sx={{ mb: 4 }}>
                {error}
              </Alert>
            ) : cartItems.length === 0 && activeStep === 0 ? (
              <Paper
                sx={{
                  p: 4,
                  textAlign: "center",
                  bgcolor: "#2a3749",
                  color: "white",
                  borderRadius: 2,
                }}
              >
                <ShoppingCart sx={{ fontSize: 60, color: "#6366f1", mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Your cart is empty
                </Typography>
                <Typography
                  variant="body1"
                  color="rgba(255,255,255,0.7)"
                  paragraph
                >
                  Looks like you haven't added any items to your cart yet.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    background:
                      "linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)",
                    color: "white",
                    boxShadow: "0 3px 5px 2px rgba(99, 102, 241, .3)",
                    "&:hover": {
                      background:
                        "linear-gradient(45deg, #4f46e5 30%, #7c3aed 90%)",
                    },
                  }}
                  component={Link}
                  to="/products"
                >
                  Browse Products
                </Button>
              </Paper>
            ) : (
              <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                  {/* Step 1: Cart Items */}
                  {activeStep === 0 && (
                    <Paper
                      sx={{
                        p: 4,
                        borderRadius: 2,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                        bgcolor: "#1e293b",
                        color: "white",
                        transition: "transform 0.2s ease-in-out",
                        "&:hover": {
                          transform: "translateY(-4px)",
                        },
                      }}
                    >
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <ShoppingCart sx={{ color: "#6366f1" }} />
                        Cart Items ({cartItems.length})
                      </Typography>

                      <List>
                        {cartItems.map((item) => (
                          <React.Fragment key={item.id}>
                            <ListItem
                              sx={{
                                py: 3,
                                px: 2,
                                transition: "all 0.2s",
                                "&:hover": {
                                  backgroundColor: "rgba(255,255,255,0.05)",
                                  transform: "scale(1.01)",
                                },
                              }}
                            >
                              <ListItemAvatar sx={{ mr: 3 }}>
                                <Box
                                  component="img"
                                  src={item.image}
                                  alt={item.name}
                                  sx={{
                                    width: 100,
                                    height: 100,
                                    objectFit: "cover",
                                    borderRadius: 2,
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                  }}
                                />
                              </ListItemAvatar>

                              <ListItemText
                                primary={
                                  <Typography
                                    variant="h6"
                                    component={Link}
                                    to={`/products/${item.id}`}
                                    sx={{
                                      textDecoration: "none",
                                      color: "white",
                                      fontWeight: 500,
                                      "&:hover": {
                                        color: "#6366f1",
                                      },
                                    }}
                                  >
                                    {item.name}
                                  </Typography>
                                }
                                secondary={
                                  <Box sx={{ mt: 1 }}>
                                    <Typography
                                      variant="body2"
                                      color="rgba(255,255,255,0.7)"
                                    >
                                      Condition:{" "}
                                      <Chip
                                        label={item.condition}
                                        size="small"
                                        sx={{
                                          bgcolor: "rgba(99, 102, 241, 0.2)",
                                          color: "white",
                                        }}
                                      />
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="rgba(255,255,255,0.7)"
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
                                }
                              />

                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-end",
                                  ml: 2,
                                }}
                              >
                                <Typography
                                  variant="h6"
                                  sx={{
                                    fontWeight: 600,
                                    background:
                                      "linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)",
                                    backgroundClip: "text",
                                    textFillColor: "transparent",
                                  }}
                                >
                                  ${(item.price * item.quantity).toFixed(2)}
                                </Typography>

                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mt: 2,
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                    borderRadius: 2,
                                    p: 0.5,
                                  }}
                                >
                                  <IconButton
                                    size="small"
                                    onClick={() =>
                                      handleQuantityChange(item.id, -1)
                                    }
                                    disabled={item.quantity <= 1}
                                    sx={{
                                      "&:hover": {
                                        backgroundColor:
                                          "rgba(255,255,255,0.2)",
                                      },
                                      color: "white",
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
                                    disabled={item.quantity >= item.maxQuantity}
                                    sx={{
                                      "&:hover": {
                                        backgroundColor:
                                          "rgba(255,255,255,0.2)",
                                      },
                                      color: "white",
                                    }}
                                  >
                                    <Add fontSize="small" />
                                  </IconButton>
                                </Box>

                                <Button
                                  variant="text"
                                  size="small"
                                  startIcon={<Delete />}
                                  onClick={() => handleRemoveItem(item)}
                                  sx={{
                                    mt: 2,
                                    color: "#f87171",
                                    "&:hover": {
                                      backgroundColor: "rgba(248,113,113,0.1)",
                                    },
                                  }}
                                >
                                  Remove
                                </Button>
                              </Box>
                            </ListItem>
                            <Divider
                              variant="inset"
                              component="li"
                              sx={{ borderColor: "rgba(255,255,255,0.1)" }}
                            />
                          </React.Fragment>
                        ))}
                      </List>
                    </Paper>
                  )}

                  {/* Step 2: Shipping Information */}
                  {activeStep === 1 && (
                    <Paper
                      sx={{
                        p: 3,
                        bgcolor: "#2a3749",
                        color: "white",
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="h6" gutterBottom>
                        Shipping Information
                      </Typography>

                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            label="Full Name"
                            name="fullName"
                            value={shippingInfo.fullName}
                            onChange={handleShippingInfoChange}
                            InputLabelProps={{
                              style: { color: "white" },
                            }}
                            InputProps={{
                              style: { color: "white" },
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
                              style: { color: "white" },
                            }}
                            InputProps={{
                              style: { color: "white" },
                            }}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            label="Phone Number"
                            name="phone"
                            value={shippingInfo.phone}
                            onChange={handleShippingInfoChange}
                            InputLabelProps={{
                              style: { color: "white" },
                            }}
                            InputProps={{
                              style: { color: "white" },
                            }}
                          />
                        </Grid>
                      </Grid>

                      <Box sx={{ mt: 3 }}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">
                            Shipping Method
                          </FormLabel>
                          <RadioGroup
                            name="shippingMethod"
                            value={shippingMethod}
                            onChange={handleShippingMethodChange}
                          >
                            <FormControlLabel
                              value="standard"
                              control={<Radio />}
                              label={
                                <Box>
                                  <Typography variant="body1">
                                    Standard Shipping (3-5 business days)
                                  </Typography>
                                </Box>
                              }
                            />
                            <FormControlLabel
                              value="express"
                              control={<Radio />}
                              label={
                                <Box>
                                  <Typography variant="body1">
                                    Express Shipping (1-2 business days)
                                  </Typography>
                                </Box>
                              }
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    </Paper>
                  )}

                  {/* Step 3: Payment */}
                  {activeStep === 2 && (
                    <Paper
                      sx={{
                        p: 3,
                        bgcolor: "#2a3749",
                        color: "white",
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="h6" gutterBottom>
                        Payment Method
                      </Typography>

                      <FormControl component="fieldset" sx={{ width: "100%" }}>
                        <RadioGroup
                          name="paymentMethod"
                          value={paymentMethod}
                          onChange={handlePaymentMethodChange}
                        >
                          <Grid container spacing={2}>
                            {/* QR Code Payment */}
                            <Grid item xs={12} sm={6}>
                              <Paper
                                variant="outlined"
                                sx={{
                                  p: 2,
                                  border: paymentMethod === "QR" ? 2 : 1,
                                  borderColor:
                                    paymentMethod === "QR"
                                      ? "primary.main"
                                      : "grey.300",
                                }}
                              >
                                <FormControlLabel
                                  value="QR"
                                  control={<Radio />}
                                  label={
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                                        alt="QR Code"
                                        style={{
                                          width: 40,
                                          height: 40,
                                          marginRight: 10,
                                        }}
                                      />
                                      <Box>
                                        <Typography variant="subtitle1">
                                          QR Code
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                        >
                                          Scan QR to pay
                                        </Typography>
                                      </Box>
                                    </Box>
                                  }
                                />
                              </Paper>
                            </Grid>

                            {/* MoMo */}
                            <Grid item xs={12} sm={6}>
                              <Paper
                                variant="outlined"
                                sx={{
                                  p: 2,
                                  border: paymentMethod === "momo" ? 2 : 1,
                                  borderColor:
                                    paymentMethod === "momo"
                                      ? "primary.main"
                                      : "grey.300",
                                }}
                              >
                                <FormControlLabel
                                  value="momo"
                                  control={<Radio />}
                                  label={
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <img
                                        src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                                        alt="MoMo"
                                        style={{
                                          width: 40,
                                          height: 40,
                                          marginRight: 10,
                                        }}
                                      />
                                      <Box>
                                        <Typography variant="subtitle1">
                                          MoMo
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                        >
                                          Pay with MoMo wallet
                                        </Typography>
                                      </Box>
                                    </Box>
                                  }
                                />
                              </Paper>
                            </Grid>

                            {/* ZaloPay */}
                            <Grid item xs={12} sm={6}>
                              <Paper
                                variant="outlined"
                                sx={{
                                  p: 2,
                                  border: paymentMethod === "zalopay" ? 2 : 1,
                                  borderColor:
                                    paymentMethod === "zalopay"
                                      ? "primary.main"
                                      : "grey.300",
                                }}
                              >
                                <FormControlLabel
                                  value="zalopay"
                                  control={<Radio />}
                                  label={
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <img
                                        src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png"
                                        alt="ZaloPay"
                                        style={{
                                          width: 40,
                                          height: 40,
                                          marginRight: 10,
                                        }}
                                      />
                                      <Box>
                                        <Typography variant="subtitle1">
                                          ZaloPay
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                        >
                                          Pay with ZaloPay wallet
                                        </Typography>
                                      </Box>
                                    </Box>
                                  }
                                />
                              </Paper>
                            </Grid>

                            {/* VNPay */}
                            <Grid item xs={12} sm={6}>
                              <Paper
                                variant="outlined"
                                sx={{
                                  p: 2,
                                  border: paymentMethod === "vnpay" ? 2 : 1,
                                  borderColor:
                                    paymentMethod === "vnpay"
                                      ? "primary.main"
                                      : "grey.300",
                                }}
                              >
                                <FormControlLabel
                                  value="vnpay"
                                  control={<Radio />}
                                  label={
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <img
                                        src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png"
                                        alt="VNPay"
                                        style={{
                                          width: 40,
                                          height: 40,
                                          marginRight: 10,
                                        }}
                                      />
                                      <Box>
                                        <Typography variant="subtitle1">
                                          VNPay
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                        >
                                          Pay with VNPay wallet
                                        </Typography>
                                      </Box>
                                    </Box>
                                  }
                                />
                              </Paper>
                            </Grid>
                          </Grid>
                        </RadioGroup>
                      </FormControl>

                      {/* Hiển thị thông tin thanh toán tương ứng */}
                      {paymentMethod === "QR" && (
                        <Box sx={{ mt: 3, textAlign: "center" }}>
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                            alt="QR Code Payment"
                            style={{ width: 200, height: 200 }}
                          />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 2 }}
                          >
                            Scan QR code to complete payment
                          </Typography>
                        </Box>
                      )}

                      {(paymentMethod === "momo" ||
                        paymentMethod === "zalopay" ||
                        paymentMethod === "vnpay") && (
                        <Box sx={{ mt: 3 }}>
                          <Typography variant="body1" gutterBottom>
                            You will be redirected to{" "}
                            {paymentMethod === "momo"
                              ? "MoMo"
                              : paymentMethod === "zalopay"
                              ? "ZaloPay"
                              : "VNPay"}{" "}
                            to complete your payment
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Total amount: ${calculateTotal().toFixed(2)}
                          </Typography>
                        </Box>
                      )}
                    </Paper>
                  )}

                  {/* Step 4: Confirmation */}
                  {activeStep === 3 && orderPlaced && (
                    <Paper
                      sx={{
                        p: 3,
                        textAlign: "center",
                        bgcolor: "#2a3749",
                        color: "white",
                        borderRadius: 2,
                      }}
                    >
                      <CheckCircle
                        sx={{ fontSize: 60, color: "#10b981", mb: 2 }}
                      />

                      <Typography variant="h5" gutterBottom>
                        Thank you for your order!
                      </Typography>

                      <Typography variant="body1" paragraph>
                        Your order has been placed successfully. We've sent a
                        confirmation email with all the details.
                      </Typography>

                      <Typography variant="body1" paragraph>
                        Order Number: <strong>{orderNumber}</strong>
                      </Typography>

                      <Box sx={{ mt: 3 }}>
                        <Button
                          variant="contained"
                          sx={{
                            mr: 2,
                            background:
                              "linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)",
                            "&:hover": {
                              background:
                                "linear-gradient(45deg, #4f46e5 30%, #7c3aed 90%)",
                            },
                          }}
                          onClick={() => navigate("/profile")}
                        >
                          View My Orders
                        </Button>

                        <Button
                          variant="outlined"
                          sx={{
                            borderColor: "#6366f1",
                            color: "white",
                            "&:hover": {
                              borderColor: "#8b5cf6",
                              backgroundColor: "rgba(99, 102, 241, 0.1)",
                            },
                          }}
                          onClick={() => navigate("/products")}
                        >
                          Continue Shopping
                        </Button>
                      </Box>
                    </Paper>
                  )}
                </Grid>

                {/* Order Summary */}
                <Grid item xs={12} md={4}>
                  <Paper
                    sx={{
                      p: 4,
                      borderRadius: 2,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                      backgroundColor: "#1e293b",
                      color: "white",
                      position: "sticky",
                      top: 20,
                    }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        borderBottom: "2px solid",
                        borderColor: "#6366f1",
                        pb: 1,
                      }}
                    >
                      Order Summary
                    </Typography>

                    <List dense>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemText
                          primary={
                            <Typography
                              variant="subtitle1"
                              color="rgba(255,255,255,0.7)"
                            >
                              Subtotal
                            </Typography>
                          }
                        />
                        <Typography variant="h6">
                          ${calculateSubtotal().toFixed(2)}
                        </Typography>
                      </ListItem>

                      <ListItem sx={{ px: 0 }}>
                        <ListItemText
                          primary={
                            <Typography
                              variant="subtitle1"
                              color="rgba(255,255,255,0.7)"
                            >
                              Shipping
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="body2"
                              color="rgba(255,255,255,0.5)"
                            >
                              {shippingMethod === "express"
                                ? "Express Shipping (1-2 business days)"
                                : "Standard Shipping (3-5 business days)"}
                            </Typography>
                          }
                        />
                        <Typography
                          variant="h6"
                          color={
                            calculateShippingCost() === 0
                              ? "#10b981"
                              : "inherit"
                          }
                        >
                          {calculateShippingCost() === 0
                            ? "Free"
                            : `$${calculateShippingCost().toFixed(2)}`}
                        </Typography>
                      </ListItem>

                      <Divider
                        sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }}
                      />

                      <ListItem sx={{ px: 0 }}>
                        <ListItemText
                          primary={
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              Total
                            </Typography>
                          }
                        />
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 600,
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
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            color: "white",
                            "&:not(:disabled)": {
                              "&:hover": {
                                transform: "translateX(-4px)",
                                transition: "transform 0.2s",
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
                          disabled={
                            (activeStep === 0 && cartItems.length === 0) ||
                            (activeStep === 1 && !isShippingInfoComplete())
                          }
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            background:
                              "linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)",
                            boxShadow: "0 3px 5px 2px rgba(99, 102, 241, .3)",
                            "&:hover": {
                              background:
                                "linear-gradient(45deg, #4f46e5 30%, #7c3aed 90%)",
                              transform: "translateY(-2px)",
                              boxShadow:
                                "0 6px 10px 4px rgba(99, 102, 241, .3)",
                            },
                            transition: "all 0.2s",
                          }}
                        >
                          {activeStep === 2
                            ? "Place Order"
                            : activeStep === 1
                            ? "Proceed to Payment"
                            : "Proceed to Shipping"}
                        </Button>
                      </Box>
                    )}
                  </Paper>
                </Grid>
              </Grid>
            )}

            {/* Confirm Remove Dialog */}
            <Dialog
              open={confirmDialogOpen}
              onClose={() => setConfirmDialogOpen(false)}
              PaperProps={{
                sx: {
                  bgcolor: "#2a3749",
                  color: "white",
                },
              }}
            >
              <DialogTitle>Remove Item</DialogTitle>
              <DialogContent>
                <Typography variant="body1">
                  Are you sure you want to remove "{itemToRemove?.name}" from
                  your cart?
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setConfirmDialogOpen(false)}
                  sx={{ color: "white" }}
                >
                  Cancel
                </Button>
                <Button onClick={confirmRemoveItem} sx={{ color: "#f87171" }}>
                  Remove
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Cart;
