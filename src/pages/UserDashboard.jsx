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
  Divider,
  Paper,
  IconButton,
  Badge,
  useTheme,
  useMediaQuery,
  Chip,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersStart, fetchAdminStart } from "../features/userSlice";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const SinglePageDashboard = () => {
  const users = useSelector((state) => state.user.users);
  const currentUser = useSelector((state) => state.user.admin);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsersStart());
    dispatch(fetchAdminStart());
  }, [dispatch]);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const drawer = (
    <div>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <Typography variant="h6" sx={{ color: "#253664", fontWeight: 'bold' }}>
            User Panel
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar 
            src={currentUser?.profileImage} 
            alt={currentUser?.username}
            sx={{ width: 50, height: 50, mr: 2, border: '2px solid #253664' }}
          />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {currentUser?.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentUser?.email}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
      <List>
        <ListItem 
          button 
          selected={activeMenu === "dashboard"} 
          onClick={() => handleMenuClick("dashboard")}
          sx={{ 
            borderRadius: '8px', 
            mx: 1, 
            mb: 1,
            "&.Mui-selected": { 
              backgroundColor: "#253664", 
              color: "white",
              "&:hover": { backgroundColor: "#1a2648" },
              "& .MuiListItemIcon-root": { color: "white" }
            },
            "&:hover": { backgroundColor: "#e3e9f7" }
          }}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        {/* <ListItem 
          button 
          selected={activeMenu === "users"} 
          onClick={() => handleMenuClick("users")}
          sx={{ 
            borderRadius: '8px', 
            mx: 1, 
            mb: 1,
            "&.Mui-selected": { 
              backgroundColor: "#253664", 
              color: "white",
              "&:hover": { backgroundColor: "#1a2648" },
              "& .MuiListItemIcon-root": { color: "white" }
            },
            "&:hover": { backgroundColor: "#e3e9f7" }
          }}
        >
          <ListItemIcon>
            <PeopleAltIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem> */}
        <ListItem 
          button 
          selected={activeMenu === "tasks"} 
          onClick={() => handleMenuClick("tasks")}
          sx={{ 
            borderRadius: '8px', 
            mx: 1, 
            mb: 1,
            "&.Mui-selected": { 
              backgroundColor: "#253664", 
              color: "white",
              "&:hover": { backgroundColor: "#1a2648" },
              "& .MuiListItemIcon-root": { color: "white" }
            },
            "&:hover": { backgroundColor: "#e3e9f7" }
          }}
        >
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Tasks" />
        </ListItem>
        <ListItem 
          button 
          selected={activeMenu === "profile"} 
          onClick={() => handleMenuClick("profile")}
          sx={{ 
            borderRadius: '8px', 
            mx: 1, 
            mb: 1,
            "&.Mui-selected": { 
              backgroundColor: "#253664", 
              color: "white",
              "&:hover": { backgroundColor: "#1a2648" },
              "& .MuiListItemIcon-root": { color: "white" }
            },
            "&:hover": { backgroundColor: "#e3e9f7" }
          }}
        >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem 
          button 
          onClick={handleLogout}
          sx={{ 
            borderRadius: '8px', 
            mx: 1, 
            mb: 1,
            "&:hover": { backgroundColor: "#ffebee" }
          }}
        >
          <ListItemIcon sx={{ color: "#f44336" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ color: "#f44336" }} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "white",
          color: "#253664",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            User Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />

        {activeMenu === "dashboard" && (
          <Box>
            <Typography variant="h4" sx={{ mb: 3, color: "#253664", fontWeight: 'bold' }}>
              Dashboard Overview
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ 
                  borderRadius: 3, 
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  background: "linear-gradient(135deg, #6A11CB, #2575FC)", 
                  height: '100%' 
                }}>
                  <CardContent sx={{ color: 'white', p: 3 }}>
                    <Typography variant="h5" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Total Users
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                      {users.length}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                      Active accounts on platform
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ 
                  borderRadius: 3, 
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  background: "linear-gradient(135deg, #FF9500, #FF5E3A)", 
                  height: '100%' 
                }}>
                  <CardContent sx={{ color: 'white', p: 3 }}>
                    <Typography variant="h5" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
                      New Users
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                      3
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                      Joined this week
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ 
                  borderRadius: 3, 
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  background: "linear-gradient(135deg, #11998e, #38ef7d)", 
                  height: '100%' 
                }}>
                  <CardContent sx={{ color: 'white', p: 3 }}>
                    <Typography variant="h5" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Tasks
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                      12
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                      Pending assignments
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ 
                  borderRadius: 3, 
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  background: "linear-gradient(135deg, #4e54c8, #8f94fb)", 
                  height: '100%' 
                }}>
                  <CardContent sx={{ color: 'white', p: 3 }}>
                    <Typography variant="h5" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Activity
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                      85%
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                      User engagement rate
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            
            <Box sx={{ mb: 4 }}>
              <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <Typography variant="h5" sx={{ mb: 3, color: "#253664", fontWeight: 'bold' }}>
                  User Profile
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Avatar 
                        src={currentUser?.profileImage} 
                        alt={currentUser?.username}
                        sx={{ 
                          width: 150, 
                          height: 150, 
                          mb: 2, 
                          border: '4px solid #253664',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                        }}
                      />
                      <Typography variant="h5" sx={{ color: "#253664", fontWeight: 'bold' }}>
                        {currentUser?.username}
                      </Typography>
                      <Chip 
                        label={currentUser?.role?.toUpperCase()} 
                        sx={{ 
                          mt: 1, 
                          backgroundColor: "#253664", 
                          color: "white",
                          fontWeight: 'bold'
                        }} 
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" color="text.secondary">Email</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{currentUser?.email}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" color="text.secondary">Mobile</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{currentUser?.mobile}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" color="text.secondary">Gender</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{currentUser?.gender}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" color="text.secondary">Date of Birth</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                          {currentUser?.dob ? formatDate(currentUser.dob) : "Not specified"}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" color="text.secondary">Address</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                          {currentUser?.address?.replace(/\\r\\n/g, ', ')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
            
            {/* <Box>
              <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <Typography variant="h5" sx={{ mb: 3, color: "#253664", fontWeight: 'bold' }}>
                  Recent Users
                </Typography>
                <Grid container spacing={2}>
                  {users.slice(0, 4).map((user, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Card sx={{ 
                        p: 2, 
                        borderRadius: 2,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                        }
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar 
                            src={user.profileImage} 
                            alt={user.username}
                            sx={{ width: 50, height: 50, mr: 2 }}
                          />
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                              {user.username}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" noWrap>
                              {user.email}
                            </Typography>
                          </Box>
                        </Box>
                        <Divider sx={{ mb: 1 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Chip 
                            label={user.role?.toUpperCase()} 
                            size="small"
                            sx={{ 
                              backgroundColor: user.role === 'admin' ? '#253664' : '#4caf50', 
                              color: 'white',
                              fontWeight: 'medium'
                            }} 
                          />
                          <Typography variant="caption" color="text.secondary">
                            {user.mobile}
                          </Typography>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Box> */}
          </Box>
        )}

        {activeMenu === "users" && (
          <Box>
            <Typography variant="h4" sx={{ mb: 3, color: "#253664", fontWeight: 'bold' }}>
              User Management
            </Typography>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>All Registered Users</Typography>
              <Grid container spacing={2}>
                {users.map((user, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card sx={{ 
                      p: 2, 
                      borderRadius: 2,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                      }
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar 
                          src={user.profileImage} 
                          alt={user.username}
                          sx={{ width: 50, height: 50, mr: 2 }}
                        />
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {user.username}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {user.email}
                          </Typography>
                        </Box>
                      </Box>
                      <Divider sx={{ mb: 2 }} />
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">Mobile</Typography>
                          <Typography variant="body2">{user.mobile}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">Gender</Typography>
                          <Typography variant="body2">{user.gender}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2" color="text.secondary">Address</Typography>
                          <Typography variant="body2" noWrap>
                            {user.address?.replace(/\\r\\n/g, ', ')}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Chip 
                          label={user.role?.toUpperCase()} 
                          size="small"
                          sx={{ 
                            backgroundColor: user.role === 'admin' ? '#253664' : '#4caf50', 
                            color: 'white',
                            fontWeight: 'medium'
                          }} 
                        />
                        <Typography variant="caption" color="text.secondary">
                          {user.dob ? formatDate(user.dob) : "Not specified"}
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>
        )}

        {activeMenu === "tasks" && (
          <Box>
            <Typography variant="h4" sx={{ mb: 3, color: "#253664", fontWeight: 'bold' }}>
              Task Management
            </Typography>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <Typography variant="h6" sx={{ mb: 3 }}>Upcoming Tasks</Typography>
              <Typography variant="body1">
                Task management features will be implemented here.
              </Typography>
            </Paper>
          </Box>
        )}

        {activeMenu === "profile" && (
          <Box>
            <Typography variant="h4" sx={{ mb: 3, color: "#253664", fontWeight: 'bold' }}>
              User Profile
            </Typography>
            <Paper sx={{ p: 4, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar 
                    src={currentUser?.profileImage} 
                    alt={currentUser?.username}
                    sx={{ 
                      width: 200, 
                      height: 200, 
                      mb: 3, 
                      border: '4px solid #253664',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
                    }}
                  />
                  <Typography variant="h4" sx={{ color: "#253664", fontWeight: 'bold', mb: 1 }}>
                    {currentUser?.username}
                  </Typography>
                  <Chip 
                    label={currentUser?.role?.toUpperCase()} 
                    sx={{ 
                      backgroundColor: "#253664", 
                      color: "white",
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      py: 0.5
                    }} 
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography variant="h5" sx={{ mb: 3, color: "#253664", fontWeight: 'bold' }}>
                    Personal Information
                  </Typography>
                  <Paper sx={{ p: 3, borderRadius: 2, mb: 3, backgroundColor: '#f9fafc' }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" color="text.secondary">Full Name</Typography>
                        <Typography variant="h6">{currentUser?.username}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" color="text.secondary">Email Address</Typography>
                        <Typography variant="h6">{currentUser?.email}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" color="text.secondary">Mobile Number</Typography>
                        <Typography variant="h6">{currentUser?.mobile}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" color="text.secondary">Gender</Typography>
                        <Typography variant="h6">{currentUser?.gender}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" color="text.secondary">Date of Birth</Typography>
                        <Typography variant="h6">
                          {currentUser?.dob ? formatDate(currentUser.dob) : "Not specified"}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" color="text.secondary">Address</Typography>
                        <Typography variant="h6" sx={{ whiteSpace: 'pre-line' }}>
                          {currentUser?.address?.replace(/\\r\\n/g, '\n')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SinglePageDashboard;