import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                agraham: ['agraham', 'sans-serif'],
                brilant: ['brilant', 'sans-serif'],
                dalton: ['dalton', 'sans-serif'],
                gillie: ['gillie', 'sans-serif'],
                gagliane: ['gagliane', 'sans-serif'],
                london: ['london', 'sans-serif'],
                wasted: ['wasted', 'sans-serif'],
            },
            boxShadow: {
                elegant: '0 4px 20px rgba(0, 0, 0, 0.08)',
                'elegant-hover': '0 8px 30px rgba(0, 0, 0, 0.12)'
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in'
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                }
            }
        },
    },

    plugins: [forms],
};
