import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Paper, MenuItem, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerStart } from "../features/authSlice";
import GifBg from '../assets/lootiGif/signupbglootie.json';
import LottieBackground from "../pages/common/LootiGif";

const AuthPage = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector(state => state.auth);

  const validationSchema = Yup.object({
    userName: Yup.string().required("User Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    mobile: Yup.string().matches(/^[0-9]{10}$/, "Invalid mobile number").required("Mobile number is required"),
    gender: Yup.string().required("Gender is required"),
    dob: Yup.date().required("Date of Birth is required"),
    address: Yup.string().required("Address is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    profileImage: Yup.mixed().required("Profile Image is required"),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      mobile: "",
      gender: "",
      dob: "",
      address: "",
      password: "",
      confirmPassword: "",
      profileImage: null
    },
    validationSchema,
    onSubmit: (values) => {
      // Create FormData object to handle file upload
      const formData = new FormData();
      formData.append("username", values.userName);
      formData.append("email", values.email);
      formData.append("mobile", values.mobile);
      formData.append("gender", values.gender);
      formData.append("dob", values.dob);
      formData.append("address", values.address);
      formData.append("password", values.password);
      formData.append("role", "user"); // Default role for signup
      formData.append("profileImage", values.profileImage);
      
      // Dispatch registerStart action with formData and navigate function
      dispatch(registerStart({ userData: formData, navigate }));
    },
  });

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("profileImage", file);

    // Create a preview of the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <Container maxWidth="md" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      {/* <LottieBackground animationData={GifBg}> */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: "center", width: "100%", maxWidth: 500 }}>
          <Typography variant="h5" sx={{ mb: 2, color: "#253664" }}>Sign Up</Typography>
          
          {error && (
            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  label="User Name"
                  variant="outlined"
                  fullWidth
                  name="userName"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.userName && Boolean(formik.errors.userName)}
                  helperText={formik.touched.userName && formik.errors.userName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Mobile"
                  variant="outlined"
                  fullWidth
                  name="mobile"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                  helperText={formik.touched.mobile && formik.errors.mobile}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Gender"
                  select
                  variant="outlined"
                  fullWidth
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                  helperText={formik.touched.gender && formik.errors.gender}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date of Birth"
                  type="date"
                  variant="outlined"
                  fullWidth
                  name="dob"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.dob}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.dob && Boolean(formik.errors.dob)}
                  helperText={formik.touched.dob && formik.errors.dob}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  name="address"
                  multiline
                  rows={2}
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body1" sx={{ mb: 1 }}>Profile Image</Typography>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="profileImage"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="profileImage">
                    <Button variant="outlined" component="span" sx={{ mb: 1 }}>
                      Upload Image
                    </Button>
                  </label>
                  {imagePreview && (
                    <Box
                      component="img"
                      src={imagePreview}
                      alt="Profile Preview"
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #253664',
                      }}
                    />
                  )}
                  {formik.touched.profileImage && Boolean(formik.errors.profileImage) && (
                    <Typography variant="caption" color="error">
                      {formik.errors.profileImage}
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              disabled={isLoading}
              sx={{ backgroundColor: "#253664", color: "white", mt: 2 }}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
          <Box mt={2}>
            <Typography variant="body2">
              Already have an account? <Link to="/login" style={{ color: "#253664", textDecoration: "none" }}>Login</Link>
            </Typography>
          </Box>
        </Paper>
      {/* </LottieBackground> */}
    </Container>
  );
};

export default AuthPage;