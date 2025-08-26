import axios from 'axios';

/**
 * API client configured for TaskFlow backend.
 * - Base URL is read from REACT_APP_API_BASE_URL (must be set in .env by orchestrator)
 * - Attaches Authorization header if a JWT token is present in localStorage
 * - Handles 401 responses by clearing session and redirecting to login
 */
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '/api',
  withCredentials: true,
});

// Request interceptor to inject JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tf_token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to catch 401 and force logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      // Clear any stored auth and redirect to login
      localStorage.removeItem('tf_token');
      localStorage.removeItem('tf_user');
      if (window.location.pathname !== '/login') {
        window.location.assign('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
