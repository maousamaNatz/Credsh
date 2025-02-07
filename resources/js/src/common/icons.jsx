import { FaHeart, FaCamera, FaUtensils, FaGem } from 'react-icons/fa';

// Atau gunakan komponen SVG sederhana sebagai alternatif:
export const IconCamera = () => (
    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
        <path d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4z"/>
    </svg>
);

export const IconHeart = () => (
    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
    </svg>
);

export const IconUtensils = () => (
    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
    </svg>
);

export const IconGem = () => (
    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 3l6 6v8H4v-8l6-6zm0 2.828L5.828 10H14.172L10 5.828z" clipRule="evenodd"/>
    </svg>
);

