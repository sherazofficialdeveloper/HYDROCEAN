import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-12 w-12 text-amber-500" />
        </div>
        <h1 className="text-6xl font-bold text-dark-200">404</h1>
        <h2 className="text-2xl font-bold text-dark-200 mt-2">Page Not Found</h2>
        <p className="text-slate-500 mt-2">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition"
        >
          <Home className="h-4.5 w-4.5" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;