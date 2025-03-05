import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Chip,
  Paper,
  Grid,
  Switch,
  FormControlLabel,
  Alert,
  Divider,
} from "@mui/material";
import { CloudUpload, Add, Close } from "@mui/icons-material";

const ProductForm = ({ editMode = false, initialData = {} }) => {
  const [images, setImages] = useState(initialData.images || []);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    "Smartphone",
    "Laptop",
    "Tablet",
    "Desktop",
    "Camera",
    "TV",
    "Audio",
    "Gaming",
    "Wearable",
    "Accessories",
    "Other",
  ];

  const conditions = ["New", "Like New", "Good", "Fair", "Poor"];

  const formik = useFormik({
    initialValues: {
      name: initialData.name || "",
      description: initialData.description || "",
      category: initialData.category || "",
      brand: initialData.brand || "",
      model: initialData.model || "",
      condition: initialData.condition || "",
      price: initialData.price || "",
      originalPrice: initialData.originalPrice || "",
      quantity: initialData.quantity || 1,
      specifications: initialData.specifications || "",
      exchangeAvailable: initialData.exchangeAvailable || false,
      exchangePreferences: initialData.exchangePreferences || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Product name is required"),
      description: Yup.string().required("Description is required"),
      category: Yup.string().required("Category is required"),
      brand: Yup.string().required("Brand is required"),
      model: Yup.string().required("Model is required"),
      condition: Yup.string().required("Condition is required"),
      price: Yup.number()
        .positive("Price must be positive")
        .required("Price is required"),
      originalPrice: Yup.number().positive("Original price must be positive"),
      quantity: Yup.number()
        .min(1, "Quantity must be at least 1")
        .required("Quantity is required"),
      specifications: Yup.string().required("Specifications are required"),
      exchangePreferences: Yup.string().when("exchangeAvailable", {
        is: true,
        then: Yup.string().required(
          "Exchange preferences are required when exchange is available"
        ),
      }),
    }),
    onSubmit: async (values) => {
      try {
        // Here you would submit the form data to your API
        console.log("Form values:", { ...values, images });

        // Simulate successful submission
        setSuccess(true);
        setError("");

        // Reset form if not in edit mode
        if (!editMode) {
          formik.resetForm();
          setImages([]);
        }

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } catch (err) {
        setError("Failed to submit the form. Please try again.");
        setSuccess(false);
      }
    },
  });

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    // Convert files to URLs (in a real app, you'd upload these to a server)
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    setImages([...images, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {editMode ? "Edit Product" : "List a New Product"}
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Product {editMode ? "updated" : "created"} successfully!
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Basic Information
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Product Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
              >
                <InputLabel>Category</InputLabel>
                <Select
                  id="category"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.category && formik.errors.category && (
                  <FormHelperText>{formik.errors.category}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                error={
                  formik.touched.condition && Boolean(formik.errors.condition)
                }
              >
                <InputLabel>Condition</InputLabel>
                <Select
                  id="condition"
                  name="condition"
                  value={formik.values.condition}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Condition"
                >
                  {conditions.map((condition) => (
                    <MenuItem key={condition} value={condition}>
                      {condition}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.condition && formik.errors.condition && (
                  <FormHelperText>{formik.errors.condition}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="brand"
                name="brand"
                label="Brand"
                value={formik.values.brand}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.brand && Boolean(formik.errors.brand)}
                helperText={formik.touched.brand && formik.errors.brand}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="model"
                name="model"
                label="Model"
                value={formik.values.model}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.model && Boolean(formik.errors.model)}
                helperText={formik.touched.model && formik.errors.model}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                multiline
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Pricing & Inventory
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="price"
                name="price"
                label="Price ($)"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="originalPrice"
                name="originalPrice"
                label="Original Price ($)"
                type="number"
                value={formik.values.originalPrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.originalPrice &&
                  Boolean(formik.errors.originalPrice)
                }
                helperText={
                  formik.touched.originalPrice && formik.errors.originalPrice
                }
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="quantity"
                name="quantity"
                label="Quantity"
                type="number"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.quantity && Boolean(formik.errors.quantity)
                }
                helperText={formik.touched.quantity && formik.errors.quantity}
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Specifications
          </Typography>

          <TextField
            fullWidth
            id="specifications"
            name="specifications"
            label="Technical Specifications"
            multiline
            rows={4}
            placeholder="Enter key specifications of your device (e.g., processor, memory, screen size, etc.)"
            value={formik.values.specifications}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.specifications &&
              Boolean(formik.errors.specifications)
            }
            helperText={
              formik.touched.specifications && formik.errors.specifications
            }
          />
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Exchange Options
          </Typography>

          <FormControlLabel
            control={
              <Switch
                id="exchangeAvailable"
                name="exchangeAvailable"
                checked={formik.values.exchangeAvailable}
                onChange={formik.handleChange}
                color="primary"
              />
            }
            label="Available for Exchange"
            sx={{ mb: 2 }}
          />

          {formik.values.exchangeAvailable && (
            <TextField
              fullWidth
              id="exchangePreferences"
              name="exchangePreferences"
              label="Exchange Preferences"
              multiline
              rows={3}
              placeholder="Describe what items you would accept in exchange (e.g., specific brands, models, conditions, etc.)"
              value={formik.values.exchangePreferences}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.exchangePreferences &&
                Boolean(formik.errors.exchangePreferences)
              }
              helperText={
                formik.touched.exchangePreferences &&
                formik.errors.exchangePreferences
              }
            />
          )}
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Product Images
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUpload />}
              sx={{ mb: 2 }}
            >
              Upload Images
              <input
                type="file"
                hidden
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
            </Button>

            <Typography variant="body2" color="text.secondary">
              Upload up to 5 images. First image will be used as the product
              thumbnail.
            </Typography>
          </Box>

          {images.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {images.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    width: 100,
                    height: 100,
                    border: "1px solid #ddd",
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={image.url}
                    alt={`Product ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Button
                    size="small"
                    color="error"
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      minWidth: "auto",
                      p: 0.5,
                    }}
                    onClick={() => handleRemoveImage(index)}
                  >
                    <Close fontSize="small" />
                  </Button>
                </Box>
              ))}
            </Box>
          )}
        </Paper>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" onClick={() => formik.resetForm()}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            {editMode ? "Update Product" : "List Product"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ProductForm;
