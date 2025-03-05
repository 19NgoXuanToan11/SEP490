import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Divider,
  Switch,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  Tabs,
  Tab,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Person,
  Lock,
  Notifications,
  Payment,
  Security,
  Delete,
  Edit,
  Add,
  PhotoCamera,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import Layout from "../components/layout/Layout";

const Settings = () => {
  const [tabValue, setTabValue] = useState(0);
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA",
    bio: "Tech enthusiast and collector of vintage electronics.",
    avatar: "https://via.placeholder.com/150",
    notifications: {
      email: true,
      push: true,
      sms: false,
      newsletter: true,
      productUpdates: true,
      promotions: false,
    },
    paymentMethods: [
      {
        id: 1,
        type: "Credit Card",
        last4: "4242",
        expiry: "12/24",
        default: true,
      },
      { id: 2, type: "PayPal", email: "john.doe@example.com", default: false },
    ],
    securitySettings: {
      twoFactorAuth: false,
      loginAlerts: true,
      recentDevices: [
        {
          id: 1,
          device: "Windows PC",
          location: "New York, USA",
          lastLogin: "2023-06-15 14:30",
        },
        {
          id: 2,
          device: "iPhone 13",
          location: "New York, USA",
          lastLogin: "2023-06-14 09:15",
        },
      ],
    },
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [dialogData, setDialogData] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
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

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
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

  const toggleShowPassword = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setUser({
      ...user,
      notifications: {
        ...user.notifications,
        [name]: checked,
      },
    });
  };

  const handleSecurityChange = (e) => {
    const { name, checked } = e.target;
    setUser({
      ...user,
      securitySettings: {
        ...user.securitySettings,
        [name]: checked,
      },
    });
  };

  const openDialog = (type, data = {}) => {
    setDialogType(type);
    setDialogData(data);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setDialogData({});
  };

  const validateProfileForm = () => {
    const newErrors = {};
    if (!user.firstName.trim()) newErrors.firstName = "First name is required";
    if (!user.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!user.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!user.phone.trim()) newErrors.phone = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    if (!passwordData.currentPassword)
      newErrors.currentPassword = "Current password is required";
    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (validateProfileForm()) {
      // Here you would update the user profile
      setSnackbar({
        open: true,
        message: "Profile updated successfully",
        severity: "success",
      });
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (validatePasswordForm()) {
      // Here you would update the password
      setSnackbar({
        open: true,
        message: "Password changed successfully",
        severity: "success",
      });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  const handleAddPaymentMethod = () => {
    // Here you would add a new payment method
    const newPaymentMethod = {
      id: user.paymentMethods.length + 1,
      type: dialogData.type,
      last4: dialogData.type === "Credit Card" ? dialogData.last4 : "",
      expiry: dialogData.type === "Credit Card" ? dialogData.expiry : "",
      email: dialogData.type === "PayPal" ? dialogData.email : "",
      default: user.paymentMethods.length === 0,
    };

    setUser({
      ...user,
      paymentMethods: [...user.paymentMethods, newPaymentMethod],
    });

    setSnackbar({
      open: true,
      message: "Payment method added successfully",
      severity: "success",
    });

    closeDialog();
  };

  const handleSetDefaultPaymentMethod = (id) => {
    const updatedPaymentMethods = user.paymentMethods.map((method) => ({
      ...method,
      default: method.id === id,
    }));

    setUser({
      ...user,
      paymentMethods: updatedPaymentMethods,
    });

    setSnackbar({
      open: true,
      message: "Default payment method updated",
      severity: "success",
    });
  };

  const handleDeletePaymentMethod = (id) => {
    const updatedPaymentMethods = user.paymentMethods.filter(
      (method) => method.id !== id
    );

    // If we're deleting the default method, set a new default
    if (
      user.paymentMethods.find((method) => method.id === id)?.default &&
      updatedPaymentMethods.length > 0
    ) {
      updatedPaymentMethods[0].default = true;
    }

    setUser({
      ...user,
      paymentMethods: updatedPaymentMethods,
    });

    setSnackbar({
      open: true,
      message: "Payment method removed",
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const renderDialog = () => {
    switch (dialogType) {
      case "avatar":
        return (
          <Dialog open={dialogOpen} onClose={closeDialog}>
            <DialogTitle>Update Profile Picture</DialogTitle>
            <DialogContent>
              <Box sx={{ textAlign: "center", my: 2 }}>
                <Avatar
                  src={user.avatar}
                  alt={`${user.firstName} ${user.lastName}`}
                  sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
                />
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<PhotoCamera />}
                >
                  Upload Photo
                  <input type="file" hidden accept="image/*" />
                </Button>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog}>Cancel</Button>
              <Button onClick={closeDialog} variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        );

      case "payment":
        return (
          <Dialog open={dialogOpen} onClose={closeDialog}>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogContent>
              <FormControl fullWidth margin="normal">
                <InputLabel>Payment Type</InputLabel>
                <Select
                  value={dialogData.type || ""}
                  onChange={(e) =>
                    setDialogData({ ...dialogData, type: e.target.value })
                  }
                  label="Payment Type"
                >
                  <MenuItem value="Credit Card">Credit Card</MenuItem>
                  <MenuItem value="PayPal">PayPal</MenuItem>
                </Select>
              </FormControl>

              {dialogData.type === "Credit Card" && (
                <>
                  <TextField
                    fullWidth
                    label="Card Number"
                    margin="normal"
                    placeholder="XXXX XXXX XXXX XXXX"
                    onChange={(e) =>
                      setDialogData({
                        ...dialogData,
                        last4: e.target.value.slice(-4),
                      })
                    }
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Expiry Date"
                        margin="normal"
                        placeholder="MM/YY"
                        onChange={(e) =>
                          setDialogData({
                            ...dialogData,
                            expiry: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="CVV"
                        margin="normal"
                        placeholder="XXX"
                        type="password"
                      />
                    </Grid>
                  </Grid>
                </>
              )}

              {dialogData.type === "PayPal" && (
                <TextField
                  fullWidth
                  label="PayPal Email"
                  margin="normal"
                  type="email"
                  onChange={(e) =>
                    setDialogData({ ...dialogData, email: e.target.value })
                  }
                />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog}>Cancel</Button>
              <Button
                onClick={handleAddPaymentMethod}
                variant="contained"
                disabled={!dialogData.type}
              >
                Add Payment Method
              </Button>
            </DialogActions>
          </Dialog>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Account Settings
        </Typography>

        <Paper sx={{ mt: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tab icon={<Person />} label="Profile" />
            <Tab icon={<Lock />} label="Password" />
            <Tab icon={<Notifications />} label="Notifications" />
            <Tab icon={<Payment />} label="Payment Methods" />
            <Tab icon={<Security />} label="Security" />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {/* Profile Tab */}
            {tabValue === 0 && (
              <Box component="form" onSubmit={handleProfileSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
                    <Avatar
                      src={user.avatar}
                      alt={`${user.firstName} ${user.lastName}`}
                      sx={{ width: 150, height: 150, mx: "auto", mb: 2 }}
                    />
                    <Button
                      variant="outlined"
                      onClick={() => openDialog("avatar")}
                      startIcon={<Edit />}
                    >
                      Change Photo
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="First Name"
                          name="firstName"
                          value={user.firstName}
                          onChange={handleUserChange}
                          error={!!errors.firstName}
                          helperText={errors.firstName}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Last Name"
                          name="lastName"
                          value={user.lastName}
                          onChange={handleUserChange}
                          error={!!errors.lastName}
                          helperText={errors.lastName}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={user.email}
                          onChange={handleUserChange}
                          error={!!errors.email}
                          helperText={errors.email}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Phone"
                          name="phone"
                          value={user.phone}
                          onChange={handleUserChange}
                          error={!!errors.phone}
                          helperText={errors.phone}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Address"
                          name="address"
                          value={user.address}
                          onChange={handleUserChange}
                          multiline
                          rows={2}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Bio"
                          name="bio"
                          value={user.bio}
                          onChange={handleUserChange}
                          multiline
                          rows={4}
                          placeholder="Tell us about yourself..."
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                  >
                    <Button type="submit" variant="contained">
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Password Tab */}
            {tabValue === 1 && (
              <Box component="form" onSubmit={handlePasswordSubmit}>
                <Typography variant="h6" gutterBottom>
                  Change Password
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Current Password"
                      name="currentPassword"
                      type={showPassword.currentPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      error={!!errors.currentPassword}
                      helperText={errors.currentPassword}
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                toggleShowPassword("currentPassword")
                              }
                              edge="end"
                            >
                              {showPassword.currentPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="New Password"
                      name="newPassword"
                      type={showPassword.newPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      error={!!errors.newPassword}
                      helperText={errors.newPassword}
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => toggleShowPassword("newPassword")}
                              edge="end"
                            >
                              {showPassword.newPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Confirm New Password"
                      name="confirmPassword"
                      type={showPassword.confirmPassword ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword}
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                toggleShowPassword("confirmPassword")
                              }
                              edge="end"
                            >
                              {showPassword.confirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Alert severity="info" sx={{ mb: 2 }}>
                      Your password should be at least 8 characters long and
                      include a mix of letters, numbers, and special characters.
                    </Alert>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button type="submit" variant="contained">
                      Change Password
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Notifications Tab */}
            {tabValue === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Notification Preferences
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Manage how you receive notifications and updates from ReTech.
                </Typography>

                <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Email Notifications
                  </Typography>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={user.notifications.email}
                          onChange={handleNotificationChange}
                          name="email"
                        />
                      }
                      label="Receive email notifications"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={user.notifications.newsletter}
                          onChange={handleNotificationChange}
                          name="newsletter"
                          disabled={!user.notifications.email}
                        />
                      }
                      label="Subscribe to newsletter"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={user.notifications.productUpdates}
                          onChange={handleNotificationChange}
                          name="productUpdates"
                          disabled={!user.notifications.email}
                        />
                      }
                      label="Product updates and new listings"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={user.notifications.promotions}
                          onChange={handleNotificationChange}
                          name="promotions"
                          disabled={!user.notifications.email}
                        />
                      }
                      label="Promotions and special offers"
                    />
                  </FormGroup>
                </Paper>

                <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Push Notifications
                  </Typography>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={user.notifications.push}
                          onChange={handleNotificationChange}
                          name="push"
                        />
                      }
                      label="Receive push notifications"
                    />
                  </FormGroup>
                </Paper>

                <Paper variant="outlined" sx={{ p: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    SMS Notifications
                  </Typography>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={user.notifications.sms}
                          onChange={handleNotificationChange}
                          name="sms"
                        />
                      }
                      label="Receive SMS notifications"
                    />
                  </FormGroup>
                  {user.notifications.sms && (
                    <TextField
                      fullWidth
                      label="Phone Number"
                      value={user.phone}
                      disabled
                      sx={{ mt: 2 }}
                      helperText="This is the phone number we'll use for SMS notifications."
                    />
                  )}
                </Paper>

                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}
                >
                  <Button variant="contained">Save Preferences</Button>
                </Box>
              </Box>
            )}

            {/* Payment Methods Tab */}
            {tabValue === 3 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Payment Methods
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Manage your payment methods for purchases on ReTech.
                </Typography>

                {user.paymentMethods.length === 0 ? (
                  <Paper variant="outlined" sx={{ p: 3, textAlign: "center" }}>
                    <Typography variant="body1" paragraph>
                      You don't have any payment methods saved yet.
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      onClick={() => openDialog("payment")}
                    >
                      Add Payment Method
                    </Button>
                  </Paper>
                ) : (
                  <>
                    <List>
                      {user.paymentMethods.map((method) => (
                        <Paper
                          key={method.id}
                          variant="outlined"
                          sx={{ mb: 2 }}
                        >
                          <ListItem>
                            <ListItemText
                              primary={
                                <Box
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  <Typography variant="subtitle1">
                                    {method.type}
                                    {method.default && (
                                      <Chip
                                        label="Default"
                                        size="small"
                                        color="primary"
                                        sx={{ ml: 1 }}
                                      />
                                    )}
                                  </Typography>
                                </Box>
                              }
                              secondary={
                                method.type === "Credit Card"
                                  ? `•••• •••• •••• ${method.last4} | Expires: ${method.expiry}`
                                  : method.email
                              }
                            />
                            <ListItemSecondaryAction>
                              {!method.default && (
                                <Button
                                  size="small"
                                  onClick={() =>
                                    handleSetDefaultPaymentMethod(method.id)
                                  }
                                  sx={{ mr: 1 }}
                                >
                                  Set as Default
                                </Button>
                              )}
                              <IconButton
                                edge="end"
                                color="error"
                                onClick={() =>
                                  handleDeletePaymentMethod(method.id)
                                }
                              >
                                <Delete />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        </Paper>
                      ))}
                    </List>
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="outlined"
                        startIcon={<Add />}
                        onClick={() => openDialog("payment")}
                      >
                        Add Payment Method
                      </Button>
                    </Box>
                  </>
                )}
              </Box>
            )}

            {/* Security Tab */}
            {tabValue === 4 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Security Settings
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Manage your account security and privacy settings.
                </Typography>

                <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Two-Factor Authentication
                  </Typography>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={user.securitySettings.twoFactorAuth}
                          onChange={handleSecurityChange}
                          name="twoFactorAuth"
                        />
                      }
                      label="Enable Two-Factor Authentication"
                    />
                  </FormGroup>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Two-factor authentication adds an extra layer of security to
                    your account by requiring a verification code in addition to
                    your password.
                  </Typography>
                  {!user.securitySettings.twoFactorAuth && (
                    <Button
                      variant="outlined"
                      sx={{ mt: 2 }}
                      onClick={() => {
                        setUser({
                          ...user,
                          securitySettings: {
                            ...user.securitySettings,
                            twoFactorAuth: true,
                          },
                        });
                        setSnackbar({
                          open: true,
                          message: "Two-factor authentication enabled",
                          severity: "success",
                        });
                      }}
                    >
                      Enable
                    </Button>
                  )}
                </Paper>

                <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Login Alerts
                  </Typography>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={user.securitySettings.loginAlerts}
                          onChange={handleSecurityChange}
                          name="loginAlerts"
                        />
                      }
                      label="Receive alerts for new login attempts"
                    />
                  </FormGroup>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    We'll send you an email when someone logs into your account
                    from a new device or location.
                  </Typography>
                </Paper>

                <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Recent Devices
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    These are the devices that have recently accessed your
                    account.
                  </Typography>
                  <List>
                    {user.securitySettings.recentDevices.map((device) => (
                      <ListItem key={device.id} divider>
                        <ListItemText
                          primary={device.device}
                          secondary={`${device.location} • Last login: ${device.lastLogin}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>

                <Paper variant="outlined" sx={{ p: 3, bgcolor: "error.light" }}>
                  <Typography variant="subtitle1" gutterBottom color="error">
                    Danger Zone
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Permanently delete your account and all associated data.
                    This action cannot be undone.
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => {
                      setSnackbar({
                        open: true,
                        message: "Account deletion is disabled in this demo",
                        severity: "info",
                      });
                    }}
                  >
                    Delete Account
                  </Button>
                </Paper>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>

      {renderDialog()}

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

export default Settings;
