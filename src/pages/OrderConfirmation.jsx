import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Paper,
  Divider,
  CircularProgress,
  Alert,
  Chip,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import {
  CheckCircle,
  LocalShipping,
  Receipt,
  Home,
  ShoppingCart,
} from "@mui/icons-material";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        // const response = await api.getOrderDetails(orderId);
        // setOrder(response.data);

        // Mock data for demonstration
        setTimeout(() => {
          setOrder({
            id: orderId || "ORD-123456",
            date: new Date().toISOString(),
            status: "Processing",
            items: [
              {
                id: 1,
                name: "iPhone 12 Pro",
                image: "https://example.com/iphone.jpg",
                price: 799.99,
                quantity: 1,
                condition: "Like New",
                brand: "Apple",
              },
              {
                id: 2,
                name: "Samsung Galaxy Watch 4",
                image: "https://example.com/watch.jpg",
                price: 249.99,
                quantity: 1,
                condition: "Good",
                brand: "Samsung",
              },
            ],
            shipping: {
              method: "Standard Shipping",
              address: "123 Main St, Anytown, CA 12345",
              estimatedDelivery: new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
              ).toISOString(),
            },
            payment: {
              method: "Credit Card",
              last4: "1234",
              subtotal: 1049.98,
              shipping: 10,
              tax: 104.99,
              total: 1164.97,
            },
          });
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to load order details");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error">{error}</Alert>
        <Button
          component={Link}
          to="/profile"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Go to My Orders
        </Button>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="warning">Order not found</Alert>
        <Button
          component={Link}
          to="/profile"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Go to My Orders
        </Button>
      </Container>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box textAlign="center" mb={4}>
        <CheckCircle color="success" sx={{ fontSize: 64, mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Thank You for Your Order!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your order has been received and is now being processed.
        </Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6">Order #{order.id}</Typography>
          <Chip
            label={order.status}
            color={
              order.status === "Delivered"
                ? "success"
                : order.status === "Shipped"
                ? "info"
                : order.status === "Processing"
                ? "warning"
                : "default"
            }
          />
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Placed on {formatDate(order.date)}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Order Items
        </Typography>

        {order.items.map((item) => (
          <Box key={item.id} sx={{ py: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={2} sm={1}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "100%",
                    maxHeight: "50px",
                    objectFit: "contain",
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={7}>
                <Typography variant="body1">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.condition} • {item.brand}
                </Typography>
              </Grid>
              <Grid item xs={2} sm={2} textAlign="right">
                <Typography variant="body2">x{item.quantity}</Typography>
              </Grid>
              <Grid item xs={2} sm={2} textAlign="right">
                <Typography variant="body1">
                  ${item.price.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Box mb={2}>
              <Typography
                variant="subtitle1"
                gutterBottom
                display="flex"
                alignItems="center"
              >
                <LocalShipping sx={{ mr: 1 }} fontSize="small" />
                Shipping Information
              </Typography>
              <Typography variant="body2">{order.shipping.method}</Typography>
              <Typography variant="body2">{order.shipping.address}</Typography>
              <Typography variant="body2" mt={1}>
                Estimated delivery:{" "}
                {formatDate(order.shipping.estimatedDelivery)}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box mb={2}>
              <Typography
                variant="subtitle1"
                gutterBottom
                display="flex"
                alignItems="center"
              >
                <Receipt sx={{ mr: 1 }} fontSize="small" />
                Payment Information
              </Typography>
              <Typography variant="body2">{order.payment.method}</Typography>
              {order.payment.last4 && (
                <Typography variant="body2">
                  Card ending in {order.payment.last4}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ ml: "auto", maxWidth: "300px" }}>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography>Subtotal</Typography>
            <Typography>${order.payment.subtotal.toFixed(2)}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography>Shipping</Typography>
            <Typography>${order.payment.shipping.toFixed(2)}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography>Tax</Typography>
            <Typography>${order.payment.tax.toFixed(2)}</Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Total</Typography>
            <Typography variant="subtitle1">
              ${order.payment.total.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={2}
      >
        <Button variant="outlined" startIcon={<Home />} component={Link} to="/">
          Return to Home
        </Button>

        <Button
          variant="outlined"
          startIcon={<ShoppingCart />}
          component={Link}
          to="/products"
        >
          Continue Shopping
        </Button>

        <Button variant="contained" component={Link} to="/profile">
          View My Orders
        </Button>
      </Box>
    </Container>
  );
};

export default OrderConfirmation;
