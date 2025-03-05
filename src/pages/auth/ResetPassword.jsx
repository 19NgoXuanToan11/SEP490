import React, { useState, useEffect } from "react";
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
  InputAdornment,
  IconButton,
  Breadcrumbs,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Link as RouterLink,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import Layout from "../../components/layout/Layout";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);
  const [validating, setValidating] = useState(true);

  useEffect(() => {
    // Validate token
    const validateToken = async () => {
      try {
        // Simulate API call to validate token
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // For demo purposes, consider token valid if it exists and is longer than 10 chars
        if (token && token.length > 10) {
          setTokenValid(true);
        } else {
          setTokenValid(false);
          setError(
            "Invalid or expired password reset link. Please request a new one."
          );
        }
      } catch (err) {
        setTokenValid(false);
        setError(
          "An error occurred while validating your reset link. Please try again."
        );
      } finally {
        setValidating(false);
      }
    };

    validateToken();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.password) {
      setError("Please enter a new password");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, just log the password reset
      console.log("Password reset for token:", token);
      console.log("New password:", formData.password);

      setSuccess(true);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login", {
          state: {
            message:
              "Your password has been reset successfully. Please log in with your new password.",
          },
        });
      }, 3000);
    } catch (err) {
      setError(
        "An error occurred while resetting your password. Please try again."
      );
      console.error("Password reset error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (validating) {
    return (
      <Layout>
        <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Validating your reset link...
          </Typography>
        </Container>
      </Layout>
    );
  }

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
          <Typography color="text.primary">Reset Password</Typography>
        </Breadcrumbs>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ mb: 3, textAlign: "center" }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Reset Password
            </Typography>
            {email && (
              <Typography variant="body1" color="text.secondary">
                Create a new password for {email}
              </Typography>
            )}
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success ? (
            <Alert severity="success" sx={{ mb: 3 }}>
              Your password has been reset successfully. You will be redirected
              to the login page shortly.
            </Alert>
          ) : tokenValid ? (
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="New Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm New Password"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Reset Password"}
              </Button>
            </Box>
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <Button
                component={RouterLink}
                to="/forgot-password"
                variant="contained"
                sx={{ mt: 2 }}
              >
                Request New Reset Link
              </Button>
            </Box>
          )}

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="body2">
              Remember your password?{" "}
              <Link component={RouterLink} to="/login" variant="body2">
                Back to Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default ResetPassword;
