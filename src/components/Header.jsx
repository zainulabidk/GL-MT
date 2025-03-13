import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { Home as HomeIcon, Info as InfoIcon, Login as LoginIcon } from "@mui/icons-material";

const Navbar = () => {
  return (
    <AppBar 
      position="static" 
      sx={{ backgroundColor: "white", color: "black", borderBottomLeftRadius: "15px", borderBottomRightRadius: "15px" }}
    >
      <Container>
        <Toolbar>
          {/* Logo on the left with an icon */}
          <Typography
            variant="h6"
            component="div"
            sx={{ display: "flex", alignItems: "center", fontSize: "20px" }}
          >
            <HomeIcon sx={{ marginRight: 1 }} /> HR
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{ '&:hover': { backgroundColor: '#253664',color: 'white' }, fontSize: "20px" }}
            >
              <HomeIcon sx={{ marginRight: 0.5 }} /> Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/about"
              sx={{ '&:hover': { backgroundColor: '#253664',color: 'white' }, fontSize: "20px" }}
            >
              <InfoIcon sx={{ marginRight: 0.5 }} /> About
            </Button>
          </Box>

          {/* Login button aligned to the right end */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", flexGrow: 1 }}>
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{ 
                '&:hover': { backgroundColor: '#253664', color: 'white' }, // Hover effect for Login
                marginLeft: 2 
              }}             >
              <LoginIcon sx={{ marginRight: 0.5 }} /> Login
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;