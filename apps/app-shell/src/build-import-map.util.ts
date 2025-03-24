/* eslint-disable @nx/enforce-module-boundaries */
// relative import needed inside vite config file because of: https://github.com/nrwl/nx/issues/17019#issuecomment-2040065609
import { buildSharedDependenciesImports, getPackageInfos, type ImportMap } from '../../../libs/import-map-tools/src';
import {
  sharedDependencies,
  sharedDependenciesSkipList,
} from '../../../tools/shared-dependencies/shared-dependencies.const';
import { getMfImports } from './mf-imports.util';

export const buildImportMap = (mode: string): ImportMap => {
  const sharedDepsImportMapRelativePath = './shared-deps/npm';
  const sharedPackageInfos = getPackageInfos(sharedDependencies, sharedDependenciesSkipList);
  const sharedImports = buildSharedDependenciesImports(sharedPackageInfos, sharedDepsImportMapRelativePath);
  const mfImports = getMfImports(mode === 'production');

  const imports = { ...mfImports, ...sharedImports };
  return { imports };
};
