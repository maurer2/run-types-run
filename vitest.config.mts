import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import { configDefaults } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    // testNamePattern: '*.vi.spec.{ts,tsx,mts}',
    // exclude playwright files
    exclude: [
      ...configDefaults.exclude,
      '**/*.pw.spec.tsx'
    ],
  },
});
