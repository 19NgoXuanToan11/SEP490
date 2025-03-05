import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import {
  Search,
  Visibility,
  CheckCircle,
  Cancel,
  FilterList,
  MoreVert,
} from "@mui/icons-material";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [filteredExchanges, setFilteredExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [detailsDialog, setDetailsDialog] = useState({
    open: false,
    exchange: null,
  });
  const [statusDialog, setStatusDialog] = useState({
    open: false,
    exchange: null,
    newStatus: "",
  });

  useEffect(() => {
    const fetchExchanges = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        const mockExchanges = Array.from({ length: 50 }, (_, index) => ({
          id: index + 1,
          user1: `User ${Math.floor(Math.random() * 20) + 1}`,
          user2: `User ${Math.floor(Math.random() * 20) + 1}`,
          product1: `Product ${Math.floor(Math.random() * 100) + 1}`,
          product2: `Product ${Math.floor(Math.random() * 100) + 1}`,
          cashAdjustment:
            Math.random() > 0.5 ? (Math.random() * 100).toFixed(2) : "0.00",
          status: ["Pending", "Approved", "Rejected", "Completed", "Cancelled"][
            Math.floor(Math.random() * 5)
          ],
          dateProposed: new Date(
            Date.now() - Math.floor(Math.random() * 10000000000)
          )
            .toISOString()
            .split("T")[0],
          dateUpdated: new Date(
            Date.now() - Math.floor(Math.random() * 5000000000)
          )
            .toISOString()
            .split("T")[0],
        }));

        setExchanges(mockExchanges);
        setFilteredExchanges(mockExchanges);
      } catch (err) {
        console.error("Error fetching exchanges:", err);
        setError("Failed to load exchanges. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchExchanges();
  }, []);

  useEffect(() => {
    // Apply filters and search
    let result = [...exchanges];

    if (searchQuery) {
      result = result.filter(
        (exchange) =>
          exchange.user1.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exchange.user2.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exchange.product1.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exchange.product2.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exchange.id.toString().includes(searchQuery)
      );
    }

    if (filterStatus) {
      result = result.filter((exchange) => exchange.status === filterStatus);
    }

    setFilteredExchanges(result);
    setPage(0);
  }, [searchQuery, filterStatus, exchanges]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterStatusChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setFilterStatus("");
  };

  const openDetailsDialog = (exchange) => {
    setDetailsDialog({
      open: true,
      exchange,
    });
  };

  const closeDetailsDialog = () => {
    setDetailsDialog({
      ...detailsDialog,
      open: false,
    });
  };

  const openStatusDialog = (exchange, newStatus) => {
    setStatusDialog({
      open: true,
      exchange,
      newStatus,
    });
  };

  const closeStatusDialog = () => {
    setStatusDialog({
      ...statusDialog,
      open: false,
    });
  };

  const handleStatusChange = () => {
    // Update exchange status
    const updatedExchanges = exchanges.map((exchange) =>
      exchange.id === statusDialog.exchange.id
        ? {
            ...exchange,
            status: statusDialog.newStatus,
            dateUpdated: new Date().toISOString().split("T")[0],
          }
        : exchange
    );

    setExchanges(updatedExchanges);
    closeStatusDialog();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Pending":
        return "warning";
      case "Rejected":
        return "error";
      case "Completed":
        return "info";
      case "Cancelled":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Exchange Management
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ mb: 3, p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <TextField
            label="Search Exchanges"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Button
            startIcon={<FilterList />}
            onClick={() => setShowFilters(!showFilters)}
            color="primary"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </Box>

        {showFilters && (
          <Box sx={{ mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={filterStatus}
                    label="Status"
                    onChange={handleFilterStatusChange}
                  >
                    <MenuItem value="">All Statuses</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Approved">Approved</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="outlined" onClick={resetFilters} fullWidth>
                  Reset Filters
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>

      <Paper>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Initiator</TableCell>
                    <TableCell>Recipient</TableCell>
                    <TableCell>Offered Item</TableCell>
                    <TableCell>Requested Item</TableCell>
                    <TableCell>Cash Adjustment</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date Proposed</TableCell>
                    <TableCell>Last Updated</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredExchanges
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((exchange) => (
                      <TableRow key={exchange.id}>
                        <TableCell>{exchange.id}</TableCell>
                        <TableCell>{exchange.user1}</TableCell>
                        <TableCell>{exchange.user2}</TableCell>
                        <TableCell>{exchange.product1}</TableCell>
                        <TableCell>{exchange.product2}</TableCell>
                        <TableCell>
                          {exchange.cashAdjustment !== "0.00"
                            ? `$${exchange.cashAdjustment}`
                            : "-"}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={exchange.status}
                            color={getStatusColor(exchange.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{exchange.dateProposed}</TableCell>
                        <TableCell>{exchange.dateUpdated}</TableCell>
                        <TableCell align="center">
                          <Tooltip title="View Details">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => openDetailsDialog(exchange)}
                            >
                              <Visibility fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          {exchange.status === "Pending" && (
                            <>
                              <Tooltip title="Approve">
                                <IconButton
                                  size="small"
                                  color="success"
                                  onClick={() =>
                                    openStatusDialog(exchange, "Approved")
                                  }
                                >
                                  <CheckCircle fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Reject">
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() =>
                                    openStatusDialog(exchange, "Rejected")
                                  }
                                >
                                  <Cancel fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  {filteredExchanges.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={10} align="center">
                        No exchanges found
                      </TableCell>
                    </TableRow>
                  )}
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
        open={detailsDialog.open}
        onClose={closeDetailsDialog}
        maxWidth="md"
        fullWidth
      >
        {detailsDialog.exchange && (
          <>
            <DialogTitle>
              Exchange Details #{detailsDialog.exchange.id}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Initiator:</Typography>
                  <Typography variant="body1" gutterBottom>
                    {detailsDialog.exchange.user1}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Recipient:</Typography>
                  <Typography variant="body1" gutterBottom>
                    {detailsDialog.exchange.user2}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Offered Item:</Typography>
                  <Typography variant="body1" gutterBottom>
                    {detailsDialog.exchange.product1}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Requested Item:</Typography>
                  <Typography variant="body1" gutterBottom>
                    {detailsDialog.exchange.product2}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Cash Adjustment:</Typography>
                  <Typography variant="body1" gutterBottom>
                    {detailsDialog.exchange.cashAdjustment !== "0.00"
                      ? `$${detailsDialog.exchange.cashAdjustment}`
                      : "None"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Status:</Typography>
                  <Chip
                    label={detailsDialog.exchange.status}
                    color={getStatusColor(detailsDialog.exchange.status)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Date Proposed:</Typography>
                  <Typography variant="body1" gutterBottom>
                    {detailsDialog.exchange.dateProposed}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Last Updated:</Typography>
                  <Typography variant="body1" gutterBottom>
                    {detailsDialog.exchange.dateUpdated}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Exchange Notes:</Typography>
                  <Typography variant="body1" gutterBottom>
                    {Math.random() > 0.5
                      ? "User has requested this exchange due to upgrading their device. The offered item is in excellent condition with all accessories included."
                      : "No additional notes provided for this exchange."}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDetailsDialog}>Close</Button>
              {detailsDialog.exchange.status === "Pending" && (
                <>
                  <Button
                    color="success"
                    onClick={() => {
                      closeDetailsDialog();
                      openStatusDialog(detailsDialog.exchange, "Approved");
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    color="error"
                    onClick={() => {
                      closeDetailsDialog();
                      openStatusDialog(detailsDialog.exchange, "Rejected");
                    }}
                  >
                    Reject
                  </Button>
                </>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Status Change Dialog */}
      <Dialog open={statusDialog.open} onClose={closeStatusDialog}>
        {statusDialog.exchange && (
          <>
            <DialogTitle>Confirm Status Change</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to change the status of exchange #
                {statusDialog.exchange.id} to "{statusDialog.newStatus}"?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeStatusDialog}>Cancel</Button>
              <Button
                color={
                  statusDialog.newStatus === "Approved" ? "success" : "error"
                }
                onClick={handleStatusChange}
                autoFocus
              >
                Confirm
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Exchanges;
