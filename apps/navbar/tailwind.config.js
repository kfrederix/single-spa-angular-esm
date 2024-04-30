import { join } from 'path';

/** @type {import('tailwindcss').Config} */
export default {
  content: [join(__dirname, 'src/**/*.{html,ts}')],
  theme: {
    extend: {},
  },
  plugins: [],
};
