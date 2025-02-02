import { Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

const PrivateRouteAuthenticated = ({ isAuthenticated, userType }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [authState, setAuthState] = useState({
    isAuthenticated: isAuthenticated,
    userType: userType
  });

  useEffect(() => {
    // Check localStorage directly
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUserType = localStorage.getItem('userType');

    setAuthState({
      isAuthenticated: storedIsLoggedIn,
      userType: storedUserType
    });
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null; // or a loading spinner
  }

  if (!authState.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

const PrivateRouteUnauthenticated = ({ isAuthenticated, userType }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [authState, setAuthState] = useState({
    isAuthenticated: isAuthenticated,
    userType: userType
  });

  useEffect(() => {
    // Check localStorage directly
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUserType = localStorage.getItem('userType');

    setAuthState({
      isAuthenticated: storedIsLoggedIn,
      userType: storedUserType
    });
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null; // or a loading spinner
  }

  if (!authState.isAuthenticated) {
    return <Outlet />;
  }

  if (authState.userType === "investor") {
    return <Navigate to="/investor-home" />;
  } else if (authState.userType === "manager") {
    return <Navigate to="/startup/home" />;
  }

  return <Navigate to="/" />;
};

export { PrivateRouteAuthenticated, PrivateRouteUnauthenticated };