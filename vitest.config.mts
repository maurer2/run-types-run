import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import { configDefaults } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    // exclude playwright files
    exclude: [
      ...configDefaults.exclude,
      'src/components/ControlledInput/ControlledInput.spec.tsx',
      // workaround for ()
      'src/app/pizza/*form*/page.spec.tsx',
      'src/components/UncontrolledRadioCheckbox/UncontrolledRadioCheckbox.spec.tsx',
      'src/components/UncontrolledInput/UncontrolledInput.spec.tsx',
      'src/components/Preloader/Preloader.spec.tsx'
    ],
  },
});
