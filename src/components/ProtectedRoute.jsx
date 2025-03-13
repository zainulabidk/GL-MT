import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);
// console.log("userooo",user);

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

   if (allowedRoles && !allowedRoles.includes(user.user.role)) {
    return <Navigate to="/" replace />;
  }

   return <Outlet />;
};

export default ProtectedRoute;