import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Shield, ArrowLeft } from 'lucide-react';

const Error403 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="h-12 w-12 text-rose-500" />
        </div>
        <h1 className="text-6xl font-bold text-dark-200">403</h1>
        <h2 className="text-2xl font-bold text-dark-200 mt-2">Access Denied</h2>
        <p className="text-slate-500 mt-2">
          You don't have permission to access this page. Please contact an administrator if you believe this is a mistake.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition"
          >
            <Home className="h-4.5 w-4.5" />
            Back to Home
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition"
          >
            <ArrowLeft className="h-4.5 w-4.5" />
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Error403;