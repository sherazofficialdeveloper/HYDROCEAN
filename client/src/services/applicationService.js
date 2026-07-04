import API from '../utils/api';

export const applicationService = {
  // Apply for job
  apply: async (formData) => {
    const response = await API.post('/applications/apply', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // Get user applications
  getMyApplications: async () => {
    const response = await API.get('/applications/my-applications');
    return response.data;
  },

  // Get application stats
  getStats: async () => {
    const response = await API.get('/applications/stats');
    return response.data;
  },

  // Get single application
  getApplication: async (id) => {
    const response = await API.get(`/applications/${id}`);
    return response.data;
  },

  // Admin: Get all applications
  getApplicationsAdmin: async (params = {}) => {
    const query = new URLSearchParams(params);
    const response = await API.get(`/applications/admin/all?${query}`);
    return response.data;
  },

  // Admin: Update application status
  updateStatus: async (id, status, adminNotes = '') => {
    const response = await API.put(`/applications/admin/${id}/status`, {
      status,
      adminNotes,
    });
    return response.data;
  },

  // Admin: Delete application
  deleteApplication: async (id) => {
    const response = await API.delete(`/applications/admin/${id}`);
    return response.data;
  },
};