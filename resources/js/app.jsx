import '../css/app.css';
import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';


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
  // Pastikan string yang dicetak sudah disaring untuk mencegah XSS dari input user
  console.log(sanitize(message));
}

function displayProjectInfo() {
  const logo = `


  ───▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄───
  ───█▒▒░░░░░░░░░▒▒█───
  ────█░░█░░░░░█░░█────
  ─▄▄──█░░░▀█▀░░░█──▄▄─
  █░░█─▀▄░░░░░░░▄▀─█░░█

  `;

  const info = {
    // Ganti dengan nama pembuat atau tim yang sesungguhnya
    creator: "Pembuat: Maousamanatz",
    // Nama proyek ini
    project: "Proyek: Credsh",
    // Tautan repositori GitHub proyek
    repository: "GitHub: https://github.com/maousamaNatz/Credsh.git"
  };

  // Menampilkan logo Credsh dengan desain menarik
  console.log(
    "%c" + logo,
    "color: #34a853; font-family: 'Courier New', Courier, monospace; font-size: 12px; white-space: pre;"
  );

  // Menampilkan informasi proyek dengan desain yang lebih menarik
  console.log(
    "%cInformasi Proyek:",
    "color: #1a73e8; font-size: 16px; font-weight: bold; margin-bottom: 4px;"
  );
  console.log(`%c${info.creator}`, "color: white; font-size: 14px;");
  console.log(`%c${info.project}`, "color: white; font-size: 14px;");
  console.log(`%c${info.repository}`, "color: white; font-size: 14px;");
}

// Contoh penggunaan safeConsoleLog dan displayProjectInfo
safeConsoleLog("Pesan: Ini adalah pesan aman tanpa XSS user");
displayProjectInfo();

// Peringatan untuk pengguna yang membuka console
console.log(
  "%cPERINGATAN!",
  "color: red; font-size: 20px; font-weight: bold; background: #fff; padding: 4px;"
);
console.log("Jika Anda membuka console, mohon jangan melakukan serangan sxss!");


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
