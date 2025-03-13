import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "./features/authSlice";
import userReducer from "./features/userSlice";
import rootSaga from "./sagas/rootSaga";

// Create the Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,  
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),  
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;