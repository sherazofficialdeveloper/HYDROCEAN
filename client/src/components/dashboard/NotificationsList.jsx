import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Check, X, Clock, AlertCircle } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import API from '../../utils/api';

const NotificationsList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await API.get('/notifications');
      setNotifications(response.data.notifications || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await API.put(`/notifications/${id}/read`);
      setNotifications(notifications.map(n => 
        n.id === id ? { ...n, isRead: true } : n
      ));
    } catch (error) {
      showError('Failed to mark as read.');
    }
  };

  const markAllAsRead = async () => {
    try {
      await API.put('/notifications/read-all');
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
      showSuccess('All notifications marked as read.');
    } catch (error) {
      showError('Failed to mark all as read.');
    }
  };

  const deleteNotification = async (id) => {
    try {
      await API.delete(`/notifications/${id}`);
      setNotifications(notifications.filter(n => n.id !== id));
    } catch (error) {
      showError('Failed to delete notification.');
    }
  };

  const getIcon = (type) => {
    const icons = {
      application: <Check className="h-5 w-5 text-primary-500" />,
      status: <AlertCircle className="h-5 w-5 text-amber-500" />,
      contact: <Bell className="h-5 w-5 text-emerald-500" />,
      system: <Bell className="h-5 w-5 text-slate-500" />,
    };
    return icons[type] || icons.system;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 border-3 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="text-center py-12">
        <Bell className="h-12 w-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-dark-200">No Notifications</h3>
        <p className="text-sm text-slate-500 mt-2">You're all caught up!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-500">
          {notifications.filter(n => !n.isRead).length} unread
        </p>
        <button
          onClick={markAllAsRead}
          className="text-sm text-primary-500 hover:text-primary-600 font-semibold transition"
        >
          Mark All as Read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-start gap-3 p-4 rounded-xl border transition ${
              notification.isRead
                ? 'bg-white border-slate-200'
                : 'bg-primary-50/50 border-primary-200'
            }`}
          >
            <div className="p-2 rounded-lg bg-white border border-slate-200 shrink-0">
              {getIcon(notification.type)}
            </div>

            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold ${notification.isRead ? 'text-slate-600' : 'text-dark-200'}`}>
                {notification.title}
              </p>
              <p className="text-sm text-slate-500 mt-0.5">{notification.message}</p>
              <p className="text-xs text-slate-400 mt-1">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {!notification.isRead && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="p-1.5 text-primary-500 hover:bg-primary-100 rounded-lg transition"
                  title="Mark as read"
                >
                  <Check className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={() => deleteNotification(notification.id)}
                className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition"
                title="Delete"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsList;