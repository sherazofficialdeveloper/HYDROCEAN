import React from 'react';

const Checkbox = ({
  label,
  checked,
  onChange,
  error,
  className = '',
  ...props
}) => {
  return (
    <label className="flex items-start gap-2.5 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={`
          mt-0.5 h-4.5 w-4.5 rounded border-slate-300
          text-primary-500 focus:ring-primary-500 focus:ring-2
          transition-all duration-200 cursor-pointer
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      <div>
        <span className="text-sm text-slate-700">{label}</span>
        {error && (
          <p className="text-xs text-red-500 font-medium mt-0.5">{error}</p>
        )}
      </div>
    </label>
  );
};

export default Checkbox;