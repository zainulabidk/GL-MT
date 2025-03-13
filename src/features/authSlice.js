import { createSlice } from "@reduxjs/toolkit";
const storedUser = JSON.parse(localStorage.getItem("user")) || null;
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser,
    token: null,
    isLoading: false,
    error: null,
    resetToken: null,
    resetSuccess: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
   
      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
   },
   
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    registerFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");  
    },

    forgotPasswordStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.resetSuccess = false;
    },
    forgotPasswordSuccess: (state, action) => {
      state.isLoading = false;
      state.resetToken = action.payload.resetToken;
      state.resetSuccess = true;
    },
    forgotPasswordFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.resetSuccess = false;
    },
    resetPasswordStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    resetPasswordSuccess: (state) => {
      state.isLoading = false;
      state.resetToken = null;
      state.resetSuccess = false;
    },
    resetPasswordFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;