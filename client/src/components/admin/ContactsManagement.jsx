import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Mail, Eye, Reply, Trash2, RefreshCw } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import API from '../../utils/api';
import Modal from '../ui/Modal';
import Pagination from '../ui/Pagination';

const ContactsManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [sendingReply, setSendingReply] = useState(false);
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    fetchContacts();
  }, [page, search, statusFilter]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, search, status: statusFilter });
      const response = await API.get(`/admin/contacts?${params}`);
      setContacts(response.data.contacts || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      showError('Failed to fetch contacts.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fix: Get contact ID properly
  const handleReply = async (contactId) => {
    if (!contactId) {
      showError('Contact ID is missing.');
      return;
    }

    if (!replyMessage.trim()) {
      showError('Please enter a reply message.');
      return;
    }

    setSendingReply(true);
    try {
      const response = await API.post(`/admin/contacts/${contactId}/reply`, { 
        replyMessage: replyMessage.trim() 
      });
      
      if (response.data.success) {
        showSuccess('Reply sent successfully!');
        setShowModal(false);
        setSelectedContact(null);
        setReplyMessage('');
        fetchContacts();
      }
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to send reply.');
    } finally {
      setSendingReply(false);
    }
  };

  const handleDelete = async (contactId) => {
    if (!contactId) return;
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await API.delete(`/admin/contacts/${contactId}`);
      showSuccess('Message deleted successfully.');
      fetchContacts();
    } catch (error) {
      showError('Failed to delete message.');
    }
  };

  if (loading && contacts.length === 0) {
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
            placeholder="Search contacts..."
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
        >
          <option value="">All Status</option>
          <option value="Unread">Unread</option>
          <option value="Read">Read</option>
          <option value="Replied">Replied</option>
        </select>
        <button
          onClick={fetchContacts}
          className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition"
        >
          <RefreshCw className="h-4.5 w-4.5 text-slate-500" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left py-3 px-4 text-xs font-bold uppercase text-slate-500">From</th>
              <th className="text-left py-3 px-4 text-xs font-bold uppercase text-slate-500">Subject</th>
              <th className="text-left py-3 px-4 text-xs font-bold uppercase text-slate-500">Status</th>
              <th className="text-left py-3 px-4 text-xs font-bold uppercase text-slate-500">Date</th>
              <th className="text-right py-3 px-4 text-xs font-bold uppercase text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => {
              // ✅ Get contact ID properly
              const contactId = contact.id || contact._id;
              
              return (
                <tr key={contactId} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 font-medium">
                    {contact.name}
                    <p className="text-xs text-slate-400">{contact.email}</p>
                  </td>
                  <td className="py-3 px-4 text-slate-500">{contact.subject}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      contact.status === 'Replied' ? 'bg-emerald-50 text-emerald-600' :
                      contact.status === 'Read' ? 'bg-blue-50 text-blue-600' :
                      'bg-amber-50 text-amber-600'
                    }`}>
                      {contact.status || 'Unread'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-xs">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => { 
                          setSelectedContact(contact); 
                          setReplyMessage(contact.replyMessage || ''); 
                          setShowModal(true); 
                        }}
                        className="p-1.5 text-primary-500 hover:bg-primary-50 rounded-lg transition"
                        title="View & Reply"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(contactId)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
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

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => { setShowModal(false); setSelectedContact(null); }}
        title="Contact Message"
      >
        {selectedContact && (
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-500 font-medium">From</p>
              <p className="font-semibold">{selectedContact.name} ({selectedContact.email})</p>
              <p className="text-xs text-slate-500 font-medium mt-2">Subject</p>
              <p className="font-semibold">{selectedContact.subject}</p>
              <p className="text-xs text-slate-500 font-medium mt-2">Message</p>
              <p className="text-sm leading-relaxed">{selectedContact.message}</p>
            </div>

            <div>
              <label className="text-xs text-slate-500 font-medium block mb-1">Reply Message</label>
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                rows={4}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition resize-none"
                placeholder="Type your reply here..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  const contactId = selectedContact.id || selectedContact._id;
                  handleReply(contactId);
                }}
                disabled={sendingReply}
                className="flex-1 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {sendingReply ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Reply className="h-4.5 w-4.5" />
                    Send Reply
                  </>
                )}
              </button>
              <button
                onClick={() => { setShowModal(false); setSelectedContact(null); }}
                className="flex-1 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ContactsManagement;