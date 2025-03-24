import { workspaceRoot } from '@nx/devkit';
import { readFileSync } from 'fs';
import { resolve } from 'path';

type PackageJsonExportEntry = string | { default: string };
type PackageJsonExports = Record<string, PackageJsonExportEntry>;

interface PackageJson {
  name: string;
  version: string;
  exports: PackageJsonExports;
}

interface PackageEntryPoint {
  packageId: string;
  file: string;
}

export interface PackageInfo {
  name: string;
  version: string;
  rootDir: string;
  mainEntryPoint: string;
  secondaryEntryPoints: PackageEntryPoint[];
}

export const flattenEntryPoints = (packageInfo: PackageInfo): PackageEntryPoint[] => [
  {
    packageId: packageInfo.name,
    file: packageInfo.mainEntryPoint,
  },
  ...packageInfo.secondaryEntryPoints,
];

export const getPackageInfos = (packages: string[], secondariesSkipList: string[] = []): PackageInfo[] =>
  packages.map((pkg) => {
    const rootDir = resolve(workspaceRoot, `node_modules/${pkg}`);
    const packageJson: PackageJson = JSON.parse(readFileSync(`${rootDir}/package.json`).toString());

    return {
      name: pkg,
      version: packageJson.version,
      rootDir,
      mainEntryPoint: getMainEntryPoint(packageJson),
      secondaryEntryPoints: getSecondaryEntryPoints(packageJson, secondariesSkipList),
    } as PackageInfo;
  });

function getMainEntryPoint(packageJson: PackageJson): string {
  const mainEntryPointConfig = packageJson.exports['.'];
  return getEntryPointFile(mainEntryPointConfig).replace('./', '');
}

function getSecondaryEntryPoints(packageJson: PackageJson, skipList: string[]): PackageEntryPoint[] {
  const { exports } = packageJson;
  return Object.keys(exports ?? {})
    .filter(
      (key) =>
        key !== '.' &&
        key !== './package.json' &&
        key.startsWith('./') &&
        !key.endsWith('/*') &&
        !key.includes('/testing/') &&
        !key.endsWith('/testing') &&
        !key.endsWith('/upgrade') &&
        !skipList.includes(`${packageJson.name}/${key.replace('./', '')}`) &&
        (typeof exports[key] === 'string' || exports[key]['default']),
    )
    .map((entryPoint) => ({
      packageId: `${packageJson.name}/${entryPoint.replace('./', '')}`,
      file: getEntryPointFile(exports[entryPoint]).replace('./', ''),
    }))
    .filter((entryPoint) => entryPoint.file.endsWith('.js') || entryPoint.file.endsWith('.mjs'));
}

function getEntryPointFile(entryPoint: PackageJsonExportEntry): string {
  return typeof entryPoint === 'string'
    ? entryPoint
    : typeof entryPoint.default === 'string'
      ? entryPoint.default
      : entryPoint.default.import.default;
}
