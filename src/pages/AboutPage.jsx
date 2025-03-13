import React from "react";
import { Container, Typography, Box, Grid, Avatar, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { People, Security, Dashboard, Settings } from "@mui/icons-material";
import Header from '../components/Header';

const features = [
  { icon: <People fontSize="large" />, title: "User Roles", desc: "Manage different roles efficiently." },
  { icon: <Security fontSize="large" />, title: "Secure Access", desc: "Advanced authentication & security." },
  { icon: <Dashboard fontSize="large" />, title: "Dashboard", desc: "Get insights with a detailed dashboard." },
  { icon: <Settings fontSize="large" />, title: "Customization", desc: "Personalize settings as needed." }
];

const teamMembers = [
  { name: "John Doe", role: "Admin", img: "https://i.pravatar.cc/100?img=1" },
  { name: "Jane Smith", role: "Manager", img: "https://i.pravatar.cc/100?img=2" },
  { name: "Mike Johnson", role: "User", img: "https://i.pravatar.cc/100?img=3" }
];

const AboutPage = () => {
  return (
    <>
    <Header/>
  
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {/* Hero Section */}
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
          About User Management
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" gutterBottom>
          A powerful system to manage users, roles, and security with ease.
        </Typography>
      </motion.div>

      {/* Features Section */}
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2 }}>
              <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
                {feature.icon}
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>{feature.title}</Typography>
                <Typography variant="body2" color="textSecondary">{feature.desc}</Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Team Section */}
      <Typography variant="h4" align="center" fontWeight="bold" sx={{ mt: 5 }}>Our Team</Typography>
      <Grid container spacing={4} justifyContent="center" sx={{ mt: 3 }}>
        {teamMembers.map((member, index) => (
          <Grid item key={index}>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: index * 0.2 }}>
              <Paper elevation={4} sx={{ p: 3, textAlign: "center", borderRadius: "12px" }}>
                <Avatar src={member.img} sx={{ width: 80, height: 80, margin: "auto" }} />
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>{member.name}</Typography>
                <Typography variant="body2" color="textSecondary">{member.role}</Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
    </>
  );
};

export default AboutPage;