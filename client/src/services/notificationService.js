import API from '../utils/api';

export const notificationService = {
  // Get notifications
  getNotifications: async (params = {}) => {
    const query = new URLSearchParams(params);
    const response = await API.get(`/notifications?${query}`);
    return response.data;
  },

  // Mark as read
  markAsRead: async (id) => {
    const response = await API.put(`/notifications/${id}/read`);
    return response.data;
  },

  // Mark all as read
  markAllAsRead: async () => {
    const response = await API.put('/notifications/read-all');
    return response.data;
  },

  // Delete notification
  delete: async (id) => {
    const response = await API.delete(`/notifications/${id}`);
    return response.data;
  },
};