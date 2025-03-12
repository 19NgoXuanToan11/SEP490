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
  IconButton,
} from "@mui/material";
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  LocalFireDepartment,
  ArrowForward,
  Explore,
  ErrorOutline,
  ArrowBackIos,
  ArrowForwardIos,
  KeyboardArrowLeft,
  KeyboardArrowRight,
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
  const carouselRef = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const controls = useAnimation();
  const isTablet = useMediaQuery("(max-width:900px)");
  const isMobile = useMediaQuery("(max-width:600px)");

  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const itemsPerPage = isMobile ? 1 : isTablet ? 2 : 4;
  const totalPages = products ? Math.ceil(products.length / itemsPerPage) : 0;

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (products && products.length > 0) {
        handleNext();
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, products]);

  const handlePrev = () => {
    setDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalPages - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex === totalPages - 1 ? 0 : prevIndex + 1
    );
  };

  // Modern background
  const ModernBackground = () => {
    return (
      <>
        {/* Gradient background */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
            zIndex: 0,
          }}
        />

        {/* Subtle wave pattern */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.3,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264.888-.14 1.254-.874 1.454-2.278 2.016-3.62.2-.585.6-1.595.7-2.52.357-.13.72-.264.888-.14 1.254-.874 1.454-2.278 2.016-3.62.2-.585.6-1.595.7-2.52.357-.13.72-.264.888-.14 1.254-.874 1.454-2.278 2.016-3.62.2-.585.6-1.595.7-2.52.357-.13.72-.264.888-.14 1.254-.874 1.454-2.278 2.016-3.62.2-.585.6-1.595.7-2.52.357-.13.72-.264.888-.14 1.254-.874 1.454-2.278 2.016-3.62.2-.585.6-1.595.7-2.52.357-.13.72-.264.888-.14 1.254-.874 1.454-2.278 2.016-3.62.2-.585.6-1.595.7-2.52.357-.13.72-.264.888-.14 1.254-.874 1.454-2.278 2.016-3.62.2-.585.6-1.595.7-2.52.357-.13.72-.264.888-.14 1.254-.874 1.454-2.278 2.016-3.62.2-.585.6-1.595.7-2.52.357-.13.72-.264.888-.14 1.254-.874 1.454-2.278 2.016-3.62.2-.585.6-1.595.7-2.52.357-.13.72-.264.888-.14 1.254-.874 1.454-2.278 2.016-3.62.2-.585.6-1.595.7-2.52.357-.13.72-.264.888-.14 1.254-.874 1.454-2.278 2.016-3.62.2-.585.6-1.595.7-2.52.357-.13.72-.264.888-.14 1.254-.874 1.454-2.278 2.016-3.62.2-.585.6-1.595.7-2.52.357-.13.72-.264.888-.14 1.254-.874 1.454-2.278 2.016-3.62.2-.585.6-1.595.7-2.52' fill='%236366F1' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: "100px 20px",
            zIndex: 0,
          }}
        />

        {/* Floating gradient circles */}
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0) 70%)",
            filter: "blur(40px)",
            animation: "float 15s infinite ease-in-out",
            "@keyframes float": {
              "0%": { transform: "translate(0, 0)" },
              "50%": { transform: "translate(30px, 20px)" },
              "100%": { transform: "translate(0, 0)" },
            },
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: "15%",
            right: "10%",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(79,70,229,0.1) 0%, rgba(79,70,229,0) 70%)",
            filter: "blur(40px)",
            animation: "float2 18s infinite ease-in-out",
            "@keyframes float2": {
              "0%": { transform: "translate(0, 0)" },
              "50%": { transform: "translate(-20px, -30px)" },
              "100%": { transform: "translate(0, 0)" },
            },
            zIndex: 0,
          }}
        />

        {/* Subtle dot grid pattern */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.3,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234F46E5' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "20px 20px",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      </>
    );
  };

  // Variants for carousel animation
  const carouselVariants = {
    hidden: (direction) => ({
      x: direction === "right" ? 1000 : -1000,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      },
    },
    exit: (direction) => ({
      x: direction === "right" ? -1000 : 1000,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      },
    }),
  };

  // Get current products to display
  const getCurrentProducts = () => {
    if (!products || products.length === 0) return [];
    const startIndex = currentIndex * itemsPerPage;
    return products.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <MotionBox
      ref={ref}
      sx={{
        position: "relative",
        py: { xs: 8, md: 12 },
        overflow: "hidden",
        width: "100%",
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
      {/* Modern background */}
      <ModernBackground />

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

        {/* Carousel Products - New Implementation */}
        {!loading && !error && products && products.length > 0 && (
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              px: { xs: 2, md: 6 },
            }}
          >
            <Box
              ref={carouselRef}
              sx={{
                position: "relative",
                minHeight: { xs: 450, md: 500 },
                overflow: "hidden",
              }}
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <MotionBox
                  key={currentIndex}
                  custom={direction}
                  variants={carouselVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Grid container spacing={3} justifyContent="center">
                    {getCurrentProducts().map((product, index) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        key={product.id}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <MotionBox
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: {
                              delay: index * 0.1,
                              duration: 0.5,
                            },
                          }}
                          whileHover={{
                            y: -10,
                            boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)",
                            transition: { duration: 0.3 },
                          }}
                        >
                          <ProductCard
                            product={product}
                            toggleFavorite={toggleFavorite}
                            favorites={favorites}
                          />
                        </MotionBox>
                      </Grid>
                    ))}
                  </Grid>
                </MotionBox>
              </AnimatePresence>
            </Box>

            {/* Navigation Arrows */}
            <IconButton
              onClick={handlePrev}
              sx={{
                position: "absolute",
                left: { xs: -10, md: 0 },
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(255, 255, 255, 0.8)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                "&:hover": {
                  bgcolor: "white",
                  transform: "translateY(-50%) scale(1.1)",
                },
                zIndex: 10,
                transition: "all 0.3s ease",
              }}
            >
              <KeyboardArrowLeft sx={{ fontSize: 28, color: "#4F46E5" }} />
            </IconButton>

            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                right: { xs: -10, md: 0 },
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(255, 255, 255, 0.8)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                "&:hover": {
                  bgcolor: "white",
                  transform: "translateY(-50%) scale(1.1)",
                },
                zIndex: 10,
                transition: "all 0.3s ease",
              }}
            >
              <KeyboardArrowRight sx={{ fontSize: 28, color: "#4F46E5" }} />
            </IconButton>

            {/* Pagination Dots */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 4,
                gap: 1,
              }}
            >
              {Array.from({ length: totalPages }).map((_, index) => (
                <Box
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? "right" : "left");
                    setCurrentIndex(index);
                  }}
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: currentIndex === index ? "#4F46E5" : "#cbd5e1",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.2)",
                      bgcolor: currentIndex === index ? "#4F46E5" : "#94a3b8",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
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
