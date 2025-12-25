import axios from 'axios';

// Define your API base URL (use environment variable for production)
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

// Create an axios instance with the base URL and send cookies automatically
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // This ensures cookies are sent with requests
});

// API service functions

export const apiService = {
  // Login user
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data; // This will contain the JWT cookie set by the backend
    } catch (error) {
      console.error("Login failed", error);
      throw new Error(error.response.data.message || "Login failed");
    }
  },

  // Register user
  signup: async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      return response.data; // This will contain the JWT cookie set by the backend
    } catch (error) {
      console.error("Signup failed", error);
      throw new Error(error.response.data.message || "Signup failed");
    }
  },

  // Get current user (protected route)
  getMe: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user", error);
      throw new Error("Unauthorized access");
    }
  },

  // Logout user (delete JWT cookie)
  logout: async () => {
    try {
      await api.post('/auth/logout');
      // The backend will clear the cookie
    } catch (error) {
      console.error("Logout failed", error);
    }
  },
};