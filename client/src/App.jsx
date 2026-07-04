import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import ScrollToTop from './components/common/ScrollToTop';
import ErrorBoundary from './components/common/ErrorBoundary';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Jobs from './pages/Jobs';
import Login from './pages/Login';
import Register from './pages/Register';
import OTPVerify from './pages/OTPVerify';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ApplyJob from './pages/ApplyJob';
import NotFound from './pages/NotFound';

// Components
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';

function App() {
  console.log('✅ App is rendering'); // ✅ Debug log

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <AuthProvider>
          <ToastProvider>
            <Router>
              <ScrollToTop />
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
                  },
                }}
              />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-otp" element={<OTPVerify />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
                <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                <Route path="/apply" element={<ProtectedRoute><ApplyJob /></ProtectedRoute>} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </Router>
          </ToastProvider>
        </AuthProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;