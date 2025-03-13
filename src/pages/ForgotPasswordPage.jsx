import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, Paper, Alert, Box, Link as MuiLink } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordStart } from "../features/authSlice";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, resetSuccess, resetToken } = useSelector((state) => state.auth);
  const [tokenCopied, setTokenCopied] = useState(false);

  useEffect(() => {
    if (resetSuccess && resetToken) {
      setTimeout(() => {
        navigate(`/reset-password/${resetToken}`);
      }, 3000); // Delay for 3 seconds (3000 ms)
    }
  }, [resetSuccess, resetToken, navigate]);
  

  const copyToClipboard = (text) => {
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        setTokenCopied(true);
        setTimeout(() => setTokenCopied(false), 2000);
      });
    }
  };

  const formik = useFormik({
    initialValues: { username: "" },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
    }),
    onSubmit: (values) => {
      dispatch(forgotPasswordStart({ username: values.username }));
    },
  });

  return (
    <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: "center", width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" sx={{ mb: 2, color: "#253664" }}>Forgot Password</Typography>
        
        {!resetSuccess && (
          <>
            <Typography variant="body2" sx={{ mb: 3 }}>Enter your Username to receive a password reset token.</Typography>
            
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

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
              <Button 
                type="submit" 
                variant="contained" 
                fullWidth 
                disabled={isLoading}
                sx={{ backgroundColor: "#253664", color: "white", mt: 2 }}
              >
                {isLoading ? "Processing..." : "Send Reset Token"}
              </Button>
            </form>
          </>
        )}

        {resetSuccess && resetToken && (
          <Box>
            <Alert severity="success" sx={{ mb: 3 }}>
              Reset token generated successfully!
            </Alert>
            
            <Typography variant="body1" sx={{ mb: 2, fontWeight: "bold" }}>
              Next Steps:
            </Typography>
            
            <Box sx={{ 
              p: 2, 
              bgcolor: "#f5f5f5", 
              borderRadius: 1, 
              mb: 3, 
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              textAlign: "left"
            }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                1. Copy your reset token:
              </Typography>
              <Box sx={{ 
                display: "flex", 
                width: "100%", 
                mb: 2,
                alignItems: "center",
                justifyContent: "space-between"
              }}>
                <Box sx={{ 
                  p: 1, 
                  bgcolor: "#e0e0e0", 
                  borderRadius: 1, 
                  width: "70%",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}>
                  <Typography variant="body2" noWrap>
                    {resetToken}
                  </Typography>
                </Box>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => copyToClipboard(resetToken)}
                  sx={{ ml: 1 }}
                >
                  {tokenCopied ? "Copied!" : "Copy"}
                </Button>
              </Box>
              
              <Typography variant="body2" sx={{ mb: 2 }}>
                2. Use this token to reset your password.
              </Typography>
            </Box>
          </Box>
        )}
        
        {!resetSuccess && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            Remembered your password? <Link to="/login" style={{ color: "#253664", textDecoration: "none" }}>Login</Link>
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default ForgotPasswordPage;