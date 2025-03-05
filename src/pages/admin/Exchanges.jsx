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
  CardContent,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import {
  Search,
  Visibility,
  CheckCircle,
  Cancel,
  SwapHoriz,
} from "@mui/icons-material";
import AdminLayout from "../../components/admin/AdminLayout";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedExchange, setSelectedExchange] = useState(null);

  useEffect(() => {
    const fetchExchanges = async () => {
      setLoading(true);
      try {
        // Here you would fetch exchanges from your API
        // For now, we'll use mock data
        setTimeout(() => {
          const statuses = [
            "pending",
            "accepted",
            "completed",
            "rejected",
            "cancelled",
          ];
          const mockExchanges = Array(50)
            .fill()
            .map((_, index) => {
              const status =
                statuses[Math.floor(Math.random() * statuses.length)];
              const initiator = `User ${Math.floor(Math.random() * 20) + 1}`;
              const receiver = `User ${Math.floor(Math.random() * 20) + 1}`;
              const date = new Date(
                2023,
                Math.floor(Math.random() * 12),
                Math.floor(Math.random() * 28) + 1
              );

              return {
                id: index + 1,
                initiator,
                initiatorId: Math.floor(Math.random() * 20) + 1,
                receiver,
                receiverId: Math.floor(Math.random() * 20) + 1,
                status,
                date: date.toISOString().split("T")[0],
                initiatorItems: Array(Math.floor(Math.random() * 3) + 1)
                  .fill()
                  .map((_, i) => ({
                    id: i + 1,
                    name: `Product ${Math.floor(Math.random() * 100) + 1}`,
                    image: `https://via.placeholder.com/50?text=P${i + 1}`,
                    value: Math.floor(Math.random() * 500) + 50,
                  })),
                receiverItems: Array(Math.floor(Math.random() * 3) + 1)
                  .fill()
                  .map((_, i) => ({
                    id: i + 1,
                    name: `Product ${Math.floor(Math.random() * 100) + 1}`,
                    image: `https://via.placeholder.com/50?text=P${i + 1}`,
                    value: Math.floor(Math.random() * 500) + 50,
                  })),
                messages: Array(Math.floor(Math.random() * 5))
                  .fill()
                  .map((_, i) => ({
                    id: i + 1,
                    sender: Math.random() > 0.5 ? initiator : receiver,
                    message: `Message ${i + 1} about the exchange.`,
                    timestamp: new Date(
                      date.getTime() - Math.random() * 86400000 * 5
                    ).toISOString(),
                  })),
                steps: [
                  {
                    label: "Initiated",
                    completed: true,
                    date: new Date(date.getTime() - 86400000 * 5)
                      .toISOString()
                      .split("T")[0],
                  },
                  {
                    label: "Accepted",
                    completed: ["accepted", "completed"].includes(status),
                    date: ["accepted", "completed"].includes(status)
                      ? new Date(date.getTime() - 86400000 * 3)
                          .toISOString()
                          .split("T")[0]
                      : null,
                  },
                  {
                    label: "Items Shipped",
                    completed: ["completed"].includes(status),
                    date: ["completed"].includes(status)
                      ? new Date(date.getTime() - 86400000 * 1)
                          .toISOString()
                          .split("T")[0]
                      : null,
                  },
                  {
                    label: "Completed",
                    completed: ["completed"].includes(status),
                    date: ["completed"].includes(status)
                      ? date.toISOString().split("T")[0]
                      : null,
                  },
                ],
              };
            });

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

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setPage(0);
  };

  const handleViewDetails = (exchange) => {
    setSelectedExchange(exchange);
    setDetailDialogOpen(true);
  };

  const handleDetailDialogClose = () => {
    setDetailDialogOpen(false);
    setSelectedExchange(null);
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
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle fontSize="small" />;
      case "rejected":
      case "cancelled":
        return <Cancel fontSize="small" />;
      default:
        return null;
    }
  };

  const filteredExchanges = exchanges.filter((exchange) => {
    const matchesSearch =
      exchange.initiator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exchange.receiver.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exchange.id.toString().includes(searchQuery);

    const matchesStatus =
      statusFilter === "all" || exchange.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const paginatedExchanges = filteredExchanges.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <AdminLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Exchanges Management
        </Typography>

        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
            <TextField
              variant="outlined"
              placeholder="Search by ID, initiator or receiver"
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
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={handleStatusFilterChange}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="accepted">Accepted</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
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
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Initiator</TableCell>
                      <TableCell>Receiver</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Items</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedExchanges.map((exchange) => (
                      <TableRow key={exchange.id}>
                        <TableCell>#{exchange.id}</TableCell>
                        <TableCell>{exchange.initiator}</TableCell>
                        <TableCell>{exchange.receiver}</TableCell>
                        <TableCell>{exchange.date}</TableCell>
                        <TableCell>
                          <Chip
                            label={
                              exchange.status.charAt(0).toUpperCase() +
                              exchange.status.slice(1)
                            }
                            color={getStatusColor(exchange.status)}
                            icon={getStatusIcon(exchange.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {exchange.initiatorItems.length} ↔{" "}
                          {exchange.receiverItems.length}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            color="primary"
                            onClick={() => handleViewDetails(exchange)}
                          >
                            <Visibility />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredExchanges.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Paper>

        {/* Exchange Details Dialog */}
        <Dialog
          open={detailDialogOpen}
          onClose={handleDetailDialogClose}
          maxWidth="md"
          fullWidth
        >
          {selectedExchange && (
            <>
              <DialogTitle>
                Exchange #{selectedExchange.id} Details
                <Chip
                  label={
                    selectedExchange.status.charAt(0).toUpperCase() +
                    selectedExchange.status.slice(1)
                  }
                  color={getStatusColor(selectedExchange.status)}
                  size="small"
                  sx={{ ml: 2 }}
                />
              </DialogTitle>
              <DialogContent>
                <Box sx={{ mb: 3 }}>
                  <Stepper
                    activeStep={
                      selectedExchange.steps.filter((step) => step.completed)
                        .length
                    }
                  >
                    {selectedExchange.steps.map((step, index) => (
                      <Step key={index} completed={step.completed}>
                        <StepLabel>{step.label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Initiator: {selectedExchange.initiator}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom
                        >
                          Offering:
                        </Typography>
                        <List>
                          {selectedExchange.initiatorItems.map((item) => (
                            <ListItem key={item.id}>
                              <ListItemAvatar>
                                <Avatar variant="square" src={item.image} />
                              </ListItemAvatar>
                              <ListItemText
                                primary={item.name}
                                secondary={`Value: $${item.value}`}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Receiver: {selectedExchange.receiver}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom
                        >
                          Offering:
                        </Typography>
                        <List>
                          {selectedExchange.receiverItems.map((item) => (
                            <ListItem key={item.id}>
                              <ListItemAvatar>
                                <Avatar variant="square" src={item.image} />
                              </ListItemAvatar>
                              <ListItemText
                                primary={item.name}
                                secondary={`Value: $${item.value}`}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Exchange Timeline
                  </Typography>
                  <List>
                    {selectedExchange.steps
                      .filter((step) => step.completed)
                      .map((step, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={step.label}
                            secondary={step.date}
                          />
                        </ListItem>
                      ))}
                  </List>
                </Box>

                {selectedExchange.messages.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Messages
                    </Typography>
                    <List>
                      {selectedExchange.messages.map((message) => (
                        <ListItem key={message.id}>
                          <ListItemText
                            primary={`${message.sender}: ${message.message}`}
                            secondary={new Date(
                              message.timestamp
                            ).toLocaleString()}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDetailDialogClose}>Close</Button>
                {selectedExchange.status === "pending" && (
                  <>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<CheckCircle />}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<Cancel />}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </AdminLayout>
  );
};

export default Exchanges;
