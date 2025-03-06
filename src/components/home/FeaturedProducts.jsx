import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  CircularProgress,
  Alert,
  useMediaQuery,
  Chip,
} from "@mui/material";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  LocalFireDepartment,
  ArrowForward,
  Explore,
  ErrorOutline,
} from "@mui/icons-material";
import ProductCard from "./ProductCard";

// Custom styled components
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);
const MotionGrid = motion(Grid);

const FeaturedProducts = ({
  products,
  loading,
  error,
  toggleFavorite,
  favorites,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const controls = useAnimation();
  const isTablet = useMediaQuery("(max-width:900px)");
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Simplified hexagon background pattern - static, no animation
  const HexagonPattern = () => {
    return (
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 17.32v34.64L30 60 0 51.96V17.32L30 0zm0 10.39L8.31 22.17v26.22L30 59.61l21.69-11.22V22.17L30 10.39z' fill='%236366F1' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
    );
  };

  return (
    <MotionBox
      ref={ref}
      sx={{
        position: "relative",
        py: { xs: 8, md: 12 },
        overflow: "hidden",
        background: "linear-gradient(to bottom, #f8fafc, #f1f5f9)",
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        marginRight: "calc(-50vw + 50%)",
        my: 6,
        boxSizing: "border-box",
      }}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
      }}
    >
      {/* Only keeping the static hexagon pattern */}
      <HexagonPattern />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            mb: 6,
            position: "relative",
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", mb: { xs: 3, md: 0 } }}
          >
            {/* Icon - simplified animation */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: { xs: 50, md: 60 },
                height: { xs: 50, md: 60 },
                borderRadius: "16px",
                background: "linear-gradient(135deg, #6366F1, #4F46E5)",
                boxShadow: "0 10px 25px rgba(99, 102, 241, 0.5)",
                mr: 2,
              }}
            >
              <LocalFireDepartment
                sx={{ fontSize: { xs: 30, md: 36 }, color: "white" }}
              />
            </Box>

            {/* Title with gradient - simplified animation */}
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
                DISCOVER
              </Typography>

              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  background: "linear-gradient(90deg, #1e293b, #4F46E5)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textFillColor: "transparent",
                  position: "relative",
                }}
              >
                Featured Products
                {/* Static underline instead of animated */}
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
          </Box>

          {/* View All Button - simplified hover effect */}
          <Button
            component={Link}
            to="/products"
            variant="contained"
            endIcon={<ArrowForward />}
            sx={{
              borderRadius: "14px",
              background: "linear-gradient(135deg, #1e293b, #0f172a)",
              color: "white",
              fontWeight: 600,
              px: 3,
              py: 1.5,
              boxShadow: "0 10px 20px rgba(15, 23, 42, 0.2)",
              "&:hover": {
                background: "linear-gradient(135deg, #0f172a, #1e293b)",
                transform: "translateY(-2px)",
              },
            }}
          >
            View All Products
          </Button>
        </Box>

        {/* Loading State */}
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "300px",
            }}
          >
            <Box>
              <CircularProgress
                size={60}
                thickness={4}
                sx={{
                  color: "#6366F1",
                  "& .MuiCircularProgress-circle": {
                    strokeLinecap: "round",
                  },
                }}
              />
              <Typography
                sx={{
                  mt: 2,
                  color: "#64748b",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                Loading amazing products...
              </Typography>
            </Box>
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Box
            sx={{
              p: 4,
              borderRadius: "20px",
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            <ErrorOutline sx={{ fontSize: 60, color: "#f43f5e", mb: 2 }} />
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: "#1e293b", mb: 2 }}
            >
              Oops! Something went wrong
            </Typography>
            <Typography sx={{ color: "#64748b", mb: 3 }}>
              We couldn't load the featured products. Please try again later.
            </Typography>
            <Button
              variant="contained"
              sx={{
                borderRadius: "12px",
                background: "linear-gradient(135deg, #f43f5e, #e11d48)",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                boxShadow: "0 10px 20px rgba(244, 63, 94, 0.3)",
              }}
            >
              Try Again
            </Button>
          </Box>
        )}

        {/* Products Grid - simplified animations */}
        {!loading && !error && products && products.length > 0 && (
          <Grid container spacing={4}>
            {products.map((product, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={product.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
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

        {/* Empty State */}
        {!loading && !error && (!products || products.length === 0) && (
          <Box
            sx={{
              p: 4,
              borderRadius: "20px",
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: "#1e293b", mb: 2 }}
            >
              No Featured Products Yet
            </Typography>
            <Typography sx={{ color: "#64748b", mb: 3 }}>
              Check back soon for our featured product selection.
            </Typography>
            <Button
              component={Link}
              to="/products"
              variant="contained"
              sx={{
                borderRadius: "12px",
                background: "linear-gradient(135deg, #6366F1, #4F46E5)",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                boxShadow: "0 10px 20px rgba(99, 102, 241, 0.3)",
              }}
            >
              Browse All Products
            </Button>
          </Box>
        )}
      </Container>
    </MotionBox>
  );
};

export default FeaturedProducts;
