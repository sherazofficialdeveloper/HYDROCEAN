import API from '../utils/api';

export const adminService = {
  // Get dashboard stats
  getStats: async () => {
    const response = await API.get('/admin/stats');
    return response.data;
  },

  // Global search
  search: async (query) => {
    const response = await API.get(`/admin/search?q=${query}`);
    return response.data;
  },

  // Get activity logs
  getLogs: async (params = {}) => {
    const query = new URLSearchParams(params);
    const response = await API.get(`/admin/logs?${query}`);
    return response.data;
  },
};