import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  ...props
}) => {
  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-600/20',
    secondary: 'bg-dark-200 hover:bg-dark-100 text-white',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white',
    ghost: 'text-primary-600 hover:bg-primary-50',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-xl font-bold uppercase tracking-wider transition-all duration-300
        disabled:opacity-60 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;