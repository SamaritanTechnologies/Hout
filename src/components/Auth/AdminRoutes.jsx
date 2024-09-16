import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  //* Check if user is authenticated
  if (!userData || !userData.token) {
    return <Navigate to="/sign-in" />;
  }

  //* Check user role
  if (!userData.is_superuser) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default AdminRoutes;
