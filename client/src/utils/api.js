import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Request interceptor - Add token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Response interceptor - Handle errors
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // ✅ Handle 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // ✅ Only clear token if not a verification request
      const isVerification = error.response.data?.needsVerification;
      if (!isVerification) {
        localStorage.removeItem('token');
        // ✅ Don't redirect automatically, let component handle it
      }
    }
    return Promise.reject(error);
  }
);

export default API;