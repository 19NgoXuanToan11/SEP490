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
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import {
  Save,
  Add,
  Delete,
  Edit,
  Refresh,
  Visibility,
  VisibilityOff,
  CloudUpload,
} from "@mui/icons-material";
import AdminLayout from "../../components/admin/AdminLayout";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

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

  const [tabValue, setTabValue] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "ReTech",
    siteDescription: "Buy, Sell & Exchange Used Electronics",
    contactEmail: "contact@retech.com",
    supportPhone: "(123) 456-7890",
    address: "123 Tech Street, San Francisco, CA 94105",
    maintenanceMode: false,
    allowRegistration: true,
    allowGuestCheckout: true,
  });

  // Email Settings
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "notifications@retech.com",
    smtpPassword: "********",
    senderName: "ReTech Support",
    senderEmail: "no-reply@retech.com",
    enableSsl: true,
  });

  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    currency: "USD",
    enablePaypal: true,
    enableStripe: true,
    enableCashOnDelivery: true,
    paypalClientId: "paypal-client-id",
    stripePublicKey: "stripe-public-key",
    stripeSecretKey: "********",
    transactionFee: "2.5",
  });

  // Category Settings
  const [categories, setCategories] = useState([
    { id: 1, name: "Smartphones", slug: "smartphones", active: true },
    { id: 2, name: "Laptops", slug: "laptops", active: true },
    { id: 3, name: "Tablets", slug: "tablets", active: true },
    { id: 4, name: "Accessories", slug: "accessories", active: true },
    { id: 5, name: "Audio", slug: "audio", active: true },
  ]);
  const [categoryDialog, setCategoryDialog] = useState({
    open: false,
    mode: "add", // 'add' or 'edit'
    data: { name: "", slug: "", active: true },
  });

  // Backup Settings
  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: "daily",
    backupRetention: "30",
    lastBackup: "2023-06-01 08:00:00",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        // Here you would fetch settings from your API
        // For now, we'll use mock data
        setTimeout(() => {
          const mockSettings = {
            siteName: "ReTech",
            siteDescription: "Buy, Sell & Exchange Used Electronics",
            contactEmail: "contact@retech.com",
            contactPhone: "(123) 456-7890",
            address: "123 Tech Street, San Francisco, CA 94105",
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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleGeneralSettingsChange = (e) => {
    const { name, value, checked } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]:
        name === "maintenanceMode" ||
        name === "allowRegistration" ||
        name === "allowGuestCheckout"
          ? checked
          : value,
    });
  };

  const handleEmailSettingsChange = (e) => {
    const { name, value, checked } = e.target;
    setEmailSettings({
      ...emailSettings,
      [name]: name === "enableSsl" ? checked : value,
    });
  };

  const handlePaymentSettingsChange = (e) => {
    const { name, value, checked } = e.target;
    setPaymentSettings({
      ...paymentSettings,
      [name]:
        name === "enablePaypal" ||
        name === "enableStripe" ||
        name === "enableCashOnDelivery"
          ? checked
          : value,
    });
  };

  const handleBackupSettingsChange = (e) => {
    const { name, value, checked } = e.target;
    setBackupSettings({
      ...backupSettings,
      [name]: name === "autoBackup" ? checked : value,
    });
  };

  const handleSaveSettings = (settingsType) => {
    // Simulate saving settings
    console.log(`Saving ${settingsType} settings`);

    setSnackbar({
      open: true,
      message: `${settingsType} settings saved successfully`,
      severity: "success",
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  // Category Dialog Handlers
  const openCategoryDialog = (
    mode,
    category = { name: "", slug: "", active: true }
  ) => {
    setCategoryDialog({
      open: true,
      mode,
      data: { ...category },
    });
  };

  const closeCategoryDialog = () => {
    setCategoryDialog({
      ...categoryDialog,
      open: false,
    });
  };

  const handleCategoryDialogChange = (e) => {
    const { name, value, checked } = e.target;
    setCategoryDialog({
      ...categoryDialog,
      data: {
        ...categoryDialog.data,
        [name]: name === "active" ? checked : value,
      },
    });
  };

  const handleCategoryDialogSave = () => {
    if (categoryDialog.mode === "add") {
      // Add new category
      const newCategory = {
        ...categoryDialog.data,
        id: Math.max(...categories.map((c) => c.id)) + 1,
      };
      setCategories([...categories, newCategory]);
    } else {
      // Edit existing category
      setCategories(
        categories.map((category) =>
          category.id === categoryDialog.data.id
            ? categoryDialog.data
            : category
        )
      );
    }

    closeCategoryDialog();
    setSnackbar({
      open: true,
      message: `Category ${
        categoryDialog.mode === "add" ? "added" : "updated"
      } successfully`,
      severity: "success",
    });
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
    setSnackbar({
      open: true,
      message: "Category deleted successfully",
      severity: "success",
    });
  };

  const handleCreateBackup = () => {
    // Simulate creating a backup
    console.log("Creating backup");

    setSnackbar({
      open: true,
      message: "Backup created successfully",
      severity: "success",
    });

    // Update last backup time
    setBackupSettings({
      ...backupSettings,
      lastBackup: new Date().toISOString().replace("T", " ").substring(0, 19),
    });
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
          <Paper sx={{ mt: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="General" />
              <Tab label="Email" />
              <Tab label="Payment" />
              <Tab label="Categories" />
              <Tab label="Backup & Restore" />
            </Tabs>

            {/* General Settings */}
            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Site Information
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Site Name"
                    name="siteName"
                    value={generalSettings.siteName}
                    onChange={handleGeneralSettingsChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Site Description"
                    name="siteDescription"
                    value={generalSettings.siteDescription}
                    onChange={handleGeneralSettingsChange}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Contact Email"
                    name="contactEmail"
                    value={generalSettings.contactEmail}
                    onChange={handleGeneralSettingsChange}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Support Phone"
                    name="supportPhone"
                    value={generalSettings.supportPhone}
                    onChange={handleGeneralSettingsChange}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={generalSettings.address}
                    onChange={handleGeneralSettingsChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Site Configuration
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={generalSettings.maintenanceMode}
                        onChange={handleGeneralSettingsChange}
                        name="maintenanceMode"
                        color="primary"
                      />
                    }
                    label="Maintenance Mode"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={generalSettings.allowRegistration}
                        onChange={handleGeneralSettingsChange}
                        name="allowRegistration"
                        color="primary"
                      />
                    }
                    label="Allow User Registration"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={generalSettings.allowGuestCheckout}
                        onChange={handleGeneralSettingsChange}
                        name="allowGuestCheckout"
                        color="primary"
                      />
                    }
                    label="Allow Guest Checkout"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Save />}
                      onClick={() => handleSaveSettings("General")}
                    >
                      Save Settings
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>

            {/* Email Settings */}
            <TabPanel value={tabValue} index={1}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    SMTP Configuration
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="SMTP Server"
                    name="smtpServer"
                    value={emailSettings.smtpServer}
                    onChange={handleEmailSettingsChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="SMTP Port"
                    name="smtpPort"
                    value={emailSettings.smtpPort}
                    onChange={handleEmailSettingsChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="SMTP Username"
                    name="smtpUsername"
                    value={emailSettings.smtpUsername}
                    onChange={handleEmailSettingsChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="SMTP Password"
                    name="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={handleEmailSettingsChange}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={emailSettings.enableSsl}
                        onChange={handleEmailSettingsChange}
                        name="enableSsl"
                        color="primary"
                      />
                    }
                    label="Enable SSL/TLS"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Email Sender Information
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Sender Name"
                    name="senderName"
                    value={emailSettings.senderName}
                    onChange={handleEmailSettingsChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Sender Email"
                    name="senderEmail"
                    value={emailSettings.senderEmail}
                    onChange={handleEmailSettingsChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Save />}
                      onClick={() => handleSaveSettings("Email")}
                    >
                      Save Settings
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>

            {/* Payment Settings */}
            <TabPanel value={tabValue} index={2}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Payment Configuration
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Currency</InputLabel>
                    <Select
                      name="currency"
                      value={paymentSettings.currency}
                      label="Currency"
                      onChange={handlePaymentSettingsChange}
                    >
                      <MenuItem value="USD">USD - US Dollar</MenuItem>
                      <MenuItem value="EUR">EUR - Euro</MenuItem>
                      <MenuItem value="GBP">GBP - British Pound</MenuItem>
                      <MenuItem value="JPY">JPY - Japanese Yen</MenuItem>
                      <MenuItem value="CAD">CAD - Canadian Dollar</MenuItem>
                      <MenuItem value="AUD">AUD - Australian Dollar</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Transaction Fee (%)"
                    name="transactionFee"
                    value={paymentSettings.transactionFee}
                    onChange={handlePaymentSettingsChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Payment Methods
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={paymentSettings.enablePaypal}
                        onChange={handlePaymentSettingsChange}
                        name="enablePaypal"
                        color="primary"
                      />
                    }
                    label="Enable PayPal"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={paymentSettings.enableStripe}
                        onChange={handlePaymentSettingsChange}
                        name="enableStripe"
                        color="primary"
                      />
                    }
                    label="Enable Stripe"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={paymentSettings.enableCashOnDelivery}
                        onChange={handlePaymentSettingsChange}
                        name="enableCashOnDelivery"
                        color="primary"
                      />
                    }
                    label="Enable Cash on Delivery"
                  />
                </Grid>

                {paymentSettings.enablePaypal && (
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="PayPal Client ID"
                      name="paypalClientId"
                      value={paymentSettings.paypalClientId}
                      onChange={handlePaymentSettingsChange}
                    />
                  </Grid>
                )}

                {paymentSettings.enableStripe && (
                  <>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Stripe Public Key"
                        name="stripePublicKey"
                        value={paymentSettings.stripePublicKey}
                        onChange={handlePaymentSettingsChange}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Stripe Secret Key"
                        name="stripeSecretKey"
                        type="password"
                        value={paymentSettings.stripeSecretKey}
                        onChange={handlePaymentSettingsChange}
                      />
                    </Grid>
                  </>
                )}

                <Grid item xs={12}>
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Save />}
                      onClick={() => handleSaveSettings("Payment")}
                    >
                      Save Settings
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>

            {/* Categories Settings */}
            <TabPanel value={tabValue} index={3}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h6">Product Categories</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Add />}
                  onClick={() => openCategoryDialog("add")}
                >
                  Add Category
                </Button>
              </Box>

              <List>
                {categories.map((category) => (
                  <ListItem
                    key={category.id}
                    divider
                    secondaryAction={
                      <Box>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => openCategoryDialog("edit", category)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemText
                      primary={category.name}
                      secondary={`Slug: ${category.slug}`}
                    />
                    <Chip
                      label={category.active ? "Active" : "Inactive"}
                      color={category.active ? "success" : "default"}
                      size="small"
                      sx={{ mr: 2 }}
                    />
                  </ListItem>
                ))}
              </List>
            </TabPanel>

            {/* Backup & Restore Settings */}
            <TabPanel value={tabValue} index={4}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Backup Configuration
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={backupSettings.autoBackup}
                        onChange={handleBackupSettingsChange}
                        name="autoBackup"
                        color="primary"
                      />
                    }
                    label="Enable Automatic Backups"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Backup Frequency</InputLabel>
                    <Select
                      name="backupFrequency"
                      value={backupSettings.backupFrequency}
                      label="Backup Frequency"
                      onChange={handleBackupSettingsChange}
                      disabled={!backupSettings.autoBackup}
                    >
                      <MenuItem value="daily">Daily</MenuItem>
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Backup Retention (days)"
                    name="backupRetention"
                    value={backupSettings.backupRetention}
                    onChange={handleBackupSettingsChange}
                    disabled={!backupSettings.autoBackup}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Last Backup"
                    value={backupSettings.lastBackup}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Manual Backup & Restore
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CloudUpload />}
                    onClick={handleCreateBackup}
                    fullWidth
                  >
                    Create Backup Now
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button variant="outlined" component="label" fullWidth>
                    Restore from Backup
                    <input
                      type="file"
                      hidden
                      accept=".sql,.zip"
                      onChange={(e) =>
                        console.log("File selected:", e.target.files[0])
                      }
                    />
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Save />}
                      onClick={() => handleSaveSettings("Backup")}
                    >
                      Save Settings
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
          </Paper>
        )}

        {/* Category Dialog */}
        <Dialog open={categoryDialog.open} onClose={closeCategoryDialog}>
          <DialogTitle>
            {categoryDialog.mode === "add"
              ? "Add New Category"
              : "Edit Category"}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Category Name"
                  name="name"
                  value={categoryDialog.data.name}
                  onChange={handleCategoryDialogChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Category Slug"
                  name="slug"
                  value={categoryDialog.data.slug}
                  onChange={handleCategoryDialogChange}
                  helperText="Used in URLs, lowercase with hyphens instead of spaces"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={categoryDialog.data.active}
                      onChange={handleCategoryDialogChange}
                      name="active"
                      color="primary"
                    />
                  }
                  label="Active"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeCategoryDialog}>Cancel</Button>
            <Button onClick={handleCategoryDialogSave} color="primary">
              {categoryDialog.mode === "add" ? "Add" : "Save"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </AdminLayout>
  );
};

export default Settings;
