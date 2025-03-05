import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Rating,
  CircularProgress,
  Paper,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import {
  ArrowForward,
  ShoppingCart,
  CompareArrows,
  Favorite,
  FavoriteBorder,
  TrendingUp,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import heroImage from "../assets/pictures/hero-bg.jpg";

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [recentExchanges, setRecentExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchHomeData = async () => {
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

          // Generate featured products
          const mockFeaturedProducts = Array(6)
            .fill()
            .map((_, index) => ({
              id: index + 1,
              name: `Featured Product ${index + 1}`,
              description: `This is a description for Featured Product ${
                index + 1
              }. It's a great product with many features.`,
              price: Math.floor(Math.random() * 1000) + 100,
              image: `https://via.placeholder.com/300x200?text=Product${
                index + 1
              }`,
              category:
                categories[Math.floor(Math.random() * categories.length)],
              rating: (Math.random() * 5).toFixed(1),
              reviews: Math.floor(Math.random() * 100),
              seller: `User ${Math.floor(Math.random() * 20) + 1}`,
              condition: ["New", "Like New", "Good", "Fair"][
                Math.floor(Math.random() * 4)
              ],
            }));

          // Generate trending products
          const mockTrendingProducts = Array(6)
            .fill()
            .map((_, index) => ({
              id: index + 101,
              name: `Trending Product ${index + 1}`,
              description: `This is a description for Trending Product ${
                index + 1
              }. It's a popular product right now.`,
              price: Math.floor(Math.random() * 1000) + 100,
              image: `https://via.placeholder.com/300x200?text=Trending${
                index + 1
              }`,
              category:
                categories[Math.floor(Math.random() * categories.length)],
              rating: (Math.random() * 5).toFixed(1),
              reviews: Math.floor(Math.random() * 100),
              seller: `User ${Math.floor(Math.random() * 20) + 1}`,
              condition: ["New", "Like New", "Good", "Fair"][
                Math.floor(Math.random() * 4)
              ],
            }));

          // Generate recent exchanges
          const mockRecentExchanges = Array(4)
            .fill()
            .map((_, index) => ({
              id: index + 201,
              initiator: `User ${Math.floor(Math.random() * 20) + 1}`,
              receiver: `User ${Math.floor(Math.random() * 20) + 1}`,
              initiatorItem: {
                name: `Item ${Math.floor(Math.random() * 100) + 1}`,
                image: `https://via.placeholder.com/100x100?text=Item${
                  index * 2 + 1
                }`,
                value: Math.floor(Math.random() * 500) + 50,
              },
              receiverItem: {
                name: `Item ${Math.floor(Math.random() * 100) + 1}`,
                image: `https://via.placeholder.com/100x100?text=Item${
                  index * 2 + 2
                }`,
                value: Math.floor(Math.random() * 500) + 50,
              },
              date: new Date(
                2023,
                Math.floor(Math.random() * 12),
                Math.floor(Math.random() * 28) + 1
              )
                .toISOString()
                .split("T")[0],
              status: ["completed", "pending", "accepted"][
                Math.floor(Math.random() * 3)
              ],
            }));

          setFeaturedProducts(mockFeaturedProducts);
          setTrendingProducts(mockTrendingProducts);
          setRecentExchanges(mockRecentExchanges);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching home data:", error);
        setError("Failed to load home data. Please try again.");
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  const renderProductCard = (product) => (
    <Grid item xs={12} sm={6} md={4} key={product.id}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.3s",
          "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
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
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {product.category}
          </Typography>
          <Typography variant="h6" color="primary" gutterBottom>
            ${product.price.toFixed(2)}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Rating
              value={parseFloat(product.rating)}
              precision={0.5}
              size="small"
              readOnly
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.reviews})
            </Typography>
          </Box>
          <Chip size="small" label={product.condition} sx={{ mr: 1 }} />
        </CardContent>
        <CardActions>
          <Button size="small" component={Link} to={`/products/${product.id}`}>
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
  );

  return (
    <Layout>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "60vh", md: "80vh" },
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          mb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Buy, Sell & Exchange Used Electronics
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Join our community and find the best deals on used devices.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/products"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                backgroundColor: "primary.main",
                "&:hover": { backgroundColor: "primary.dark" },
              }}
            >
              Browse Products
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/register"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                borderColor: "white",
                color: "white",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Join Our Community
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        {/* Featured Categories */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ textAlign: "center", mb: 4 }}
          >
            Browse by Category
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {[
              "Smartphones",
              "Laptops",
              "Tablets",
              "Audio",
              "Cameras",
              "Accessories",
            ].map((category, index) => (
              <Grid item xs={6} sm={4} md={2} key={index}>
                <Paper
                  component={Link}
                  to={`/products?category=${category}`}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "text.primary",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 4,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      backgroundColor: "primary.light",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    {/* You can replace this with actual icons for each category */}
                    <Typography variant="h5">{category.charAt(0)}</Typography>
                  </Box>
                  <Typography variant="subtitle1">{category}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Featured Products */}
        <Box sx={{ mb: 6 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h4" component="h2">
              Featured Products
            </Typography>
            <Button component={Link} to="/products" endIcon={<ArrowForward />}>
              View All
            </Button>
          </Box>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error" sx={{ textAlign: "center", py: 4 }}>
              {error}
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {featuredProducts.map((product) => renderProductCard(product))}
            </Grid>
          )}
        </Box>

        {/* Why Choose Us */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ textAlign: "center", mb: 4 }}
          >
            Why Choose ReTech
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: "Quality Assurance",
                description:
                  "All products are thoroughly inspected and tested before listing.",
              },
              {
                title: "Secure Transactions",
                description:
                  "Our platform ensures safe and secure transactions for all users.",
              },
              {
                title: "Easy Exchanges",
                description:
                  "Seamlessly exchange your tech products with other community members.",
              },
              {
                title: "Eco-Friendly",
                description:
                  "Reduce electronic waste by giving devices a second life through our platform.",
              },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper sx={{ p: 3, height: "100%", textAlign: "center" }}>
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: "50%",
                      backgroundColor: "primary.light",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mb: 2,
                      mx: "auto",
                    }}
                  >
                    <Typography variant="h5">{index + 1}</Typography>
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Trending & Recent Exchanges */}
        <Box sx={{ mb: 6 }}>
          <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Tab
                label="Trending Products"
                icon={<TrendingUp />}
                iconPosition="start"
              />
              <Tab
                label="Recent Exchanges"
                icon={<CompareArrows />}
                iconPosition="start"
              />
            </Tabs>

            <Box sx={{ p: 3 }}>
              {tabValue === 0 ? (
                <Grid container spacing={3}>
                  {trendingProducts.map((product) =>
                    renderProductCard(product)
                  )}
                </Grid>
              ) : (
                <Grid container spacing={3}>
                  {recentExchanges.map((exchange) => (
                    <Grid item xs={12} sm={6} key={exchange.id}>
                      <Card
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          height: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            p: 2,
                            flex: 1,
                          }}
                        >
                          <Typography variant="subtitle1" gutterBottom>
                            {exchange.initiator} ↔ {exchange.receiver}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            Date: {exchange.date}
                          </Typography>
                          <Chip
                            label={
                              exchange.status.charAt(0).toUpperCase() +
                              exchange.status.slice(1)
                            }
                            color={
                              exchange.status === "completed"
                                ? "success"
                                : exchange.status === "accepted"
                                ? "info"
                                : "warning"
                            }
                            size="small"
                            sx={{ alignSelf: "flex-start", mb: 2 }}
                          />
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mt: "auto",
                            }}
                          >
                            <Box sx={{ textAlign: "center" }}>
                              <img
                                src={exchange.initiatorItem.image}
                                alt={exchange.initiatorItem.name}
                                style={{
                                  width: 60,
                                  height: 60,
                                  objectFit: "cover",
                                  borderRadius: 4,
                                }}
                              />
                              <Typography
                                variant="body2"
                                noWrap
                                sx={{ maxWidth: 100 }}
                              >
                                {exchange.initiatorItem.name}
                              </Typography>
                              <Typography variant="body2" color="primary">
                                ${exchange.initiatorItem.value}
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <CompareArrows />
                            </Box>
                            <Box sx={{ textAlign: "center" }}>
                              <img
                                src={exchange.receiverItem.image}
                                alt={exchange.receiverItem.name}
                                style={{
                                  width: 60,
                                  height: 60,
                                  objectFit: "cover",
                                  borderRadius: 4,
                                }}
                              />
                              <Typography
                                variant="body2"
                                noWrap
                                sx={{ maxWidth: 100 }}
                              >
                                {exchange.receiverItem.name}
                              </Typography>
                              <Typography variant="body2" color="primary">
                                ${exchange.receiverItem.value}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          </Paper>
        </Box>

        {/* Call to Action */}
        <Box
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            py: 6,
            px: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to Join Our Community?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: 700, mx: "auto" }}>
            Start buying, selling, and exchanging tech products with thousands
            of users. Create your account today and become part of our growing
            community.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/register"
            sx={{
              backgroundColor: "white",
              color: "primary.main",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.9)",
              },
            }}
          >
            Sign Up Now
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};

export default Home;
