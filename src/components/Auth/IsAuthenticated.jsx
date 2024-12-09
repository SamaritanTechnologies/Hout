import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const UserRoutes = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  //* Check if user is authenticated
  if (!userData || !userData.token) {
    return <Navigate to="/sign-in" />;
  }

  // //* Check user role
  if (userData.is_superuser) {
    // Redirect admins away from user routes
    return <Navigate to="/dashboard" />;
  }

  //* Render the child components/routes if user is authenticated and not an admin
  return (
    <>
      <Outlet />
    </>
  );
};

export default UserRoutes;
