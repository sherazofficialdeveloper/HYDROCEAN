import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hover = false,
  onClick,
  ...props
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      onClick={onClick}
      className={`
        bg-white rounded-2xl border border-slate-100 shadow-sm
        ${hover ? 'hover:shadow-xl transition-all duration-300 cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;