import React, { useEffect } from "react";
import { Container, TextField, Button, Typography, Paper, Alert } from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordStart } from "../features/authSlice";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, resetSuccess } = useSelector((state) => state.auth);
 

  useEffect(() => {
    if (resetSuccess) {
      // Redirect to the login page after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [resetSuccess, navigate]);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      dispatch(resetPasswordStart({ token, password: values.password }));
    },
  });

  return (
    <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: "center", width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" sx={{ mb: 2, color: "#253664" }}>Reset Password</Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>Enter your new password below.</Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {resetSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Password reset successfully! Redirecting to login page...
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="New Password"
            variant="outlined"
            fullWidth
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            sx={{ mb: 2 }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            disabled={isLoading}
            sx={{ backgroundColor: "#253664", color: "white", mt: 2 }}
          >
            {isLoading ? "Processing..." : "Reset Password"}
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
          <Link to="/login" style={{ color: "#253664", textDecoration: "none" }}>Back to Login</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default ResetPasswordPage;