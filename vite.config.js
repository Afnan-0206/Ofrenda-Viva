import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5180,
    strictPort: false, // Automatically fallback to next available port if 5180 is busy
    host: true
  }
});
