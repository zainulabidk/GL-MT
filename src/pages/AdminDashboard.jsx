import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  CssBaseline,
  AppBar,
  Grid,
  Card,
  CardContent,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersStart, deleteUserStart } from "../features/userSlice";
import UserEditPage from "./UserEditPage";
import { fetchAdminStart } from "../features/userSlice";
import { logout } from "../features/authSlice";

const SinglePageDashboard = () => {
  // state map
  const users = useSelector((state) => state.user.users);
  const admin = useSelector((state) => state.user.admin);
 

  // state manage
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const dispatch = useDispatch();


  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  useEffect(() => {
    dispatch(fetchUsersStart());
    dispatch(fetchAdminStart());
  }, [dispatch]);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditDrawerOpen(true);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteUserStart({ userId: userToDelete._id }));
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleEditDrawerClose = () => {
    setIsEditDrawerOpen(false);
    setSelectedUser(null);
    // Refresh the users list after editing
    dispatch(fetchUsersStart());
  };

 console.log("admin?.profileImage ",admin?.profileImage );
 
 const handleLogout = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    if (token) {
      await logout(token);  
    }
  } catch (error) {
    console.error("Error logging out:", error);
  } finally {
    dispatch(logout());  
    navigate("/login");  
  }
};

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#253664",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: "white" }}>
            My Dashboard
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AccountCircleIcon  sx={{ mr: 1, color: "white" }} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                backgroundColor: "rgba(255, 255, 255, 0.2)", // Transparent white background
                borderRadius: "8px", // Border radius
                padding: "5px 33px", // Padding for spacing
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "white",
                  fontWeight: "bold", // Bold for the name
                }}
              >
                {admin?.username}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "white",
                  opacity: 0.8, // Slightly transparent for the role
                }}
              >
                {admin?.role}
              </Typography>
            </Box>
            <Button
            style={{   background: "linear-gradient(135deg,rgb(110, 0, 228), #2575FC)",
              color: "white",
              borderRadius: 3,
              boxShadow: 3,}}
              sx={{ ml: 2 }}
              onClick={handleLogout}            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>


      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <List>
          <ListItem
            button
            selected={activeMenu === "dashboard"}
            onClick={() => handleMenuClick("dashboard")}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            button
            selected={activeMenu === "userlist"}
            onClick={() => handleMenuClick("userlist")}
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="User List" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        {activeMenu === "dashboard" && (
          <Box>
            <Typography variant="h4" sx={{ mb: 3, color: "#253664" }}>
              Dashboard
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card
                  sx={{
                    background: "linear-gradient(135deg, #6A11CB, #2575FC)",
                    color: "white",
                    borderRadius: 3,
                    boxShadow: 3,
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Total Users
                    </Typography>
                    <Typography variant="body2">{users.length}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    background: "linear-gradient(135deg, #253664, #4A90E2)",
                    color: "white",
                    borderRadius: 3,
                    boxShadow: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" component="div" sx={{ mb: 2, textAlign: "center" }}>
                      Admin Profile
                    </Typography>
                    <Grid container spacing={2}>
                      {/* Avatar */}
                      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                        <Avatar
                          src={admin?.profileImage || "https://via.placeholder.com/150"} 
                          sx={{ width: 120, height: 120, border: "3px solid white" }}
                        >
                          <AccountCircleIcon sx={{ width: 80, height: 80 }} />
                        </Avatar>
                      </Grid>

                      {/* Admin Details */}
                      <Grid item xs={12} container spacing={2} sx={{ alignItems: "center" }}>
                        <Grid item xs={6}>
                          <Typography variant="body1">
                            <strong>Username:</strong> {admin?.username}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">
                            <strong>Email:</strong> {admin?.email}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">
                            <strong>Mobile:</strong> {admin?.mobile}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">
                            <strong>Gender:</strong> {admin?.gender}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">
                            <strong>Date of Birth:</strong> 
                            {admin?.dob?.length > 6
                              ? `${admin.dob.slice(0, 10)}...`  
                              : admin?.dob}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">
                            <strong>Address:</strong>{" "}
                            {admin?.address?.length > 10
                              ? `${admin.address.slice(0, 10)}...`  
                              : admin?.address}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    background: "linear-gradient(135deg, #253664, #4A90E2)",
                    color: "white",
                    borderRadius: 3,
                    boxShadow: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                      <Typography variant="h5" component="div">
                        User Table
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleMenuClick("userlist")}
                        sx={{ backgroundColor: "#253664", "&:hover": { backgroundColor: "#253664" } }}
                      >
                        View More &gt;
                      </Button>
                    </Box>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {users.slice(0, 5).map((user) => (
                            <TableRow key={user._id}>
                              <TableCell>{user.username}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>{user.role}</TableCell>

                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}

        {activeMenu === "userlist" && (
          <Box>
            <Typography variant="h4" sx={{ mb: 3, color: "#253664" }}>
              User List
            </Typography>
            <Card
              sx={{
                background: "linear-gradient(135deg, #253664, #4A90E2)",
                color: "white",
                borderRadius: 3,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                  All Users
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>DOB</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user._id}>
                          <TableCell>{user.username}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.gender}</TableCell>
                          <TableCell>{user.dob}</TableCell>

                          <TableCell>{user.role}</TableCell>
                          <TableCell>
                            <IconButton onClick={() => handleEditClick(user)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteClick(user)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Edit Drawer */}
        <Drawer
          anchor="right"
          open={isEditDrawerOpen}
          onClose={handleEditDrawerClose}
        >
          <Box sx={{ width: 400, p: 3 }}>
            <Typography variant="h6">Edit User</Typography>
            {selectedUser && (
              <UserEditPage
                user={selectedUser}
                onClose={handleEditDrawerClose}
              />
            )}
          </Box>
        </Drawer>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={isDeleteDialogOpen}
          onClose={handleDeleteCancel}
        >
          <DialogTitle>Delete User</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete {userToDelete?.username}?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default SinglePageDashboard;