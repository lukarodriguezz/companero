import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Vite copia public/ a dist/ automáticamente
      includeAssets: ['favicon.svg', 'icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'Compañero — Bienestar UNCo',
        short_name: 'Compañero',
        description: 'Tu compañero de apoyo emocional — UNCo',
        theme_color: '#1A56A0',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait-primary',
        lang: 'es',
        start_url: '/',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
        categories: ['health', 'education'],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      },
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
