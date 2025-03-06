import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ctaBackground from "../../assets/pictures/hero-bg.jpg";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

const CallToAction = () => {
  return (
    <MotionBox
      sx={{
        position: "relative",
        py: { xs: 8, md: 12 },
        backgroundImage: `linear-gradient(135deg, rgba(10, 15, 35, 0.95), rgba(20, 30, 60, 0.85)), url(${ctaBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // Hiệu ứng parallax nhẹ
        borderRadius: { xs: 0, md: 8 },
        overflow: "hidden",
        mb: 8,
        color: "white",
        textAlign: "center",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
      }}
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Animated Gradient Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "6px",
          background:
            "linear-gradient(90deg, #ff6f61, #d946ef, #3b82f6, #22d3ee)",
          backgroundSize: "400% 100%",
          animation: "gradientFlow 5s ease-in-out infinite",
          "@keyframes gradientFlow": {
            "0%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
            "100%": { backgroundPosition: "0% 50%" },
          },
        }}
      />

      {/* Particle Effect Background (Optional) */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.15,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 70%)",
        }}
      />

      <Container maxWidth="lg">
        {/* Title with Gradient and Shadow */}
        <MotionTypography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 800,
            mb: 4,
            fontSize: { xs: "2.5rem", md: "4rem" },
            background: "linear-gradient(45deg, #f3f4f6, #60a5fa, #f3f4f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
          }}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          Join Our Vibrant Community
        </MotionTypography>

        {/* Subtitle with Smooth Animation */}
        <MotionTypography
          variant="h6"
          sx={{
            mb: 6,
            color: "rgba(255, 255, 255, 0.85)",
            maxWidth: "900px",
            mx: "auto",
            lineHeight: 1.8,
            fontSize: { xs: "1rem", md: "1.25rem" },
            fontWeight: 300,
            letterSpacing: "0.5px",
          }}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          Discover the easiest way to buy, sell, and exchange used electronics.
          Join thousands of users and unlock exclusive deals tailored just for
          you.
        </MotionTypography>

        {/* Buttons with Enhanced Effects */}
        <MotionBox
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2.5,
            flexWrap: "wrap",
          }}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <MotionButton
            variant="contained"
            size="large"
            component={Link}
            to="/register"
            sx={{
              px: 5,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 600,
              borderRadius: "50px",
              background: "linear-gradient(45deg, #d946ef, #60a5fa)", // Gradient tím-xanh thay cho hồng
              boxShadow: "0 8px 25px rgba(96, 165, 250, 0.5)", // Shadow phù hợp với màu mới
              "&:hover": {
                background: "linear-gradient(45deg, #c13dd6, #3b82f6)", // Gradient đậm hơn khi hover
                boxShadow: "0 12px 30px rgba(96, 165, 250, 0.7)",
                transform: "translateY(-4px)",
              },
              transition: "all 0.4s ease",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up Now
          </MotionButton>

          <MotionButton
            variant="outlined"
            size="large"
            component={Link}
            to="/about"
            sx={{
              px: 5,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 600,
              borderRadius: "50px",
              borderColor: "rgba(255, 255, 255, 0.6)",
              borderWidth: "2px",
              color: "white",
              background: "rgba(255, 255, 255, 0.05)",
              "&:hover": {
                borderColor: "white",
                background: "rgba(255, 255, 255, 0.15)",
                transform: "translateY(-4px)",
                boxShadow: "0 8px 25px rgba(255, 255, 255, 0.2)",
              },
              transition: "all 0.4s ease",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </MotionButton>
        </MotionBox>
      </Container>
    </MotionBox>
  );
};

export default CallToAction;
