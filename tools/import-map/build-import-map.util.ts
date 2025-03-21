import { workspaceRoot } from '@nx/devkit';
import { readFileSync } from 'fs';
import { join } from 'path';

export interface ImportMap {
  imports: Record<string, string>;
}

export const buildImportMap = (isProd: boolean): ImportMap => {
  const importMapsPath = join(workspaceRoot, 'import-maps');
  const importMapFiles = isProd
    ? ['importmap-mf.prod.json', 'importmap-shared.prod.json']
    : ['importmap-mf.json', 'importmap-shared.json'];

  const imports = importMapFiles.reduce((acc, importMapFile) => {
    const importMapJson = readFileSync(join(importMapsPath, importMapFile), 'utf-8');
    return { ...acc, ...JSON.parse(importMapJson).imports };
  }, {});

  return { imports };
};
