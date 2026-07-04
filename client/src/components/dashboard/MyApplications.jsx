import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, XCircle, Eye, FileText } from 'lucide-react';
import API from '../../utils/api';
import { useToast } from '../../hooks/useToast';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showError } = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await API.get('/applications/my-applications');
      setApplications(response.data.applications || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      showError(error.response?.data?.message || 'Failed to load applications.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      Pending: { icon: Clock, color: 'bg-amber-50 text-amber-600 border-amber-200' },
      Approved: { icon: CheckCircle, color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
      Rejected: { icon: XCircle, color: 'bg-rose-50 text-rose-600 border-rose-200' },
    };

    const defaultStatus = statusMap[status] || statusMap.Pending;
    const Icon = defaultStatus.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${defaultStatus.color}`}>
        <Icon className="h-3.5 w-3.5" />
        {status || 'Pending'}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 border-3 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-bold text-dark-200">No Applications</h3>
        <p className="text-sm text-slate-500 mt-2">You haven't applied for any jobs yet.</p>
        <Link
          to="/jobs"
          className="inline-block mt-4 px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition text-sm"
        >
          Browse Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <div key={app.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
          <div>
            <h4 className="font-bold text-dark-200">{app.jobTitle}</h4>
            <div className="flex flex-wrap items-center gap-3 mt-1">
              <span className="text-xs text-slate-500">Applied: {new Date(app.createdAt).toLocaleDateString()}</span>
              <span className="text-xs text-slate-500 font-mono">ID: {app.trackingId}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-3 sm:mt-0">
            {getStatusBadge(app.status)}
            <Link
              to={`/applications/${app.id}`}
              className="p-2 text-slate-400 hover:text-primary-500 rounded-lg hover:bg-slate-200 transition"
              title="View Details"
            >
              <Eye className="h-4.5 w-4.5" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyApplications;