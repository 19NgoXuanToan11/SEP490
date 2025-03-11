import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Paper,
  TextField,
  Rating,
  CircularProgress,
  Alert,
  Divider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Star, Send, ArrowBack } from "@mui/icons-material";

const WriteReview = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Review form state
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        // const response = await api.getOrderItems(orderId);
        // setOrderItems(response.data);

        // Mock data for demonstration
        setTimeout(() => {
          const mockItems = [
            {
              id: 1,
              name: "iPhone 12 Pro",
              image: "https://example.com/iphone.jpg",
              price: 799.99,
              brand: "Apple",
              productId: 101,
            },
            {
              id: 2,
              name: "Samsung Galaxy Watch 4",
              image: "https://example.com/watch.jpg",
              price: 249.99,
              brand: "Samsung",
              productId: 102,
            },
          ];

          setOrderItems(mockItems);

          // Initialize reviews state
          const initialReviews = {};
          mockItems.forEach((item) => {
            initialReviews[item.id] = {
              rating: 0,
              title: "",
              comment: "",
              recommend: false,
              anonymous: false,
            };
          });
          setReviews(initialReviews);

          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to load order items");
        setLoading(false);
      }
    };

    fetchOrderItems();
  }, [orderId]);

  const handleRatingChange = (itemId, newValue) => {
    setReviews((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        rating: newValue,
      },
    }));
  };

  const handleInputChange = (itemId, field, value) => {
    setReviews((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: value,
      },
    }));
  };

  const handleCheckboxChange = (itemId, field) => {
    setReviews((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: !prev[itemId][field],
      },
    }));
  };

  const validateReviews = () => {
    for (const itemId in reviews) {
      const review = reviews[itemId];
      if (review.rating === 0) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateReviews()) {
      setError("Please rate all products before submitting");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      // Prepare review data
      const reviewData = Object.keys(reviews).map((itemId) => ({
        productId: orderItems.find((item) => item.id === parseInt(itemId))
          .productId,
        orderId: orderId,
        rating: reviews[itemId].rating,
        title: reviews[itemId].title,
        comment: reviews[itemId].comment,
        recommend: reviews[itemId].recommend,
        anonymous: reviews[itemId].anonymous,
      }));

      // Replace with actual API call
      // await api.submitReviews(reviewData);

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitSuccess(true);
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (err) {
      setError("Failed to submit reviews. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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

  if (error && !submitting) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error">{error}</Alert>
        <Button
          component={Link}
          to="/profile"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Back to My Orders
        </Button>
      </Container>
    );
  }

  if (submitSuccess) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="success">
          Thank you for your reviews! They have been submitted successfully.
        </Alert>
        <Button
          component={Link}
          to="/profile"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Back to My Orders
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        component={Link}
        to={`/orders/${orderId}`}
        startIcon={<ArrowBack />}
        sx={{ mb: 3 }}
      >
        Back to Order
      </Button>

      <Typography variant="h4" component="h1" gutterBottom>
        Write a Review
      </Typography>

      <Typography variant="body1" color="text.secondary" paragraph>
        Share your thoughts about the products you purchased. Your feedback
        helps other shoppers make better decisions.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {orderItems.map((item) => (
        <Paper key={item.id} sx={{ mb: 4, p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <Box
                sx={{
                  width: "100%",
                  height: 120,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "grey.100",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={9}>
              <Typography variant="subtitle1" gutterBottom>
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {item.brand}
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Overall Rating*
                </Typography>
                <Rating
                  name={`rating-${item.id}`}
                  value={reviews[item.id]?.rating || 0}
                  onChange={(event, newValue) => {
                    handleRatingChange(item.id, newValue);
                  }}
                  precision={0.5}
                  size="large"
                  emptyIcon={
                    <Star style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />

              <TextField
                label="Review Title"
                placeholder="Summarize your experience"
                fullWidth
                value={reviews[item.id]?.title || ""}
                onChange={(e) =>
                  handleInputChange(item.id, "title", e.target.value)
                }
                sx={{ mb: 3 }}
              />

              <TextField
                label="Review"
                placeholder="What did you like or dislike about this product?"
                multiline
                rows={4}
                fullWidth
                value={reviews[item.id]?.comment || ""}
                onChange={(e) =>
                  handleInputChange(item.id, "comment", e.target.value)
                }
                sx={{ mb: 3 }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={reviews[item.id]?.recommend || false}
                    onChange={() => handleCheckboxChange(item.id, "recommend")}
                  />
                }
                label="I would recommend this product to a friend"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={reviews[item.id]?.anonymous || false}
                    onChange={() => handleCheckboxChange(item.id, "anonymous")}
                  />
                }
                label="Post anonymously"
              />
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<Send />}
          onClick={handleSubmit}
          disabled={submitting || !validateReviews()}
        >
          {submitting ? <CircularProgress size={24} /> : "Submit Reviews"}
        </Button>
      </Box>
    </Container>
  );
};

export default WriteReview;
