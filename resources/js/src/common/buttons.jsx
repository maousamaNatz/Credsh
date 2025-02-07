import React from 'react';
import { Link } from '@inertiajs/react';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-pink-500 text-white hover:bg-pink-600',
    secondary: 'bg-gray-800 text-white hover:bg-gray-900',
    outline: 'border-2 border-pink-500 text-pink-500 hover:bg-pink-50'
  };

  return (
    <button
      className={`px-6 py-3 rounded-lg font-medium transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const LinkButton = ({ children, href, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-pink-500 text-white hover:bg-pink-600',
    secondary: 'bg-gray-800 text-white hover:bg-gray-900',
    outline: 'border-2 border-pink-500 text-pink-500 hover:bg-pink-50'
  };

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export const Links = ({ children, href, className = '', ...props }) => {
  return (
    <Link
      href={href}
      className={`inline-flex items-center transition-colors hover:text-pink-600 ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};


