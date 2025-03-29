import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  useTheme,
  useMediaQuery,
  Tooltip,
  Zoom,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  YouTube,
  Send,
  Phone,
  Email,
  LocationOn,
  KeyboardArrowUp,
  KeyboardDoubleArrowUp,
  ArrowForward,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/pictures/logo/original.png";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Kiểm tra vị trí scroll để hiển thị nút scroll to top
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailValue.trim() !== "") {
      // Xử lý logic đăng ký newsletter ở đây
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmailValue("");
      }, 3000);
    }
  };

  // Animation variants cho các phần tử
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const socialIcons = [
    { icon: <Facebook />, label: "Facebook", color: "#1877F2" },
    { icon: <Instagram />, label: "Instagram", color: "#E4405F" },
  ];

  const quickLinks = [
    { text: "Home", path: "/" },
    { text: "Products", path: "/products" },
    { text: "Exchange", path: "/exchange" },
  ];

  const categories = [
    { text: "Smartphones", path: "/products?category=Smartphones" },
    { text: "Laptops", path: "/products?category=Laptops" },
    { text: "Tablets", path: "/products?category=Tablets" },
    { text: "Audio", path: "/products?category=Audio" },
    { text: "Cameras", path: "/products?category=Cameras" },
    { text: "Accessories", path: "/products?category=Accessories" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: "#111827",
        color: "white",
        pt: 8,
        pb: 4,
        mt: "auto",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background elements */}
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
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              opacity: 0.02 + Math.random() * 0.03,
            }}
            animate={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              opacity: 0.02 + Math.random() * 0.03,
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              position: "absolute",
              width: 100 + Math.random() * 200,
              height: 100 + Math.random() * 200,
              borderRadius: "50%",
              background: "white",
              filter: "blur(60px)",
            }}
          />
        ))}
      </Box>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Grid container spacing={4}>
            {/* Logo and About */}
            <Grid item xs={12} md={4}>
              <motion.div variants={itemVariants}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <img
                    src={logo || "https://via.placeholder.com/40?text=RT"}
                    alt="ReTech Logo"
                    style={{ height: 50, marginRight: 10 }}
                  />
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    <span
                      style={{
                        background: "linear-gradient(45deg, #9c27b0, #3f51b5)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Re
                    </span>
                    <span style={{ color: "white" }}>Tech</span>
                  </Typography>
                </Box>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 3,
                    lineHeight: 1.7,
                    color: "rgba(255, 255, 255, 0.8)",
                    maxWidth: "90%",
                  }}
                >
                  ReTech is a platform for buying, selling, and exchanging used
                  electronics. Our mission is to reduce electronic waste and
                  make technology more accessible to everyone.
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                  {socialIcons.map((social, index) => (
                    <Tooltip
                      key={index}
                      title={social.label}
                      TransitionComponent={Zoom}
                      arrow
                    >
                      <IconButton
                        color="inherit"
                        aria-label={social.label}
                        sx={{
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: social.color,
                            transform: "translateY(-3px)",
                            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                          },
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    </Tooltip>
                  ))}
                </Box>
              </motion.div>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} sm={6} md={2}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    position: "relative",
                    display: "inline-block",
                    pb: 1,
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      width: "60%",
                      height: "2px",
                      bottom: 0,
                      left: 0,
                      backgroundColor: "#6366f1",
                      transition: "width 0.3s ease",
                    },
                    "&:hover:after": {
                      width: "100%",
                    },
                  }}
                >
                  Quick Links
                </Typography>
              </motion.div>

              <List dense>
                {quickLinks.map((item, index) => (
                  <motion.div
                    key={item.text}
                    variants={itemVariants}
                    custom={index}
                  >
                    <ListItem
                      disableGutters
                      sx={{
                        transition: "transform 0.2s ease",
                        "&:hover": {
                          transform: "translateX(5px)",
                        },
                      }}
                    >
                      <ListItemText>
                        <Link
                          component={RouterLink}
                          to={item.path}
                          color="inherit"
                          underline="none"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              color: "#6366f1",
                            },
                          }}
                        >
                          <ArrowForward
                            sx={{
                              fontSize: 14,
                              mr: 1,
                              opacity: 0,
                              transition: "all 0.2s ease",
                              transform: "translateX(-5px)",
                            }}
                            className="link-arrow"
                          />
                          {item.text}
                        </Link>
                      </ListItemText>
                    </ListItem>
                  </motion.div>
                ))}
              </List>
            </Grid>

            {/* Categories */}
            <Grid item xs={12} sm={6} md={2}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    position: "relative",
                    display: "inline-block",
                    pb: 1,
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      width: "60%",
                      height: "2px",
                      bottom: 0,
                      left: 0,
                      backgroundColor: "#6366f1",
                      transition: "width 0.3s ease",
                    },
                    "&:hover:after": {
                      width: "100%",
                    },
                  }}
                >
                  Categories
                </Typography>
              </motion.div>

              <List dense>
                {categories.map((item, index) => (
                  <motion.div
                    key={item.text}
                    variants={itemVariants}
                    custom={index}
                  >
                    <ListItem
                      disableGutters
                      sx={{
                        transition: "transform 0.2s ease",
                        "&:hover": {
                          transform: "translateX(5px)",
                        },
                      }}
                    >
                      <ListItemText>
                        <Link
                          component={RouterLink}
                          to={item.path}
                          color="inherit"
                          underline="none"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              color: "#6366f1",
                            },
                          }}
                        >
                          <ArrowForward
                            sx={{
                              fontSize: 14,
                              mr: 1,
                              opacity: 0,
                              transition: "all 0.2s ease",
                              transform: "translateX(-5px)",
                            }}
                            className="link-arrow"
                          />
                          {item.text}
                        </Link>
                      </ListItemText>
                    </ListItem>
                  </motion.div>
                ))}
              </List>
            </Grid>

            {/* Contact & Newsletter */}
            <Grid item xs={12} md={4}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    position: "relative",
                    display: "inline-block",
                    pb: 1,
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      width: "60%",
                      height: "2px",
                      bottom: 0,
                      left: 0,
                      backgroundColor: "#6366f1",
                      transition: "width 0.3s ease",
                    },
                    "&:hover:after": {
                      width: "100%",
                    },
                  }}
                >
                  Contact Us
                </Typography>
              </motion.div>

              <List dense>
                {[
                  {
                    icon: <Phone sx={{ fontSize: 20 }} />,
                    text: "0786485999",
                    animation: "wave",
                  },
                  {
                    icon: <Email sx={{ fontSize: 20 }} />,
                    text: "toannxse171297@fpt.edu.vn",
                    animation: "pulse",
                  },
                  {
                    icon: <LocationOn sx={{ fontSize: 20 }} />,
                    text: "FPT University, HCMC",
                    animation: "bounce",
                  },
                ].map((item, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <ListItem
                      disableGutters
                      sx={{
                        py: 1,
                        transition: "transform 0.2s ease",
                        "&:hover": {
                          transform: "translateX(5px)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          mr: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            transform:
                              item.animation === "wave"
                                ? "rotate(15deg)"
                                : item.animation === "pulse"
                                ? "scale(1.1)"
                                : "translateY(-3px)",
                          },
                        }}
                      >
                        {item.icon}
                      </Box>
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                          variant: "body2",
                          sx: { color: "rgba(255, 255, 255, 0.8)" },
                        }}
                      />
                    </ListItem>
                  </motion.div>
                ))}
              </List>
            </Grid>
          </Grid>
        </motion.div>
      </Container>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              zIndex: 100,
            }}
          >
            <Tooltip title="Scroll to top" placement="left" arrow>
              <IconButton
                onClick={scrollToTop}
                sx={{
                  bgcolor: "rgba(99, 102, 241, 0.8)",
                  color: "white",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)",
                  "&:hover": {
                    bgcolor: "rgba(99, 102, 241, 1)",
                    transform: "translateY(-5px)",
                  },
                  transition: "all 0.3s ease",
                  width: 48,
                  height: 48,
                }}
              >
                <KeyboardDoubleArrowUp />
              </IconButton>
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        a:hover .link-arrow {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
      `}</style>
    </Box>
  );
};

export default Footer;
