import type { Plugin } from 'esbuild';
import importmapShared from '../../apps/app-shell/public/importmaps/importmap-shared.json';

type Importmap = {
  imports: Record<string, string>;
};

const extractExternalsFromImportmap = (importmap: Importmap): string[] => Object.keys(importmap.imports);
const mergeExternals = (allExternals: string[][]): string[] => Array.from(new Set(allExternals.flat()));

const externalDepsEsbuildPlugin = {
  name: 'externalize-deps',
  setup(build) {
    const options = build.initialOptions;
    options.external = mergeExternals([
      options.external ?? [],
      extractExternalsFromImportmap(importmapShared),
    ]);
  },
} satisfies Plugin;

export default externalDepsEsbuildPlugin;
