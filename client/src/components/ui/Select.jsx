import React from 'react';

const Select = ({
  label,
  options = [],
  value,
  onChange,
  error,
  placeholder = 'Select an option',
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
      <select
        value={value}
        onChange={onChange}
        className={`
          w-full bg-slate-50 border border-slate-200 rounded-xl
          px-4 py-3 text-sm text-slate-900
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          transition-all duration-200 appearance-none cursor-pointer
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
};

export default Select;