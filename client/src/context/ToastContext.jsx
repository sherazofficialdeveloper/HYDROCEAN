import React, { createContext, useContext } from 'react';
import toast from 'react-hot-toast';

// ✅ Export ToastContext
export const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const showSuccess = (message) => toast.success(message);
  const showError = (message) => toast.error(message);
  const showInfo = (message) => toast(message);
  const showLoading = (message) => toast.loading(message);

  const value = {
    showSuccess,
    showError,
    showInfo,
    showLoading,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};