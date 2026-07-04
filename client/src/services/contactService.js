import API from '../utils/api';

export const contactService = {
  // Submit contact form
  submit: async (data) => {
    const response = await API.post('/contact', data);
    return response.data;
  },

  // Get user contacts
  getMyMessages: async () => {
    const response = await API.get('/contact/my-messages');
    return response.data;
  },

  // Admin: Get all contacts
  getContacts: async (params = {}) => {
    const query = new URLSearchParams(params);
    const response = await API.get(`/admin/contacts?${query}`);
    return response.data;
  },

  // Admin: Update contact status
  updateStatus: async (id, status) => {
    const response = await API.put(`/admin/contacts/${id}/status`, { status });
    return response.data;
  },

  // Admin: Reply to contact
  reply: async (id, replyMessage) => {
    const response = await API.post(`/admin/contacts/${id}/reply`, { replyMessage });
    return response.data;
  },

  // Admin: Delete contact
  delete: async (id) => {
    const response = await API.delete(`/admin/contacts/${id}`);
    return response.data;
  },
};