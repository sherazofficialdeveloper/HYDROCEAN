import API from '../utils/api';

export const userService = {
  // Get all users (admin)
  getUsers: async (params = {}) => {
    const query = new URLSearchParams(params);
    const response = await API.get(`/admin/users?${query}`);
    return response.data;
  },

  // Get user by ID
  getUser: async (id) => {
    const response = await API.get(`/admin/users/${id}`);
    return response.data;
  },

  // Update user
  updateUser: async (id, userData) => {
    const response = await API.put(`/admin/users/${id}`, userData);
    return response.data;
  },

  // Block/Unblock user
  toggleBlock: async (id) => {
    const response = await API.put(`/admin/users/${id}/block`);
    return response.data;
  },

  // Delete/Restore user
  toggleDelete: async (id) => {
    const response = await API.delete(`/admin/users/${id}`);
    return response.data;
  },

  // Update user role
  updateRole: async (id, role, permissions = []) => {
    const response = await API.put(`/admin/users/${id}/role`, { role, permissions });
    return response.data;
  },
};