import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Multi-page build:
//   /          -> index.html        (main marketing site)
//   /privacy   -> privacy/index.html (Korean privacy policy, PIPA compliance)
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacy: resolve(__dirname, 'privacy/index.html'),
      },
    },
  },
  server: {
    port: 5173,
  },
});
