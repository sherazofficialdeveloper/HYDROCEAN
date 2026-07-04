import React from 'react';
import { Toaster } from 'react-hot-toast';

const Toast = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#1e293b',
          color: '#fff',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          fontFamily: 'Roboto, sans-serif',
        },
        success: {
          style: {
            background: '#065f46',
          },
          iconTheme: {
            primary: '#34d399',
            secondary: '#065f46',
          },
        },
        error: {
          style: {
            background: '#991b1b',
          },
          iconTheme: {
            primary: '#f87171',
            secondary: '#991b1b',
          },
        },
      }}
    />
  );
};

export default Toast;