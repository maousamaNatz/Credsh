import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Credsh';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: name => {
        const pages = import.meta.glob('./src/pages/**/*.jsx', { eager: true })
        const page = pages[`./src/pages/${name.replace('.', '/')}.jsx`]

        if (!page) {
            throw new Error(`Halaman tidak ditemukan: ${name}`)
        }

        return page
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
