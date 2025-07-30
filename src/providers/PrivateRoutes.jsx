import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PageLoader from "../components/Common/PageLoader";
import { isSuperUser } from "../redux";
import { useEffect } from "react";
import { scrollToTop } from "../utils/helper";

export const AdminRoute = ({ children }) => {
  const authState = useSelector((state) => state.auth);
  const isLoading = authState.isLoading;
  const isAuthenticated = authState.isLoggedIn;
  const isAdmin = isSuperUser();
  const location = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [location]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export const PrivateRoute = ({ children }) => {
  const authState = useSelector((state) => state.auth);
  const isLoading = authState.isLoading;
  const isAuthenticated = authState.isLoggedIn;
  const location = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [location]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return children ? children : <Outlet />;
};

export const ProtectedRoute = ({ children }) => {
  const authState = useSelector((state) => state.auth);
  const isLoading = authState.isLoading;
  const isAuthenticated = authState.isLoggedIn;
  const location = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [location]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};
