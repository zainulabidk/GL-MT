import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
     users: [],
    isLoading: false,
    currentUser: null, 
    error: null,
    admin: null,
  },
  reducers: {
    fetchAdminStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchAdminSuccess: (state, action) => {
      state.isLoading = false;
      state.admin = action.payload;  
    },
    fetchAdminFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    fetchUsersStart: (state) => {

      state.isLoading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action) => {
       
      state.isLoading = false;
      state.users = action.payload;
    },
    fetchUsersFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchUserByIdStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchUserByIdSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload; 
    },
    fetchUserByIdFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    deleteUserSuccess: (state, action) => {
      state.isLoading = false;
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
    deleteUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateUserStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action) => {
      state.isLoading = false;
      state.users = state.users.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
    },
    updateUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAdminStart,
  fetchAdminSuccess,
  fetchAdminFailure,
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchUserByIdStart,
  fetchUserByIdSuccess,
  fetchUserByIdFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} = userSlice.actions;

export default userSlice.reducer;