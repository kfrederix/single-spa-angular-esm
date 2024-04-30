import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/app-shell',

  preview: {
    port: 4300,
    host: 'localhost',
  },

  build: {
    outDir: '../../dist/apps/app-shell',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
