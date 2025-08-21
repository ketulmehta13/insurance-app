
import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

// Create the context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );
  const [user, setUser] = useState(null); // Initialize the user state
  const navigate = useNavigate();

  // On initial load, check for user data in local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data from local storage", error);
        // Clear invalid data to avoid future errors
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Logout function
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user'); // Also remove user data
    setIsLoggedIn(false);
    setUser(null); // Clear the user state
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };