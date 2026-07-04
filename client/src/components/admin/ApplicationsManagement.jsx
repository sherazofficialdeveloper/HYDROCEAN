import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, CheckCircle, XCircle, Clock, RefreshCw, FileText, Image, ExternalLink } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import API from '../../utils/api';
import Modal from '../ui/Modal';
import Pagination from '../ui/Pagination';

const ApplicationsManagement = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    fetchApplications();
  }, [page, search, statusFilter]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, search, status: statusFilter });
      const response = await API.get(`/applications/admin/all?${params}`);
      setApplications(response.data.applications || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      showError('Failed to fetch applications.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await API.put(`/applications/admin/${id}/status`, { status, adminNotes });
      showSuccess(`Application ${status.toLowerCase()}.`);
      setShowModal(false);
      setSelectedApp(null);
      fetchApplications();
    } catch (error) {
      showError('Failed to update status.');
    }
  };

  // ✅ Function to open file in new tab
  const openFileInNewTab = (url, fileType) => {
    if (!url) {
      showError('No file available to view.');
      return;
    }
    
    // ✅ Check if it's a PDF
    if (fileType === 'pdf' || url.includes('.pdf') || url.includes('application/pdf')) {
      window.open(url, '_blank');
      return;
    }
    
    // ✅ For images - open in new tab
    window.open(url, '_blank');
  };

  if (loading && applications.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 border-3 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search applications..."
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button
          onClick={fetchApplications}
          className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition"
        >
          <RefreshCw className="h-4.5 w-4.5 text-slate-500" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left py-3 px-4 text-xs font-bold uppercase text-slate-500">Applicant</th>
              <th className="text-left py-3 px-4 text-xs font-bold uppercase text-slate-500">Job</th>
              <th className="text-left py-3 px-4 text-xs font-bold uppercase text-slate-500">Documents</th>
              <th className="text-left py-3 px-4 text-xs font-bold uppercase text-slate-500">Status</th>
              <th className="text-left py-3 px-4 text-xs font-bold uppercase text-slate-500">Date</th>
              <th className="text-right py-3 px-4 text-xs font-bold uppercase text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => {
              const appId = app.id || app._id;
              
              return (
                <tr key={appId} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 font-medium">
                    {app.firstName} {app.lastName}
                    <p className="text-xs text-slate-400">{app.email}</p>
                  </td>
                  <td className="py-3 px-4 text-slate-500">{app.jobTitle}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* ✅ Photo View Button */}
                      {app.candidatePhoto && (
                        <button
                          onClick={() => openFileInNewTab(app.candidatePhoto, 'image')}
                          className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition"
                          title="View Photo"
                        >
                          <Image className="h-4 w-4" />
                        </button>
                      )}
                      {/* ✅ CV View Button */}
                      {app.cvUrl && (
                        <button
                          onClick={() => openFileInNewTab(app.cvUrl, 'pdf')}
                          className="p-1.5 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-lg transition"
                          title="View CV"
                        >
                          <FileText className="h-4 w-4" />
                        </button>
                      )}
                      {/* ✅ Deposit Slip View Button */}
                      {app.depositSlipUrl && (
                        <button
                          onClick={() => openFileInNewTab(app.depositSlipUrl, 'image')}
                          className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-lg transition"
                          title="View Deposit Slip"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      app.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' :
                      app.status === 'Rejected' ? 'bg-rose-50 text-rose-600' :
                      'bg-amber-50 text-amber-600'
                    }`}>
                      {app.status || 'Pending'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-xs">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => { setSelectedApp(app); setAdminNotes(app.adminNotes || ''); setShowModal(true); }}
                        className="p-1.5 text-primary-500 hover:bg-primary-50 rounded-lg transition"
                        title="Review"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* ✅ Modal with Document Preview */}
      <Modal
        isOpen={showModal}
        onClose={() => { setShowModal(false); setSelectedApp(null); }}
        title="Review Application"
      >
        {selectedApp && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-slate-500 font-medium">Name</p>
                <p className="font-semibold">{selectedApp.firstName} {selectedApp.lastName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Father Name</p>
                <p className="font-semibold">{selectedApp.fatherName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">WhatsApp</p>
                <p className="font-semibold">{selectedApp.whatsAppNumber}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Status</p>
                <p className={`font-semibold ${
                  selectedApp.status === 'Approved' ? 'text-emerald-600' :
                  selectedApp.status === 'Rejected' ? 'text-rose-600' :
                  'text-amber-600'
                }`}>{selectedApp.status || 'Pending'}</p>
              </div>
            </div>

            {/* ✅ Documents Section with Preview Buttons */}
            <div className="border-t border-slate-100 pt-4">
              <p className="text-xs text-slate-500 font-medium mb-3">Attached Documents</p>
              <div className="grid grid-cols-3 gap-3">
                {selectedApp.candidatePhoto && (
                  <button
                    onClick={() => openFileInNewTab(selectedApp.candidatePhoto, 'image')}
                    className="p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-center transition group"
                  >
                    <Image className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                    <p className="text-xs text-blue-600 font-medium">Photo</p>
                    <p className="text-[10px] text-blue-400 group-hover:underline">View Image</p>
                  </button>
                )}
                {selectedApp.cvUrl && (
                  <button
                    onClick={() => openFileInNewTab(selectedApp.cvUrl, 'pdf')}
                    className="p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl text-center transition group"
                  >
                    <FileText className="h-6 w-6 text-purple-500 mx-auto mb-1" />
                    <p className="text-xs text-purple-600 font-medium">CV</p>
                    <p className="text-[10px] text-purple-400 group-hover:underline">View PDF</p>
                  </button>
                )}
                {selectedApp.depositSlipUrl && (
                  <button
                    onClick={() => openFileInNewTab(selectedApp.depositSlipUrl, 'image')}
                    className="p-3 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-center transition group"
                  >
                    <ExternalLink className="h-6 w-6 text-amber-500 mx-auto mb-1" />
                    <p className="text-xs text-amber-600 font-medium">Deposit Slip</p>
                    <p className="text-[10px] text-amber-400 group-hover:underline">View Receipt</p>
                  </button>
                )}
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-500 font-medium">Experience</p>
              <p className="text-sm">{selectedApp.experience}</p>
            </div>

            <div>
              <p className="text-xs text-slate-500 font-medium">About</p>
              <p className="text-sm">{selectedApp.aboutYourself}</p>
            </div>

            <div>
              <label className="text-xs text-slate-500 font-medium block mb-1">Admin Notes</label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition resize-none"
                placeholder="Add notes about this application..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleStatusUpdate(selectedApp.id || selectedApp._id, 'Approved')}
                className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition flex items-center justify-center gap-2"
              >
                <CheckCircle className="h-4.5 w-4.5" />
                Approve
              </button>
              <button
                onClick={() => handleStatusUpdate(selectedApp.id || selectedApp._id, 'Rejected')}
                className="flex-1 py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl transition flex items-center justify-center gap-2"
              >
                <XCircle className="h-4.5 w-4.5" />
                Reject
              </button>
              <button
                onClick={() => handleStatusUpdate(selectedApp.id || selectedApp._id, 'Pending')}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition flex items-center justify-center gap-2"
              >
                <Clock className="h-4.5 w-4.5" />
                Pending
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ApplicationsManagement;