import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  Alert,
  CircularProgress,
  Breadcrumbs,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Layout from "../../components/layout/Layout";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, just log the email
      console.log("Password reset requested for:", email);

      setSuccess(true);
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Password reset error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Link component={RouterLink} to="/login" color="inherit">
            Login
          </Link>
          <Typography color="text.primary">Forgot Password</Typography>
        </Breadcrumbs>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ mb: 3, textAlign: "center" }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Forgot Password
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Enter your email address and we'll send you a link to reset your
              password
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success ? (
            <Alert severity="success" sx={{ mb: 3 }}>
              Password reset link has been sent to your email address. Please
              check your inbox.
            </Alert>
          ) : (
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleChange}
                disabled={loading}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Send Reset Link"}
              </Button>

              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography variant="body2">
                  Remember your password?{" "}
                  <Link component={RouterLink} to="/login" variant="body2">
                    Back to Login
                  </Link>
                </Typography>
              </Box>
            </Box>
          )}
        </Paper>
      </Container>
    </Layout>
  );
};

export default ForgotPassword;
