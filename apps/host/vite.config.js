import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import path from 'path';
import { defineConfig } from 'vite';
import externalize from "vite-plugin-externalize-dependencies";

export default defineConfig({
  root: 'src',
  cacheDir: path.join(__dirname, '../../node_modules/.vite/apps/host'),

  // we are not interested in copying static assets from the public dir
  // since we only want to build a JS module
  publicDir: false,

  // we don't need any HTML middleware
  appType: 'custom',

  plugins: [
    nxViteTsPaths(),
    externalize({
      externals: ['rxjs', 'rxjs/operators', 'single-spa', '@myorg'],
    }),
  ],

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  build: {
    outDir: path.join(__dirname, '../../dist/apps/host'),
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },

    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: '@myorg/host',
      fileName: 'main',
      formats: ['es'],
    },

    rollupOptions: {
      // externalize deps that shouldn't be bundled into this lib
      external: ['rxjs', 'rxjs/operators', 'single-spa', /@myorg\/.*/],
    },
  },
});
