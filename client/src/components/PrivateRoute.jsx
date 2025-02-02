import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouteAuthenticated = ({ isAuthenticated, userType }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  // Both user types can access their respective routes
  return <Outlet />;
};

const PrivateRouteUnauthenticated = ({ isAuthenticated, userType }) => {
  if (!isAuthenticated) {
    // If not logged in, allow access to auth routes
    return <Outlet />;
  }
  
  // If logged in, redirect based on userType
  if (userType === "investor") {
    return <Navigate to="/investor-home" />;
  } else if (userType === "manager") {
    return <Navigate to="/startup/home" />;
  }
  
  // Fallback
  return <Navigate to="/" />;
};

export { PrivateRouteAuthenticated, PrivateRouteUnauthenticated };
