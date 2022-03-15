import { defineConfig } from 'vite';
import react from 'vite-preset-react';
import postcss from './postcss.config.js';
import path from 'path';

export default defineConfig({
  define: {
    'process.env': process.env,
  },
  css: {
    postcss,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
