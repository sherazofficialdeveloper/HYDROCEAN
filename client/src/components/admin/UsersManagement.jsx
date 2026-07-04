import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, User, Shield, Ban, Trash2, UserCog, RefreshCw, RefreshCw as RestoreIcon } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import API from '../../utils/api';
import Modal from '../ui/Modal';
import Pagination from '../ui/Pagination';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await API.get(`/admin/users?page=${page}&search=${search}`);
      setUsers(response.data.users || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      showError('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Block/Unblock User
  const handleBlock = async (userId) => {
    if (!userId) {
      showError('Invalid user ID.');
      return;
    }
    
    try {
      const response = await API.put(`/admin/users/${userId}/block`);
      fetchUsers();
      showSuccess(response.data.message || 'User status updated successfully.');
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to update user status.');
    }
  };

  // ✅ Delete/Restore User (Toggle)
  const handleDelete = async (userId) => {
    if (!userId) {
      showError('Invalid user ID.');
      return;
    }
    
    try {
      const response = await API.delete(`/admin/users/${userId}`);
      fetchUsers();
      showSuccess(response.data.message || 'User status updated successfully.');
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to update user.');
    }
  };

  // ✅ Make Sub Admin
  const handleMakeSubAdmin = async (userId) => {
    if (!userId) {
      showError('Invalid user ID.');
      return;
    }
    
    try {
      await API.put(`/admin/users/${userId}/role`, { 
        role: 'sub_admin', 
        permissions: [
          'View Dashboard',
          'View Applications',
          'Manage Jobs',
          'Send Emails',
          'Approve Applications',
          'Reject Applications',
        ]
      });
      fetchUsers();
      showSuccess('User promoted to Sub Admin successfully.');
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to update role.');
    }
  };

  // ✅ Remove Sub Admin
  const handleRemoveSubAdmin = async (userId) => {
    if (!userId) {
      showError('Invalid user ID.');
      return;
    }
    
    try {
      await API.put(`/admin/users/${userId}/role`, { role: 'user', permissions: [] });
      fetchUsers();
      showSuccess('Sub Admin removed successfully.');
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to update role.');
    }
  };

  if (loading && users.length === 0) {
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
            placeholder="Search users by name or email..."
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
          />
        </div>
        <button
          onClick={fetchUsers}
          className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition"
        >
          <RefreshCw className="h-4.5 w-4.5 text-slate-500" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left py-3 px-4 text-xs font-bold uppercase text-slate-500">User</th>
              <th className="text-left py-3 px-4 text-xs font-bold uppercase text-slate-500">Email</th>
              <th className="text-left py-3 px-4 text-xs font-bold uppercase text-slate-500">Role</th>
              <th className="text-left py-3 px-4 text-xs font-bold uppercase text-slate-500">Status</th>
              <th className="text-right py-3 px-4 text-xs font-bold uppercase text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const userId = user.id || user._id;
              
              return (
                <tr key={userId} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 font-medium">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="py-3 px-4 text-slate-500">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' ? 'bg-rose-50 text-rose-600' :
                      user.role === 'sub_admin' ? 'bg-amber-50 text-amber-600' :
                      user.isDeleted ? 'bg-slate-200 text-slate-500' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {user.isDeleted ? 'Deleted' : (user.role || 'User')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {user.isDeleted ? (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-200 text-slate-500">
                        Deleted
                      </span>
                    ) : (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.isBlocked ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {user.isBlocked ? 'Blocked' : 'Active'}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      {/* ✅ Block/Unblock - Only if not deleted */}
                      {!user.isDeleted && (
                        <button
                          onClick={() => handleBlock(userId)}
                          className={`p-1.5 rounded-lg transition ${
                            user.isBlocked ? 'text-emerald-500 hover:bg-emerald-50' : 'text-amber-500 hover:bg-amber-50'
                          }`}
                          title={user.isBlocked ? 'Unblock' : 'Block'}
                        >
                          <Ban className="h-4 w-4" />
                        </button>
                      )}
                      
                      {/* ✅ Role Management - Only if not deleted */}
                      {!user.isDeleted && user.role !== 'admin' && (
                        <>
                          {user.role === 'sub_admin' ? (
                            <button
                              onClick={() => handleRemoveSubAdmin(userId)}
                              className="p-1.5 text-amber-500 hover:bg-amber-50 rounded-lg transition"
                              title="Remove Sub Admin"
                            >
                              <UserCog className="h-4 w-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleMakeSubAdmin(userId)}
                              className="p-1.5 text-primary-500 hover:bg-primary-50 rounded-lg transition"
                              title="Make Sub Admin"
                            >
                              <Shield className="h-4 w-4" />
                            </button>
                          )}
                        </>
                      )}
                      
                      {/* ✅ Delete/Restore Button */}
                      {user.role !== 'admin' && (
                        user.isDeleted ? (
                          <button
                            onClick={() => handleDelete(userId)}
                            className="p-1.5 text-emerald-500 hover:bg-emerald-50 rounded-lg transition"
                            title="Restore User"
                          >
                            <RestoreIcon className="h-4 w-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleDelete(userId)}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                            title="Delete User"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )
                      )}
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
    </div>
  );
};

export default UsersManagement;