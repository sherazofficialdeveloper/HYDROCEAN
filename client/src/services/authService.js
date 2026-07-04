import API from '../utils/api';

export const authService = {
  // Register
  register: async (userData) => {
    const response = await API.post('/auth/register', userData);
    return response.data;
  },

  // Verify OTP
  verifyOTP: async (email, otp) => {
    const response = await API.post('/auth/verify-otp', { email, otp });
    return response.data;
  },

  // Resend OTP
  resendOTP: async (email, purpose = 'registration') => {
    const response = await API.post('/auth/resend-otp', { email, purpose });
    return response.data;
  },

  // Login
  login: async (email, password) => {
    const response = await API.post('/auth/login', { email, password });
    return response.data;
  },

  // Forgot Password
  forgotPassword: async (email) => {
    const response = await API.post('/auth/forgot-password', { email });
    return response.data;
  },

  // Reset Password
  resetPassword: async (email, otp, newPassword, confirmPassword) => {
    const response = await API.post('/auth/reset-password', {
      email,
      otp,
      newPassword,
      confirmPassword,
    });
    return response.data;
  },

  // Change Password
  changePassword: async (currentPassword, newPassword, confirmPassword) => {
    const response = await API.put('/auth/change-password', {
      currentPassword,
      newPassword,
      confirmPassword,
    });
    return response.data;
  },

  // Get Current User
  getMe: async () => {
    const response = await API.get('/auth/me');
    return response.data;
  },
};