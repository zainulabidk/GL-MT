import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
} from "@mui/material";
import { updateUserStart } from "../features/userSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UserEditPage = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    gender: "",
    dob: null,
    address: "",
    profileImage: "",
  });

  // Populate form data when user prop changes
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        mobile: user.mobile || "",
        gender: user.gender || "",
        dob: user.dob ? new Date(user.dob) : null,
        address: user.address || "",
        profileImage: user.profileImage || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      dob: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUserData = {
      ...formData,
      dob: formData.dob ? formData.dob.toISOString() : null,
    };
    
    dispatch(updateUserStart({ 
      userId: user._id, 
      userData: updatedUserData 
    }));
    
    // Close drawer after submitting
    setTimeout(() => {
      onClose();
    }, 500);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        {/* Username */}
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Box>

        {/* Email */}
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Box>

        {/* Mobile */}
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </Box>

        {/* Gender */}
        <Box sx={{ mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              label="Gender"
              required
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Date of Birth */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Date of Birth
          </Typography>
          <DatePicker
            selected={formData.dob}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select Date of Birth"
            customInput={<TextField fullWidth />}
            required
          />
        </Box>

        {/* Address */}
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            multiline
            rows={2}
          />
        </Box>

        {/* Profile Image */}
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Profile Image URL"
            name="profileImage"
            value={formData.profileImage}
            onChange={handleChange}
          />
        </Box>

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Update"}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UserEditPage;