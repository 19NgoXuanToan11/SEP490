import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Switch,
  FormControlLabel,
} from "@mui/material";
import {
  Search,
  Edit,
  Delete,
  Add,
  Visibility,
  ViewModule,
  ViewList,
} from "@mui/icons-material";
import AdminLayout from "../../components/admin/AdminLayout";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'grid'
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Here you would fetch products from your API
        // For now, we'll use mock data
        setTimeout(() => {
          const categories = [
            "Smartphones",
            "Laptops",
            "Tablets",
            "Audio",
            "Cameras",
            "Accessories",
          ];
          const mockProducts = Array(50)
            .fill()
            .map((_, index) => ({
              id: index + 1,
              name: `Product ${index + 1}`,
              description: `This is a description for Product ${
                index + 1
              }. It's a great product with many features.`,
              price: Math.floor(Math.random() * 1000) + 50,
              image: `https://via.placeholder.com/150?text=Product${index + 1}`,
              category:
                categories[Math.floor(Math.random() * categories.length)],
              status: Math.random() > 0.2 ? "active" : "inactive",
              seller: `User ${Math.floor(Math.random() * 20) + 1}`,
              listedDate: new Date(
                2023,
                Math.floor(Math.random() * 12),
                Math.floor(Math.random() * 28) + 1
              )
                .toISOString()
                .split("T")[0],
              stock: Math.floor(Math.random() * 100),
            }));

          setProducts(mockProducts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = () => {
    // Here you would delete the product from your API
    // For now, we'll update the local state
    const updatedProducts = products.filter(
      (product) => product.id !== selectedProduct.id
    );

    setProducts(updatedProducts);
    setDeleteDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleViewModeChange = () => {
    setViewMode(viewMode === "list" ? "grid" : "list");
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
    setPage(0);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setPage(0);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const paginatedProducts = filteredProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Get unique categories for filter
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <AdminLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" component="h1">
            Products Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              /* Handle add product */
            }}
          >
            Add Product
          </Button>
        </Box>

        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
            <TextField
              variant="outlined"
              placeholder="Search products"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ flexGrow: 1 }}
            />

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                label="Category"
                onChange={handleCategoryFilterChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={handleStatusFilterChange}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Switch
                  checked={viewMode === "grid"}
                  onChange={handleViewModeChange}
                  color="primary"
                />
              }
              label={viewMode === "grid" ? <ViewModule /> : <ViewList />}
              labelPlacement="start"
            />
          </Box>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          ) : (
            <>
              {viewMode === "list" ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Seller</TableCell>
                        <TableCell>Listed Date</TableCell>
                        <TableCell>Stock</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Avatar
                                src={product.image}
                                variant="square"
                                sx={{ mr: 2, width: 50, height: 50 }}
                              />
                              <Box>
                                <Typography variant="body1">
                                  {product.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  noWrap
                                  sx={{ maxWidth: 200 }}
                                >
                                  {product.description}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>${product.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <Chip
                              label={
                                product.status.charAt(0).toUpperCase() +
                                product.status.slice(1)
                              }
                              color={
                                product.status === "active"
                                  ? "success"
                                  : "error"
                              }
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{product.seller}</TableCell>
                          <TableCell>{product.listedDate}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              color="info"
                              size="small"
                              onClick={() => {
                                /* Handle view product */
                              }}
                            >
                              <Visibility fontSize="small" />
                            </IconButton>
                            <IconButton
                              color="primary"
                              size="small"
                              onClick={() => handleEditClick(product)}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => handleDeleteClick(product)}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Grid container spacing={3}>
                  {paginatedProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                      <Card>
                        <CardMedia
                          component="img"
                          height="140"
                          image={product.image}
                          alt={product.name}
                        />
                        <CardContent sx={{ pb: 1 }}>
                          <Typography variant="h6" noWrap>
                            {product.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            {product.category}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Typography variant="h6" color="primary">
                              ${product.price.toFixed(2)}
                            </Typography>
                            <Chip
                              label={
                                product.status.charAt(0).toUpperCase() +
                                product.status.slice(1)
                              }
                              color={
                                product.status === "active"
                                  ? "success"
                                  : "error"
                              }
                              size="small"
                            />
                          </Box>
                        </CardContent>
                        <CardActions>
                          <IconButton size="small" color="info">
                            <Visibility fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleEditClick(product)}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteClick(product)}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredProducts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Paper>

        {/* Delete Product Dialog */}
        <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogContent>
            {selectedProduct && (
              <Typography>
                Are you sure you want to delete "{selectedProduct.name}"? This
                action cannot be undone.
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose}>Cancel</Button>
            <Button
              onClick={handleDeleteProduct}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </AdminLayout>
  );
};

export default Products;
