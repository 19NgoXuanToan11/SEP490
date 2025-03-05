import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Divider,
  Switch,
  FormControlLabel,
  FormGroup,
  Card,
  CardContent,
  CardHeader,
  Alert,
  Snackbar,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
} from "@mui/material";
import {
  Save,
  Add,
  Delete,
  Edit,
  Refresh,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import AdminLayout from "../../components/admin/AdminLayout";

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [settings, setSettings] = useState({
    siteName: "",
    siteDescription: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    enableRegistration: true,
    enableExchanges: true,
    enablePurchases: true,
    maintenanceMode: false,
    commissionRate: 5,
    minExchangeValue: 10,
    maxImagesPerProduct: 5,
    featuredCategories: [],
  });

  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        // Here you would fetch settings from your API
        // For now, we'll use mock data
        setTimeout(() => {
          const mockSettings = {
            siteName: "ReTech",
            siteDescription:
              "A platform for buying, selling, and exchanging tech products",
            contactEmail: "contact@retech.com",
            contactPhone: "+1 (123) 456-7890",
            address: "123 Tech Street, San Francisco, CA 94107",
            enableRegistration: true,
            enableExchanges: true,
            enablePurchases: true,
            maintenanceMode: false,
            commissionRate: 5,
            minExchangeValue: 10,
            maxImagesPerProduct: 5,
            featuredCategories: [
              "Smartphones",
              "Laptops",
              "Tablets",
              "Audio",
              "Cameras",
            ],
          };

          setSettings(mockSettings);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching settings:", error);
        setError("Failed to load settings. Please try again.");
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSettingChange = (event) => {
    const { name, value, checked } = event.target;
    setSettings({
      ...settings,
      [name]: event.target.type === "checkbox" ? checked : value,
    });
  };

  const handleNumberSettingChange = (event) => {
    const { name, value } = event.target;
    setSettings({
      ...settings,
      [name]: Number(value),
    });
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      // Here you would save settings to your API
      // For now, we'll simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess("Settings saved successfully!");
      setSaving(false);
    } catch (error) {
      console.error("Error saving settings:", error);
      setError("Failed to save settings. Please try again.");
      setSaving(false);
    }
  };

  const handleAddCategory = () => {
    if (
      newCategory.trim() &&
      !settings.featuredCategories.includes(newCategory.trim())
    ) {
      setSettings({
        ...settings,
        featuredCategories: [
          ...settings.featuredCategories,
          newCategory.trim(),
        ],
      });
      setNewCategory("");
      setCategoryDialogOpen(false);
    }
  };

  const handleRemoveCategory = (category) => {
    setSettings({
      ...settings,
      featuredCategories: settings.featuredCategories.filter(
        (c) => c !== category
      ),
    });
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    setSaving(true);
    try {
      // Here you would update the password via your API
      // For now, we'll simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess("Password updated successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordDialogOpen(false);
      setSaving(false);
    } catch (error) {
      console.error("Error updating password:", error);
      setError("Failed to update password. Please try again.");
      setSaving(false);
    }
  };

  const handlePasswordInputChange = (event) => {
    const { name, value } = event.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleCloseSnackbar = () => {
    setSuccess("");
    setError("");
  };

  return (
    <AdminLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Settings
        </Typography>

        <Snackbar
          open={!!success}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            {success}
          </Alert>
        </Snackbar>

        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="General Settings" />
                <Divider />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Site Name"
                        name="siteName"
                        value={settings.siteName}
                        onChange={handleSettingChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Site Description"
                        name="siteDescription"
                        value={settings.siteDescription}
                        onChange={handleSettingChange}
                        multiline
                        rows={2}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Contact Email"
                        name="contactEmail"
                        type="email"
                        value={settings.contactEmail}
                        onChange={handleSettingChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Contact Phone"
                        name="contactPhone"
                        value={settings.contactPhone}
                        onChange={handleSettingChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Address"
                        name="address"
                        value={settings.address}
                        onChange={handleSettingChange}
                        multiline
                        rows={2}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Platform Settings" />
                <Divider />
                <CardContent>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.enableRegistration}
                          onChange={handleSettingChange}
                          name="enableRegistration"
                        />
                      }
                      label="Enable User Registration"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.enableExchanges}
                          onChange={handleSettingChange}
                          name="enableExchanges"
                        />
                      }
                      label="Enable Product Exchanges"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.enablePurchases}
                          onChange={handleSettingChange}
                          name="enablePurchases"
                        />
                      }
                      label="Enable Product Purchases"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.maintenanceMode}
                          onChange={handleSettingChange}
                          name="maintenanceMode"
                        />
                      }
                      label="Maintenance Mode"
                    />
                  </FormGroup>

                  <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Commission Rate (%)"
                          name="commissionRate"
                          type="number"
                          value={settings.commissionRate}
                          onChange={handleNumberSettingChange}
                          InputProps={{
                            inputProps: { min: 0, max: 100 },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Min Exchange Value ($)"
                          name="minExchangeValue"
                          type="number"
                          value={settings.minExchangeValue}
                          onChange={handleNumberSettingChange}
                          InputProps={{
                            inputProps: { min: 0 },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Max Images Per Product"
                          name="maxImagesPerProduct"
                          type="number"
                          value={settings.maxImagesPerProduct}
                          onChange={handleNumberSettingChange}
                          InputProps={{
                            inputProps: { min: 1, max: 10 },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader
                  title="Featured Categories"
                  action={
                    <Button
                      startIcon={<Add />}
                      onClick={() => setCategoryDialogOpen(true)}
                    >
                      Add
                    </Button>
                  }
                />
                <Divider />
                <CardContent>
                  <List>
                    {settings.featuredCategories.map((category, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={category} />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            onClick={() => handleRemoveCategory(category)}
                          >
                            <Delete />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Security" />
                <Divider />
                <CardContent>
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={() => setPasswordDialogOpen(true)}
                    sx={{ mb: 2 }}
                  >
                    Change Admin Password
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<Refresh />}
                    sx={{ ml: 2, mb: 2 }}
                  >
                    Regenerate API Keys
                  </Button>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 2 }}
                  >
                    Last password change: 2023-06-15
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Save />}
                  onClick={handleSaveSettings}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Settings"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}

        {/* Add Category Dialog */}
        <Dialog
          open={categoryDialogOpen}
          onClose={() => setCategoryDialogOpen(false)}
        >
          <DialogTitle>Add Featured Category</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Category Name"
              fullWidth
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCategoryDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddCategory} variant="contained">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Change Password Dialog */}
        <Dialog
          open={passwordDialogOpen}
          onClose={() => setPasswordDialogOpen(false)}
        >
          <DialogTitle>Change Admin Password</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Current Password"
              name="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              fullWidth
              value={passwordData.currentPassword}
              onChange={handlePasswordInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      edge="end"
                    >
                      {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="New Password"
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              fullWidth
              value={passwordData.newPassword}
              onChange={handlePasswordInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              fullWidth
              value={passwordData.confirmPassword}
              onChange={handlePasswordInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPasswordDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handlePasswordChange}
              variant="contained"
              disabled={
                saving ||
                !passwordData.currentPassword ||
                !passwordData.newPassword ||
                !passwordData.confirmPassword
              }
            >
              {saving ? "Updating..." : "Update Password"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </AdminLayout>
  );
};

export default Settings;
