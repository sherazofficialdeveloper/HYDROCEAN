import React from 'react';

const Textarea = ({
  label,
  value,
  onChange,
  error,
  rows = 4,
  placeholder = '',
  maxLength,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
          {label}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`
          w-full bg-slate-50 border border-slate-200 rounded-xl
          px-4 py-3 text-sm text-slate-900
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          transition-all duration-200 resize-none
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {maxLength && (
        <div className="flex justify-between items-center">
          {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
          <p className="text-xs text-slate-400 ml-auto">
            {value?.length || 0} / {maxLength}
          </p>
        </div>
      )}
    </div>
  );
};

export default Textarea;