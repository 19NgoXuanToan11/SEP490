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
  Menu,
  MenuItem,
  Popover,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  Switch,
  Collapse,
  Stack,
  Tooltip,
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
  ShoppingBag,
  ArrowUpward,
  ArrowDownward,
  CalendarMonth,
  AttachMoney,
  Clear,
  DateRange,
} from "@mui/icons-material";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]); // Store original orders for filtering
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // State for sort and filter functionality
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [sortOption, setSortOption] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [dateRange, setDateRange] = useState(["", ""]);
  const [activeFilters, setActiveFilters] = useState([]);

  const tabOptions = [
    "All Orders",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const sortOptions = [
    {
      value: "newest",
      label: "Newest First",
      icon: <ArrowDownward fontSize="small" />,
    },
    {
      value: "oldest",
      label: "Oldest First",
      icon: <ArrowUpward fontSize="small" />,
    },
    {
      value: "price-high-low",
      label: "Price: High to Low",
      icon: <AttachMoney fontSize="small" />,
    },
    {
      value: "price-low-high",
      label: "Price: Low to High",
      icon: <AttachMoney fontSize="small" />,
    },
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
                  image:
                    "https://i.pinimg.com/736x/a1/a6/d7/a1a6d77b15d527a100251bd39bf00783.jpg",
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
                  image:
                    "https://i.pinimg.com/474x/c5/b4/4f/c5b44fc959177707ff5ee8ed0f3d8a1a.jpg",
                  quantity: 1,
                },
                {
                  id: 3,
                  name: "AirPods Pro",
                  image:
                    "https://i.pinimg.com/736x/c9/81/55/c98155f19270a5d8bfce70646b26a1c5.jpg",
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
                  image:
                    "https://i.pinimg.com/736x/86/7f/f6/867ff681b4d51e76a0e5a3b9b13b9c17.jpg",
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
                  image:
                    "https://i.pinimg.com/736x/af/a1/81/afa1811a8e7f920b9b6ee2e2485674b8.jpg",
                  quantity: 1,
                },
              ],
              total: 499.99,
            },
            {
              id: "ORD-123460",
              date: "2023-09-05T09:15:00Z",
              status: "Processing",
              items: [
                {
                  id: 6,
                  name: "Sony WH-1000XM4",
                  image:
                    "https://i.pinimg.com/736x/c3/8f/ab/c38fabd0168efa39bf9f86ccbf6b881e.jpg",
                  quantity: 1,
                },
              ],
              total: 349.99,
            },
            {
              id: "ORD-123461",
              date: "2023-09-15T14:30:00Z",
              status: "Delivered",
              items: [
                {
                  id: 7,
                  name: "Nintendo Switch",
                  image:
                    "https://i.pinimg.com/736x/6c/6b/e0/6c6be0ddbad3a8143e35f527f194239f.jpg",
                  quantity: 1,
                },
              ],
              total: 299.99,
            },
          ];

          setAllOrders(mockOrders);

          // Apply filters
          let filteredOrders = [...mockOrders];

          // Filter by tab status
          if (activeTab !== 0) {
            filteredOrders = filteredOrders.filter(
              (order) => order.status === tabOptions[activeTab]
            );
          }

          // Filter by search query
          if (searchQuery) {
            filteredOrders = filteredOrders.filter(
              (order) =>
                order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.items.some((item) =>
                  item.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
          }

          // Apply price range filter
          if (activeFilters.includes("price")) {
            filteredOrders = filteredOrders.filter(
              (order) =>
                order.total >= priceRange[0] && order.total <= priceRange[1]
            );
          }

          // Apply date range filter
          if (activeFilters.includes("date") && dateRange[0] && dateRange[1]) {
            const startDate = new Date(dateRange[0]);
            const endDate = new Date(dateRange[1]);
            endDate.setHours(23, 59, 59, 999); // End of day

            filteredOrders = filteredOrders.filter((order) => {
              const orderDate = new Date(order.date);
              return orderDate >= startDate && orderDate <= endDate;
            });
          }

          // Apply sorting
          filteredOrders = sortOrders(filteredOrders, sortOption);

          setOrders(filteredOrders);
          setTotalPages(Math.ceil(filteredOrders.length / 5));
          setLoading(false);
        }, 800);
      } catch (err) {
        setError("Failed to load orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [
    activeTab,
    searchQuery,
    sortOption,
    activeFilters,
    priceRange,
    dateRange,
    page,
  ]);

  const sortOrders = (ordersToSort, sortType) => {
    return [...ordersToSort].sort((a, b) => {
      switch (sortType) {
        case "newest":
          return new Date(b.date) - new Date(a.date);
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        case "price-high-low":
          return b.total - a.total;
        case "price-low-high":
          return a.total - b.total;
        default:
          return 0;
      }
    });
  };

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

  // Sort menu handlers
  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const handleSortOptionSelect = (option) => {
    setSortOption(option);
    setSortAnchorEl(null);
  };

  // Filter menu handlers
  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleDateRangeChange = (index, newValue) => {
    const newDateRange = [...dateRange];
    newDateRange[index] = newValue;
    setDateRange(newDateRange);
  };

  const toggleFilter = (filter) => {
    setActiveFilters((prev) => {
      if (prev.includes(filter)) {
        return prev.filter((f) => f !== filter);
      } else {
        return [...prev, filter];
      }
    });
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setPriceRange([0, 2000]);
    setDateRange(["", ""]);
    setFilterAnchorEl(null);
  };

  const applyFilters = () => {
    setPage(1);
    setFilterAnchorEl(null);
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
        return <ErrorOutline style={{ color: "white" }} />;
      default:
        return null;
    }
  };

  // Get current sort option label
  const getCurrentSortLabel = () => {
    const option = sortOptions.find((opt) => opt.value === sortOption);
    return option ? option.label : "Sort";
  };

  // Get filter summary
  const getFilterSummary = () => {
    const summaries = [];

    if (activeFilters.includes("price")) {
      summaries.push(`$${priceRange[0]} - $${priceRange[1]}`);
    }

    if (activeFilters.includes("date") && dateRange[0] && dateRange[1]) {
      const startDate = new Date(dateRange[0]).toLocaleDateString();
      const endDate = new Date(dateRange[1]).toLocaleDateString();
      summaries.push(`${startDate} - ${endDate}`);
    }

    return summaries.join(", ") || "Filter";
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          bgcolor: "#0f172a",
          minHeight: "100vh",
          py: 4,
          color: "white",
          background: "linear-gradient(145deg, #0f172a 0%, #1e293b 100%)",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h1"
            sx={{
              mb: 4,
              fontWeight: 700,
              color: "white",
              textShadow: "0 2px 10px rgba(0,0,0,0.2)",
              position: "relative",
              display: "inline-block",
              pb: 1,
              "&:after": {
                content: '""',
                position: "absolute",
                width: "60px",
                height: "3px",
                bottom: 0,
                left: 0,
                backgroundImage: "linear-gradient(90deg, #6366f1, #8b5cf6)",
              },
            }}
          >
            My Orders
          </Typography>

          <Paper
            elevation={0}
            sx={{
              mb: 4,
              bgcolor: "rgba(30, 41, 59, 0.7)",
              backdropFilter: "blur(12px)",
              borderRadius: 3,
              overflow: "hidden",
              border: "1px solid rgba(99, 102, 241, 0.2)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                px: 2,
                pt: 2,
                borderBottom: 0,
                "& .MuiTab-root": {
                  color: "rgba(255, 255, 255, 0.6)",
                  borderRadius: "2rem",
                  px: 3,
                  py: 1,
                  mr: 1,
                  minHeight: "40px",
                  transition: "all 0.3s ease",
                  "&.Mui-selected": {
                    color: "#fff",
                    boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)",
                    background: "linear-gradient(45deg, #6366f1, #8b5cf6)",
                  },
                },
                "& .MuiTabs-indicator": {
                  display: "none",
                },
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
                p: 3,
                borderTop: "1px solid rgba(99, 102, 241, 0.1)",
              }}
            >
              <TextField
                placeholder="Search orders..."
                size="small"
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{
                  width: { xs: "100%", sm: "300px" },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "2rem",
                    background: "rgba(15, 23, 42, 0.5)",
                    color: "white",
                    padding: "4px 6px 4px 16px",
                    "& fieldset": {
                      borderColor: "rgba(99, 102, 241, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(99, 102, 241, 0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#6366f1",
                      boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.15)",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                    "&::placeholder": {
                      color: "rgba(255, 255, 255, 0.5)",
                      opacity: 1,
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
                    </InputAdornment>
                  ),
                  ...(searchQuery && {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() => setSearchQuery("")}
                          sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                        >
                          <Clear fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }),
                }}
              />

              <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
                <Button
                  startIcon={<Sort />}
                  endIcon={
                    sortAnchorEl ? (
                      <ArrowUpward fontSize="small" />
                    ) : (
                      <ArrowDownward fontSize="small" />
                    )
                  }
                  size="small"
                  onClick={handleSortClick}
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    borderColor: "rgba(99, 102, 241, 0.4)",
                    borderRadius: "2rem",
                    px: 2.5,
                    py: 0.8,
                    backdropFilter: "blur(5px)",
                    backgroundColor: sortAnchorEl
                      ? "rgba(99, 102, 241, 0.2)"
                      : "rgba(30, 41, 59, 0.4)",
                    fontWeight: 500,
                    transition: "all 0.3s",
                    "&:hover": {
                      borderColor: "#6366f1",
                      backgroundColor: "rgba(99, 102, 241, 0.15)",
                      transform: "translateY(-2px)",
                    },
                  }}
                  variant="outlined"
                >
                  {getCurrentSortLabel()}
                </Button>
                <Button
                  startIcon={<FilterList />}
                  endIcon={
                    activeFilters.length > 0 ? (
                      <Chip
                        size="small"
                        label={activeFilters.length}
                        sx={{
                          height: 20,
                          fontSize: "0.7rem",
                          background:
                            "linear-gradient(45deg, #6366f1, #8b5cf6)",
                          color: "white",
                        }}
                      />
                    ) : null
                  }
                  size="small"
                  onClick={handleFilterClick}
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    borderColor: "rgba(99, 102, 241, 0.4)",
                    borderRadius: "2rem",
                    px: 2.5,
                    py: 0.8,
                    backdropFilter: "blur(5px)",
                    backgroundColor:
                      filterAnchorEl || activeFilters.length > 0
                        ? "rgba(99, 102, 241, 0.2)"
                        : "rgba(30, 41, 59, 0.4)",
                    fontWeight: 500,
                    transition: "all 0.3s",
                    "&:hover": {
                      borderColor: "#6366f1",
                      backgroundColor: "rgba(99, 102, 241, 0.15)",
                      transform: "translateY(-2px)",
                    },
                  }}
                  variant="outlined"
                >
                  {getFilterSummary()}
                </Button>
              </Box>
            </Box>
          </Paper>

          {/* Sort Menu */}
          <Menu
            anchorEl={sortAnchorEl}
            open={Boolean(sortAnchorEl)}
            onClose={handleSortClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                bgcolor: "rgba(30, 41, 59, 0.95)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(99, 102, 241, 0.2)",
                borderRadius: 2,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                "& .MuiMenuItem-root": {
                  color: "white",
                  px: 2,
                  py: 1.2,
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: "rgba(99, 102, 241, 0.2)",
                  },
                  "&.selected": {
                    bgcolor: "rgba(99, 102, 241, 0.3)",
                    fontWeight: 600,
                  },
                },
              },
            }}
          >
            {sortOptions.map((option) => (
              <MenuItem
                key={option.value}
                onClick={() => handleSortOptionSelect(option.value)}
                className={sortOption === option.value ? "selected" : ""}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {option.icon}
                    <Typography sx={{ ml: 1.5 }}>{option.label}</Typography>
                  </Box>
                  {sortOption === option.value && (
                    <CheckCircle fontSize="small" sx={{ color: "#6366f1" }} />
                  )}
                </Box>
              </MenuItem>
            ))}
          </Menu>

          {/* Filter Menu */}
          <Popover
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={handleFilterClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              sx: {
                mt: 1.5,
                p: 3,
                width: 320,
                bgcolor: "rgba(30, 41, 59, 0.95)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(99, 102, 241, 0.2)",
                borderRadius: 3,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                color: "white",
              },
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FilterList sx={{ mr: 1 }} />
                Filter Orders
              </Typography>

              <Divider sx={{ borderColor: "rgba(99, 102, 241, 0.1)", mb: 2 }} />

              {/* Price Range Filter */}
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={activeFilters.includes("price")}
                        onChange={() => toggleFilter("price")}
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "#6366f1",
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                            {
                              backgroundColor: "#6366f1",
                            },
                        }}
                      />
                    }
                    label={
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <AttachMoney fontSize="small" sx={{ mr: 0.5 }} />
                        Price Range
                      </Typography>
                    }
                  />
                </Box>

                <Collapse in={activeFilters.includes("price")}>
                  <Box sx={{ px: 1, pt: 1, pb: 2 }}>
                    <Slider
                      value={priceRange}
                      onChange={handlePriceRangeChange}
                      valueLabelDisplay="auto"
                      min={0}
                      max={2000}
                      step={50}
                      sx={{
                        color: "#6366f1",
                        "& .MuiSlider-thumb": {
                          "&:hover, &.Mui-focusVisible": {
                            boxShadow: "0 0 0 8px rgba(99, 102, 241, 0.2)",
                          },
                        },
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 1,
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="rgba(255, 255, 255, 0.7)"
                      >
                        ${priceRange[0]}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="rgba(255, 255, 255, 0.7)"
                      >
                        ${priceRange[1]}
                      </Typography>
                    </Box>
                  </Box>
                </Collapse>
              </Box>

              {/* Date Range Filter */}
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={activeFilters.includes("date")}
                        onChange={() => toggleFilter("date")}
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "#6366f1",
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                            {
                              backgroundColor: "#6366f1",
                            },
                        }}
                      />
                    }
                    label={
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <DateRange fontSize="small" sx={{ mr: 0.5 }} />
                        Date Range
                      </Typography>
                    }
                  />
                </Box>

                <Collapse in={activeFilters.includes("date")}>
                  <Stack spacing={2} sx={{ px: 1, pt: 1, pb: 2 }}>
                    <TextField
                      label="Start Date"
                      type="date"
                      value={dateRange[0]}
                      onChange={(e) => handleDateRangeChange(0, e.target.value)}
                      size="small"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "white",
                          bgcolor: "rgba(15, 23, 42, 0.5)",
                          "& fieldset": {
                            borderColor: "rgba(99, 102, 241, 0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(99, 102, 241, 0.5)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#6366f1",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255, 255, 255, 0.7)",
                        },
                        "& input": {
                          color: "white",
                        },
                      }}
                    />
                    <TextField
                      label="End Date"
                      type="date"
                      value={dateRange[1]}
                      onChange={(e) => handleDateRangeChange(1, e.target.value)}
                      size="small"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "white",
                          bgcolor: "rgba(15, 23, 42, 0.5)",
                          "& fieldset": {
                            borderColor: "rgba(99, 102, 241, 0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(99, 102, 241, 0.5)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#6366f1",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255, 255, 255, 0.7)",
                        },
                        "& input": {
                          color: "white",
                        },
                      }}
                    />
                  </Stack>
                </Collapse>
              </Box>

              <Divider
                sx={{ borderColor: "rgba(99, 102, 241, 0.1)", mt: 2, mb: 3 }}
              />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Button
                  variant="text"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: "0.875rem",
                    "&:hover": {
                      color: "white",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                    },
                  }}
                  onClick={clearAllFilters}
                >
                  Clear All
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    background: "linear-gradient(45deg, #6366f1, #8b5cf6)",
                    borderRadius: "2rem",
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                    "&:hover": {
                      boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)",
                    },
                  }}
                  onClick={applyFilters}
                  disabled={activeFilters.length === 0}
                >
                  Apply Filters
                </Button>
              </Box>
            </Box>
          </Popover>

          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              my={8}
              flexDirection="column"
            >
              <CircularProgress
                sx={{
                  color: "#6366f1",
                  mb: 2,
                  "& .MuiCircularProgress-circle": {
                    strokeLinecap: "round",
                  },
                }}
              />
              <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                Loading your orders...
              </Typography>
            </Box>
          ) : error ? (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                bgcolor: "rgba(239, 68, 68, 0.1)",
                color: "#f87171",
                borderRadius: 2,
                border: "1px solid rgba(239, 68, 68, 0.2)",
              }}
            >
              {error}
            </Alert>
          ) : orders.length === 0 ? (
            <Paper
              sx={{
                p: 6,
                textAlign: "center",
                bgcolor: "rgba(30, 41, 59, 0.7)",
                backdropFilter: "blur(12px)",
                borderRadius: 3,
                border: "1px solid rgba(99, 102, 241, 0.2)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
              }}
            >
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  margin: "0 auto 2rem",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(45deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05))",
                  border: "1px solid rgba(99, 102, 241, 0.2)",
                }}
              >
                <ShoppingBag
                  sx={{
                    fontSize: 50,
                    color: "rgba(99, 102, 241, 0.7)",
                  }}
                />
              </Box>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: "white", fontWeight: 600 }}
              >
                No orders found
              </Typography>
              <Typography
                variant="body1"
                color="rgba(255, 255, 255, 0.7)"
                paragraph
                sx={{ maxWidth: 500, mx: "auto", mb: 4 }}
              >
                {activeTab === 0
                  ? activeFilters.length > 0
                    ? "No orders match your filter criteria. Try adjusting your filters."
                    : "Your order history is empty. Start exploring our products to find something you love!"
                  : `You don't have any ${tabOptions[
                      activeTab
                    ].toLowerCase()} orders.`}
              </Typography>
              {activeFilters.length > 0 ? (
                <Button
                  variant="contained"
                  onClick={clearAllFilters}
                  sx={{
                    background: "linear-gradient(45deg, #6366f1, #8b5cf6)",
                    borderRadius: "2rem",
                    px: 4,
                    py: 1.2,
                    fontWeight: 600,
                    boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)",
                    transition: "all 0.3s",
                    "&:hover": {
                      boxShadow: "0 6px 20px rgba(99, 102, 241, 0.6)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Clear Filters
                </Button>
              ) : (
                <Button
                  variant="contained"
                  component={Link}
                  to="/products"
                  sx={{
                    background: "linear-gradient(45deg, #6366f1, #8b5cf6)",
                    borderRadius: "2rem",
                    px: 4,
                    py: 1.2,
                    fontWeight: 600,
                    boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)",
                    transition: "all 0.3s",
                    "&:hover": {
                      boxShadow: "0 6px 20px rgba(99, 102, 241, 0.6)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Start Shopping
                </Button>
              )}
            </Paper>
          ) : (
            <>
              {/* Active filters display */}
              {activeFilters.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    mb: 3,
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255, 255, 255, 0.7)", mr: 1 }}
                  >
                    Active filters:
                  </Typography>

                  {activeFilters.includes("price") && (
                    <Chip
                      label={`Price: $${priceRange[0]} - $${priceRange[1]}`}
                      onDelete={() => toggleFilter("price")}
                      sx={{
                        bgcolor: "rgba(99, 102, 241, 0.15)",
                        color: "white",
                        borderRadius: "2rem",
                        "& .MuiChip-deleteIcon": {
                          color: "rgba(255, 255, 255, 0.7)",
                          "&:hover": { color: "white" },
                        },
                      }}
                    />
                  )}

                  {activeFilters.includes("date") &&
                    dateRange[0] &&
                    dateRange[1] && (
                      <Chip
                        label={`Date: ${new Date(
                          dateRange[0]
                        ).toLocaleDateString()} - ${new Date(
                          dateRange[1]
                        ).toLocaleDateString()}`}
                        onDelete={() => toggleFilter("date")}
                        sx={{
                          bgcolor: "rgba(99, 102, 241, 0.15)",
                          color: "white",
                          borderRadius: "2rem",
                          "& .MuiChip-deleteIcon": {
                            color: "rgba(255, 255, 255, 0.7)",
                            "&:hover": { color: "white" },
                          },
                        }}
                      />
                    )}

                  <Chip
                    label="Clear all"
                    onClick={clearAllFilters}
                    variant="outlined"
                    sx={{
                      borderColor: "rgba(239, 68, 68, 0.5)",
                      color: "#ef4444",
                      borderRadius: "2rem",
                      "&:hover": {
                        bgcolor: "rgba(239, 68, 68, 0.08)",
                      },
                    }}
                  />
                </Box>
              )}

              {/* Sort info display */}
              {sortOption !== "newest" && (
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255, 255, 255, 0.7)", mr: 1 }}
                  >
                    Sorted by:
                  </Typography>
                  <Chip
                    label={getCurrentSortLabel()}
                    onDelete={() => setSortOption("newest")}
                    size="small"
                    sx={{
                      bgcolor: "rgba(99, 102, 241, 0.15)",
                      color: "white",
                      borderRadius: "2rem",
                      "& .MuiChip-deleteIcon": {
                        color: "rgba(255, 255, 255, 0.7)",
                        "&:hover": { color: "white" },
                      },
                    }}
                  />
                </Box>
              )}

              {orders.map((order) => (
                <Paper
                  key={order.id}
                  sx={{
                    mb: 3,
                    overflow: "hidden",
                    bgcolor: "rgba(30, 41, 59, 0.7)",
                    backdropFilter: "blur(12px)",
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    border: "1px solid rgba(99, 102, 241, 0.2)",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 12px 28px rgba(0, 0, 0, 0.3)",
                      borderColor: "rgba(99, 102, 241, 0.4)",
                      "& .order-details-link": {
                        color: "#8b5cf6",
                        textDecoration: "underline",
                      },
                    },
                  }}
                >
                  <Box
                    sx={{
                      p: 3,
                      position: "relative",
                      "&::before":
                        order.status === "Delivered" ||
                        order.status === "Shipped" ||
                        order.status === "Processing"
                          ? {
                              content: '""',
                              position: "absolute",
                              left: 0,
                              top: 0,
                              bottom: 0,
                              width: "4px",
                              background:
                                order.status === "Delivered"
                                  ? "linear-gradient(to bottom, #10b981, #059669)"
                                  : order.status === "Shipped"
                                  ? "linear-gradient(to bottom, #0ea5e9, #0284c7)"
                                  : "linear-gradient(to bottom, #f59e0b, #d97706)",
                            }
                          : {},
                    }}
                  >
                    <Grid container alignItems="center" spacing={3}>
                      <Grid item xs={12} sm={3}>
                        <Typography
                          variant="subtitle2"
                          color="rgba(255, 255, 255, 0.6)"
                          sx={{
                            fontSize: "0.75rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            mb: 0.5,
                          }}
                        >
                          ORDER PLACED
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "white",
                            fontWeight: 500,
                            fontSize: "0.9rem",
                          }}
                        >
                          {formatDate(order.date)}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={3}>
                        <Typography
                          variant="subtitle2"
                          color="rgba(255, 255, 255, 0.6)"
                          sx={{
                            fontSize: "0.75rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            mb: 0.5,
                          }}
                        >
                          TOTAL
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "white",
                            fontWeight: 700,
                            fontSize: "0.95rem",
                          }}
                        >
                          ${order.total.toFixed(2)}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={3}>
                        <Typography
                          variant="subtitle2"
                          color="rgba(255, 255, 255, 0.6)"
                          sx={{
                            fontSize: "0.75rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            mb: 0.5,
                          }}
                        >
                          ORDER # {order.id}
                        </Typography>
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
                              : "error"
                          }
                          variant="filled"
                          sx={{
                            "& .MuiChip-icon": {
                              color: "inherit",
                            },
                            ...(order.status === "Delivered" && {
                              background:
                                "linear-gradient(45deg, #10b981, #059669)",
                              boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)",
                            }),
                            ...(order.status === "Shipped" && {
                              background:
                                "linear-gradient(45deg, #0ea5e9, #0284c7)",
                              boxShadow: "0 4px 12px rgba(14, 165, 233, 0.2)",
                            }),
                            ...(order.status === "Processing" && {
                              background:
                                "linear-gradient(45deg, #f59e0b, #d97706)",
                              boxShadow: "0 4px 12px rgba(245, 158, 11, 0.2)",
                            }),
                            ...(order.status === "Cancelled" && {
                              background:
                                "linear-gradient(45deg, #ef4444, #dc2626)",
                              boxShadow: "0 4px 12px rgba(239, 68, 68, 0.2)",
                              color: "white",
                            }),
                            borderRadius: "2rem",
                            fontWeight: 600,
                            px: 2,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>

                  <Divider sx={{ borderColor: "rgba(99, 102, 241, 0.1)" }} />

                  <Box sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                      {order.items.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              transition: "transform 0.2s",
                              "&:hover": {
                                transform: "translateX(5px)",
                              },
                            }}
                          >
                            <Box
                              sx={{
                                width: 70,
                                height: 70,
                                mr: 2,
                                bgcolor: "rgba(42, 52, 67, 0.7)",
                                borderRadius: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden",
                                border: "1px solid rgba(99, 102, 241, 0.2)",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                p: 1,
                              }}
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                style={{
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                  objectFit: "contain",
                                  borderRadius: "4px",
                                }}
                              />
                            </Box>
                            <Box>
                              <Typography
                                variant="body2"
                                noWrap
                                sx={{
                                  maxWidth: 200,
                                  color: "white",
                                  fontWeight: 600,
                                  mb: 0.5,
                                  fontSize: "0.95rem",
                                }}
                              >
                                {item.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="rgba(255, 255, 255, 0.7)"
                                sx={{ fontSize: "0.85rem" }}
                              >
                                Qty: {item.quantity}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>

                    <Box
                      sx={{
                        mt: 3,
                        display: "flex",
                        justifyContent: "space-between",
                        borderTop: "1px solid rgba(99, 102, 241, 0.1)",
                        pt: 2.5,
                      }}
                    >
                      {order.status === "Processing" && (
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{
                            color: "#ef4444",
                            borderColor: "rgba(239, 68, 68, 0.5)",
                            borderRadius: "2rem",
                            px: 2.5,
                            py: 0.8,
                            fontWeight: 600,
                            backgroundImage:
                              "linear-gradient(rgba(239, 68, 68, 0), rgba(239, 68, 68, 0.05))",
                            backdropFilter: "blur(5px)",
                            transition: "all 0.3s",
                            "&:hover": {
                              borderColor: "#ef4444",
                              backgroundColor: "rgba(239, 68, 68, 0.15)",
                              transform: "translateY(-2px)",
                              boxShadow: "0 4px 10px rgba(239, 68, 68, 0.2)",
                            },
                          }}
                        >
                          Cancel Order
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Paper>
              ))}

              {totalPages > 1 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 5,
                    mb: 2,
                  }}
                >
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    sx={{
                      "& .MuiPaginationItem-root": {
                        color: "rgba(255, 255, 255, 0.7)",
                        border: "1px solid rgba(99, 102, 241, 0.2)",
                        backdropFilter: "blur(5px)",
                        backgroundColor: "rgba(30, 41, 59, 0.4)",
                      },
                      "& .Mui-selected": {
                        backgroundColor: "rgba(99, 102, 241, 0.4)",
                        color: "white",
                        boxShadow: "0 2px 8px rgba(99, 102, 241, 0.3)",
                      },
                      "& .MuiPaginationItem-root:hover": {
                        backgroundColor: "rgba(99, 102, 241, 0.2)",
                      },
                    }}
                  />
                </Box>
              )}
            </>
          )}
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default OrderHistory;
