import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx', 'resources/css/index.css'],
            refresh: true,
        }),
        react(),
        svgr(),
    ],
     resolve: {
    alias: {
      '@': '/resources/js',     // sesuaikan kalau sudah ada alias
      '@icons': '/resources/icons', // opsional biar gampang
    },
  },
});
