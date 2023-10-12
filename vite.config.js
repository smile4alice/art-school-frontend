import { defineConfig } from 'vite';
import * as path from 'path';
import react from '@vitejs/plugin-react';
import fileDirName from './fileDirname';

const { __dirname } = fileDirName(import.meta);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  css: {
    preprocessorOptions: {
      scss: { additionalData: `@import "@/styles/_variables";` },
    },
  },
});
