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
} from "@mui/icons-material";
import Layout from "../components/layout/Layout";

const Contact = () => {
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
    // Clear error when user types
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
      // Here you would typically send the form data to your backend
      console.log("Form submitted:", formData);

      // Show success message
      setSnackbar({
        open: true,
        message:
          "Your message has been sent successfully! We will get back to you soon.",
        severity: "success",
      });

      // Reset form
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

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        {/* Hero Section */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Contact Us
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 800, mx: "auto", mb: 4 }}
          >
            Have questions, feedback, or need assistance? We're here to help!
            Reach out to our team using any of the methods below.
          </Typography>
          <Divider sx={{ mb: 4 }} />
        </Box>

        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Get in Touch
                </Typography>
                <Typography variant="body1" paragraph>
                  Our customer support team is available Monday through Friday,
                  9am to 6pm EST. We strive to respond to all inquiries within
                  24 hours.
                </Typography>

                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Email color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      secondary="support@retech.com"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Phone color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Phone"
                      secondary="+1 (555) 123-4567"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LocationOn color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Address"
                      secondary="123 Tech Street, Suite 456, San Francisco, CA 94107"
                    />
                  </ListItem>
                </List>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom>
                  Follow Us
                </Typography>
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  {[
                    { icon: <Facebook />, label: "Facebook" },
                    { icon: <Twitter />, label: "Twitter" },
                    { icon: <Instagram />, label: "Instagram" },
                    { icon: <LinkedIn />, label: "LinkedIn" },
                  ].map((social, index) => (
                    <Button
                      key={index}
                      variant="outlined"
                      startIcon={social.icon}
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      {social.label}
                    </Button>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom>
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      endIcon={<Send />}
                      sx={{ mt: 2 }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>

        {/* FAQ Section */}
        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ textAlign: "center", mb: 4 }}
          >
            Frequently Asked Questions
          </Typography>
          <Grid container spacing={3}>
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
                <Paper sx={{ p: 3, height: "100%" }}>
                  <Typography variant="h6" gutterBottom>
                    {faq.question}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {faq.answer}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Map Section */}
        <Box sx={{ mt: 8 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ p: 2 }}>
              Our Location
            </Typography>
            <Box
              sx={{
                height: 400,
                width: "100%",
                bgcolor: "grey.200",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Replace this with an actual map component like Google Maps */}
              <Typography variant="body1" color="text.secondary">
                Map will be displayed here
              </Typography>
            </Box>
          </Paper>
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
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default Contact;
