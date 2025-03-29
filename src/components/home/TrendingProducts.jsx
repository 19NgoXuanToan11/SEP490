import React from "react";
import { Grid, Typography, Button, Box, Chip } from "@mui/material";
import { TrendingUp, Refresh, ErrorOutline } from "@mui/icons-material";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

const TrendingProducts = ({
  products,
  loading,
  error,
  toggleFavorite,
  favorites,
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div>
      {/* Section Header */}
      <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
            borderRadius: "14px",
            background: "linear-gradient(135deg, #4F46E5, #6366F1)",
            mr: 2,
          }}
        >
          <TrendingUp sx={{ fontSize: 30, color: "white" }} />
        </Box>

        <Box>
          <Typography
            variant="overline"
            sx={{
              fontWeight: 600,
              color: "#6366F1",
              letterSpacing: 1.5,
              display: "block",
              mb: 0.5,
            }}
          >
            HOT RIGHT NOW
          </Typography>

          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(90deg, #4F46E5, #6366F1)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textFillColor: "transparent",
              position: "relative",
            }}
          >
            Trending Products
            {/* Underline */}
            <Box
              sx={{
                position: "absolute",
                bottom: -5,
                left: 0,
                height: 3,
                width: "100%",
                background: "linear-gradient(90deg, #6366F1, transparent)",
                borderRadius: "2px",
              }}
            />
          </Typography>
        </Box>

        {!loading && !error && products && products.length > 0 && (
          <Chip
            label={`${products.length} Products`}
            sx={{
              ml: "auto",
              background: "rgba(99, 102, 241, 0.1)",
              color: "#6366F1",
              fontWeight: 600,
              borderRadius: "12px",
              px: 1,
            }}
          />
        )}
      </Box>

      {/* Content */}
      {loading ? (
        <Grid container spacing={3}>
          {[...Array(6)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </Grid>
      ) : error ? (
        <Box
          sx={{
            textAlign: "center",
            py: 6,
            px: 4,
            backgroundColor: "#1e2a3b",
            borderRadius: "12px",
          }}
        >
          <ErrorOutline sx={{ fontSize: 60, color: "#6366F1", mb: 2 }} />
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "#e2e8f0", mb: 2 }}
          >
            Oops! Something went wrong
          </Typography>
          <Typography sx={{ color: "#94a3b8", mb: 3 }}>
            We couldn't load the trending products. Please try again later.
          </Typography>
          <Button
            variant="contained"
            startIcon={<Refresh />}
            sx={{
              borderRadius: "14px",
              background: "linear-gradient(135deg, #4F46E5, #6366F1)",
              fontWeight: 600,
              px: 4,
              py: 1.5,
              "&:hover": {
                background: "linear-gradient(135deg, #6366F1, #4F46E5)",
              },
            }}
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard
                product={product}
                toggleFavorite={toggleFavorite}
                favorites={favorites}
                darkMode={true}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default TrendingProducts;
