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
  Avatar,
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
} from "@mui/material";
import {
  Search,
  Edit,
  Delete,
  Block,
  CheckCircle,
  Add,
} from "@mui/icons-material";
import AdminLayout from "../../components/admin/AdminLayout";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userStatus, setUserStatus] = useState("");
  const [userRole, setUserRole] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Here you would fetch users from your API
        // For now, we'll use mock data
        setTimeout(() => {
          const mockUsers = Array(50)
            .fill()
            .map((_, index) => ({
              id: index + 1,
              name: `User ${index + 1}`,
              email: `user${index + 1}@example.com`,
              avatar: `https://via.placeholder.com/40?text=${index + 1}`,
              status: Math.random() > 0.2 ? "active" : "inactive",
              role: Math.random() > 0.8 ? "admin" : "user",
              joinedDate: new Date(
                2023,
                Math.floor(Math.random() * 12),
                Math.floor(Math.random() * 28) + 1
              )
                .toISOString()
                .split("T")[0],
              lastLogin: new Date(
                2023,
                Math.floor(Math.random() * 12),
                Math.floor(Math.random() * 28) + 1
              )
                .toISOString()
                .split("T")[0],
            }));

          setUsers(mockUsers);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to load users. Please try again.");
        setLoading(false);
      }
    };

    fetchUsers();
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

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setUserStatus(user.status);
    setUserRole(user.role);
    setDialogOpen(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const handleStatusChange = (event) => {
    setUserStatus(event.target.value);
  };

  const handleRoleChange = (event) => {
    setUserRole(event.target.value);
  };

  const handleSaveChanges = () => {
    // Here you would update the user in your API
    // For now, we'll update the local state
    const updatedUsers = users.map((user) => {
      if (user.id === selectedUser.id) {
        return {
          ...user,
          status: userStatus,
          role: userRole,
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    setDialogOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = () => {
    // Here you would delete the user from your API
    // For now, we'll update the local state
    const updatedUsers = users.filter((user) => user.id !== selectedUser.id);

    setUsers(updatedUsers);
    setDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <AdminLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" component="h1">
            Users Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              /* Handle add user */
            }}
          >
            Add User
          </Button>
        </Box>

        <Paper sx={{ p: 2, mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search users by name or email"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

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
                      <TableCell>User</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Joined Date</TableCell>
                      <TableCell>Last Login</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar src={user.avatar} sx={{ mr: 2 }} />
                            <Typography variant="body1">{user.name}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Chip
                            label={
                              user.role.charAt(0).toUpperCase() +
                              user.role.slice(1)
                            }
                            color={
                              user.role === "admin" ? "secondary" : "default"
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={
                              user.status.charAt(0).toUpperCase() +
                              user.status.slice(1)
                            }
                            color={
                              user.status === "active" ? "success" : "error"
                            }
                            icon={
                              user.status === "active" ? (
                                <CheckCircle fontSize="small" />
                              ) : (
                                <Block fontSize="small" />
                              )
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{user.joinedDate}</TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            color="primary"
                            onClick={() => handleEditClick(user)}
                            size="small"
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteClick(user)}
                            size="small"
                          >
                            <Delete fontSize="small" />
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
                count={filteredUsers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Paper>

        {/* Edit User Dialog */}
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            {selectedUser && (
              <Box sx={{ pt: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Avatar
                    src={selectedUser.avatar}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6">{selectedUser.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedUser.email}
                    </Typography>
                  </Box>
                </Box>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={userStatus}
                    label="Status"
                    onChange={handleStatusChange}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={userRole}
                    label="Role"
                    onChange={handleRoleChange}
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleSaveChanges} variant="contained">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete User Dialog */}
        <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
          <DialogTitle>Delete User</DialogTitle>
          <DialogContent>
            {selectedUser && (
              <Typography>
                Are you sure you want to delete {selectedUser.name}? This action
                cannot be undone.
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose}>Cancel</Button>
            <Button
              onClick={handleDeleteUser}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </AdminLayout>
  );
};

export default Users;
