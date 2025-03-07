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
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    bio: "Tech enthusiast and gadget collector. I love finding unique items and trading with fellow enthusiasts.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    website: "https://johndoe.com",
    facebook: "johndoe",
    twitter: "johndoe",
    memberSince: "2021-06-15",
    exchangeCount: 47,
    purchaseCount: 32,
    reviewCount: 29,
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
    <Layout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>

        <Grid container spacing={3}>
          {/* Left Column - Profile Card */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 2, height: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={userData.avatar}
                  alt={`${userData.firstName} ${userData.lastName}`}
                  sx={{
                    width: 120,
                    height: 120,
                    border: `4px solid ${theme.palette.background.paper}`,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  }}
                />

                <Typography variant="h5" sx={{ mt: 2, fontWeight: 600 }}>
                  {userData.firstName} {userData.lastName}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                  <Rating
                    value={userData.averageRating}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    ({userData.reviewCount} reviews)
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={handleOpenEditDialog}
                  sx={{ mt: 2, borderRadius: 2 }}
                >
                  Edit Profile
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Contact Information
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <Email fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={userData.email} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Phone fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={userData.phone} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocationOn fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={userData.address} />
                </ListItem>
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Stats
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper
                    sx={{
                      p: 1.5,
                      textAlign: "center",
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                    }}
                  >
                    <Typography variant="h6" color="primary.main">
                      {userData.exchangeCount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Exchanges
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper
                    sx={{
                      p: 1.5,
                      textAlign: "center",
                      bgcolor: alpha(theme.palette.secondary.main, 0.1),
                    }}
                  >
                    <Typography variant="h6" color="secondary.main">
                      {userData.purchaseCount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Purchases
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: alpha(theme.palette.background.default, 0.5),
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Member since {formatDate(userData.memberSince)}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Right Column - Bio and Tabs */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                About Me
              </Typography>
              <Typography variant="body1" paragraph>
                {userData.bio}
              </Typography>
            </Paper>

            {/* Tabs */}
            <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ borderBottom: 1, borderColor: "divider" }}
              >
                <Tab icon={<Person />} label="Overview" />
                <Tab icon={<CompareArrows />} label="Exchanges" />
                <Tab icon={<ShoppingBag />} label="Purchases" />
                <Tab icon={<Star />} label="Reviews" />
                <Tab icon={<Favorite />} label="Favorites" />
                <Tab icon={<Settings />} label="Settings" />
              </Tabs>

              <Box sx={{ p: 3 }}>
                {activeTab === 0 && (
                  <Typography>
                    Overview content will be displayed here
                  </Typography>
                )}
                {activeTab === 1 && (
                  <Typography>
                    Exchanges content will be displayed here
                  </Typography>
                )}
                {activeTab === 2 && (
                  <Typography>
                    Purchases content will be displayed here
                  </Typography>
                )}
                {activeTab === 3 && (
                  <Typography>
                    Reviews content will be displayed here
                  </Typography>
                )}
                {activeTab === 4 && (
                  <Typography>
                    Favorites content will be displayed here
                  </Typography>
                )}
                {activeTab === 5 && (
                  <Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Account Settings
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Paper sx={{ p: 3, borderRadius: 2 }}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            gutterBottom
                          >
                            <Security sx={{ mr: 1, verticalAlign: "middle" }} />
                            Security Settings
                          </Typography>

                          <List>
                            <ListItem>
                              <ListItemText
                                primary="Two-Factor Authentication"
                                secondary="Add an extra layer of security to your account"
                              />
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={formData.twoFactorEnabled}
                                    onChange={handleSwitchChange}
                                    name="twoFactorEnabled"
                                    color="primary"
                                  />
                                }
                                label=""
                              />
                            </ListItem>
                          </List>
                        </Paper>
                      </Grid>

                      <Grid item xs={12}>
                        <Paper sx={{ p: 3, borderRadius: 2 }}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            gutterBottom
                          >
                            <Notifications
                              sx={{ mr: 1, verticalAlign: "middle" }}
                            />
                            Notification Settings
                          </Typography>

                          <List>
                            <ListItem>
                              <ListItemText
                                primary="Email Notifications"
                                secondary="Receive updates and alerts via email"
                              />
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={formData.notificationsEnabled}
                                    onChange={handleSwitchChange}
                                    name="notificationsEnabled"
                                    color="primary"
                                  />
                                }
                                label=""
                              />
                            </ListItem>
                          </List>
                        </Paper>
                      </Grid>

                      <Grid item xs={12}>
                        <Paper sx={{ p: 3, borderRadius: 2 }}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            gutterBottom
                          >
                            <Palette sx={{ mr: 1, verticalAlign: "middle" }} />
                            Appearance
                          </Typography>

                          <List>
                            <ListItem>
                              <ListItemText
                                primary="Dark Mode"
                                secondary="Switch between light and dark themes"
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
                                label=""
                              />
                            </ListItem>
                          </List>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Box>
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
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Edit Profile
            <IconButton onClick={handleCloseEditDialog}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent dividers>
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
                />

                <TextField
                  fullWidth
                  label="Facebook"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleInputChange}
                  margin="normal"
                />

                <TextField
                  fullWidth
                  label="Twitter"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
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
              />

              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                margin="normal"
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
              />

              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
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
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button
            onClick={handleSaveProfile}
            variant="contained"
            color="primary"
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
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default Profile;
