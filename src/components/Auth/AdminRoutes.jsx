import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("access_token");

  if (!userData || !token) {
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
