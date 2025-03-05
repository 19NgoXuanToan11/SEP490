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
    city: "",
    state: "",
    zipCode: "",
    country: "",
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
      <Container sx={{ py: 4, minHeight: "70vh" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {activeStep === 3 && orderPlaced
            ? "Order Confirmation"
            : "Shopping Cart"}
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
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
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Cart Items ({cartItems.length})
                  </Typography>

                  <List>
                    {cartItems.map((item) => (
                      <React.Fragment key={item.id}>
                        <ListItem sx={{ py: 2, px: 0 }}>
                          <ListItemAvatar sx={{ mr: 2 }}>
                            <Box
                              component="img"
                              src={item.image}
                              alt={item.name}
                              sx={{ width: 80, height: 80, objectFit: "cover" }}
                            />
                          </ListItemAvatar>

                          <ListItemText
                            primary={
                              <Typography
                                variant="subtitle1"
                                component={Link}
                                to={`/products/${item.id}`}
                                sx={{
                                  textDecoration: "none",
                                  color: "inherit",
                                }}
                              >
                                {item.name}
                              </Typography>
                            }
                            secondary={
                              <>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Condition: {item.condition}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Seller: {item.seller.name} (
                                  {item.seller.rating} ★)
                                </Typography>
                              </>
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
                            <Typography variant="h6" color="primary">
                              ${(item.price * item.quantity).toFixed(2)}
                            </Typography>

                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mt: 1,
                              }}
                            >
                              <IconButton
                                size="small"
                                onClick={() =>
                                  handleQuantityChange(item.id, -1)
                                }
                                disabled={item.quantity <= 1}
                              >
                                <Remove fontSize="small" />
                              </IconButton>

                              <Typography
                                sx={{
                                  mx: 1,
                                  minWidth: 20,
                                  textAlign: "center",
                                }}
                              >
                                {item.quantity}
                              </Typography>

                              <IconButton
                                size="small"
                                onClick={() => handleQuantityChange(item.id, 1)}
                                disabled={item.quantity >= item.maxQuantity}
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
                              sx={{ mt: 1 }}
                            >
                              Remove
                            </Button>
                          </Box>
                        </ListItem>
                        <Divider />
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

                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="City"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleShippingInfoChange}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="State/Province"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleShippingInfoChange}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="ZIP/Postal Code"
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={handleShippingInfoChange}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Country"
                        name="country"
                        value={shippingInfo.country}
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

                  <FormControl component="fieldset">
                    <RadioGroup
                      name="paymentMethod"
                      value={paymentMethod}
                      onChange={handlePaymentMethodChange}
                    >
                      <FormControlLabel
                        value="creditCard"
                        control={<Radio />}
                        label="Credit/Debit Card"
                      />
                      <FormControlLabel
                        value="paypal"
                        control={<Radio />}
                        label="PayPal"
                      />
                      <FormControlLabel
                        value="applePay"
                        control={<Radio />}
                        label="Apple Pay"
                      />
                      <FormControlLabel
                        value="googlePay"
                        control={<Radio />}
                        label="Google Pay"
                      />
                    </RadioGroup>
                  </FormControl>

                  {paymentMethod === "creditCard" && (
                    <Box sx={{ mt: 3 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            label="Card Number"
                            placeholder="1234 5678 9012 3456"
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            label="Expiration Date"
                            placeholder="MM/YY"
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            label="CVV"
                            placeholder="123"
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            label="Cardholder Name"
                          />
                        </Grid>
                      </Grid>
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
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>

                <List dense>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText primary="Subtotal" />
                    <Typography variant="body1">
                      ${calculateSubtotal().toFixed(2)}
                    </Typography>
                  </ListItem>

                  <ListItem sx={{ px: 0 }}>
                    <ListItemText
                      primary="Shipping"
                      secondary={
                        shippingMethod === "express"
                          ? "Express Shipping (1-2 business days)"
                          : "Standard Shipping (3-5 business days)"
                      }
                    />
                    <Typography variant="body1">
                      {calculateShippingCost() === 0
                        ? "Free"
                        : `$${calculateShippingCost().toFixed(2)}`}
                    </Typography>
                  </ListItem>

                  <Divider sx={{ my: 1 }} />

                  <ListItem sx={{ px: 0 }}>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1">Total</Typography>
                      }
                    />
                    <Typography variant="subtitle1" fontWeight="bold">
                      ${calculateTotal().toFixed(2)}
                    </Typography>
                  </ListItem>
                </List>

                {activeStep < 3 && (
                  <Box
                    sx={{
                      mt: 3,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                      Back
                    </Button>

                    {activeStep === 0 && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        disabled={cartItems.length === 0}
                      >
                        Proceed to Shipping
                      </Button>
                    )}

                    {activeStep === 1 && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        disabled={!isShippingInfoComplete()}
                      >
                        Proceed to Payment
                      </Button>
                    )}

                    {activeStep === 2 && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handlePlaceOrder}
                      >
                        Place Order
                      </Button>
                    )}
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
