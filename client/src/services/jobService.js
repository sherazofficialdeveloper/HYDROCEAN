import API from '../utils/api';

export const jobService = {
  // Get all jobs (public)
  getJobs: async (params = {}) => {
    const query = new URLSearchParams(params);
    const response = await API.get(`/jobs?${query}`);
    return response.data;
  },

  // Get featured jobs
  getFeaturedJobs: async () => {
    const response = await API.get('/jobs/featured');
    return response.data;
  },

  // Get single job
  getJob: async (id) => {
    const response = await API.get(`/jobs/${id}`);
    return response.data;
  },

  // Admin: Create job
  createJob: async (jobData) => {
    const response = await API.post('/jobs', jobData);
    return response.data;
  },

  // Admin: Update job
  updateJob: async (id, jobData) => {
    const response = await API.put(`/jobs/${id}`, jobData);
    return response.data;
  },

  // Admin: Delete job
  deleteJob: async (id) => {
    const response = await API.delete(`/jobs/${id}`);
    return response.data;
  },

  // Admin: Toggle job status
  toggleJobStatus: async (id, field) => {
    const response = await API.put(`/jobs/${id}/toggle/${field}`);
    return response.data;
  },

  // Admin: Get all jobs
  getAllJobsAdmin: async (params = {}) => {
    const query = new URLSearchParams(params);
    const response = await API.get(`/jobs/admin/all?${query}`);
    return response.data;
  },
};