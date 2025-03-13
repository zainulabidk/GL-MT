import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchAdminStart,
  fetchAdminSuccess,
  fetchAdminFailure,
  fetchUsersStart,
  fetchUserByIdStart,
  fetchUserByIdSuccess,
  fetchUserByIdFailure,
  fetchUsersSuccess,
  fetchUsersFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../features/userSlice";
import userService from "../services/userService";

// function* fetchUsersSaga(action) {
//   console.log("action",action.payload);

//   try {
//     const response = yield call(userService.fetchUsers);
//     yield put(fetchUsersSuccess(response));
//   } catch (error) {
//     yield put(fetchUsersFailure(error.message));
//   }
// }

function* fetchAdminSaga() {
  try {
    const token = JSON.parse(localStorage.getItem("user"))?.token;

    if (!token) throw new Error("No token found");

    const adminId = JSON.parse(localStorage.getItem("user"))?.user?.id;

    const response = yield call(userService.fetchUserById, adminId, token);
    yield put(fetchAdminSuccess(response));
  } catch (error) {
    yield put(fetchAdminFailure(error.message));
  }
}

function* fetchUsersSaga() {
  try {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    if (!token) throw new Error("No token found");

    const response = yield call(userService.fetchUsers, token);
    yield put(fetchUsersSuccess(response));
  } catch (error) {
    console.error("Error fetching users:", error);
    yield put(fetchUsersFailure(error.message));
  }
}

function* fetchUserByIdSaga(action) {
  try {
    const { userId } = action.payload;
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    if (!token) throw new Error("No token found");

    const response = yield call(userService.fetchUserById, userId, token);
    yield put(fetchUserByIdSuccess(response));
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    yield put(fetchUserByIdFailure(error.message));
  }
}

function* deleteUserSaga(action) {
  try {
    const { userId } = action.payload;
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    if (!token) throw new Error("No token found");

    yield call(userService.deleteUser, userId, token);
    yield put(deleteUserSuccess(userId));
  } catch (error) {
    yield put(deleteUserFailure(error.message));
  }
}

function* updateUserSaga(action) {
  try {
    const { userId, userData } = action.payload;
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    if (!token) throw new Error("No token found");

    const response = yield call(userService.updateUser, userId, userData, token);
    yield put(updateUserSuccess(response));
  } catch (error) {
    yield put(updateUserFailure(error.message));
  }
}

export default function* userSaga() {
  yield takeLatest("user/fetchAdminStart", fetchAdminSaga);
  yield takeLatest('user/fetchUsersStart', fetchUsersSaga);
  yield takeLatest('user/fetchUserByIdStart', fetchUserByIdSaga);
  yield takeLatest('user/deleteUserStart', deleteUserSaga);
  yield takeLatest('user/updateUserStart', updateUserSaga);
}