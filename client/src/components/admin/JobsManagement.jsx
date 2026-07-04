import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, RefreshCw, Search } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import API from '../../utils/api';
import Modal from '../ui/Modal';
import Pagination from '../ui/Pagination';

const JobsManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    qualification: '',
    salary: '',
    country: '',
    description: '',
    responsibilities: [],
    requirements: []
  });
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    fetchJobs();
  }, [page, search]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await API.get(`/jobs/admin/all?page=${page}&search=${search}`);
      setJobs(response.data.jobs || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      showError('Failed to fetch jobs.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingJob) {
        await API.put(`/jobs/${editingJob.id}`, formData);
        showSuccess('Job updated successfully.');
      } else {
        await API.post('/jobs', formData);
        showSuccess('Job created successfully.');
      }
      setShowModal(false);
      setEditingJob(null);
      setFormData({ title: '', qualification: '', salary: '', country: '', description: '', responsibilities: [], requirements: [] });
      fetchJobs();
    } catch (error) {
      showError('Failed to save job.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      await API.delete(`/jobs/${id}`);
      showSuccess('Job deleted successfully.');
      fetchJobs();
    } catch (error) {
      showError('Failed to delete job.');
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      qualification: job.qualification,
      salary: job.salary,
      country: job.country,
      description: job.description,
      responsibilities: job.responsibilities || [],
      requirements: job.requirements || []
    });
    setShowModal(true);
  };

  if (loading && jobs.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 border-3 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs..."
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
          />
        </div>
        <button
          onClick={() => { setEditingJob(null); setFormData({ title: '', qualification: '', salary: '', country: '', description: '', responsibilities: [], requirements: [] }); setShowModal(true); }}
          className="flex items-center gap-2 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition text-sm"
        >
          <Plus className="h-4.5 w-4.5" />
          Add Job
        </button>
        <button
          onClick={fetchJobs}
          className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition"
        >
          <RefreshCw className="h-4.5 w-4.5 text-slate-500" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div>
              <h4 className="font-bold text-dark-200">{job.title}</h4>
              <div className="flex flex-wrap items-center gap-3 mt-1">
                <span className="text-xs text-slate-500">{job.country}</span>
                <span className="text-xs text-slate-500">{job.salary}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  job.isOpen ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  {job.isOpen ? 'Open' : 'Closed'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3 sm:mt-0">
              <button
                onClick={() => handleEdit(job)}
                className="p-1.5 text-primary-500 hover:bg-primary-50 rounded-lg transition"
                title="Edit"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(job.id)}
                className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <Modal
        isOpen={showModal}
        onClose={() => { setShowModal(false); setEditingJob(null); }}
        title={editingJob ? 'Edit Job' : 'Add New Job'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Job Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Qualification"
              value={formData.qualification}
              onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
              required
            />
            <input
              type="text"
              placeholder="Salary"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Country"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition resize-none"
            required
          />
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition"
            >
              {editingJob ? 'Update Job' : 'Create Job'}
            </button>
            <button
              type="button"
              onClick={() => { setShowModal(false); setEditingJob(null); }}
              className="flex-1 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

// ✅ ADD THIS - Default export
export default JobsManagement;