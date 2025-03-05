import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  Rating,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Pagination,
  Divider,
  IconButton,
  CircularProgress,
  Paper,
  Drawer,
  useMediaQuery,
  useTheme,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import {
  Search,
  FilterList,
  ShoppingCart,
  CompareArrows,
  Favorite,
  FavoriteBorder,
  Close,
  Sort,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";

const Products = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // State for products and filtering
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);

  // Pagination
  const [page, setPage] = useState(1);
  const [productsPerPage] = useState(12);

  // Filter states
  const [searchQuery, setSearchQuery] = useState(
    queryParams.get("search") || ""
  );
  const [category, setCategory] = useState(
    queryParams.get("category") || "all"
  );
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState("newest");
  const [condition, setCondition] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Here you would fetch data from your API
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
          const brandsList = [
            "Apple",
            "Samsung",
            "Sony",
            "Dell",
            "HP",
            "Lenovo",
            "Bose",
            "Canon",
            "Nikon",
            "Microsoft",
          ];
          const conditionOptions = ["New", "Like New", "Good", "Fair"];

          // Generate products
          const mockProducts = Array(50)
            .fill()
            .map((_, index) => {
              const brand =
                brandsList[Math.floor(Math.random() * brandsList.length)];
              const productCategory =
                categories[Math.floor(Math.random() * categories.length)];
              const productCondition =
                conditionOptions[
                  Math.floor(Math.random() * conditionOptions.length)
                ];

              return {
                id: index + 1,
                name: `${brand} ${productCategory} Model ${Math.floor(
                  Math.random() * 1000
                )}`,
                description: `This is a description for a ${productCategory} from ${brand}. It's in ${productCondition} condition.`,
                price: Math.floor(Math.random() * 1900) + 100,
                image: `https://via.placeholder.com/300x200?text=${brand}+${productCategory}`,
                category: productCategory,
                brand: brand,
                rating: (Math.random() * 5).toFixed(1),
                reviews: Math.floor(Math.random() * 100),
                seller: `User ${Math.floor(Math.random() * 20) + 1}`,
                condition: productCondition,
                dateAdded: new Date(
                  2023,
                  Math.floor(Math.random() * 12),
                  Math.floor(Math.random() * 28) + 1
                ).toISOString(),
              };
            });

          setProducts(mockProducts);
          setBrands(
            [...new Set(mockProducts.map((product) => product.brand))].sort()
          );
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

  // Apply filters
  useEffect(() => {
    let result = [...products];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (category && category !== "all") {
      result = result.filter((product) => product.category === category);
    }

    // Apply price range filter
    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply condition filter
    if (condition.length > 0) {
      result = result.filter((product) =>
        condition.includes(product.condition)
      );
    }

    // Apply brand filter
    if (selectedBrands.length > 0) {
      result = result.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
      default:
        result.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
    }

    setFilteredProducts(result);
    // Reset to first page when filters change
    setPage(1);
  }, [
    products,
    searchQuery,
    category,
    priceRange,
    condition,
    selectedBrands,
    sortBy,
  ]);

  // Update URL with filters
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (category && category !== "all") params.set("category", category);

    const newUrl = `${location.pathname}?${params.toString()}`;
    navigate(newUrl, { replace: true });
  }, [searchQuery, category, navigate, location.pathname]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleConditionChange = (event) => {
    const value = event.target.value;
    if (condition.includes(value)) {
      setCondition(condition.filter((c) => c !== value));
    } else {
      setCondition([...condition, value]);
    }
  };

  const handleBrandChange = (event) => {
    const value = event.target.value;
    if (selectedBrands.includes(value)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== value));
    } else {
      setSelectedBrands([...selectedBrands, value]);
    }
  };

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleFilterDrawer = () => {
    setFilterDrawerOpen(!filterDrawerOpen);
  };

  // Calculate pagination
  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Filter sidebar content
  const filterContent = (
    <Box sx={{ p: 3, width: isMobile ? "100%" : 250 }}>
      {isMobile && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">Filters</Typography>
          <IconButton onClick={toggleFilterDrawer}>
            <Close />
          </IconButton>
        </Box>
      )}

      <Typography variant="h6" gutterBottom>
        Categories
      </Typography>
      <FormControl fullWidth size="small" sx={{ mb: 3 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          label="Category"
          onChange={handleCategoryChange}
        >
          <MenuItem value="all">All Categories</MenuItem>
          {[
            "Smartphones",
            "Laptops",
            "Tablets",
            "Audio",
            "Cameras",
            "Accessories",
          ].map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="h6" gutterBottom>
        Price Range
      </Typography>
      <Box sx={{ px: 1, mb: 3 }}>
        <Slider
          value={priceRange}
          onChange={handlePriceRangeChange}
          valueLabelDisplay="auto"
          min={0}
          max={2000}
          step={50}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2">${priceRange[0]}</Typography>
          <Typography variant="body2">${priceRange[1]}</Typography>
        </Box>
      </Box>

      <Typography variant="h6" gutterBottom>
        Condition
      </Typography>
      <FormGroup sx={{ mb: 3 }}>
        {["New", "Like New", "Good", "Fair"].map((cond) => (
          <FormControlLabel
            key={cond}
            control={
              <Checkbox
                checked={condition.includes(cond)}
                onChange={handleConditionChange}
                value={cond}
                size="small"
              />
            }
            label={cond}
          />
        ))}
      </FormGroup>

      <Typography variant="h6" gutterBottom>
        Brands
      </Typography>
      <FormGroup sx={{ mb: 3, maxHeight: 200, overflow: "auto" }}>
        {brands.map((brand) => (
          <FormControlLabel
            key={brand}
            control={
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onChange={handleBrandChange}
                value={brand}
                size="small"
              />
            }
            label={brand}
          />
        ))}
      </FormGroup>

      {isMobile && (
        <Button
          variant="contained"
          fullWidth
          onClick={toggleFilterDrawer}
          sx={{ mt: 2 }}
        >
          Apply Filters
        </Button>
      )}
    </Box>
  );

  return (
    <Layout>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Browse Products
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Discover quality used electronics from our community of sellers.
            Filter by category, price, condition, and more to find exactly what
            you're looking for.
          </Typography>
        </Box>

        {/* Search and Sort Bar */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                size="small"
              />
            </Grid>
            <Grid item xs={8} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={handleSortChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <Sort />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="newest">Newest First</MenuItem>
                  <MenuItem value="price-low-high">Price: Low to High</MenuItem>
                  <MenuItem value="price-high-low">Price: High to Low</MenuItem>
                  <MenuItem value="rating">Highest Rated</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} md={2} sx={{ display: { md: "none" } }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterList />}
                onClick={toggleFilterDrawer}
              >
                Filters
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Filter Sidebar - Desktop */}
          <Grid
            item
            md={3}
            lg={2}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Paper sx={{ position: "sticky", top: 20 }}>{filterContent}</Paper>
          </Grid>

          {/* Products Grid */}
          <Grid item xs={12} md={9} lg={10}>
            {/* Results Summary */}
            <Box
              sx={{
                mb: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body1">
                Showing{" "}
                {filteredProducts.length > 0 ? indexOfFirstProduct + 1 : 0}-
                {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
                {filteredProducts.length} results
              </Typography>

              {/* Active Filters */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {category && category !== "all" && (
                  <Chip
                    label={`Category: ${category}`}
                    onDelete={() => setCategory("all")}
                    size="small"
                  />
                )}
                {condition.map((cond) => (
                  <Chip
                    key={cond}
                    label={`Condition: ${cond}`}
                    onDelete={() =>
                      setCondition(condition.filter((c) => c !== cond))
                    }
                    size="small"
                  />
                ))}
                {selectedBrands.map((brand) => (
                  <Chip
                    key={brand}
                    label={`Brand: ${brand}`}
                    onDelete={() =>
                      setSelectedBrands(
                        selectedBrands.filter((b) => b !== brand)
                      )
                    }
                    size="small"
                  />
                ))}
                {(category !== "all" ||
                  condition.length > 0 ||
                  selectedBrands.length > 0 ||
                  searchQuery) && (
                  <Chip
                    label="Clear All"
                    onDelete={() => {
                      setCategory("all");
                      setCondition([]);
                      setSelectedBrands([]);
                      setSearchQuery("");
                      setPriceRange([0, 2000]);
                    }}
                    size="small"
                    color="primary"
                  />
                )}
              </Box>
            </Box>

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Typography color="error" sx={{ textAlign: "center", py: 4 }}>
                {error}
              </Typography>
            ) : filteredProducts.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: "center" }}>
                <Typography variant="h6" gutterBottom>
                  No products found
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Try adjusting your filters or search query to find what you're
                  looking for.
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {currentProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "transform 0.3s",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: 6,
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={product.image}
                        alt={product.name}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography variant="h6" component="div" noWrap>
                            {product.name}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => toggleFavorite(product.id)}
                            color="primary"
                          >
                            {favorites.includes(product.id) ? (
                              <Favorite />
                            ) : (
                              <FavoriteBorder />
                            )}
                          </IconButton>
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom
                        >
                          {product.category} • {product.brand}
                        </Typography>
                        <Typography variant="h6" color="primary" gutterBottom>
                          ${product.price.toFixed(2)}
                        </Typography>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <Rating
                            value={parseFloat(product.rating)}
                            precision={0.5}
                            size="small"
                            readOnly
                          />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ ml: 1 }}
                          >
                            ({product.reviews})
                          </Typography>
                        </Box>
                        <Chip
                          size="small"
                          label={product.condition}
                          sx={{ mr: 1 }}
                        />
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          component={Link}
                          to={`/products/${product.id}`}
                        >
                          View Details
                        </Button>
                        <Button size="small" startIcon={<ShoppingCart />}>
                          Add to Cart
                        </Button>
                        <Button
                          size="small"
                          startIcon={<CompareArrows />}
                          component={Link}
                          to={`/exchange?product=${product.id}`}
                        >
                          Exchange
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  showFirstButton
                  showLastButton
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Filter Drawer - Mobile */}
      <Drawer
        anchor="left"
        open={filterDrawerOpen}
        onClose={toggleFilterDrawer}
        sx={{
          display: { md: "none" },
          "& .MuiDrawer-paper": { width: "80%", maxWidth: 300 },
        }}
      >
        {filterContent}
      </Drawer>
    </Layout>
  );
};

export default Products;
