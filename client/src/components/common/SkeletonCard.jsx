import React from 'react';

const SkeletonCard = ({ count = 1, className = '' }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={`bg-white rounded-2xl border border-slate-100 p-6 shadow-sm ${className}`}>
          <div className="flex items-start justify-between mb-4">
            <div className="space-y-2 flex-1">
              <div className="h-5 bg-slate-200 rounded-lg w-3/4 animate-pulse" />
              <div className="h-4 bg-slate-200 rounded-lg w-1/2 animate-pulse" />
            </div>
            <div className="h-6 w-16 bg-slate-200 rounded-full animate-pulse" />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="h-14 bg-slate-200 rounded-xl animate-pulse" />
            <div className="h-14 bg-slate-200 rounded-xl animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded-lg w-full animate-pulse" />
            <div className="h-4 bg-slate-200 rounded-lg w-5/6 animate-pulse" />
          </div>
          <div className="h-10 bg-slate-200 rounded-xl mt-4 animate-pulse" />
        </div>
      ))}
    </>
  );
};

export default SkeletonCard;