import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Container,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import {
  LocalFireDepartment,
  ArrowForward,
  ErrorOutline,
} from "@mui/icons-material";
import ProductCard from "./ProductCard";

// Loại bỏ hoàn toàn Framer Motion để tránh hiệu ứng không cần thiết
const FeaturedProducts = ({
  products,
  loading,
  error,
  toggleFavorite,
  favorites,
}) => {
  const [position, setPosition] = useState(0);
  const isTablet = useMediaQuery("(max-width:900px)");
  const isMobile = useMediaQuery("(max-width:600px)");
  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  const cardWidth = isMobile ? 280 : 320;

  // Sử dụng requestAnimationFrame thay vì setInterval cho animation mượt mà hơn
  useEffect(() => {
    if (products && products.length > 0) {
      const totalWidth = products.length * cardWidth;
      let animationFrameId;
      let lastTimestamp = 0;

      // Cải thiện animation sử dụng requestAnimationFrame
      const animate = (timestamp) => {
        // Giới hạn tốc độ cập nhật để tránh quá nhiều re-render
        if (!lastTimestamp || timestamp - lastTimestamp >= 16) {
          // khoảng 60fps
          lastTimestamp = timestamp;
          setPosition((prevPos) => {
            const newPos = prevPos - 1;
            return newPos <= -totalWidth ? 0 : newPos;
          });
        }
        animationFrameId = requestAnimationFrame(animate);
      };

      animationFrameId = requestAnimationFrame(animate);

      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }
  }, [products, cardWidth]);

  // Sử dụng React.memo để tránh render lại khi props không thay đổi
  const MemoizedProductCard = useMemo(() => React.memo(ProductCard), []);

  // Đây là component chính - KHÔNG có background, không có shadow, không có box
  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            mb: 5,
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", mb: { xs: 3, md: 0 } }}
          >
            {/* Icon */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: { xs: 45, md: 55 },
                height: { xs: 45, md: 55 },
                borderRadius: "12px",
                bgcolor: "#4F46E5",
                mr: 2,
              }}
            >
              <LocalFireDepartment
                sx={{ fontSize: { xs: 24, md: 28 }, color: "white" }}
              />
            </Box>

            {/* Title */}
            <Box>
              <Typography
                sx={{
                  color: "#6366F1",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: 1,
                  mb: 0.5,
                }}
              >
                DISCOVER
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.8rem", md: "2.2rem" },
                  color: "#8b5cf6",
                }}
              >
                Outstanding Products
              </Typography>
            </Box>
          </Box>

          {/* View All Button */}
          <Button
            component={Link}
            to="/products"
            variant="contained"
            endIcon={<ArrowForward />}
            sx={{
              bgcolor: "#1e293b",
              borderRadius: "10px",
              px: 2.5,
              py: 1,
              "&:hover": { bgcolor: "#0f172a" },
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
              minHeight: "200px",
            }}
          >
            <CircularProgress
              size={40}
              sx={{
                color: "#6366F1",
              }}
            />
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Box
            sx={{
              p: 4,
              textAlign: "center",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            <ErrorOutline sx={{ fontSize: 48, color: "#f43f5e", mb: 2 }} />
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: "#e2e8f0", mb: 1 }}
            >
              Oops! Something went wrong
            </Typography>
          </Box>
        )}

        {/* Automatic Carousel - Đơn giản hóa cấu trúc */}
        {!loading && !error && products && products.length > 0 && (
          <div
            style={{
              position: "relative",
              margin: "20px 0",
            }}
          >
            {/* Gradient Overlay bên trái */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: isMobile ? "40px" : "60px",
                height: "100%",
                background: "linear-gradient(to right, #0a0f23, transparent)",
                zIndex: 10,
              }}
            />

            {/* Container carousel - KHÔNG có background */}
            <div
              ref={containerRef}
              style={{
                position: "relative",
                overflow: "hidden",
                padding: "16px 8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  transform: `translateX(${position}px)`,
                }}
              >
                {/* Render sản phẩm */}
                {[...products.slice(0, 10), ...products.slice(0, 3)].map(
                  (product, index) => (
                    <div
                      key={`product-${product.id}-${index}`}
                      style={{
                        flexShrink: 0,
                        width: cardWidth + "px",
                        margin: "0 16px",
                        transition: "transform 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-8px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <MemoizedProductCard
                        product={product}
                        toggleFavorite={toggleFavorite}
                        favorites={favorites}
                        darkMode={true}
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Gradient Overlay bên phải */}
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                width: isMobile ? "40px" : "60px",
                height: "100%",
                background: "linear-gradient(to left, #0a0f23, transparent)",
                zIndex: 10,
              }}
            />
          </div>
        )}

        {/* Empty State - Đơn giản hóa */}
        {!loading && !error && (!products || products.length === 0) && (
          <Box
            sx={{
              p: 4,
              textAlign: "center",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: "#e2e8f0", mb: 2 }}
            >
              No Products Yet
            </Typography>
          </Box>
        )}
      </Container>
    </div>
  );
};

// Wrap component trong React.memo để tránh render không cần thiết
export default React.memo(FeaturedProducts);
