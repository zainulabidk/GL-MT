import React from 'react';
import Header from '../components/Header';
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import imgBg from '../assets/img/homebg.jpg'; 
import AboutPage from './AboutPage';

function LandingPage() {
  return (
    <div>
      <Header />
      <Box
        sx={{
          backgroundImage: `url(${imgBg})`, 
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "673px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
        }}
      >
        <Container>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to User Managment System
          </Typography>
          <Typography variant="h5" component="p" gutterBottom>
            A modern and innovative web application built with user engage with us!
          </Typography>
          <Button
            variant="contained"
            // color="primary"
            size="large"
            component={Link}
            to="/login"
            sx={{ mt: 3, backgroundColor: '#253664', color: 'white' }}
          >
            Get Started
          </Button>
        </Container>
      </Box>

     </div>
  );
}

export default LandingPage;