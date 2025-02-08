import React from 'react';
import { Link } from '@inertiajs/react';

// Primary Button
export const Button = ({ variant = 'primary', size = 'md', children, className = '', ...props }) => {
    const baseStyle = "font-medium transition-all duration-200 rounded-lg focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-rose-400 text-white hover:bg-rose-500 focus:ring-rose-300",
        secondary: "bg-gray-50 text-gray-800 hover:bg-gray-100 focus:ring-gray-200", 
        success: "bg-emerald-400 text-white hover:bg-emerald-500 focus:ring-emerald-300",
        danger: "bg-red-400 text-white hover:bg-red-500 focus:ring-red-300",
        outline: "border-2 border-rose-300 text-rose-500 hover:bg-rose-50 focus:ring-rose-200",
        ghost: "text-rose-500 hover:bg-rose-50 focus:ring-rose-200"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2",
        lg: "px-6 py-3 text-lg"
    };

    return (
        <button
            className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

// Link Button 
export const LinkButton = ({ href, variant = 'default', size = 'md', children, className = '', ...props }) => {
    const baseStyle = "inline-flex items-center font-medium transition-all duration-200 rounded-lg";

    const variants = {
        primary: "bg-rose-400 text-white hover:bg-rose-500 focus:ring-rose-300",
        secondary: "bg-gray-50 text-gray-800 hover:bg-gray-100 focus:ring-gray-200",
        success: "bg-emerald-400 text-white hover:bg-emerald-500 focus:ring-emerald-300", 
        danger: "bg-red-400 text-white hover:bg-red-500 focus:ring-red-300",
        outline: "border-2 border-rose-300 text-rose-500 hover:bg-rose-50 focus:ring-rose-200",
        ghost: "text-rose-500 hover:bg-rose-50 focus:ring-rose-200",
        default: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300",
        colored: "bg-gradient-to-r from-rose-50 to-pink-50 text-rose-600 hover:from-rose-100 hover:to-pink-100",
        transparent: "bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2", 
        lg: "px-6 py-3 text-lg"
    };

    return (
        <Link
            href={href}
            className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </Link>
    );
};

// Text Link
export const Links = ({ href, variant = 'default', children, className = '', ...props }) => {
    const baseStyle = "inline-flex items-center font-medium transition-colors duration-200";

    const variants = {
        default: "text-rose-500 hover:text-rose-600 underline-offset-4 hover:underline",
        subtle: "text-gray-600 hover:text-gray-900",
        contrast: "text-white hover:text-rose-100"
    };

    return (
        <Link
            href={href}
            className={`${baseStyle} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </Link>
    );
};

export { Link } from '@inertiajs/react';
