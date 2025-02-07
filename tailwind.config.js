import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                // Palette Warna Wedding Minimalis & Elegant
                primary: {
                    50: '#fdf2f8',  // Soft Pink
                    100: '#fce7f3',
                    200: '#fbcfe8',
                    300: '#f9a8d4',
                    400: '#f472b6',  // Pink Utama
                    500: '#ec4899',
                    600: '#db2777',  // Aksen Lebih Gelap
                    700: '#be185d',
                },
                secondary: {
                    50: '#fff7f2',   // Ivory
                    100: '#fff0e6',
                    200: '#ffe4d4',
                    300: '#ffd1b3',
                    400: '#ffb88c',  // Peach Soft
                    500: '#ff9d66',
                },
                accent: {
                    50: '#fefce8',   // Gold
                    100: '#fef9c3',
                    200: '#fef08a',
                    300: '#fde047',   // Emas Moderate
                    400: '#facc15',   // Aksen Emas
                },
                neutral: {
                    50: '#fafafa',   // Greyscale Elegant
                    100: '#f5f5f5',
                    200: '#e5e5e5',
                    300: '#d4d4d4',
                    700: '#404040',
                    800: '#262626',  // Untuk Teks
                }
            },
            fontFamily: {
                'primary': ['Great Vibes', 'cursive'],
                'secondary': ['agraham', 'sans-serif'],
                'body': ['Poppins', 'sans-serif'],
                'heading': ['Playfair Display', 'serif'],
                'accent': ['Dancing Script', 'cursive'],
                'elegant': ['Cormorant Garamond', 'serif'],
                'modern': ['Montserrat', 'sans-serif'],
                'classic': ['Lora', 'serif'],
                'decorative': ['Pacifico', 'cursive'],
                'handwritten': ['Sacramento', 'cursive'],
                'romantic': ['Rouge Script', 'cursive'],
                'formal': ['Cinzel', 'serif'],
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
