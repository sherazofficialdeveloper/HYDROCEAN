import React from 'react';

const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'bg-primary-50 text-primary-600 border-primary-100',
    success: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    warning: 'bg-amber-50 text-amber-600 border-amber-100',
    error: 'bg-rose-50 text-rose-600 border-rose-100',
    info: 'bg-blue-50 text-blue-600 border-blue-100',
    gray: 'bg-slate-100 text-slate-600 border-slate-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full font-medium border
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;