import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch,
  Avatar,
  Rating,
  Divider,
  IconButton,
  Tabs,
  Tab,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  InputAdornment,
  Snackbar,
  Alert,
  useTheme,
  ListItemIcon,
} from "@mui/material";
import {
  Close,
  CompareArrows,
  Security,
  Notifications,
  Palette,
  Add,
  Edit,
  Person,
  ShoppingBag,
  Star,
  Favorite,
  Settings,
  Email,
  Phone,
  LocationOn,
  PhotoCamera,
  Save,
} from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import Layout from "../components/layout/Layout";
import Footer from "../components/layout/Footer";

// Utility function to format dates
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Utility function to get status color
const getStatusColor = (status, theme) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return theme.palette.warning.main;
    case "accepted":
    case "completed":
    case "delivered":
    case "shipped":
      return theme.palette.success.main;
    case "rejected":
    case "cancelled":
      return theme.palette.error.main;
    case "processing":
      return theme.palette.info.main;
    case "active":
      return theme.palette.success.main;
    case "sold":
    case "exchanged":
      return theme.palette.info.main;
    case "inactive":
      return theme.palette.text.disabled;
    default:
      return theme.palette.text.primary;
  }
};

const Profile = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [reviewsTabValue, setReviewsTabValue] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Mock user data
  const userData = {
    firstName: "Ngo Xuan",
    lastName: "Toan",
    email: "toannxse171297@fpt.edu.vn",
    phone: "0786485999",
    address: "FPT University HCMC",
    bio: "Tech enthusiast and gadget collector. I love finding unique items and trading with fellow enthusiasts.",
    avatar:
      "https://i.pinimg.com/736x/41/06/b3/4106b37e6f8483a756ab76fc1531af16.jpg",
    exchangeCount: 47,
    purchaseCount: 32,
    averageRating: 4.8,
  };

  const [formData, setFormData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
    address: userData.address,
    bio: userData.bio,
    website: userData.website,
    facebook: userData.facebook,
    twitter: userData.twitter,
    notificationsEnabled: true,
    darkModeEnabled: false,
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleOpenEditDialog = () => {
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSwitchChange = (event) => {
    const { name, checked } = event.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSaveProfile = () => {
    // Simulate saving profile
    setEditDialogOpen(false);
    setSnackbarMessage("Profile updated successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        bgcolor: "#0f172a",
        minHeight: "100vh",
        color: "white",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "5%",
          right: "10%",
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0) 70%)",
          filter: "blur(50px)",
          zIndex: 0,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: "250px",
          height: "250px",
          background:
            "radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, rgba(147, 51, 234, 0) 70%)",
          filter: "blur(60px)",
          zIndex: 0,
        },
      }}
    >
      <Layout>
        <Container
          maxWidth="lg"
          sx={{ py: 5, position: "relative", zIndex: 1 }}
        >
          <Grid container spacing={4}>
            {/* Left Column - Profile Card */}
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 4,
                  borderRadius: 3,
                  height: "100%",
                  bgcolor: "rgba(15, 23, 42, 0.7)",
                  border: "1px solid rgba(99, 102, 241, 0.15)",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                  backdropFilter: "blur(16px)",
                  color: "white",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "120px",
                    background:
                      "linear-gradient(90deg, rgba(63, 81, 181, 0.15), rgba(99, 102, 241, 0.2))",
                    borderRadius: "16px 16px 0 0",
                    zIndex: 0,
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <Avatar
                    src={userData.avatar}
                    alt={`${userData.firstName} ${userData.lastName}`}
                    sx={{
                      width: 130,
                      height: 130,
                      border: `4px solid rgba(99, 102, 241, 0.6)`,
                      boxShadow: "0 0 25px rgba(99, 102, 241, 0.5)",
                      mt: 1,
                      mb: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 0 35px rgba(99, 102, 241, 0.7)",
                      },
                    }}
                  />

                  <Typography
                    variant="h5"
                    sx={{
                      mt: 1,
                      fontWeight: 600,
                      color: "white",
                      textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                    }}
                  >
                    {userData.firstName} {userData.lastName}
                  </Typography>

                  <Button
                    variant="contained"
                    startIcon={<Edit />}
                    onClick={handleOpenEditDialog}
                    sx={{
                      mt: 3,
                      mb: 1,
                      borderRadius: 6,
                      padding: "10px 24px",
                      background: "linear-gradient(90deg, #3f51b5, #6366f1)",
                      boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)",
                      textTransform: "none",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "linear-gradient(90deg, #3949ab, #5a5fe6)",
                        boxShadow: "0 6px 20px rgba(99, 102, 241, 0.6)",
                        transform: "translateY(-2px)",
                      },
                      "&:active": {
                        transform: "translateY(1px)",
                      },
                    }}
                  >
                    Edit Profile
                  </Button>
                </Box>

                <Divider
                  sx={{
                    my: 3,
                    borderColor: "rgba(99, 102, 241, 0.2)",
                    opacity: 0.6,
                  }}
                />

                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  gutterBottom
                  sx={{
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 4,
                      height: 20,
                      backgroundColor: "#6366f1",
                      display: "inline-block",
                      mr: 1.5,
                      borderRadius: 4,
                    }}
                  />
                  Contact Information
                </Typography>

                <List dense sx={{ mt: 1 }}>
                  <ListItem
                    sx={{
                      py: 1.2,
                      px: 1,
                      transition: "all 0.2s ease",
                      borderRadius: 2,
                      "&:hover": {
                        backgroundColor: "rgba(99, 102, 241, 0.08)",
                      },
                    }}
                  >
                    <ListItemIcon>
                      <Email
                        fontSize="small"
                        sx={{
                          color: "#6366f1",
                          filter:
                            "drop-shadow(0 0 3px rgba(99, 102, 241, 0.3))",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={userData.email}
                      primaryTypographyProps={{
                        sx: {
                          color: "white",
                          fontSize: "0.9rem",
                          fontWeight: 500,
                        },
                      }}
                    />
                  </ListItem>

                  <ListItem
                    sx={{
                      py: 1.2,
                      px: 1,
                      transition: "all 0.2s ease",
                      borderRadius: 2,
                      "&:hover": {
                        backgroundColor: "rgba(99, 102, 241, 0.08)",
                      },
                    }}
                  >
                    <ListItemIcon>
                      <Phone
                        fontSize="small"
                        sx={{
                          color: "#6366f1",
                          filter:
                            "drop-shadow(0 0 3px rgba(99, 102, 241, 0.3))",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={userData.phone}
                      primaryTypographyProps={{
                        sx: {
                          color: "white",
                          fontSize: "0.9rem",
                          fontWeight: 500,
                        },
                      }}
                    />
                  </ListItem>

                  <ListItem
                    sx={{
                      py: 1.2,
                      px: 1,
                      transition: "all 0.2s ease",
                      borderRadius: 2,
                      "&:hover": {
                        backgroundColor: "rgba(99, 102, 241, 0.08)",
                      },
                    }}
                  >
                    <ListItemIcon>
                      <LocationOn
                        fontSize="small"
                        sx={{
                          color: "#6366f1",
                          filter:
                            "drop-shadow(0 0 3px rgba(99, 102, 241, 0.3))",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={userData.address}
                      primaryTypographyProps={{
                        sx: {
                          color: "white",
                          fontSize: "0.9rem",
                          fontWeight: 500,
                        },
                      }}
                    />
                  </ListItem>
                </List>

                <Divider
                  sx={{
                    my: 2.5,
                    borderColor: "rgba(99, 102, 241, 0.2)",
                    opacity: 0.6,
                  }}
                />

                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  gutterBottom
                  sx={{
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 4,
                      height: 20,
                      backgroundColor: "#6366f1",
                      display: "inline-block",
                      mr: 1.5,
                      borderRadius: 4,
                    }}
                  />
                  Stats
                </Typography>

                <Grid container spacing={2} sx={{ mt: 0.5 }}>
                  <Grid item xs={6}>
                    <Paper
                      sx={{
                        p: 2,
                        textAlign: "center",
                        bgcolor: "rgba(30, 41, 59, 0.6)",
                        border: "1px solid rgba(99, 102, 241, 0.2)",
                        borderRadius: 3,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-3px)",
                          boxShadow: "0 5px 15px rgba(99, 102, 241, 0.2)",
                        },
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          background:
                            "linear-gradient(90deg, #6366f1, #a78bfa)",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontWeight: 700,
                          fontSize: "1.5rem",
                        }}
                      >
                        {userData.exchangeCount}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255, 255, 255, 0.7)",
                          fontWeight: 500,
                          mt: 0.5,
                        }}
                      >
                        Exchanges
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={6}>
                    <Paper
                      sx={{
                        p: 2,
                        textAlign: "center",
                        bgcolor: "rgba(30, 41, 59, 0.6)",
                        border: "1px solid rgba(99, 102, 241, 0.2)",
                        borderRadius: 3,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-3px)",
                          boxShadow: "0 5px 15px rgba(99, 102, 241, 0.2)",
                        },
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          background:
                            "linear-gradient(90deg, #6366f1, #a78bfa)",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontWeight: 700,
                          fontSize: "1.5rem",
                        }}
                      >
                        {userData.purchaseCount}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255, 255, 255, 0.7)",
                          fontWeight: 500,
                          mt: 0.5,
                        }}
                      >
                        Purchases
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Right Column - Bio and Tabs */}
            <Grid item xs={12} md={8}>
              <Paper
                sx={{
                  p: 4,
                  borderRadius: 3,
                  mb: 4,
                  bgcolor: "rgba(15, 23, 42, 0.7)",
                  border: "1px solid rgba(99, 102, 241, 0.15)",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                  backdropFilter: "blur(16px)",
                  color: "white",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "5px",
                    background:
                      "linear-gradient(90deg, #3f51b5, #6366f1, #a78bfa)",
                    borderRadius: "3px 3px 0 0",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={600}
                  gutterBottom
                  sx={{
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 4,
                      height: 22,
                      backgroundColor: "#6366f1",
                      display: "inline-block",
                      mr: 1.5,
                      borderRadius: 4,
                    }}
                  />
                  About Me
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    color: "rgba(255, 255, 255, 0.9)",
                    lineHeight: 1.7,
                    pl: 2.5,
                    mt: 2,
                  }}
                >
                  {userData.bio}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        {/* Edit Profile Dialog */}
        <Dialog
          open={editDialogOpen}
          onClose={handleCloseEditDialog}
          maxWidth="md"
          fullWidth
          PaperProps={{
            style: {
              backgroundColor: "#0f172a",
              color: "white",
              border: "1px solid rgba(99, 102, 241, 0.2)",
              borderRadius: "16px",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
            },
          }}
        >
          <DialogTitle>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "white",
                p: 1,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Edit Profile
              </Typography>
              <IconButton
                onClick={handleCloseEditDialog}
                sx={{
                  color: "white",
                  backgroundColor: "rgba(99, 102, 241, 0.1)",
                  "&:hover": {
                    backgroundColor: "rgba(99, 102, 241, 0.2)",
                  },
                }}
              >
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>

          <DialogContent
            dividers
            sx={{
              borderColor: "rgba(99, 102, 241, 0.2)",
              px: 3,
              py: 2,
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
                <Avatar
                  src={userData.avatar}
                  alt={`${userData.firstName} ${userData.lastName}`}
                  sx={{
                    width: 150,
                    height: 150,
                    mx: "auto",
                    mb: 2,
                    border: `4px solid ${theme.palette.background.paper}`,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  }}
                />
                <Button variant="outlined" startIcon={<PhotoCamera />}>
                  Change Photo
                </Button>

                <Box sx={{ mt: 4 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    gutterBottom
                    align="left"
                    sx={{ color: "white" }}
                  >
                    Social Media Profiles
                  </Typography>

                  <TextField
                    fullWidth
                    label="Website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    margin="normal"
                    sx={{ color: "white" }}
                  />

                  <TextField
                    fullWidth
                    label="Facebook"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleInputChange}
                    margin="normal"
                    sx={{ color: "white" }}
                  />

                  <TextField
                    fullWidth
                    label="Twitter"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    margin="normal"
                    sx={{ color: "white" }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={8}>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  gutterBottom
                  sx={{ color: "white" }}
                >
                  Personal Information
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      margin="normal"
                      required
                      sx={{ color: "white" }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      margin="normal"
                      required
                      sx={{ color: "white" }}
                    />
                  </Grid>
                </Grid>

                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  sx={{ color: "white" }}
                />

                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  margin="normal"
                  sx={{ color: "white" }}
                />

                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  margin="normal"
                  sx={{ color: "white" }}
                />

                <TextField
                  fullWidth
                  label="Bio"
                  name="bio"
                  multiline
                  rows={4}
                  value={formData.bio}
                  onChange={handleInputChange}
                  margin="normal"
                  placeholder="Tell others about yourself..."
                  sx={{ color: "white" }}
                />

                <Box sx={{ mt: 3 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    gutterBottom
                    sx={{ color: "white" }}
                  >
                    Preferences
                  </Typography>

                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.notificationsEnabled}
                        onChange={handleSwitchChange}
                        name="notificationsEnabled"
                        color="primary"
                      />
                    }
                    label="Enable email notifications"
                    sx={{ color: "white" }}
                  />

                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.darkModeEnabled}
                        onChange={handleSwitchChange}
                        name="darkModeEnabled"
                        color="primary"
                      />
                    }
                    label="Enable dark mode"
                    sx={{ color: "white" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ p: 2.5 }}>
            <Button
              onClick={handleCloseEditDialog}
              sx={{
                color: "white",
                borderRadius: 6,
                px: 3,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveProfile}
              variant="contained"
              sx={{
                background: "linear-gradient(90deg, #3f51b5, #6366f1)",
                borderRadius: 6,
                px: 3,
                py: 1,
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(90deg, #3949ab, #5a5fe6)",
                  boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)",
                },
              }}
              startIcon={<Save />}
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: "100%", backgroundColor: "#0f172a", color: "white" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Layout>
    </Box>
  );
};

export default Profile;
