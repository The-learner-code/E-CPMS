import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// PrivateRoute component to protect routes
const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();  // Get authentication state from the context
  return isAuthenticated ? element : <Navigate to="/LoginAndRegister" />;  // Render element or redirect based on auth state
};

export default PrivateRoute;
