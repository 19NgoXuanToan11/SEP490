import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  ShoppingBag,
  People,
  CompareArrows,
  AttachMoney,
  TrendingUp,
  TrendingDown,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
} from "chart.js";
import { Pie, Line, Bar } from "react-chartjs-2";
import AdminLayout from "../../components/admin/AdminLayout";

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Here you would fetch dashboard data from your API
        // For now, we'll use mock data
        setTimeout(() => {
          const mockStats = {
            totalUsers: 1248,
            totalProducts: 3567,
            totalExchanges: 892,
            totalRevenue: 28750.45,
            recentUsers: [
              {
                id: 1,
                name: "John Doe",
                email: "john.doe@example.com",
                avatar: "https://via.placeholder.com/40",
                joinedDate: "2023-07-15",
              },
              {
                id: 2,
                name: "Jane Smith",
                email: "jane.smith@example.com",
                avatar: "https://via.placeholder.com/40",
                joinedDate: "2023-07-14",
              },
              {
                id: 3,
                name: "Mike Johnson",
                email: "mike.johnson@example.com",
                avatar: "https://via.placeholder.com/40",
                joinedDate: "2023-07-13",
              },
              {
                id: 4,
                name: "Sarah Williams",
                email: "sarah.williams@example.com",
                avatar: "https://via.placeholder.com/40",
                joinedDate: "2023-07-12",
              },
            ],
            recentProducts: [
              {
                id: 101,
                name: "iPhone 13 Pro",
                price: 699.99,
                image: "https://via.placeholder.com/40",
                seller: "John Doe",
                listedDate: "2023-07-15",
              },
              {
                id: 102,
                name: "Sony WH-1000XM4",
                price: 249.99,
                image: "https://via.placeholder.com/40",
                seller: "Jane Smith",
                listedDate: "2023-07-14",
              },
              {
                id: 103,
                name: "MacBook Air M1",
                price: 799.99,
                image: "https://via.placeholder.com/40",
                seller: "Mike Johnson",
                listedDate: "2023-07-13",
              },
              {
                id: 104,
                name: "Samsung Galaxy S21",
                price: 599.99,
                image: "https://via.placeholder.com/40",
                seller: "Sarah Williams",
                listedDate: "2023-07-12",
              },
            ],
            recentExchanges: [
              {
                id: 201,
                initiator: "John Doe",
                receiver: "Jane Smith",
                status: "completed",
                date: "2023-07-15",
              },
              {
                id: 202,
                initiator: "Mike Johnson",
                receiver: "Sarah Williams",
                status: "pending",
                date: "2023-07-14",
              },
              {
                id: 203,
                initiator: "David Brown",
                receiver: "John Doe",
                status: "accepted",
                date: "2023-07-13",
              },
              {
                id: 204,
                initiator: "Jane Smith",
                receiver: "Mike Johnson",
                status: "rejected",
                date: "2023-07-12",
              },
            ],
            userGrowth: {
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
              data: [120, 150, 180, 220, 280, 320, 380],
            },
            revenueData: {
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
              data: [2500, 3200, 3800, 4100, 4500, 5200, 5450],
            },
            categoryDistribution: {
              labels: [
                "Smartphones",
                "Laptops",
                "Tablets",
                "Audio",
                "Cameras",
                "Other",
              ],
              data: [35, 25, 15, 10, 8, 7],
            },
          };

          setStats(mockStats);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Failed to load dashboard data. Please try again.");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const userGrowthData = {
    labels: stats?.userGrowth.labels || [],
    datasets: [
      {
        label: "New Users",
        data: stats?.userGrowth.data || [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const revenueData = {
    labels: stats?.revenueData.labels || [],
    datasets: [
      {
        label: "Revenue ($)",
        data: stats?.revenueData.data || [],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const categoryData = {
    labels: stats?.categoryDistribution.labels || [],
    datasets: [
      {
        data: stats?.categoryDistribution.data || [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <AdminLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        ) : (
          <>
            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                        <People />
                      </Avatar>
                      <Box>
                        <Typography variant="h5" component="div">
                          {stats.totalUsers.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Total Users
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                      <TrendingUp
                        color="success"
                        fontSize="small"
                        sx={{ mr: 0.5 }}
                      />
                      <Typography variant="body2" color="success.main">
                        +12% from last month
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar sx={{ bgcolor: "secondary.main", mr: 2 }}>
                        <ShoppingBag />
                      </Avatar>
                      <Box>
                        <Typography variant="h5" component="div">
                          {stats.totalProducts.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Total Products
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                      <TrendingUp
                        color="success"
                        fontSize="small"
                        sx={{ mr: 0.5 }}
                      />
                      <Typography variant="body2" color="success.main">
                        +8% from last month
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar sx={{ bgcolor: "info.main", mr: 2 }}>
                        <CompareArrows />
                      </Avatar>
                      <Box>
                        <Typography variant="h5" component="div">
                          {stats.totalExchanges.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Total Exchanges
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                      <TrendingUp
                        color="success"
                        fontSize="small"
                        sx={{ mr: 0.5 }}
                      />
                      <Typography variant="body2" color="success.main">
                        +15% from last month
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar sx={{ bgcolor: "success.main", mr: 2 }}>
                        <AttachMoney />
                      </Avatar>
                      <Box>
                        <Typography variant="h5" component="div">
                          ${stats.totalRevenue.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Total Revenue
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                      <TrendingDown
                        color="error"
                        fontSize="small"
                        sx={{ mr: 0.5 }}
                      />
                      <Typography variant="body2" color="error.main">
                        -3% from last month
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Charts */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={8}>
                <Paper sx={{ p: 3, height: "100%" }}>
                  <Typography variant="h6" gutterBottom>
                    Revenue Overview
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <Bar
                      data={revenueData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: "top",
                          },
                          title: {
                            display: false,
                          },
                        },
                      }}
                    />
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, height: "100%" }}>
                  <Typography variant="h6" gutterBottom>
                    Product Categories
                  </Typography>
                  <Box
                    sx={{
                      height: 300,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Pie
                      data={categoryData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: "bottom",
                          },
                        },
                      }}
                    />
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6">User Growth</Typography>
                    <Button component={Link} to="/admin/users" size="small">
                      View All
                    </Button>
                  </Box>
                  <Box sx={{ height: 250 }}>
                    <Line
                      data={userGrowthData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                          },
                        },
                      }}
                    />
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6">Recent Users</Typography>
                    <Button component={Link} to="/admin/users" size="small">
                      View All
                    </Button>
                  </Box>
                  <List>
                    {stats.recentUsers.map((user) => (
                      <React.Fragment key={user.id}>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar src={user.avatar} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={user.name}
                            secondary={user.email}
                          />
                          <Typography variant="caption" color="text.secondary">
                            Joined{" "}
                            {new Date(user.joinedDate).toLocaleDateString()}
                          </Typography>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </React.Fragment>
                    ))}
                  </List>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6">Recent Products</Typography>
                    <Button component={Link} to="/admin/products" size="small">
                      View All
                    </Button>
                  </Box>
                  <List>
                    {stats.recentProducts.map((product) => (
                      <React.Fragment key={product.id}>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar src={product.image} variant="square" />
                          </ListItemAvatar>
                          <ListItemText
                            primary={product.name}
                            secondary={`Seller: ${product.seller}`}
                          />
                          <Box sx={{ textAlign: "right" }}>
                            <Typography variant="body2" color="primary">
                              ${product.price.toFixed(2)}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Listed{" "}
                              {new Date(
                                product.listedDate
                              ).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </React.Fragment>
                    ))}
                  </List>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6">Recent Exchanges</Typography>
                    <Button component={Link} to="/admin/exchanges" size="small">
                      View All
                    </Button>
                  </Box>
                  <List>
                    {stats.recentExchanges.map((exchange) => (
                      <React.Fragment key={exchange.id}>
                        <ListItem>
                          <ListItemText
                            primary={`${exchange.initiator} ↔ ${exchange.receiver}`}
                            secondary={`Status: ${
                              exchange.status.charAt(0).toUpperCase() +
                              exchange.status.slice(1)
                            }`}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {new Date(exchange.date).toLocaleDateString()}
                          </Typography>
                        </ListItem>
                        <Divider component="li" />
                      </React.Fragment>
                    ))}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </AdminLayout>
  );
};

export default Dashboard;
