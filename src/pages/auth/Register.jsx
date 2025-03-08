import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  InputAdornment,
  IconButton,
  Container,
  useTheme,
  alpha,
  CircularProgress,
  Divider,
  Chip,
  Fade,
  Zoom,
  FormControlLabel,
  Switch,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  ArrowForward,
  DarkMode,
  LightMode,
} from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import techGadgetsImage from "../../assets/pictures/tech-gadgets.jpg";

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === "agreeToTerms" ? checked : value,
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
    setLoading(true);
    setError("");

    if (!formData.email) {
      setError("Email is required");
      setLoading(false);
      return;
    }
    if (!formData.password) {
      setError("Password is required");
      setLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    if (!formData.firstName || !formData.lastName) {
      setError("First name and last name are required");
      setLoading(false);
      return;
    }
    if (!formData.agreeToTerms) {
      setError("You must agree to the terms and conditions");
      setLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Registration successful", formData);
      navigate("/login");
    } catch (err) {
      setError("An error occurred during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const primaryColor = darkMode ? "#4f46e5" : "#0ea5e9";
  const secondaryColor = darkMode ? "#8b5cf6" : "#06b6d4";
  const bgColor = darkMode ? "#0f172a" : "#f8fafc";
  const cardBgColor = darkMode
    ? "rgba(30, 41, 59, 0.7)"
    : "rgba(255, 255, 255, 0.7)";
  const textColor = darkMode ? "#f1f5f9" : "#1e293b";
  const subtleTextColor = darkMode ? "#94a3b8" : "#64748b";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: darkMode
          ? `linear-gradient(135deg, #0f172a 0%, #1e293b 100%)`
          : `linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 50%, #f8fafc 100%)`,
        position: "relative",
        overflow: "hidden",
        transition: "all 0.5s ease-in-out",
      }}
    >
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.5 }}
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <Box
          component={motion.div}
          animate={{
            y: [0, 15, 0],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          sx={{
            position: "absolute",
            width: "250px",
            height: "250px",
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
            background: `linear-gradient(135deg, ${alpha(
              primaryColor,
              0.2
            )}, ${alpha(secondaryColor, 0.2)})`,
            filter: "blur(40px)",
            top: "10%",
            right: "15%",
          }}
        />
        <Box
          component={motion.div}
          animate={{
            y: [0, -20, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          sx={{
            position: "absolute",
            width: "300px",
            height: "300px",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            background: `linear-gradient(135deg, ${alpha(
              secondaryColor,
              0.15
            )}, ${alpha(primaryColor, 0.15)})`,
            filter: "blur(40px)",
            bottom: "5%",
            left: "10%",
          }}
        />
      </Box>

      <Container maxWidth="lg" sx={{ zIndex: 1, position: "relative", py: 3 }}>
        <Zoom in={true} timeout={700}>
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              borderRadius: 4,
              overflow: "hidden",
              backdropFilter: "blur(20px)",
              backgroundColor: cardBgColor,
              boxShadow: darkMode
                ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                : "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
              border: `1px solid ${alpha(
                darkMode ? "#ffffff" : "#000000",
                0.05
              )}`,
              height: "auto",
              maxHeight: "90vh",
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            <Box
              sx={{
                width: "45%",
                position: "relative",
                overflow: "hidden",
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
                display: { xs: "none", md: "block" },
                color: "#ffffff",
              }}
            >
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
                <Box
                  component={motion.div}
                  initial={{ scale: 1.1, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 0.9 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  sx={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <Box
                    component="img"
                    src={techGadgetsImage}
                    alt="Tech Gadgets"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transform: "scale(1.1)",
                    }}
                  />
                </Box>
              </Box>

              <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                sx={{ mt: 3, pl: 3 }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={darkMode}
                      onChange={toggleDarkMode}
                      icon={<LightMode sx={{ color: "#fff", fontSize: 16 }} />}
                      checkedIcon={
                        <DarkMode sx={{ color: "#fff", fontSize: 16 }} />
                      }
                      sx={{
                        "& .MuiSwitch-switchBase": {
                          color: "#fff",
                        },
                        "& .MuiSwitch-track": {
                          backgroundColor: "rgba(255, 255, 255, 0.3)",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2">
                      {darkMode ? "Dark mode" : "Light mode"}
                    </Typography>
                  }
                />
              </Box>
            </Box>

            <Box
              sx={{
                width: { xs: "100%", md: "55%" },
                p: { xs: 3, md: 4 },
                display: "flex",
                flexDirection: "column",
                color: textColor,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
                overflow: "auto",
              }}
            >
              <Fade in={true} timeout={500}>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    position: "relative",
                    backdropFilter: "blur(10px)",
                    borderRadius: 3,
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    maxHeight: "70vh",
                    overflowY: "auto",
                  }}
                >
                  <Box sx={{ mb: 2, position: "relative" }}>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      sx={{
                        mb: 0.5,
                        color: subtleTextColor,
                        fontSize: "0.85rem",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      Email
                    </Typography>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email
                              sx={{
                                color: alpha(textColor, 0.5),
                                fontSize: 18,
                              }}
                            />
                          </InputAdornment>
                        ),
                        sx: {
                          borderRadius: 3,
                          bgcolor: alpha(
                            darkMode ? "#1e293b" : "#f1f5f9",
                            darkMode ? 0.4 : 0.7
                          ),
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: alpha(textColor, 0.1),
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: alpha(textColor, 0.2),
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: primaryColor,
                            boxShadow: `0 0 0 2px ${alpha(primaryColor, 0.2)}`,
                          },
                          py: 0.8,
                          color: textColor,
                        },
                      }}
                      sx={{
                        "& .MuiInputBase-input": {
                          bgcolor: alpha(
                            darkMode ? "#1e293b" : "#f1f5f9",
                            darkMode ? 0.4 : 0.7
                          ), // Đảm bảo input bên trong cũng có màu nền đúng
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: 2, position: "relative" }}>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      sx={{
                        mb: 0.5,
                        color: subtleTextColor,
                        fontSize: "0.85rem",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      Password
                    </Typography>
                    <TextField
                      fullWidth
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock
                              sx={{
                                color: alpha(textColor, 0.5),
                                fontSize: 18,
                              }}
                            />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              sx={{
                                color: alpha(textColor, 0.5),
                                "&:hover": { color: primaryColor },
                              }}
                            >
                              {showPassword ? (
                                <VisibilityOff fontSize="small" />
                              ) : (
                                <Visibility fontSize="small" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                        sx: {
                          borderRadius: 3,
                          bgcolor: alpha(
                            darkMode ? "#1e293b" : "#f1f5f9",
                            darkMode ? 0.4 : 0.7
                          ),
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: alpha(textColor, 0.1),
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: alpha(textColor, 0.2),
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: primaryColor,
                            boxShadow: `0 0 0 2px ${alpha(primaryColor, 0.2)}`,
                          },
                          py: 0.8,
                          color: textColor,
                        },
                      }}
                      sx={{
                        "& .MuiInputBase-input": {
                          bgcolor: alpha(
                            darkMode ? "#1e293b" : "#f1f5f9",
                            darkMode ? 0.4 : 0.7
                          ), // Đảm bảo input bên trong cũng có màu nền đúng
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: 2, position: "relative" }}>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      sx={{
                        mb: 0.5,
                        color: subtleTextColor,
                        fontSize: "0.85rem",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      Confirm Password
                    </Typography>
                    <TextField
                      fullWidth
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock
                              sx={{
                                color: alpha(textColor, 0.5),
                                fontSize: 18,
                              }}
                            />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              sx={{
                                color: alpha(textColor, 0.5),
                                "&:hover": { color: primaryColor },
                              }}
                            >
                              {showConfirmPassword ? (
                                <VisibilityOff fontSize="small" />
                              ) : (
                                <Visibility fontSize="small" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                        sx: {
                          borderRadius: 3,
                          bgcolor: alpha(
                            darkMode ? "#1e293b" : "#f1f5f9",
                            darkMode ? 0.4 : 0.7
                          ),
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: alpha(textColor, 0.1),
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: alpha(textColor, 0.2),
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: primaryColor,
                            boxShadow: `0 0 0 2px ${alpha(primaryColor, 0.2)}`,
                          },
                          py: 0.8,
                          color: textColor,
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: 2, position: "relative" }}>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      sx={{
                        mb: 0.5,
                        color: subtleTextColor,
                        fontSize: "0.85rem",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      First Name
                    </Typography>
                    <TextField
                      fullWidth
                      id="firstName"
                      name="firstName"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={handleChange}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person
                              sx={{
                                color: alpha(textColor, 0.5),
                                fontSize: 18,
                              }}
                            />
                          </InputAdornment>
                        ),
                        sx: {
                          borderRadius: 3,
                          bgcolor: alpha(
                            darkMode ? "#1e293b" : "#f1f5f9",
                            darkMode ? 0.4 : 0.7
                          ),
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: alpha(textColor, 0.1),
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: alpha(textColor, 0.2),
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: primaryColor,
                            boxShadow: `0 0 0 2px ${alpha(primaryColor, 0.2)}`,
                          },
                          py: 0.8,
                          color: textColor,
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: 2, position: "relative" }}>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      sx={{
                        mb: 0.5,
                        color: subtleTextColor,
                        fontSize: "0.85rem",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      Last Name
                    </Typography>
                    <TextField
                      fullWidth
                      id="lastName"
                      name="lastName"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person
                              sx={{
                                color: alpha(textColor, 0.5),
                                fontSize: 18,
                              }}
                            />
                          </InputAdornment>
                        ),
                        sx: {
                          borderRadius: 3,
                          bgcolor: alpha(
                            darkMode ? "#1e293b" : "#f1f5f9",
                            darkMode ? 0.4 : 0.7
                          ),
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: alpha(textColor, 0.1),
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: alpha(textColor, 0.2),
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: primaryColor,
                            boxShadow: `0 0 0 2px ${alpha(primaryColor, 0.2)}`,
                          },
                          py: 0.8,
                          color: textColor,
                        },
                      }}
                    />
                  </Box>

                  {error && (
                    <Typography
                      color="error"
                      variant="body2"
                      sx={{ mb: 2, textAlign: "center" }}
                    >
                      {error}
                    </Typography>
                  )}

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    endIcon={!loading && <ArrowForward />}
                    sx={{
                      background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                      color: "white",
                      borderRadius: 10,
                      py: 1.7,
                      textTransform: "none",
                      fontSize: "16px",
                      fontWeight: 600,
                      backdropFilter: "blur(8px)",
                      boxShadow: `0 10px 25px ${alpha(
                        primaryColor,
                        darkMode ? 0.4 : 0.25
                      )}`,
                      "&:hover": {
                        background: `linear-gradient(135deg, ${secondaryColor}, ${primaryColor})`,
                        boxShadow: `0 15px 30px ${alpha(
                          primaryColor,
                          darkMode ? 0.5 : 0.35
                        )}`,
                        transform: "translateY(-3px)",
                      },
                      "&:active": {
                        transform: "translateY(0px)",
                        boxShadow: `0 5px 15px ${alpha(
                          primaryColor,
                          darkMode ? 0.3 : 0.2
                        )}`,
                      },
                      transition:
                        "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background: `linear-gradient(90deg, transparent, ${alpha(
                          "#ffffff",
                          0.2
                        )}, transparent)`,
                        transition: "all 0.6s ease",
                      },
                      "&:hover::before": {
                        left: "100%",
                      },
                    }}
                  >
                    {loading ? (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CircularProgress
                          size={20}
                          color="inherit"
                          sx={{ mr: 1 }}
                        />
                        <span>Processing...</span>
                      </Box>
                    ) : (
                      "Sign up"
                    )}
                  </Button>
                </Box>
              </Fade>

              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="body2" color={subtleTextColor}>
                  Already have an account?{" "}
                  <Link
                    component={RouterLink}
                    to="/login"
                    sx={{
                      color: primaryColor,
                      textDecoration: "none",
                      fontWeight: 600,
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Sign in
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Zoom>
      </Container>
    </Box>
  );
};

export default Register;
