import React from "react";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginStart } from "../features/authSlice";
import { motion } from "framer-motion";
import Header from "../components/Header";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { username: "zain", password: "123456" },
    validationSchema,
    onSubmit: (values) => {
      console.log("Login Form Values:", values);
      dispatch(loginStart({ ...values, navigate }));
    },
  });

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Paper elevation={5} sx={{ p: 4, borderRadius: 3, textAlign: "center", width: "100%", maxWidth: 400, background: "#f5f5f5" }}>
            <Typography variant="h5" sx={{ mb: 2, color: "#253664", fontWeight: "bold" }}>Login</Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                sx={{ mb: 2 }}
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: "#253664", color: "white", mt: 2, p: 1.5, fontSize: "16px" }}>
                  Login
                </Button>
              </motion.div>
            </form>
            <Box mt={2}>
              <Typography variant="body2">
                Don't have an account? <Link to="/signup" style={{ color: "#253664", textDecoration: "none", fontWeight: "bold" }}>Sign Up</Link>
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <Link to="/forget-password" style={{ color: "#253664", textDecoration: "none", fontWeight: "bold" }}>Forgot Password?</Link>
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </>
  );
};

export default LoginPage;