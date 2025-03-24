import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import PageLoader from "../components/Common/PageLoader";
import { isSuperUser } from "../redux";

export const AdminRoute = ({ children }) => {
  const authState = useSelector((state) => state.auth);
  const isLoading = authState.isLoading;
  const isAuthenticated = authState.isLoggedIn;
  const isAdmin = isSuperUser();

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

  if (isLoading) {
    return <PageLoader />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};
