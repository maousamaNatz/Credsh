import './bootstrap';
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./src/pages/**/*.jsx', { eager: true })
        return pages[`./src/pages/${name}.jsx`]
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />)
    },
});



// Start Generation Here
function sanitize(input) {
  if (typeof input !== 'string') return input;
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function safeConsoleLog(message) {
  // Pastikan string yang dicetak sudah disaring agar tidak mengizinkan XSS dari input user
  console.log(sanitize(message));
}

// Contoh penggunaan safeConsoleLog
safeConsoleLog("Pesan: Ini adalah pesan aman tanpa XSS user");

// Peringatan untuk pengguna yang membuka console
console.log("%cPERINGATAN!", "color: red; font-size: 20px; font-weight: bold;");
console.log("Jika Anda membuka console, mohon jangan melakukan serangan sxxx!");
// End Generation Here
