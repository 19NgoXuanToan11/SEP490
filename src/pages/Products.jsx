import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Chip,
  Slider,
  Divider,
  CircularProgress,
  Alert,
  IconButton
} from "@mui/material";
import {
  Search,
  FilterList,
  ShoppingCart,
  CompareArrows,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);

  const productsPerPage = 12;

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
              price: Math.floor(Math.random() * 2000) + 50,
              image: `https://via.placeholder.com/300x200?text=Product${
                index + 1
              }`,
              category:
                categories[Math.floor(Math.random() * categories.length)],
              rating: (Math.random() * 5).toFixed(1),
              reviews: Math.floor(Math.random() * 100),
              seller: `User ${Math.floor(Math.random() * 20) + 1}`,
              listedDate: new Date(
                2023,
                Math.floor(Math.random() * 12),
                Math.floor(Math.random() * 28) + 1
              )
                .toISOString()
                .split("T")[0],
              condition: ["New", "Like New", "Good", "Fair"][
                Math.floor(Math.random() * 4)
              ],
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
    setPage(1);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handlePriceRangeChangeCommitted = () => {
    setPage(1);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  // Filter products based on search, category, and price
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "priceAsc":
        return a.price - b.price;
      case "priceDesc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
      default:
        return new Date(b.listedDate) - new Date(a.listedDate);
    }
  });

  // Paginate products
  const paginatedProducts = sortedProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  // Get unique categories for filter
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Products
        </Typography>

        <Grid container spacing={3}>
          {/* Filters sidebar */}
          <Grid item xs={12} md={3}>
            <Card sx={{ p: 2, mb: { xs: 2, md: 0 } }}>
              <Typography variant="h6" gutterBottom>
                <FilterList sx={{ verticalAlign: "middle", mr: 1 }} />
                Filters
              </Typography>

              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Search Products"
                  variant="outlined"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={categoryFilter}
                    label="Category"
                    onChange={handleCategoryChange}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom>Price Range</Typography>
                <Slider
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  onChangeCommitted={handlePriceRangeChangeCommitted}
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

              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth>
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    label="Sort By"
                    onChange={handleSortChange}
                  >
                    <MenuItem value="newest">Newest</MenuItem>
                    <MenuItem value="priceAsc">Price: Low to High</MenuItem>
                    <MenuItem value="priceDesc">Price: High to Low</MenuItem>
                    <MenuItem value="rating">Highest Rated</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body2" color="text.secondary">
                Showing {filteredProducts.length} products
              </Typography>
            </Card>
          </Grid>

          {/* Products grid */}
          <Grid item xs={12} md={9}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            ) : paginatedProducts.length === 0 ? (
              <Alert severity="info">
                No products found matching your criteria. Try adjusting your
                filters.
              </Alert>
            ) : (
              <>
                <Grid container spacing={3}>
                  {paginatedProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
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
                            {product.category}
                          </Typography>
                          <Typography variant="h6" color="primary" gutterBottom>
                            ${product.price.toFixed(2)}
                          </Typography>
                          <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                            <Chip
                              size="small"
                              label={`Rating: ${product.rating}/5`}
                            />
                            <Chip size="small" label={product.condition} />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            Seller: {product.seller}
                          </Typography>
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

                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                  <Pagination
                    count={Math.ceil(filteredProducts.length / productsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Products;
