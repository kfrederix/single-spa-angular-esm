import { workspaceRoot } from '@nx/devkit';
import * as path from 'path';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { getPackageInfos, preProcessSharedPackages } from '../../libs/import-map-tools/src';
import { sharedDependencies, sharedDependenciesSkipList } from './shared-dependencies.const';

const sharedPackageInfos = getPackageInfos(sharedDependencies, sharedDependenciesSkipList);
const sharedDepsOutputPath = path.join(workspaceRoot, 'apps/app-shell/public/shared-deps/npm');
preProcessSharedPackages(sharedPackageInfos, sharedDepsOutputPath);
