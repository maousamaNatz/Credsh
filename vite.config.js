import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            "@": "/resources/js/src",
            "@/common": "/resources/js/src/common",
            "@/data": "/resources/js/src/data",
            "@/components": "/resources/js/src/components",
            "@/Layouts": "/resources/js/src/Layouts",
            "@/helpers": "/resources/js/src/helpers",
            "@/public": "/resources/js/src/public",
        },
    },
});
