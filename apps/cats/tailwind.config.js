import { createGlobPatternsForDependencies } from '@nx/angular/tailwind';
import { join } from 'path';

/** @type {import('tailwindcss').Config} */
export default {
  content: [join(__dirname, 'src/**/*.{html,ts}'), ...createGlobPatternsForDependencies(__dirname)],
  theme: {
    extend: {},
  },
  plugins: [],
};
