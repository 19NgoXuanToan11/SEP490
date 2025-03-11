import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Paper,
  Divider,
  CircularProgress,
  Alert,
  Chip,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  IconButton,
  Pagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  Search,
  FilterList,
  Sort,
  Visibility,
  LocalShipping,
  CheckCircle,
  ErrorOutline,
} from "@mui/icons-material";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const tabOptions = [
    "All Orders",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        // const response = await api.getUserOrders({
        //   status: activeTab === 0 ? null : tabOptions[activeTab],
        //   search: searchQuery,
        //   page: page
        // });
        // setOrders(response.data.orders);
        // setTotalPages(response.data.totalPages);

        // Mock data for demonstration
        setTimeout(() => {
          const mockOrders = [
            {
              id: "ORD-123456",
              date: "2023-06-15T10:30:00Z",
              status: "Delivered",
              items: [
                {
                  id: 1,
                  name: "iPhone 12 Pro",
                  image: "https://example.com/iphone.jpg",
                  quantity: 1,
                },
              ],
              total: 799.99,
            },
            {
              id: "ORD-123457",
              date: "2023-07-20T14:45:00Z",
              status: "Shipped",
              items: [
                {
                  id: 2,
                  name: "Samsung Galaxy Watch 4",
                  image: "https://example.com/watch.jpg",
                  quantity: 1,
                },
                {
                  id: 3,
                  name: "AirPods Pro",
                  image: "https://example.com/airpods.jpg",
                  quantity: 1,
                },
              ],
              total: 449.98,
            },
            {
              id: "ORD-123458",
              date: "2023-08-05T09:15:00Z",
              status: "Processing",
              items: [
                {
                  id: 4,
                  name: "MacBook Air M2",
                  image: "https://example.com/macbook.jpg",
                  quantity: 1,
                },
              ],
              total: 1199.99,
            },
            {
              id: "ORD-123459",
              date: "2023-08-10T16:20:00Z",
              status: "Cancelled",
              items: [
                {
                  id: 5,
                  name: "iPad Mini",
                  image: "https://example.com/ipad.jpg",
                  quantity: 1,
                },
              ],
              total: 499.99,
            },
          ];

          // Filter based on active tab
          let filteredOrders = mockOrders;
          if (activeTab !== 0) {
            filteredOrders = mockOrders.filter(
              (order) => order.status === tabOptions[activeTab]
            );
          }

          // Filter based on search query
          if (searchQuery) {
            filteredOrders = filteredOrders.filter(
              (order) =>
                order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.items.some((item) =>
                  item.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
          }

          setOrders(filteredOrders);
          setTotalPages(Math.ceil(filteredOrders.length / 5));
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to load orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [activeTab, searchQuery, page]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle color="success" />;
      case "Shipped":
        return <LocalShipping color="info" />;
      case "Processing":
        return <CircularProgress size={20} color="warning" />;
      case "Cancelled":
        return <ErrorOutline color="error" />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Orders
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            mb: 2,
          }}
        >
          {tabOptions.map((tab, index) => (
            <Tab key={index} label={tab} />
          ))}
        </Tabs>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            placeholder="Search orders..."
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ width: { xs: "100%", sm: "300px" } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
            <Button startIcon={<Sort />} size="small">
              Sort
            </Button>
            <Button startIcon={<FilterList />} size="small">
              Filter
            </Button>
          </Box>
        </Box>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      ) : orders.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            No orders found
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {activeTab === 0
              ? "You haven't placed any orders yet."
              : `You don't have any ${tabOptions[
                  activeTab
                ].toLowerCase()} orders.`}
          </Typography>
          <Button variant="contained" component={Link} to="/products">
            Start Shopping
          </Button>
        </Paper>
      ) : (
        <>
          {orders.map((order) => (
            <Paper key={order.id} sx={{ mb: 3, overflow: "hidden" }}>
              <Box sx={{ p: 2, bgcolor: "background.default" }}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="subtitle2" color="text.secondary">
                      ORDER PLACED
                    </Typography>
                    <Typography variant="body2">
                      {formatDate(order.date)}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Typography variant="subtitle2" color="text.secondary">
                      TOTAL
                    </Typography>
                    <Typography variant="body2">
                      ${order.total.toFixed(2)}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Typography variant="subtitle2" color="text.secondary">
                      ORDER # {order.id}
                    </Typography>
                    <Link
                      to={`/orders/${order.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography variant="body2" color="primary">
                        View order details
                      </Typography>
                    </Link>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={3}
                    sx={{ textAlign: { xs: "left", sm: "right" } }}
                  >
                    <Chip
                      icon={getStatusIcon(order.status)}
                      label={order.status}
                      color={
                        order.status === "Delivered"
                          ? "success"
                          : order.status === "Shipped"
                          ? "info"
                          : order.status === "Processing"
                          ? "warning"
                          : "default"
                      }
                      variant={
                        order.status === "Cancelled" ? "outlined" : "filled"
                      }
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              <Box sx={{ p: 2 }}>
                <Grid container spacing={2}>
                  {order.items.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            mr: 2,
                            bgcolor: "grey.100",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </Box>
                        <Box>
                          <Typography
                            variant="body2"
                            noWrap
                            sx={{ maxWidth: 200 }}
                          >
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Qty: {item.quantity}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    component={Link}
                    to={`/orders/${order.id}`}
                    startIcon={<Visibility />}
                    size="small"
                  >
                    View Details
                  </Button>

                  {order.status === "Delivered" && (
                    <Button
                      component={Link}
                      to={`/review/${order.id}`}
                      size="small"
                      color="primary"
                    >
                      Write a Review
                    </Button>
                  )}

                  {order.status === "Processing" && (
                    <Button size="small" color="error">
                      Cancel Order
                    </Button>
                  )}
                </Box>
              </Box>
            </Paper>
          ))}

          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default OrderHistory;
