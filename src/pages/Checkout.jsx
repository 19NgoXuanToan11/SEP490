import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Divider,
  TextField,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  LocalShipping,
  Payment,
  CheckCircle,
  ArrowBack,
} from "@mui/icons-material";

const Checkout = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
    saveCard: false,
  });

  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  // Steps for the checkout process
  const steps = [
    "Shopping Cart",
    "Shipping Information",
    "Payment",
    "Confirmation",
  ];

  useEffect(() => {
    // Fetch cart items from API or localStorage
    const fetchCart = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        const cartData = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(cartData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load cart items");
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentInfoChange = (e) => {
    const { name, value, checked, type } = e.target;
    setPaymentInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      // Replace with actual API call to place order
      // const response = await api.placeOrder({ items: cart, shipping: shippingInfo, payment: paymentInfo });

      // Clear cart after successful order
      localStorage.removeItem("cart");

      // Move to confirmation step
      handleNext();
      setLoading(false);
    } catch (err) {
      setError("Failed to place order. Please try again.");
      setLoading(false);
    }
  };

  // Calculate order summary
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 10; // Example shipping cost
  const tax = subtotal * 0.1; // Example tax calculation (10%)
  const total = subtotal + shipping + tax;

  // Render different steps based on activeStep
  const renderStepContent = () => {
    switch (activeStep) {
      case 0: // Cart Review
        return (
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Review Your Cart
            </Typography>

            {loading ? (
              <Box display="flex" justifyContent="center" my={4}>
                <CircularProgress />
              </Box>
            ) : cart.length === 0 ? (
              <Alert severity="info">
                Your cart is empty.{" "}
                <Link to="/products">Continue shopping</Link>
              </Alert>
            ) : (
              <>
                {cart.map((item) => (
                  <Paper key={item.id} sx={{ p: 2, mb: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={3} sm={2}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "100%",
                            maxHeight: "80px",
                            objectFit: "contain",
                          }}
                        />
                      </Grid>
                      <Grid item xs={5} sm={6}>
                        <Typography variant="subtitle1">{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.condition} • {item.brand}
                        </Typography>
                      </Grid>
                      <Grid item xs={2} sm={2} textAlign="right">
                        <Typography variant="body2">
                          x{item.quantity}
                        </Typography>
                      </Grid>
                      <Grid item xs={2} sm={2} textAlign="right">
                        <Typography variant="subtitle1">
                          ${item.price.toFixed(2)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}

                <Box mt={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={cart.length === 0}
                    fullWidth
                  >
                    Proceed to Shipping
                  </Button>
                  <Button
                    component={Link}
                    to="/products"
                    sx={{ mt: 2 }}
                    startIcon={<ArrowBack />}
                    fullWidth
                  >
                    Continue Shopping
                  </Button>
                </Box>
              </>
            )}
          </Box>
        );

      case 1: // Shipping Information
        return (
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Shipping Information
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={shippingInfo.firstName}
                  onChange={handleShippingInfoChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={shippingInfo.lastName}
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
                  label="Zip/Postal Code"
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

            <Box mt={4} display="flex" justifyContent="space-between">
              <Button onClick={handleBack}>Back</Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                Continue to Payment
              </Button>
            </Box>
          </Box>
        );

      case 2: // Payment
        return (
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Payment Method
            </Typography>

            <FormControl component="fieldset" sx={{ mb: 3 }}>
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
                  value="bankTransfer"
                  control={<Radio />}
                  label="Bank Transfer"
                />
              </RadioGroup>
            </FormControl>

            {paymentMethod === "creditCard" && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Name on Card"
                    name="cardName"
                    value={paymentInfo.cardName}
                    onChange={handlePaymentInfoChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Card Number"
                    name="cardNumber"
                    value={paymentInfo.cardNumber}
                    onChange={handlePaymentInfoChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Expiration Date (MM/YY)"
                    name="expDate"
                    value={paymentInfo.expDate}
                    onChange={handlePaymentInfoChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="CVV"
                    name="cvv"
                    value={paymentInfo.cvv}
                    onChange={handlePaymentInfoChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="saveCard"
                        checked={paymentInfo.saveCard}
                        onChange={handlePaymentInfoChange}
                        color="primary"
                      />
                    }
                    label="Save card for future purchases"
                  />
                </Grid>
              </Grid>
            )}

            <Box mt={4} display="flex" justifyContent="space-between">
              <Button onClick={handleBack}>Back</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePlaceOrder}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Place Order"}
              </Button>
            </Box>
          </Box>
        );

      case 3: // Confirmation
        return (
          <Box mt={4} textAlign="center">
            <CheckCircle color="success" sx={{ fontSize: 64, mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Thank you for your order!
            </Typography>
            <Typography variant="body1" paragraph>
              Your order has been placed successfully. We've sent you an email
              with all the details.
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Order number: #ORD-{Math.floor(100000 + Math.random() * 900000)}
            </Typography>

            <Box mt={4}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/products"
                fullWidth
              >
                Continue Shopping
              </Button>
              <Button sx={{ mt: 2 }} component={Link} to="/profile" fullWidth>
                View My Orders
              </Button>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Checkout
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {renderStepContent()}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Subtotal</Typography>
              <Typography>${subtotal.toFixed(2)}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Shipping</Typography>
              <Typography>${shipping.toFixed(2)}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Tax</Typography>
              <Typography>${tax.toFixed(2)}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">${total.toFixed(2)}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
