import React from 'react';

const SkeletonTable = ({ rows = 5, columns = 4, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl border border-slate-100 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              {Array.from({ length: columns }).map((_, index) => (
                <th key={index} className="py-3 px-4">
                  <div className="h-4 bg-slate-200 rounded-lg w-20 animate-pulse" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex} className="border-b border-slate-100">
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={colIndex} className="py-3 px-4">
                    <div className="h-4 bg-slate-200 rounded-lg w-full animate-pulse" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SkeletonTable;