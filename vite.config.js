// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true, // Exposes server to the network (0.0.0.0)
    port: 5174, // Use a non-privileged port
    strictPort: true, // Fail if port 3000 is not available
    proxy: {
      '/api': {
        target: 'https://marathon.lockated.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks: {
        },
      },
    },
  },
});
