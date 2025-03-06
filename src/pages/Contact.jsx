import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  Send,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  ExpandMore,
} from "@mui/icons-material";
import Layout from "../components/layout/Layout";
import { motion } from "framer-motion";
import { Parallax } from "react-parallax";
import GoogleMapReact from "google-map-react";

// Motion components
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionPaper = motion(Paper);
const MotionCard = motion(Card);

// Map Marker Component
const MapMarker = ({ text }) => (
  <Box sx={{ color: "#3B82F6", fontSize: 40 }}>
    <LocationOn fontSize="inherit" />
    <Typography
      variant="body2"
      sx={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        color: "#1E293B",
        fontWeight: 600,
      }}
    >
      {text}
    </Typography>
  </Box>
);

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      setSnackbar({
        open: true,
        message:
          "Your message has been sent successfully! We will get back to you soon.",
        severity: "success",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Please fix the errors in the form.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const hoverEffect = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <Layout>
      {/* Hero Section */}
      <Parallax
        bgImage="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        strength={400}
      >
        <Box
          sx={{
            position: "relative",
            background:
              "linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9))",
            color: "white",
            pt: { xs: 12, md: 20 },
            pb: { xs: 12, md: 16 },
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Container
            maxWidth="lg"
            sx={{ position: "relative", zIndex: 1, textAlign: "center" }}
          >
            <MotionTypography
              variant="overline"
              sx={{
                color: "#3B82F6",
                fontWeight: 600,
                letterSpacing: 3,
                mb: 2,
                display: "block",
                textTransform: "uppercase",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              CONTACT US
            </MotionTypography>
            <MotionTypography
              variant="h1"
              component="h1"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2.5rem", md: "4.5rem" },
                mb: 3,
                background: "linear-gradient(90deg, #fff, #94A3B8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.2,
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Let's Get in Touch
            </MotionTypography>
            <MotionTypography
              variant="h6"
              sx={{
                color: "#CBD5E1",
                maxWidth: 800,
                mx: "auto",
                fontSize: { xs: "1rem", md: "1.25rem" },
                lineHeight: 1.6,
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Have questions, feedback, or need assistance? We're here to help!
              Reach out to our team using any of the methods below.
            </MotionTypography>
          </Container>
        </Box>
      </Parallax>

      <Container maxWidth="xl" sx={{ mt: 8, mb: 12 }}>
        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <MotionCard
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              sx={{
                height: "100%",
                borderRadius: "24px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                background: "linear-gradient(145deg, #ffffff, #f8fafc)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 15px 40px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  sx={{ fontWeight: 700, color: "#1E293B" }}
                >
                  Get in Touch
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{ color: "#475569", lineHeight: 1.7 }}
                >
                  Our customer support team is available Monday through Friday,
                  9am to 6pm EST. We strive to respond to all inquiries within
                  24 hours.
                </Typography>

                <List>
                  {[
                    {
                      icon: <Email sx={{ color: "#3B82F6" }} />,
                      primary: "Email",
                      secondary: "support@retech.com",
                    },
                    {
                      icon: <Phone sx={{ color: "#3B82F6" }} />,
                      primary: "Phone",
                      secondary: "+1 (555) 123-4567",
                    },
                    {
                      icon: <LocationOn sx={{ color: "#3B82F6" }} />,
                      primary: "Address",
                      secondary:
                        "123 Tech Street, Suite 456, San Francisco, CA 94107",
                    },
                  ].map((item, index) => (
                    <MotionBox
                      key={index}
                      variants={fadeIn}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ListItem>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText
                          primary={item.primary}
                          secondary={item.secondary}
                          primaryTypographyProps={{
                            fontWeight: 600,
                            color: "#1E293B",
                          }}
                          secondaryTypographyProps={{ color: "#64748B" }}
                        />
                      </ListItem>
                    </MotionBox>
                  ))}
                </List>

                <Divider
                  sx={{ my: 3, borderColor: "rgba(59, 130, 246, 0.1)" }}
                />

                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 600, color: "#1E293B" }}
                >
                  Follow Us
                </Typography>
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  {[
                    { icon: <Facebook />, label: "Facebook", color: "#1877F2" },
                    { icon: <Twitter />, label: "Twitter", color: "#1DA1F2" },
                    {
                      icon: <Instagram />,
                      label: "Instagram",
                      color: "#E1306C",
                    },
                    { icon: <LinkedIn />, label: "LinkedIn", color: "#0A66C2" },
                  ].map((social, index) => (
                    <MotionBox
                      key={index}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconButton
                        sx={{
                          bgcolor: social.color,
                          color: "white",
                          "&:hover": {
                            bgcolor: social.color,
                            opacity: 0.9,
                          },
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    </MotionBox>
                  ))}
                </Box>
              </CardContent>
            </MotionCard>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <MotionPaper
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: "24px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                background: "linear-gradient(145deg, #ffffff, #f8fafc)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 15px 40px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{ fontWeight: 700, color: "#1E293B" }}
              >
                Send Us a Message
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      required
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "& fieldset": {
                            borderColor: "rgba(59, 130, 246, 0.2)",
                          },
                          "&:hover fieldset": {
                            borderColor: "#3B82F6",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#3B82F6",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#64748B",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#3B82F6",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      required
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "& fieldset": {
                            borderColor: "rgba(59, 130, 246, 0.2)",
                          },
                          "&:hover fieldset": {
                            borderColor: "#3B82F6",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#3B82F6",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#64748B",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#3B82F6",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      error={!!errors.subject}
                      helperText={errors.subject}
                      required
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "& fieldset": {
                            borderColor: "rgba(59, 130, 246, 0.2)",
                          },
                          "&:hover fieldset": {
                            borderColor: "#3B82F6",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#3B82F6",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#64748B",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#3B82F6",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      name="message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message}
                      required
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "& fieldset": {
                            borderColor: "rgba(59, 130, 246, 0.2)",
                          },
                          "&:hover fieldset": {
                            borderColor: "#3B82F6",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#3B82F6",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#64748B",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#3B82F6",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MotionBox
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        endIcon={<Send />}
                        sx={{
                          mt: 2,
                          borderRadius: "50px",
                          px: 4,
                          py: 1.5,
                          background:
                            "linear-gradient(90deg, #3B82F6, #2563EB)",
                          boxShadow: "0 5px 15px rgba(37, 99, 235, 0.3)",
                          fontWeight: 600,
                          textTransform: "none",
                          fontSize: "1.1rem",
                          "&:hover": {
                            background:
                              "linear-gradient(90deg, #2563EB, #1D4ED8)",
                            boxShadow: "0 10px 25px rgba(37, 99, 235, 0.4)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        Send Message
                      </Button>
                    </MotionBox>
                  </Grid>
                </Grid>
              </form>
            </MotionPaper>
          </Grid>
        </Grid>

        {/* FAQ Section */}
        <Box sx={{ mt: 12 }}>
          <MotionTypography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              textAlign: "center",
              mb: 6,
              fontWeight: 800,
              color: "#1E293B",
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            Frequently Asked Questions
          </MotionTypography>
          <Grid
            container
            spacing={3}
            component={motion.div}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {[
              {
                question: "How quickly can I expect a response to my inquiry?",
                answer:
                  "We strive to respond to all inquiries within 24 hours during business days. For urgent matters, please contact us by phone for faster assistance.",
              },
              {
                question: "Can I visit your office in person?",
                answer:
                  "Yes, you can visit our office during business hours (Monday-Friday, 9am-6pm). We recommend scheduling an appointment in advance to ensure someone is available to assist you.",
              },
              {
                question:
                  "How can I report a technical issue with the website?",
                answer:
                  'You can report technical issues by emailing support@retech.com with the subject line "Technical Issue". Please include details about the problem, screenshots if possible, and the device/browser you were using.',
              },
              {
                question: "Do you offer support on weekends?",
                answer:
                  "While our office is closed on weekends, we monitor urgent emails. For weekend support, please email with 'URGENT' in the subject line, and we'll do our best to assist you as soon as possible.",
              },
            ].map((faq, index) => (
              <Grid item xs={12} md={6} key={index}>
                <MotionBox variants={fadeIn}>
                  <Accordion
                    sx={{
                      borderRadius: "16px",
                      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
                      "&:before": { display: "none" },
                      "&.Mui-expanded": {
                        margin: "0 !important",
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore sx={{ color: "#3B82F6" }} />}
                      sx={{
                        borderRadius: "16px",
                        px: 3,
                        py: 1,
                        "& .MuiAccordionSummary-content": {
                          margin: "12px 0",
                        },
                        "&:hover": {
                          background: "rgba(59, 130, 246, 0.05)",
                        },
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, color: "#1E293B" }}
                      >
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 3, py: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#64748B", lineHeight: 1.7 }}
                      >
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Map Section */}
        <Box sx={{ mt: 12 }}>
          <MotionPaper
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            sx={{
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
            }}
          ></MotionPaper>
        </Box>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            borderRadius: "12px",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default Contact;
