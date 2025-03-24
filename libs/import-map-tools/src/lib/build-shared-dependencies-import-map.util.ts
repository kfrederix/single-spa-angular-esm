import type { ImportMap } from './import-map.interface';
import { flattenEntryPoints, type PackageInfo } from './package-info.util';

export const buildSharedDependenciesImports = (
  sharedPackageInfos: PackageInfo[],
  baseUrl: string,
): ImportMap['imports'] =>
  sharedPackageInfos
    .map((pkgInfo) =>
      flattenEntryPoints(pkgInfo).map((entry) => ({
        key: entry.packageId,
        value: `${baseUrl}/${pkgInfo.name}@${pkgInfo.version}/${entry.file}`,
      })),
    )
    .flat()
    .reduce((acc, importEntry) => ({ ...acc, [importEntry.key]: importEntry.value.replace('.mjs', '.js') }), {});
