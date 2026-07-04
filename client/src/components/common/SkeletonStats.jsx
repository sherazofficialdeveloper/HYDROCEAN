import React from 'react';

const SkeletonStats = ({ count = 4, className = '' }) => {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 bg-slate-200 rounded-lg animate-pulse" />
            <div className="h-3 bg-slate-200 rounded-lg w-16 animate-pulse" />
          </div>
          <div className="h-8 bg-slate-200 rounded-lg w-12 mt-1 animate-pulse" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonStats;