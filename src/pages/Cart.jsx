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
      <Container
        sx={{
          py: 6,
          minHeight: "70vh",
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          boxShadow: "0 0 20px rgba(0,0,0,0.05)",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            textAlign: "center",
            fontWeight: 600,
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
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
              color: "success.main",
            },
            "& .MuiStepLabel-root .Mui-active": {
              color: "primary.main",
            },
            "& .MuiStepConnector-line": {
              borderColor: "rgba(0,0,0,0.1)",
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
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        ) : cartItems.length === 0 && activeStep === 0 ? (
          <Paper sx={{ p: 4, textAlign: "center" }}>
            <ShoppingCart
              sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
            />
            <Typography variant="h6" gutterBottom>
              Your cart is empty
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Looks like you haven't added any items to your cart yet.
            </Typography>
            <Button
              variant="contained"
              color="primary"
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
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
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
                    <ShoppingCart sx={{ color: "primary.main" }} />
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
                              backgroundColor: "rgba(0,0,0,0.02)",
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
                                  color: "inherit",
                                  fontWeight: 500,
                                  "&:hover": {
                                    color: "primary.main",
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
                                  color="text.secondary"
                                >
                                  Condition:{" "}
                                  <Chip label={item.condition} size="small" />
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
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
                              color="primary"
                              sx={{
                                fontWeight: 600,
                                background:
                                  "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
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
                                backgroundColor: "rgba(0,0,0,0.03)",
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
                                    backgroundColor: "primary.light",
                                  },
                                  color: "primary.main",
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
                                onClick={() => handleQuantityChange(item.id, 1)}
                                disabled={item.quantity >= item.maxQuantity}
                                sx={{
                                  "&:hover": {
                                    backgroundColor: "primary.light",
                                  },
                                  color: "primary.main",
                                }}
                              >
                                <Add fontSize="small" />
                              </IconButton>
                            </Box>

                            <Button
                              variant="text"
                              color="error"
                              size="small"
                              startIcon={<Delete />}
                              onClick={() => handleRemoveItem(item)}
                              sx={{
                                mt: 2,
                                "&:hover": {
                                  backgroundColor: "error.light",
                                  color: "error.main",
                                },
                              }}
                            >
                              Remove
                            </Button>
                          </Box>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </React.Fragment>
                    ))}
                  </List>
                </Paper>
              )}

              {/* Step 2: Shipping Information */}
              {activeStep === 1 && (
                <Paper sx={{ p: 3 }}>
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
                      />
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 3 }}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Shipping Method</FormLabel>
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
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {calculateSubtotal() >= 100 ? "Free" : "$5.99"}
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
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                $12.99
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
                <Paper sx={{ p: 3 }}>
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
                                  sx={{ display: "flex", alignItems: "center" }}
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
                                  sx={{ display: "flex", alignItems: "center" }}
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
                                  sx={{ display: "flex", alignItems: "center" }}
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
                                  sx={{ display: "flex", alignItems: "center" }}
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
                <Paper sx={{ p: 3, textAlign: "center" }}>
                  <CheckCircle
                    sx={{ fontSize: 60, color: "success.main", mb: 2 }}
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
                      color="primary"
                      onClick={() => navigate("/profile")}
                      sx={{ mr: 2 }}
                    >
                      View My Orders
                    </Button>

                    <Button
                      variant="outlined"
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
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  backgroundColor: "#fff",
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
                    borderColor: "primary.main",
                    pb: 1,
                  }}
                >
                  Order Summary
                </Typography>

                <List dense>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" color="text.secondary">
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
                        <Typography variant="subtitle1" color="text.secondary">
                          Shipping
                        </Typography>
                      }
                      secondary={
                        shippingMethod === "express"
                          ? "Express Shipping (1-2 business days)"
                          : "Standard Shipping (3-5 business days)"
                      }
                    />
                    <Typography
                      variant="h6"
                      color={
                        calculateShippingCost() === 0
                          ? "success.main"
                          : "inherit"
                      }
                    >
                      {calculateShippingCost() === 0
                        ? "Free"
                        : `$${calculateShippingCost().toFixed(2)}`}
                    </Typography>
                  </ListItem>

                  <Divider sx={{ my: 2 }} />

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
                          "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
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
                      color="primary"
                      onClick={activeStep === 2 ? handlePlaceOrder : handleNext}
                      disabled={
                        (activeStep === 0 && cartItems.length === 0) ||
                        (activeStep === 1 && !isShippingInfoComplete())
                      }
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        background:
                          "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                        boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 6px 10px 4px rgba(33, 203, 243, .3)",
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
        >
          <DialogTitle>Remove Item</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Are you sure you want to remove "{itemToRemove?.name}" from your
              cart?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmRemoveItem} color="error">
              Remove
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      <Footer />
    </>
  );
};

export default Cart;
