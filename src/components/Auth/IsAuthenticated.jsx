import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const UserRoutes = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("access_token");

  //* Check if user is authenticated
  if (!userData || !token) {
    return <Navigate to="/sign-in" />;
  }

  // //* Check user role
  if (userData.is_superuser) {
    // Redirect admins away from user routes
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default UserRoutes;
