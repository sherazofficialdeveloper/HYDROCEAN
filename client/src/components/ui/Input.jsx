import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  className = '',
  icon: Icon,
  ...props
}, ref) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
        )}
        <input
          ref={ref}
          className={`
            w-full bg-light-100 border border-gray-200 rounded-xl
            px-4 py-3 text-sm text-gray-900
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            transition-all duration-200
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;