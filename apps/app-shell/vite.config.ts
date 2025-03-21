import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import { buildImportMap } from '../../tools/import-map/build-import-map.util';

export default defineConfig(({ mode }) => {
  const importMap = buildImportMap(mode === 'production');
  const importMapJson = JSON.stringify(importMap, null, 2);

  return {
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/app-shell',

    preview: {
      port: 4300,
      host: 'localhost',
    },

    plugins: [ViteEjsPlugin({ importMap: importMapJson })],

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
