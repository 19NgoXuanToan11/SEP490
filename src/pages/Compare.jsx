import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  IconButton,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Rating,
  Chip,
  Breadcrumbs,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Close as CloseIcon,
  ShoppingCart as ShoppingCartIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const Compare = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Get items from location state or use empty array
  const [items, setItems] = useState(location.state?.items || []);

  // Redirect if no items to compare
  useEffect(() => {
    if (items.length === 0) {
      navigate("/wishlist");
    }
  }, [items, navigate]);

  // Remove item from comparison
  const removeItem = (itemId) => {
    const newItems = items.filter((item) => item.id !== itemId);
    setItems(newItems);

    if (newItems.length === 0) {
      navigate("/wishlist");
    }
  };

  // Add to cart
  const addToCart = (item) => {
    // Implement cart functionality here
    console.log(`Added ${item.name} to cart`);
  };

  // Get all unique specifications for comparison
  const getSpecifications = () => {
    return [
      { id: "price", label: "Price" },
      { id: "originalPrice", label: "Original Price" },
      { id: "discount", label: "Discount" },
      { id: "rating", label: "Rating" },
      { id: "reviewCount", label: "Review Count" },
      { id: "category", label: "Category" },
      { id: "brand", label: "Brand" },
      { id: "condition", label: "Condition" },
      { id: "inStock", label: "Availability" },
      { id: "description", label: "Description" },
    ];
  };

  // Format specification value
  const formatSpecValue = (spec, value) => {
    switch (spec.id) {
      case "price":
      case "originalPrice":
        return `$${value.toFixed(2)}`;
      case "discount":
        return `${value}%`;
      case "rating":
        return <Rating value={value} precision={0.1} readOnly size="small" />;
      case "inStock":
        return value ? (
          <Chip label="In Stock" color="success" size="small" />
        ) : (
          <Chip label="Out of Stock" color="error" size="small" />
        );
      default:
        return value;
    }
  };

  // Add this function inside the Compare component before the return statement
  const getProductImage = (category, brand) => {
    // Generate a consistent image based on category and brand
    const categories = {
      Electronics: [
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1588508065123-287b28e013da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1201&q=80",
      ],
      Audio: [
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1165&q=80",
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      ],
      Storage: [
        "https://images.unsplash.com/photo-1618410320928-25c9832dc2e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1592982551635-42cbe5f99d24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1602526429747-ac387a91d43b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      ],
    };

    // Default category if not found
    const defaultImages = [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80",
    ];

    // Generate a consistent index based on brand name
    const brandHash = brand
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const images = categories[category] || defaultImages;
    const index = brandHash % images.length;

    return images[index];
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Page header with animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box mb={4}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: theme.palette.text.secondary,
              }}
            >
              Home
            </Link>
            <Link
              to="/wishlist"
              style={{
                textDecoration: "none",
                color: theme.palette.text.secondary,
              }}
            >
              Wishlist
            </Link>
            <Typography color="text.primary">Compare</Typography>
          </Breadcrumbs>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
          >
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              gutterBottom
            >
              Compare Products
            </Typography>

            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              component={Link}
              to="/wishlist"
            >
              Back to Wishlist
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Comparison table */}
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 2, overflow: "hidden", mb: 4 }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "background.paper" }}>
              <TableCell sx={{ width: "20%", fontWeight: "bold" }}>
                Product
              </TableCell>
              {items.map((item) => (
                <TableCell
                  key={item.id}
                  align="center"
                  sx={{ width: `${80 / items.length}%` }}
                >
                  <Box sx={{ position: "relative", pt: 2 }}>
                    <IconButton
                      size="small"
                      onClick={() => removeItem(item.id)}
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bgcolor: "rgba(0,0,0,0.05)",
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                    <Box
                      component="img"
                      src={getProductImage(item.category, item.brand)}
                      alt={item.name}
                      sx={{
                        width: "100%",
                        maxWidth: 150,
                        height: 150,
                        objectFit: "cover",
                        borderRadius: 2,
                        mx: "auto",
                        display: "block",
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      component="h3"
                      fontWeight="bold"
                      sx={{ mt: 2, mb: 1 }}
                    >
                      {item.name}
                    </Typography>
                    <Box
                      sx={{ display: "flex", justifyContent: "center", mb: 2 }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<ShoppingCartIcon />}
                        onClick={() => addToCart(item)}
                        disabled={!item.inStock}
                        sx={{ borderRadius: 2 }}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {getSpecifications().map((spec) => (
              <TableRow
                key={spec.id}
                sx={{
                  "&:nth-of-type(odd)": { bgcolor: "action.hover" },
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: "medium" }}
                >
                  {spec.label}
                </TableCell>
                {items.map((item) => (
                  <TableCell key={`${item.id}-${spec.id}`} align="center">
                    {formatSpecValue(spec, item[spec.id])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Compare;
