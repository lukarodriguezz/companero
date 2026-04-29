// vite.config.js (Versión Final Blindada)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr'; // <--- NUEVO IMPORT
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    react(),
    // Configuramos svgr para que exporte el SVG como componente por defecto
    svgr({ 
      svgrOptions: {
        icon: true, // Esto ayuda a manejar tamaños si se usa como icono
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      // Incluimos el nuevo SVG en los assets a pre-cachear por la PWA
      includeAssets: ['favicon.svg', 'icon-192.png', 'icon-512.png', 'assets/uncoma.svg'],
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
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
