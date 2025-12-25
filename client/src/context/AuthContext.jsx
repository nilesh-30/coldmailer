import { createContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds the logged-in user data

  useEffect(() => {
    // Fetch user data on page load to check if the user is logged in
    const checkUser = async () => {
      try {
        const userData = await apiService.getMe(); // Fetch the user from the API
        setUser(userData.user); // Set the user in the context if authenticated
      } catch (error) {
        setUser(null); // If user is not authenticated, reset user state
      }
    };

    checkUser(); // Call the checkUser function
  }, []);

  const logout = async () => {
    await apiService.logout(); // Call the logout function from the service
    setUser(null); // Reset user state
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
