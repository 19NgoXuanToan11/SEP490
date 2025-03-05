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
  Avatar,
  Tooltip,
  Switch,
  FormControlLabel,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Search,
  Visibility,
  Edit,
  Delete,
  FilterList,
  Email,
  Block,
  CheckCircle,
} from "@mui/icons-material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`user-tabpanel-${index}`}
      aria-labelledby={`user-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const [userDialog, setUserDialog] = useState({
    open: false,
    user: null,
    mode: "view", // 'view', 'edit', 'delete'
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        const mockUsers = Array.from({ length: 50 }, (_, index) => {
          const id = index + 1;
          const firstName = [
            "John",
            "Jane",
            "Michael",
            "Emily",
            "David",
            "Sarah",
            "Robert",
            "Lisa",
          ][Math.floor(Math.random() * 8)];
          const lastName = [
            "Smith",
            "Johnson",
            "Williams",
            "Jones",
            "Brown",
            "Davis",
            "Miller",
            "Wilson",
          ][Math.floor(Math.random() * 8)];
          const role = ["User", "Admin", "Moderator"][
            Math.floor(Math.random() * 3)
          ];
          const status = ["Active", "Inactive", "Suspended", "Pending"][
            Math.floor(Math.random() * 4)
          ];

          return {
            id,
            firstName,
            lastName,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${id}@example.com`,
            role,
            status,
            joinDate: new Date(
              Date.now() - Math.floor(Math.random() * 10000000000)
            )
              .toISOString()
              .split("T")[0],
            lastLogin: new Date(
              Date.now() - Math.floor(Math.random() * 5000000000)
            )
              .toISOString()
              .split("T")[0],
            productsListed: Math.floor(Math.random() * 20),
            productsSold: Math.floor(Math.random() * 15),
            exchangesCompleted: Math.floor(Math.random() * 10),
          };
        });

        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Apply filters and search
    let result = [...users];

    if (searchQuery) {
      result = result.filter(
        (user) =>
          `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.id.toString().includes(searchQuery)
      );
    }

    if (filterRole) {
      result = result.filter((user) => user.role === filterRole);
    }

    if (filterStatus) {
      result = result.filter((user) => user.status === filterStatus);
    }

    // Filter based on tab
    if (tabValue === 1) {
      // Active users
      result = result.filter((user) => user.status === "Active");
    } else if (tabValue === 2) {
      // Inactive users
      result = result.filter((user) => user.status === "Inactive");
    } else if (tabValue === 3) {
      // Suspended users
      result = result.filter((user) => user.status === "Suspended");
    } else if (tabValue === 4) {
      // Pending users
      result = result.filter((user) => user.status === "Pending");
    }

    setFilteredUsers(result);
    setPage(0);
  }, [searchQuery, filterRole, filterStatus, users, tabValue]);

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

  const handleFilterRoleChange = (event) => {
    setFilterRole(event.target.value);
  };

  const handleFilterStatusChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setFilterRole("");
    setFilterStatus("");
  };

  const openUserDialog = (user, mode = "view") => {
    setUserDialog({
      open: true,
      user,
      mode,
    });
  };

  const closeUserDialog = () => {
    setUserDialog({
      ...userDialog,
      open: false,
    });
  };

  const handleDeleteUser = () => {
    // Delete user logic
    setUsers(users.filter((u) => u.id !== userDialog.user.id));
    closeUserDialog();
  };

  const handleUpdateUserStatus = (userId, newStatus) => {
    // Update user status
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, status: newStatus } : user
    );

    setUsers(updatedUsers);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "default";
      case "Suspended":
        return "error";
      case "Pending":
        return "warning";
      default:
        return "default";
    }
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
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
          User Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log("Add new user")}
        >
          Add User
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="All Users" />
          <Tab label="Active" />
          <Tab label="Inactive" />
          <Tab label="Suspended" />
          <Tab label="Pending" />
        </Tabs>
      </Paper>

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
            label="Search Users"
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
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={filterRole}
                    label="Role"
                    onChange={handleFilterRoleChange}
                  >
                    <MenuItem value="">All Roles</MenuItem>
                    <MenuItem value="User">User</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Moderator">Moderator</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={filterStatus}
                    label="Status"
                    onChange={handleFilterStatusChange}
                  >
                    <MenuItem value="">All Statuses</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                    <MenuItem value="Suspended">Suspended</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
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
                    <TableCell>User</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Join Date</TableCell>
                    <TableCell>Last Login</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
                              {getInitials(user.firstName, user.lastName)}
                            </Avatar>
                            <Typography>
                              {user.firstName} {user.lastName}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Chip
                            label={user.role}
                            color={
                              user.role === "Admin"
                                ? "primary"
                                : user.role === "Moderator"
                                ? "secondary"
                                : "default"
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={user.status}
                            color={getStatusColor(user.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell align="center">
                          <Tooltip title="View Details">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => openUserDialog(user, "view")}
                            >
                              <Visibility fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit User">
                            <IconButton
                              size="small"
                              color="secondary"
                              onClick={() => openUserDialog(user, "edit")}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete User">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => openUserDialog(user, "delete")}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          {user.status !== "Suspended" ? (
                            <Tooltip title="Suspend User">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() =>
                                  handleUpdateUserStatus(user.id, "Suspended")
                                }
                              >
                                <Block fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          ) : (
                            <Tooltip title="Activate User">
                              <IconButton
                                size="small"
                                color="success"
                                onClick={() =>
                                  handleUpdateUserStatus(user.id, "Active")
                                }
                              >
                                <CheckCircle fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  {filteredUsers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        No users found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredUsers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>

      {/* User Details/Edit/Delete Dialog */}
      <Dialog
        open={userDialog.open}
        onClose={closeUserDialog}
        maxWidth={
          userDialog.mode === "view" || userDialog.mode === "edit" ? "md" : "xs"
        }
        fullWidth
      >
        {userDialog.user && (
          <>
            {userDialog.mode === "delete" ? (
              <>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to delete the user "
                    {userDialog.user.firstName} {userDialog.user.lastName}"?
                    This action cannot be undone.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={closeUserDialog}>Cancel</Button>
                  <Button onClick={handleDeleteUser} color="error" autoFocus>
                    Delete
                  </Button>
                </DialogActions>
              </>
            ) : (
              <>
                <DialogTitle>
                  {userDialog.mode === "view" ? "User Details" : "Edit User"}
                </DialogTitle>
                <DialogContent>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid
                      item
                      xs={12}
                      display="flex"
                      justifyContent="center"
                      mb={2}
                    >
                      <Avatar
                        sx={{
                          width: 80,
                          height: 80,
                          bgcolor: "primary.main",
                          fontSize: "2rem",
                        }}
                      >
                        {getInitials(
                          userDialog.user.firstName,
                          userDialog.user.lastName
                        )}
                      </Avatar>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        value={userDialog.user.firstName}
                        disabled={userDialog.mode === "view"}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        value={userDialog.user.lastName}
                        disabled={userDialog.mode === "view"}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        value={userDialog.user.email}
                        disabled={userDialog.mode === "view"}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Role</InputLabel>
                        <Select
                          value={userDialog.user.role}
                          label="Role"
                          disabled={userDialog.mode === "view"}
                        >
                          <MenuItem value="User">User</MenuItem>
                          <MenuItem value="Admin">Admin</MenuItem>
                          <MenuItem value="Moderator">Moderator</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={userDialog.user.status}
                          label="Status"
                          disabled={userDialog.mode === "view"}
                        >
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="Inactive">Inactive</MenuItem>
                          <MenuItem value="Suspended">Suspended</MenuItem>
                          <MenuItem value="Pending">Pending</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    {userDialog.mode === "view" && (
                      <>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Join Date"
                            value={userDialog.user.joinDate}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Last Login"
                            value={userDialog.user.lastLogin}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                            Activity Summary
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Paper sx={{ p: 2, textAlign: "center" }}>
                            <Typography variant="h4">
                              {userDialog.user.productsListed}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Products Listed
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Paper sx={{ p: 2, textAlign: "center" }}>
                            <Typography variant="h4">
                              {userDialog.user.productsSold}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Products Sold
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Paper sx={{ p: 2, textAlign: "center" }}>
                            <Typography variant="h4">
                              {userDialog.user.exchangesCompleted}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Exchanges Completed
                            </Typography>
                          </Paper>
                        </Grid>
                      </>
                    )}

                    {userDialog.mode === "edit" && (
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={<Switch />}
                          label="Send password reset email"
                        />
                      </Grid>
                    )}
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={closeUserDialog}>
                    {userDialog.mode === "view" ? "Close" : "Cancel"}
                  </Button>
                  {userDialog.mode === "view" && (
                    <Button
                      startIcon={<Email />}
                      onClick={() =>
                        console.log("Send email to", userDialog.user.email)
                      }
                    >
                      Contact
                    </Button>
                  )}
                  {userDialog.mode === "edit" && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={closeUserDialog}
                    >
                      Save Changes
                    </Button>
                  )}
                </DialogActions>
              </>
            )}
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Users;
