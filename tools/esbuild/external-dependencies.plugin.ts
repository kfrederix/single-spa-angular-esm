import type { Plugin } from 'esbuild';
import { sharedDependencies } from '../shared-dependencies/shared-dependencies.const';

const mergeExternals = (allExternals: string[][]): string[] => Array.from(new Set(allExternals.flat()));

const externalDepsEsbuildPlugin = {
  name: 'externalize-deps',
  setup(build) {
    const options = build.initialOptions;

    // Externalize npm deps only for production builds.
    // This provides a better dev experience with clear error messages
    // (use "minifySyntax" as a heuristic for production mode)
    const isProductionMode = build.initialOptions.minifySyntax ?? false;

    options.external = mergeExternals([options.external ?? [], isProductionMode ? sharedDependencies : []]);
  },
} satisfies Plugin;

export default externalDepsEsbuildPlugin;
