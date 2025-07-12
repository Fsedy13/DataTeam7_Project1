// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // if you have a backend proxy, keep it; otherwise you can remove this
      '/books': 'http://localhost:8081'
    }
  }
});
