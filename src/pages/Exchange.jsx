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
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";

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
                        transition: "transform 0.2s",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: 3,
                        },
                      }}
                      onClick={() => handleSelectProduct(product)}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={product.image}
                        alt={product.name}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="div" noWrap>
                          {product.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom
                        >
                          {product.category} • {product.condition}
                        </Typography>
                        <Typography variant="h6" color="primary" gutterBottom>
                          ${product.price.toFixed(2)}
                        </Typography>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
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
                      <CardActions>
                        <Button
                          size="small"
                          variant={
                            selectedProduct?.id === product.id
                              ? "contained"
                              : "outlined"
                          }
                          fullWidth
                          onClick={() => handleSelectProduct(product)}
                        >
                          {selectedProduct?.id === product.id
                            ? "Selected"
                            : "Select"}
                        </Button>
                      </CardActions>
                    </Card>
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
                <Paper sx={{ p: 3, height: "100%" }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Your Offer:
                  </Typography>
                  {selectedProduct ? (
                    <Box>
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        style={{
                          width: "100%",
                          borderRadius: 8,
                          marginBottom: 16,
                        }}
                      />
                      <Typography variant="h6">
                        {selectedProduct.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paragraph
                      >
                        {selectedProduct.category} • {selectedProduct.brand} •{" "}
                        {selectedProduct.condition}
                      </Typography>
                      <Typography variant="h6" color="primary" gutterBottom>
                        ${selectedProduct.price.toFixed(2)}
                      </Typography>

                      {cashOption && additionalCash > 0 && (
                        <Box
                          sx={{
                            mt: 2,
                            p: 2,
                            bgcolor: "background.default",
                            borderRadius: 1,
                          }}
                        >
                          <Typography variant="subtitle2">
                            Additional Cash:
                          </Typography>
                          <Typography variant="h6" color="primary">
                            ${additionalCash.toFixed(2)}
                          </Typography>
                        </Box>
                      )}

                      <Box
                        sx={{
                          mt: 2,
                          p: 2,
                          bgcolor: "background.default",
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant="subtitle2">
                          Total Offer Value:
                        </Typography>
                        <Typography variant="h6" color="primary">
                          ${(selectedProduct.price + additionalCash).toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    <Typography variant="body1" color="error">
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
                    flexDirection: isMobile ? "row" : "column",
                    alignItems: "center",
                  }}
                >
                  <CompareArrows
                    sx={{
                      fontSize: 40,
                      transform: isMobile ? "none" : "rotate(90deg)",
                      my: 2,
                      mx: isMobile ? 2 : 0,
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={5}>
                <Paper sx={{ p: 3, height: "100%" }}>
                  <Typography variant="subtitle1" gutterBottom>
                    In Exchange For:
                  </Typography>
                  {targetProduct ? (
                    <Box>
                      <img
                        src={targetProduct.image}
                        alt={targetProduct.name}
                        style={{
                          width: "100%",
                          borderRadius: 8,
                          marginBottom: 16,
                        }}
                      />
                      <Typography variant="h6">{targetProduct.name}</Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paragraph
                      >
                        {targetProduct.category} • {targetProduct.brand} •{" "}
                        {targetProduct.condition}
                      </Typography>
                      <Typography variant="h6" color="primary" gutterBottom>
                        ${targetProduct.price.toFixed(2)}
                      </Typography>
                      <Typography variant="body2">
                        Seller: {targetProduct.seller.name}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography variant="body1" color="error">
                      Please go back and select a target product.
                    </Typography>
                  )}
                </Paper>
              </Grid>
            </Grid>

            <Paper sx={{ p: 3, mt: 4 }}>
              <Typography variant="subtitle1" gutterBottom>
                Add a Message (Optional):
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Explain why you think this is a fair exchange, or provide additional details about your offer..."
                value={message}
                onChange={handleMessageChange}
              />
            </Paper>

            <Box sx={{ mt: 4, bgcolor: "info.light", p: 2, borderRadius: 1 }}>
              <Typography variant="body2">
                <Info sx={{ verticalAlign: "middle", mr: 1 }} />
                By submitting this proposal, you agree to our exchange terms and
                conditions. The other party will have 7 days to respond to your
                offer.
              </Typography>
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

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Propose an Exchange
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Paper sx={{ p: 3 }}>
          {renderStepContent(activeStep)}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Box>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleSubmitExchange}
                  disabled={!selectedProduct || !targetProduct}
                >
                  Submit Proposal
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={activeStep === 1 && !selectedProduct}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      </Container>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Exchange Proposal</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Are you sure you want to submit this exchange proposal?
          </Typography>
          <Typography variant="body2" paragraph>
            You are offering:
          </Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={selectedProduct?.image} variant="rounded" />
              </ListItemAvatar>
              <ListItemText
                primary={selectedProduct?.name}
                secondary={`$${selectedProduct?.price.toFixed(2)}`}
              />
            </ListItem>
            {cashOption && additionalCash > 0 && (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>$</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Additional Cash"
                  secondary={`$${additionalCash.toFixed(2)}`}
                />
              </ListItem>
            )}
          </List>
          <Typography variant="body2" paragraph>
            In exchange for:
          </Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={targetProduct?.image} variant="rounded" />
              </ListItemAvatar>
              <ListItemText
                primary={targetProduct?.name}
                secondary={`$${targetProduct?.price.toFixed(2)}`}
              />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} startIcon={<Close />}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmExchange}
            variant="contained"
            startIcon={<Check />}
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

export default Exchange;
