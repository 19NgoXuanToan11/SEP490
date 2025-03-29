import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  Security,
  LocalShipping,
  Recycling,
  SupportAgent,
  Verified,
  Payments,
} from "@mui/icons-material";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionPaper = motion(Paper);

const WhyChooseUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      id: 1,
      icon: <Security style={{ fontSize: 40 }} />,
      title: "Secure Transactions",
      description:
        "All transactions are protected with advanced encryption and secure payment methods.",
      color: "#3b82f6",
      bgImage:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      icon: <Verified style={{ fontSize: 40 }} />,
      title: "Verified Products",
      description:
        "Every product is thoroughly checked and verified before being listed on our platform.",
      color: "#8b5cf6",
      bgImage:
        "https://images.unsplash.com/photo-1569098644584-210bcd375b59?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      icon: <LocalShipping style={{ fontSize: 40 }} />,
      title: "Fast Delivery",
      description:
        "Get your products delivered quickly with our reliable shipping partners.",
      color: "#ec4899",
      bgImage:
        "https://images.unsplash.com/photo-1580674285054-bed31e145f59?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      icon: <Payments style={{ fontSize: 40 }} />,
      title: "Flexible Payment",
      description:
        "Choose from multiple payment options including credit cards, PayPal, and more.",
      color: "#f59e0b",
      bgImage:
        "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      icon: <Recycling style={{ fontSize: 40 }} />,
      title: "Eco-Friendly",
      description:
        "Reduce electronic waste by buying and selling used electronics.",
      color: "#10b981",
      bgImage:
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      icon: <SupportAgent style={{ fontSize: 40 }} />,
      title: "24/7 Support",
      description:
        "Our customer support team is available around the clock to assist you.",
      color: "#06b6d4",
      bgImage:
        "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <MotionBox
      sx={{
        position: "relative",
        py: { xs: 10, md: 16 },
        px: 3,
        overflow: "hidden",
        background: "#0f172a", // Dark background for contrast
        color: "white",
        borderRadius: { xs: 4, md: 8 },
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Glowing lines */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            style={{
              position: "absolute",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, #6366f1, transparent)",
              width: "100%",
              left: 0,
              top: `${(index + 1) * 20}%`,
              opacity: 0.2,
            }}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </Box>

      <Box
        sx={{ position: "relative", zIndex: 1, maxWidth: "1200px", mx: "auto" }}
      >
        {/* Heading with 3D effect */}
        <MotionBox
          sx={{
            textAlign: "center",
            mb: { xs: 8, md: 12 },
            position: "relative",
          }}
        >
          <MotionTypography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              textShadow: "0 5px 15px rgba(99, 102, 241, 0.4)",
              mb: 2,
            }}
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <Box
              component="span"
              sx={{
                position: "relative",
                display: "inline-block",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                  filter: "blur(40px)",
                  opacity: 0.5,
                  zIndex: -1,
                },
              }}
            >
              Why Choose
            </Box>{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                position: "relative",
              }}
            >
              ReTech
            </Box>
          </MotionTypography>

          <MotionTypography
            variant="h6"
            sx={{
              maxWidth: "700px",
              mx: "auto",
              color: "rgba(255, 255, 255, 0.7)",
              lineHeight: 1.6,
              position: "relative",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            Experience the future of electronics trading with our innovative
            platform
          </MotionTypography>

          {/* Animated underline */}
          <MotionBox
            sx={{
              width: "100px",
              height: "4px",
              background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
              borderRadius: "2px",
              mx: "auto",
              mt: 3,
            }}
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true, amount: 0.1 }}
          />
        </MotionBox>

        {/* Interactive 3D cards */}
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={feature.id}>
              <MotionBox
                sx={{
                  height: { xs: "250px", md: "300px" },
                  position: "relative",
                  borderRadius: "24px",
                  overflow: "hidden",
                  cursor: "pointer",
                  perspective: "1000px",
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.1 }}
                onHoverStart={() => setHoveredFeature(feature.id)}
                onHoverEnd={() => setHoveredFeature(null)}
                whileHover={{ scale: 1.03 }}
              >
                <MotionBox
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${feature.bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "brightness(0.4)",
                    transition: "all 0.5s ease",
                    "&:hover": {
                      filter: "brightness(0.6)",
                    },
                  }}
                  whileHover={{ scale: 1.1 }}
                />

                {/* Gradient overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, ${feature.color}99 0%, ${feature.color}33 100%)`,
                    zIndex: 1,
                  }}
                />

                {/* Content */}
                <Box
                  sx={{
                    position: "relative",
                    zIndex: 2,
                    p: 4,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                >
                  <AnimatePresence>
                    {hoveredFeature === feature.id ? (
                      <MotionBox
                        key="description"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        sx={{ mb: 2 }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            color: "white",
                            fontWeight: "medium",
                            textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                          }}
                        >
                          {feature.description}
                        </Typography>
                      </MotionBox>
                    ) : (
                      <MotionBox
                        key="icon"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.3, type: "spring" }}
                        sx={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "20px",
                          background: "rgba(255, 255, 255, 0.1)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          mb: 3,
                        }}
                      >
                        {feature.icon}
                      </MotionBox>
                    )}
                  </AnimatePresence>

                  <MotionTypography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: "bold",
                      color: "white",
                      textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                      position: "relative",
                      display: "inline-block",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: "-8px",
                        left: 0,
                        width: hoveredFeature === feature.id ? "100%" : "30%",
                        height: "3px",
                        background: "white",
                        transition: "width 0.3s ease",
                      },
                    }}
                  >
                    {feature.title}
                  </MotionTypography>
                </Box>

                {/* Glowing corner effect */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "30px",
                    height: "30px",
                    borderTop: `3px solid ${feature.color}`,
                    borderLeft: `3px solid ${feature.color}`,
                    borderTopLeftRadius: "24px",
                    zIndex: 3,
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "30px",
                    height: "30px",
                    borderTop: `3px solid ${feature.color}`,
                    borderRight: `3px solid ${feature.color}`,
                    borderTopRightRadius: "24px",
                    zIndex: 3,
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "30px",
                    height: "30px",
                    borderBottom: `3px solid ${feature.color}`,
                    borderLeft: `3px solid ${feature.color}`,
                    borderBottomLeftRadius: "24px",
                    zIndex: 3,
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: "30px",
                    height: "30px",
                    borderBottom: `3px solid ${feature.color}`,
                    borderRight: `3px solid ${feature.color}`,
                    borderBottomRightRadius: "24px",
                    zIndex: 3,
                  }}
                />
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </Box>
    </MotionBox>
  );
};

export default WhyChooseUs;
