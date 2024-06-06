/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setupTests.ts'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'text-summary'],
      exclude: ['node_modules/', 'src/tests/'],
      include: ['src/**'],
    },
  },
});
