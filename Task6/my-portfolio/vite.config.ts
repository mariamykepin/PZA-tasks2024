import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5713, // Port default untuk Vite
    open: true, // Otomatis membuka browser saat server berjalan
  },
  build: {
    outDir: 'dist', // Folder output untuk build production
  },
  resolve: {
    alias: {
      '@': '/src', // Alias untuk folder src
    },
  },
});
