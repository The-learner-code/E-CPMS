import React, { createContext, useContext, useState } from 'react';

// Create a context object
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap around parts of the app that need access to auth state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Manage authentication state

  const login = () => setIsAuthenticated(true);  // Function to log in (set state to true)
  const logout = () => setIsAuthenticated(false);  // Function to log out (set state to false)

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
