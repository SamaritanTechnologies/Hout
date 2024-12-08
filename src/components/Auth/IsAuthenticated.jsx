import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const UserRoutes = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (!userData || !userData.token) {
    return <Navigate to="/sign-in" />;
  }

  //* Check user role
  if (userData.is_superuser) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default UserRoutes;
