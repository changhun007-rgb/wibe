import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Multi-page build (one Vite project, many HTML entries → Cloudflare Pages
// serves each as a separate static page):
//   /          -> index.html
//   /about     -> about/index.html
//   /services  -> services/index.html
//   /global    -> global/index.html
//   /contact   -> contact/index.html
//   /privacy   -> privacy/index.html
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main:     resolve(__dirname, 'index.html'),
        about:    resolve(__dirname, 'about/index.html'),
        services: resolve(__dirname, 'services/index.html'),
        global:   resolve(__dirname, 'global/index.html'),
        contact:  resolve(__dirname, 'contact/index.html'),
        privacy:  resolve(__dirname, 'privacy/index.html'),
      },
    },
  },
  server: {
    port: 5173,
  },
});
