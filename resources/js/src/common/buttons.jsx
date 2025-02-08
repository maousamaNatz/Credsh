import React from 'react';
import { Link } from '@inertiajs/react';

export const Button = ({ children, ...props }) => (
    <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        {...props}
    >
        {children}
    </button>
);

export const LinkButton = ({ href, children, ...props }) => (
    <Link
        href={href}
        className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
        {...props}
    >
        {children}
    </Link>
);

export const Links = ({ href, children }) => (
    <Link
        href={href}
        className="text-blue-500 hover:text-blue-600 transition-colors"
    >
        {children}
    </Link>
);

export { Link } from '@inertiajs/react';


