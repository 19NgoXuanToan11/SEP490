import React from "react";
import { Grid, Paper, Typography, Button, Box, Chip } from "@mui/material";
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
    <MotionBox
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={{ position: "relative", overflow: "hidden", py: 2 }}
    >
      {/* Section Header */}
      <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
        <MotionBox
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
            borderRadius: "14px",
            background: "linear-gradient(135deg, #FF6B6B, #FF8E53)",
            boxShadow: "0 10px 25px rgba(255, 107, 107, 0.5)",
            mr: 2,
          }}
        >
          <TrendingUp sx={{ fontSize: 30, color: "white" }} />
        </MotionBox>

        <Box>
          <MotionTypography
            variant="overline"
            sx={{
              fontWeight: 600,
              color: "#FF6B6B",
              letterSpacing: 1.5,
              display: "block",
              mb: 0.5,
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            HOT RIGHT NOW
          </MotionTypography>

          <MotionTypography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(90deg, #FF6B6B, #FF8E53)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textFillColor: "transparent",
              position: "relative",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Trending Products
            {/* Underline animation */}
            <MotionBox
              sx={{
                position: "absolute",
                bottom: -5,
                left: 0,
                height: 3,
                background: "linear-gradient(90deg, #FF6B6B, transparent)",
                borderRadius: "2px",
              }}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </MotionTypography>
        </Box>

        {!loading && !error && products && products.length > 0 && (
          <Chip
            label={`${products.length} Products`}
            sx={{
              ml: "auto",
              background: "rgba(255, 107, 107, 0.1)",
              color: "#FF6B6B",
              fontWeight: 600,
              borderRadius: "12px",
              px: 1,
            }}
          />
        )}
      </Box>

      {/* Background gradient */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          right: "-10%",
          width: "40%",
          height: "60%",
          background:
            "radial-gradient(circle, rgba(255, 107, 107, 0.1) 0%, rgba(255, 107, 107, 0) 70%)",
          filter: "blur(60px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      {loading ? (
        <Grid container spacing={3}>
          {[...Array(6)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </Grid>
      ) : error ? (
        <Paper
          sx={{
            textAlign: "center",
            py: 6,
            px: 4,
            borderRadius: "24px",
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          }}
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ErrorOutline sx={{ fontSize: 60, color: "#FF6B6B", mb: 2 }} />
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "#1e293b", mb: 2 }}
          >
            Oops! Something went wrong
          </Typography>
          <Typography sx={{ color: "#64748b", mb: 3 }}>
            We couldn't load the trending products. Please try again later.
          </Typography>
          <Button
            variant="contained"
            startIcon={<Refresh />}
            sx={{
              borderRadius: "14px",
              background: "linear-gradient(135deg, #FF6B6B, #FF8E53)",
              fontWeight: 600,
              px: 4,
              py: 1.5,
              boxShadow: "0 10px 20px rgba(255, 107, 107, 0.3)",
              "&:hover": {
                background: "linear-gradient(135deg, #FF8E53, #FF6B6B)",
              },
            }}
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </Paper>
      ) : (
        <Grid
          container
          spacing={3}
          component={motion.div}
          variants={containerVariants}
        >
          {products.map((product, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={product.id}
              component={motion.div}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: "easeOut",
                  },
                },
              }}
            >
              <ProductCard
                product={product}
                toggleFavorite={toggleFavorite}
                favorites={favorites}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </MotionBox>
  );
};

export default TrendingProducts;
