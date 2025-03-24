import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import { buildImportMap } from './src/build-import-map.util';

export default defineConfig(({ mode }) => {
  const importMap = buildImportMap(mode);

  return {
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/app-shell',

    preview: {
      port: 4300,
      host: 'localhost',
    },

    plugins: [nxViteTsPaths(), ViteEjsPlugin({ importMap: JSON.stringify(importMap, null, 2) })],

    build: {
      outDir: '../../dist/apps/app-shell',
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  };
});
