import React from "react";
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
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import logo from "../../assets/pictures/logo/original.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.dark",
        color: "white",
        pt: 6,
        pb: 3,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and About */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <img
                src={logo || "https://via.placeholder.com/40?text=RT"}
                alt="ReTech Logo"
                style={{ height: 40, marginRight: 10 }}
              />
              <Typography variant="h5" component="div">
                ReTech
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              ReTech is a platform for buying, selling, and exchanging used
              electronics. Our mission is to reduce electronic waste and make
              technology more accessible to everyone.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
              <IconButton color="inherit" aria-label="YouTube">
                <YouTube />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <List dense>
              {[
                { text: "Home", path: "/" },
                { text: "Products", path: "/products" },
                { text: "Exchange", path: "/exchange" },
                { text: "About Us", path: "/about" },
                { text: "Contact", path: "/contact" },
                { text: "FAQ", path: "/faq" },
              ].map((item) => (
                <ListItem key={item.text} disableGutters>
                  <ListItemText>
                    <Link
                      component={RouterLink}
                      to={item.path}
                      color="inherit"
                      underline="hover"
                    >
                      {item.text}
                    </Link>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Categories */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Categories
            </Typography>
            <List dense>
              {[
                { text: "Smartphones", path: "/products?category=Smartphones" },
                { text: "Laptops", path: "/products?category=Laptops" },
                { text: "Tablets", path: "/products?category=Tablets" },
                { text: "Audio", path: "/products?category=Audio" },
                { text: "Cameras", path: "/products?category=Cameras" },
                { text: "Accessories", path: "/products?category=Accessories" },
              ].map((item) => (
                <ListItem key={item.text} disableGutters>
                  <ListItemText>
                    <Link
                      component={RouterLink}
                      to={item.path}
                      color="inherit"
                      underline="hover"
                    >
                      {item.text}
                    </Link>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Contact & Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Stay Updated
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Subscribe to our newsletter for the latest products and deals.
            </Typography>
            <Box sx={{ display: "flex", mb: 3 }}>
              <TextField
                variant="outlined"
                placeholder="Your Email"
                size="small"
                fullWidth
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 1,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "primary.main",
                        "&:hover": {
                          bgcolor: "primary.light",
                        },
                      }}
                    >
                      <Send />
                    </Button>
                  ),
                }}
              />
            </Box>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <List dense>
              <ListItem disableGutters>
                <Phone sx={{ mr: 1, fontSize: 20 }} />
                <ListItemText primary="+1 (555) 123-4567" />
              </ListItem>
              <ListItem disableGutters>
                <Email sx={{ mr: 1, fontSize: 20 }} />
                <ListItemText primary="support@retech.com" />
              </ListItem>
              <ListItem disableGutters>
                <LocationOn sx={{ mr: 1, fontSize: 20 }} />
                <ListItemText primary="123 Tech Street, San Francisco, CA 94107" />
              </ListItem>
            </List>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)", my: 3 }} />

        {/* Bottom Footer */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="body2">
              © {new Date().getFullYear()} ReTech. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "flex-start", md: "flex-end" },
                gap: 2,
              }}
            >
              <Link
                color="inherit"
                underline="hover"
                component={RouterLink}
                to="/terms"
              >
                Terms of Service
              </Link>
              <Link
                color="inherit"
                underline="hover"
                component={RouterLink}
                to="/privacy"
              >
                Privacy Policy
              </Link>
              <Link
                color="inherit"
                underline="hover"
                component={RouterLink}
                to="/cookies"
              >
                Cookie Policy
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Scroll to Top Button */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <IconButton
            onClick={scrollToTop}
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.1)",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <KeyboardArrowUp />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
