import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
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
} from "../features/authSlice";
import authService from "../services/authService";
import { toast } from 'react-toastify';

function* loginUserSaga(action) {
  const { username, password, navigate } = action.payload; 
  try {
    const response = yield call(authService.login, { username, password });  
    console.log("response", response);

    // Store user data in localStorage properly
    localStorage.setItem("user", JSON.stringify(response));

    toast.success("Login successful!");

    // Retrieve the stored user
    const storedUser = JSON.parse(localStorage.getItem("user"));

    console.log("Stored User:", storedUser);

    if (storedUser?.user?.role === "admin") {
      navigate("/admindashboard");   
    } else {
      navigate("/userdashboard");  
    }

    // Dispatch login success
    yield put(loginSuccess(response));

  } catch (error) {
    yield put(loginFailure(error.message));
    toast.error(`Login failed: ${error.message}`);
  }
}



function* registerUserSaga(action) {
  const { userData, navigate } = action.payload;
  try {
    const response = yield call(authService.register, userData);
    yield put(registerSuccess(response));
    toast.success("Registration successful!");
    
    // Store user data in localStorage
    // localStorage.setItem("user", JSON.stringify(response));
    
    // Navigate to login page or user dashboard based on your app flow
    navigate("/login");
  } catch (error) {
    yield put(registerFailure(error.message || "Registration failed"));
    toast.error(`Registration failed: ${error.message || "Unknown error"}`);
  }
}

function* forgotPasswordSaga(action) {
  try {
    const response = yield call(authService.forgotPassword, action.payload.username);
    yield put(forgotPasswordSuccess(response));
  } catch (error) {
    yield put(forgotPasswordFailure(error.response?.data?.error || "Password reset request failed"));
  }
}

function* resetPasswordSaga(action) {
  try {
    const { token, password } = action.payload;
    const response = yield call(authService.resetPassword, token, password);
    yield put(resetPasswordSuccess(response));
  } catch (error) {
    yield put(resetPasswordFailure(error.response?.data?.error || "Password reset failed"));
  }
}


export default function* authSaga() {
  yield takeEvery('auth/loginStart', loginUserSaga);
  yield takeLatest('auth/registerStart', registerUserSaga);
  yield takeLatest("auth/forgotPasswordStart", forgotPasswordSaga);
  yield takeLatest("auth/resetPasswordStart", resetPasswordSaga);
}