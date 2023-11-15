import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { UserConfig } from 'vite';

// https://vitejs.dev/config/
const vitestConfig: UserConfig = {
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
};
export default defineConfig(vitestConfig);
