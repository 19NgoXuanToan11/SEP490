import React, { useState } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { TrendingUp, SwapHoriz } from "@mui/icons-material";
import TrendingProducts from "./TrendingProducts";
import RecentExchanges from "./RecentExchanges";

const MotionBox = motion(Box);

const TabSection = ({
  trendingProducts,
  recentExchanges,
  loading,
  error,
  toggleFavorite,
  favorites,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeSection, setActiveSection] = useState("trending"); // State để theo dõi mục đang hoạt động

  // Background gradient for the section
  const gradient =
    "linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(147, 51, 234, 0.05), rgba(236, 72, 153, 0.07))";

  return (
    <MotionBox
      sx={{
        mb: 10,
        mt: 10,
        position: "relative",
        borderRadius: "24px",
        overflow: "hidden",
        background: gradient,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
        p: { xs: 2, md: 3 },
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(255, 107, 107, 0.08) 0%, rgba(255, 107, 107, 0) 70%)",
          filter: "blur(40px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: "250px",
          height: "250px",
          background:
            "radial-gradient(circle, rgba(255, 142, 83, 0.08) 0%, rgba(255, 142, 83, 0) 70%)",
          filter: "blur(40px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Header with Titles */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
          pb: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            "&:hover": {
              color: "#FF6B6B",
            },
          }}
          onClick={() => setActiveSection("trending")}
        >
          <TrendingUp
            sx={{
              mr: 1,
              color: activeSection === "trending" ? "#FF6B6B" : "#64748B",
            }}
          />
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: activeSection === "trending" ? "#FF6B6B" : "#64748B",
            }}
          >
            Trending Products
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            "&:hover": {
              color: "#3B82F6",
            },
          }}
          onClick={() => setActiveSection("recent")}
        >
          <SwapHoriz
            sx={{
              mr: 1,
              color: activeSection === "recent" ? "#3B82F6" : "#64748B",
            }}
          />
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: activeSection === "recent" ? "#3B82F6" : "#64748B",
            }}
          >
            Recent Exchanges
          </Typography>
        </Box>
      </Box>

      {/* Content - Switch between sections */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        {activeSection === "trending" ? (
          <Box sx={{ p: 2 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            ></Box>
            <TrendingProducts
              products={trendingProducts}
              loading={loading}
              error={error}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
            />
          </Box>
        ) : (
          <Box sx={{ p: 2 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            ></Box>
            <RecentExchanges
              exchanges={recentExchanges}
              loading={loading}
              error={error}
            />
          </Box>
        )}
      </Box>
    </MotionBox>
  );
};

export default TabSection;
