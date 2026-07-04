import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', fullScreen = false }) => {
  const sizes = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-3',
    lg: 'h-16 w-16 border-4',
  };

  const spinner = (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`${sizes[size]} border-primary-500 border-t-transparent rounded-full`}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[100] bg-dark-300/80 backdrop-blur-sm flex flex-col items-center justify-center">
        {spinner}
        <p className="mt-4 text-sm text-slate-400 font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-8">
      {spinner}
    </div>
  );
};

export default LoadingSpinner;