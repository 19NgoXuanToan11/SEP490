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
  Slide,
  FormControlLabel,
  Switch,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  AlternateEmail,
  LockOutlined,
  Fingerprint,
  QrCodeScanner,
  DarkMode,
  LightMode,
  ArrowForward,
  Security,
} from "@mui/icons-material";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion"; // You'll need to install this package
// Import your tech gadgets image
import techGadgetsImage from "../../assets/pictures/tech-gadgets.jpg";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email");
  const [animationComplete, setAnimationComplete] = useState(false);

  // Simulate animation completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Login successful");
      navigate(from, { replace: true });
    } catch (err) {
      setError("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const changeLoginMethod = (method) => {
    setLoginMethod(method);
  };

  // Color palette - vibrant yet sophisticated
  const primaryColor = darkMode ? "#4f46e5" : "#0ea5e9"; // Indigo in dark mode, sky blue in light
  const secondaryColor = darkMode ? "#8b5cf6" : "#06b6d4"; // Purple in dark mode, cyan in light
  const bgColor = darkMode ? "#0f172a" : "#f8fafc"; // Dark slate in dark mode, light slate in light
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
      {/* Animated background elements - simplified for better performance */}
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
        {/* Reduced number of floating shapes */}
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

      {/* Main content - adjusted for better fit */}
      <Container maxWidth="lg" sx={{ zIndex: 1, position: "relative", py: 3 }}>
        <Zoom in={true} timeout={700}>
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
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
              maxHeight: { md: "90vh" },
            }}
          >
            {/* Left side - Branding and features - more compact */}
            <Box
              sx={{
                width: { xs: "100%", md: "40%" },
                p: { xs: 3, md: 4 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
                color: "#ffffff",
              }}
            >
              <Box>
                {/* Added background image */}
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
              </Box>

              {/* Dark mode toggle - moved up for visibility */}
              <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                sx={{ mt: 3 }}
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

            {/* Right side - Login form - more compact */}
            <Box
              sx={{
                width: { xs: "100%", md: "60%" },
                p: { xs: 3, md: 4 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                color: textColor,
                overflow: "auto",
              }}
            >
              {/* Login form - more compact */}
              {loginMethod === "email" && (
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
                    }}
                  >
                    <Box
                      sx={{
                        mb: 3,
                        position: "relative",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: -8,
                          left: 0,
                          width: "100%",
                          height: "2px",
                          background: `linear-gradient(90deg, transparent, ${alpha(
                            primaryColor,
                            0.5
                          )}, transparent)`,
                          opacity: 0.7,
                        },
                      }}
                    >
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
                              <AlternateEmail
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
                            border: "none",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: alpha(textColor, 0.1),
                              transition: "all 0.3s ease",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: alpha(textColor, 0.2),
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: primaryColor,
                              boxShadow: `0 0 0 2px ${alpha(
                                primaryColor,
                                0.2
                              )}`,
                            },
                            py: 1.2,
                            color: textColor,
                            transition: "all 0.3s ease",
                          },
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        mb: 2,
                        position: "relative",
                      }}
                    >
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
                              <LockOutlined
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
                                  transition: "all 0.2s ease",
                                  "&:hover": {
                                    color: primaryColor,
                                    transform: "scale(1.05)",
                                  },
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
                            border: "none",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: alpha(textColor, 0.1),
                              transition: "all 0.3s ease",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: alpha(textColor, 0.2),
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: primaryColor,
                              boxShadow: `0 0 0 2px ${alpha(
                                primaryColor,
                                0.2
                              )}`,
                            },
                            py: 1.2,
                            color: textColor,
                            transition: "all 0.3s ease",
                          },
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mb: 4,
                      }}
                    >
                      <Link
                        component={RouterLink}
                        to="/forgot-password"
                        sx={{
                          color: primaryColor,
                          textDecoration: "none",
                          fontSize: "14px",
                          fontWeight: 600,
                          position: "relative",
                          padding: "2px 4px",
                          borderRadius: "4px",
                          transition: "all 0.2s ease-in-out",
                          "&:hover": {
                            backgroundColor: alpha(primaryColor, 0.08),
                            transform: "translateY(-1px)",
                          },
                          "&:after": {
                            content: '""',
                            position: "absolute",
                            width: "0%",
                            height: "2px",
                            bottom: 0,
                            left: "50%",
                            backgroundColor: primaryColor,
                            transition: "all 0.3s ease",
                          },
                          "&:hover:after": {
                            width: "100%",
                            left: 0,
                          },
                        }}
                      >
                        Forgot password?
                      </Link>
                    </Box>

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
                        "Sign in"
                      )}
                    </Button>
                  </Box>
                </Fade>
              )}

              {/* Divider - more compact */}
              <Box sx={{ my: 3 }}>
                <Divider>
                  <Chip
                    label="Or continue with"
                    sx={{
                      backgroundColor: alpha(
                        darkMode ? "#1e293b" : "#f1f5f9",
                        darkMode ? 0.4 : 0.7
                      ),
                      color: subtleTextColor,
                      fontWeight: 500,
                      fontSize: "12px",
                    }}
                  />
                </Divider>
              </Box>

              {/* Social login buttons - more compact */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    py: 0.75,
                    px: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    borderColor: alpha(textColor, 0.1),
                    color: textColor,
                    bgcolor: alpha(
                      darkMode ? "#1e293b" : "#f1f5f9",
                      darkMode ? 0.2 : 0.3
                    ),
                    "&:hover": {
                      borderColor: alpha(textColor, 0.3),
                      backgroundColor: alpha(textColor, 0.05),
                    },
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    component="img"
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google"
                    sx={{ width: 18, height: 18 }}
                  />
                  Google
                </Button>
              </Box>

              {/* Sign up link */}
              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Typography variant="body2" color={subtleTextColor}>
                  Don't have an account?{" "}
                  <Link
                    component={RouterLink}
                    to="/register"
                    sx={{
                      color: primaryColor,
                      textDecoration: "none",
                      fontWeight: 600,
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Create an account
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

export default Login;
