import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Tabs,
  Tab,
  Button,
  Divider,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  CompareArrows,
  Check,
  Close,
  Message,
  Delete,
  Info,
  ArrowForward,
  Search,
} from "@mui/icons-material";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const Exchange = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedExchange, setSelectedExchange] = useState(null);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchExchanges = async () => {
      setLoading(true);
      try {
        // Here you would fetch exchanges from your API
        // For now, we'll use mock data
        setTimeout(() => {
          const mockExchanges = [
            {
              id: 1,
              status: "pending",
              createdAt: "2023-07-15",
              updatedAt: "2023-07-15",
              initiator: {
                id: 1,
                name: "John Doe",
                avatar: "https://via.placeholder.com/40",
                rating: 4.8,
              },
              receiver: {
                id: 2,
                name: "Jane Smith",
                avatar: "https://via.placeholder.com/40",
                rating: 4.5,
              },
              initiatorItem: {
                id: 101,
                name: "iPhone 13 Pro",
                image: "https://via.placeholder.com/100",
                condition: "Like New",
                estimatedValue: 699.99,
              },
              receiverItem: {
                id: 201,
                name: "Samsung Galaxy S21",
                image: "https://via.placeholder.com/100",
                condition: "Good",
                estimatedValue: 599.99,
              },
              messages: [
                {
                  id: 1,
                  sender: "John Doe",
                  text: "I would like to exchange my iPhone for your Samsung. It's in great condition with no scratches.",
                  timestamp: "2023-07-15T10:30:00Z",
                },
              ],
            },
            {
              id: 2,
              status: "accepted",
              createdAt: "2023-07-10",
              updatedAt: "2023-07-12",
              initiator: {
                id: 1,
                name: "John Doe",
                avatar: "https://via.placeholder.com/40",
                rating: 4.8,
              },
              receiver: {
                id: 3,
                name: "Mike Johnson",
                avatar: "https://via.placeholder.com/40",
                rating: 4.2,
              },
              initiatorItem: {
                id: 102,
                name: "Sony WH-1000XM4",
                image: "https://via.placeholder.com/100",
                condition: "Good",
                estimatedValue: 249.99,
              },
              receiverItem: {
                id: 202,
                name: "Bose QuietComfort 45",
                image: "https://via.placeholder.com/100",
                condition: "Like New",
                estimatedValue: 279.99,
              },
              messages: [
                {
                  id: 1,
                  sender: "John Doe",
                  text: "Would you be interested in exchanging your Bose headphones for my Sony ones?",
                  timestamp: "2023-07-10T14:20:00Z",
                },
                {
                  id: 2,
                  sender: "Mike Johnson",
                  text: "Yes, I'm interested. Can you tell me more about the condition?",
                  timestamp: "2023-07-11T09:15:00Z",
                },
                {
                  id: 3,
                  sender: "John Doe",
                  text: "They're in good condition, only used for a few months. Battery life is still excellent.",
                  timestamp: "2023-07-11T10:30:00Z",
                },
                {
                  id: 4,
                  sender: "Mike Johnson",
                  text: "Sounds good. I accept the exchange.",
                  timestamp: "2023-07-12T11:45:00Z",
                },
              ],
            },
            {
              id: 3,
              status: "completed",
              createdAt: "2023-06-20",
              updatedAt: "2023-06-25",
              initiator: {
                id: 4,
                name: "Sarah Williams",
                avatar: "https://via.placeholder.com/40",
                rating: 4.9,
              },
              receiver: {
                id: 1,
                name: "John Doe",
                avatar: "https://via.placeholder.com/40",
                rating: 4.8,
              },
              initiatorItem: {
                id: 103,
                name: 'iPad Pro 11"',
                image: "https://via.placeholder.com/100",
                condition: "Like New",
                estimatedValue: 699.99,
              },
              receiverItem: {
                id: 203,
                name: "MacBook Air M1",
                image: "https://via.placeholder.com/100",
                condition: "Good",
                estimatedValue: 799.99,
              },
              messages: [
                {
                  id: 1,
                  sender: "Sarah Williams",
                  text: "Hi, I'm interested in exchanging my iPad Pro for your MacBook Air.",
                  timestamp: "2023-06-20T15:30:00Z",
                },
                {
                  id: 2,
                  sender: "John Doe",
                  text: "I might be interested. Can you add some cash on top since my MacBook is worth more?",
                  timestamp: "2023-06-21T10:15:00Z",
                },
                {
                  id: 3,
                  sender: "Sarah Williams",
                  text: "I can add $100. Would that work?",
                  timestamp: "2023-06-21T11:20:00Z",
                },
                {
                  id: 4,
                  sender: "John Doe",
                  text: "That works for me. Let's proceed with the exchange.",
                  timestamp: "2023-06-22T09:45:00Z",
                },
              ],
              reviews: [
                {
                  id: 1,
                  reviewer: "John Doe",
                  rating: 5,
                  comment:
                    "Great exchange! The iPad was in perfect condition as described.",
                  timestamp: "2023-06-25T14:30:00Z",
                },
                {
                  id: 2,
                  reviewer: "Sarah Williams",
                  rating: 5,
                  comment: "Smooth transaction. The MacBook works perfectly!",
                  timestamp: "2023-06-25T15:45:00Z",
                },
              ],
            },
            {
              id: 4,
              status: "rejected",
              createdAt: "2023-07-05",
              updatedAt: "2023-07-06",
              initiator: {
                id: 1,
                name: "John Doe",
                avatar: "https://via.placeholder.com/40",
                rating: 4.8,
              },
              receiver: {
                id: 5,
                name: "David Brown",
                avatar: "https://via.placeholder.com/40",
                rating: 4.6,
              },
              initiatorItem: {
                id: 104,
                name: "Nintendo Switch",
                image: "https://via.placeholder.com/100",
                condition: "Good",
                estimatedValue: 249.99,
              },
              receiverItem: {
                id: 204,
                name: "PlayStation 5 Controller",
                image: "https://via.placeholder.com/100",
                condition: "Like New",
                estimatedValue: 69.99,
              },
              messages: [
                {
                  id: 1,
                  sender: "John Doe",
                  text: "Would you consider exchanging your PS5 controller for my Nintendo Switch?",
                  timestamp: "2023-07-05T16:20:00Z",
                },
                {
                  id: 2,
                  sender: "David Brown",
                  text: "Sorry, that doesn't seem like a fair exchange. Your Switch is worth much more than my controller.",
                  timestamp: "2023-07-06T09:30:00Z",
                },
              ],
            },
          ];

          setExchanges(mockExchanges);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching exchanges:", error);
        setError("Failed to load exchanges. Please try again.");
        setLoading(false);
      }
    };

    fetchExchanges();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleOpenDetailDialog = (exchange) => {
    setSelectedExchange(exchange);
    setDetailDialogOpen(true);
  };

  const handleCloseDetailDialog = () => {
    setDetailDialogOpen(false);
  };

  const handleOpenMessageDialog = () => {
    setMessageDialogOpen(true);
  };

  const handleCloseMessageDialog = () => {
    setMessageDialogOpen(false);
    setMessage("");
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Here you would send the message to your API
    console.log("Sending message:", message);

    // Update the local state with the new message
    const updatedExchanges = exchanges.map((exchange) => {
      if (exchange.id === selectedExchange.id) {
        return {
          ...exchange,
          messages: [
            ...exchange.messages,
            {
              id: Date.now(),
              sender: "John Doe", // Current user
              text: message,
              timestamp: new Date().toISOString(),
            },
          ],
        };
      }
      return exchange;
    });

    setExchanges(updatedExchanges);
    setSelectedExchange({
      ...selectedExchange,
      messages: [
        ...selectedExchange.messages,
        {
          id: Date.now(),
          sender: "John Doe", // Current user
          text: message,
          timestamp: new Date().toISOString(),
        },
      ],
    });

    setMessage("");
    setMessageDialogOpen(false);
  };

  const handleAcceptExchange = () => {
    // Here you would send the acceptance to your API
    console.log("Accepting exchange:", selectedExchange.id);

    // Update the local state
    const updatedExchanges = exchanges.map((exchange) => {
      if (exchange.id === selectedExchange.id) {
        return {
          ...exchange,
          status: "accepted",
          updatedAt: new Date().toISOString(),
        };
      }
      return exchange;
    });

    setExchanges(updatedExchanges);
    setSelectedExchange({
      ...selectedExchange,
      status: "accepted",
      updatedAt: new Date().toISOString(),
    });
  };

  const handleRejectExchange = () => {
    // Here you would send the rejection to your API
    console.log("Rejecting exchange:", selectedExchange.id);

    // Update the local state
    const updatedExchanges = exchanges.map((exchange) => {
      if (exchange.id === selectedExchange.id) {
        return {
          ...exchange,
          status: "rejected",
          updatedAt: new Date().toISOString(),
        };
      }
      return exchange;
    });

    setExchanges(updatedExchanges);
    setSelectedExchange({
      ...selectedExchange,
      status: "rejected",
      updatedAt: new Date().toISOString(),
    });
  };

  const handleCompleteExchange = () => {
    // Here you would send the completion to your API
    console.log("Completing exchange:", selectedExchange.id);

    // Update the local state
    const updatedExchanges = exchanges.map((exchange) => {
      if (exchange.id === selectedExchange.id) {
        return {
          ...exchange,
          status: "completed",
          updatedAt: new Date().toISOString(),
        };
      }
      return exchange;
    });

    setExchanges(updatedExchanges);
    setSelectedExchange({
      ...selectedExchange,
      status: "completed",
      updatedAt: new Date().toISOString(),
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "accepted":
        return "info";
      case "completed":
        return "success";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "accepted":
        return "Accepted";
      case "completed":
        return "Completed";
      case "rejected":
        return "Rejected";
      default:
        return status;
    }
  };

  const filteredExchanges = exchanges.filter((exchange) => {
    if (activeTab === 0) return true; // All exchanges
    if (activeTab === 1) return exchange.status === "pending";
    if (activeTab === 2) return exchange.status === "accepted";
    if (activeTab === 3) return exchange.status === "completed";
    if (activeTab === 4) return exchange.status === "rejected";
    return false;
  });

  return (
    <>
      <Header />
      <Container sx={{ py: 4, minHeight: "70vh" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Exchanges
        </Typography>

        <Paper sx={{ mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="All" />
            <Tab label="Pending" />
            <Tab label="Accepted" />
            <Tab label="Completed" />
            <Tab label="Rejected" />
          </Tabs>
        </Paper>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        ) : filteredExchanges.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              No exchanges found
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {activeTab === 0
                ? "You haven't participated in any exchanges yet."
                : `You don't have any ${
                    activeTab === 1
                      ? "pending"
                      : activeTab === 2
                      ? "accepted"
                      : activeTab === 3
                      ? "completed"
                      : "rejected"
                  } exchanges.`}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href="/products"
              startIcon={<Search />}
            >
              Browse Products
            </Button>
          </Paper>
        ) : (
          <List>
            {filteredExchanges.map((exchange) => (
              <Paper key={exchange.id} sx={{ mb: 2 }}>
                <ListItem
                  alignItems="flex-start"
                  sx={{ p: 2 }}
                  secondaryAction={
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOpenDetailDialog(exchange)}
                    >
                      View Details
                    </Button>
                  }
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <ListItemAvatar>
                          <Avatar src={exchange.initiator.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={exchange.initiator.name}
                          secondary={`Initiated on ${new Date(
                            exchange.createdAt
                          ).toLocaleDateString()}`}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          component="img"
                          src={exchange.initiatorItem.image}
                          alt={exchange.initiatorItem.name}
                          sx={{
                            width: 50,
                            height: 50,
                            mr: 2,
                            objectFit: "cover",
                          }}
                        />
                        <Box>
                          <Typography variant="body2" noWrap>
                            {exchange.initiatorItem.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ${exchange.initiatorItem.estimatedValue.toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={1}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <CompareArrows color="action" />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          component="img"
                          src={exchange.receiverItem.image}
                          alt={exchange.receiverItem.name}
                          sx={{
                            width: 50,
                            height: 50,
                            mr: 2,
                            objectFit: "cover",
                          }}
                        />
                        <Box>
                          <Typography variant="body2" noWrap>
                            {exchange.receiverItem.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ${exchange.receiverItem.estimatedValue.toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={2}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                        }}
                      >
                        <Chip
                          label={getStatusText(exchange.status)}
                          color={getStatusColor(exchange.status)}
                          size="small"
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </ListItem>
              </Paper>
            ))}
          </List>
        )}

        {/* Exchange Detail Dialog */}
        <Dialog
          open={detailDialogOpen}
          onClose={handleCloseDetailDialog}
          maxWidth="md"
          fullWidth
        >
          {selectedExchange && (
            <>
              <DialogTitle>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  Exchange Details
                  <Chip
                    label={getStatusText(selectedExchange.status)}
                    color={getStatusColor(selectedExchange.status)}
                  />
                </Box>
              </DialogTitle>

              <DialogContent dividers>
                <Grid container spacing={3}>
                  {/* Exchange Items */}
                  <Grid item xs={12}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={5}>
                          <Box sx={{ textAlign: "center" }}>
                            <Avatar
                              src={selectedExchange.initiator.avatar}
                              sx={{ width: 40, height: 40, mx: "auto", mb: 1 }}
                            />
                            <Typography variant="subtitle2">
                              {selectedExchange.initiator.name}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Box
                                component="img"
                                src={selectedExchange.initiatorItem.image}
                                alt={selectedExchange.initiatorItem.name}
                                sx={{
                                  width: 120,
                                  height: 120,
                                  my: 2,
                                  objectFit: "contain",
                                }}
                              />
                            </Box>
                            <Typography variant="body1" fontWeight="bold">
                              {selectedExchange.initiatorItem.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              gutterBottom
                            >
                              Condition:{" "}
                              {selectedExchange.initiatorItem.condition}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="primary"
                              fontWeight="bold"
                            >
                              $
                              {selectedExchange.initiatorItem.estimatedValue.toFixed(
                                2
                              )}
                            </Typography>
                          </Box>
                        </Grid>

                        <Grid item xs={12} sm={2}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "100%",
                            }}
                          >
                            <ArrowForward
                              sx={{ fontSize: 40, color: "text.secondary" }}
                            />
                          </Box>
                        </Grid>

                        <Grid item xs={12} sm={5}>
                          <Box sx={{ textAlign: "center" }}>
                            <Avatar
                              src={selectedExchange.receiver.avatar}
                              sx={{ width: 40, height: 40, mx: "auto", mb: 1 }}
                            />
                            <Typography variant="subtitle2">
                              {selectedExchange.receiver.name}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Box
                                component="img"
                                src={selectedExchange.receiverItem.image}
                                alt={selectedExchange.receiverItem.name}
                                sx={{
                                  width: 120,
                                  height: 120,
                                  my: 2,
                                  objectFit: "contain",
                                }}
                              />
                            </Box>
                            <Typography variant="body1" fontWeight="bold">
                              {selectedExchange.receiverItem.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              gutterBottom
                            >
                              Condition:{" "}
                              {selectedExchange.receiverItem.condition}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="primary"
                              fontWeight="bold"
                            >
                              $
                              {selectedExchange.receiverItem.estimatedValue.toFixed(
                                2
                              )}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>

                  {/* Exchange Timeline */}
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Exchange Timeline
                    </Typography>

                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Chip
                            label="Created"
                            color="primary"
                            size="small"
                            sx={{ mr: 2, minWidth: 80 }}
                          />
                          <Typography variant="body2">
                            Exchange initiated on{" "}
                            {new Date(
                              selectedExchange.createdAt
                            ).toLocaleString()}
                          </Typography>
                        </Box>

                        {selectedExchange.status !== "pending" && (
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Chip
                              label={
                                selectedExchange.status === "rejected"
                                  ? "Rejected"
                                  : "Accepted"
                              }
                              color={
                                selectedExchange.status === "rejected"
                                  ? "error"
                                  : "success"
                              }
                              size="small"
                              sx={{ mr: 2, minWidth: 80 }}
                            />
                            <Typography variant="body2">
                              Exchange{" "}
                              {selectedExchange.status === "rejected"
                                ? "rejected"
                                : "accepted"}{" "}
                              on{" "}
                              {new Date(
                                selectedExchange.updatedAt
                              ).toLocaleString()}
                            </Typography>
                          </Box>
                        )}

                        {selectedExchange.status === "completed" &&
                          selectedExchange.reviews && (
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Chip
                                label="Completed"
                                color="success"
                                size="small"
                                sx={{ mr: 2, minWidth: 80 }}
                              />
                              <Typography variant="body2">
                                Exchange completed and reviewed on{" "}
                                {new Date(
                                  selectedExchange.reviews[0].timestamp
                                ).toLocaleString()}
                              </Typography>
                            </Box>
                          )}
                      </Box>
                    </Paper>
                  </Grid>

                  {/* Exchange Messages */}
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Typography variant="h6">Messages</Typography>

                      {selectedExchange.status !== "rejected" &&
                        selectedExchange.status !== "completed" && (
                          <Button
                            variant="outlined"
                            startIcon={<Message />}
                            onClick={handleOpenMessageDialog}
                          >
                            Send Message
                          </Button>
                        )}
                    </Box>

                    <Paper
                      variant="outlined"
                      sx={{ p: 2, maxHeight: 300, overflow: "auto" }}
                    >
                      {selectedExchange.messages.length === 0 ? (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ textAlign: "center", py: 2 }}
                        >
                          No messages yet
                        </Typography>
                      ) : (
                        <List>
                          {selectedExchange.messages.map((msg) => (
                            <ListItem
                              key={msg.id}
                              alignItems="flex-start"
                              sx={{ px: 1 }}
                            >
                              <ListItemText
                                primary={
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Typography variant="subtitle2">
                                      {msg.sender}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                    >
                                      {new Date(msg.timestamp).toLocaleString()}
                                    </Typography>
                                  </Box>
                                }
                                secondary={
                                  <Typography
                                    variant="body2"
                                    color="text.primary"
                                    sx={{ mt: 1, whiteSpace: "pre-wrap" }}
                                  >
                                    {msg.text}
                                  </Typography>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      )}
                    </Paper>
                  </Grid>

                  {/* Reviews (if completed) */}
                  {selectedExchange.status === "completed" &&
                    selectedExchange.reviews && (
                      <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                          Reviews
                        </Typography>

                        <Paper variant="outlined" sx={{ p: 2 }}>
                          {selectedExchange.reviews.map((review) => (
                            <Box key={review.id} sx={{ mb: 2 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  mb: 1,
                                }}
                              >
                                <Typography variant="subtitle2">
                                  {review.reviewer}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {new Date(review.timestamp).toLocaleString()}
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  mb: 1,
                                }}
                              >
                                <Rating
                                  value={review.rating}
                                  readOnly
                                  size="small"
                                />
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                  {review.rating}/5
                                </Typography>
                              </Box>
                              <Typography variant="body2">
                                {review.comment}
                              </Typography>
                              {selectedExchange.reviews.indexOf(review) <
                                selectedExchange.reviews.length - 1 && (
                                <Divider sx={{ my: 2 }} />
                              )}
                            </Box>
                          ))}
                        </Paper>
                      </Grid>
                    )}
                </Grid>
              </DialogContent>

              <DialogActions>
                {selectedExchange.status === "pending" && (
                  <>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleRejectExchange}
                      startIcon={<Close />}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleAcceptExchange}
                      startIcon={<Check />}
                    >
                      Accept
                    </Button>
                  </>
                )}

                {selectedExchange.status === "accepted" && (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleCompleteExchange}
                    startIcon={<Check />}
                  >
                    Mark as Completed
                  </Button>
                )}

                <Button onClick={handleCloseDetailDialog}>Close</Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Message Dialog */}
        <Dialog
          open={messageDialogOpen}
          onClose={handleCloseMessageDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Send Message</DialogTitle>

          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="message"
              label="Your Message"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleCloseMessageDialog}>Cancel</Button>
            <Button
              onClick={handleSendMessage}
              variant="contained"
              color="primary"
              disabled={!message.trim()}
            >
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      <Footer />
    </>
  );
};

export default Exchange;
