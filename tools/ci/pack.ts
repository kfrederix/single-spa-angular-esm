import { workspaceRoot } from '@nx/devkit';
import fs from 'fs-extra';
import { join } from 'path';

const deployDir = join(workspaceRoot, 'dist/deploy');
const mfModules = [
  { moduleName: '@myorg/host', distFolder: 'dist/apps/host' },
  { moduleName: '@myorg/navbar', distFolder: 'dist/apps/navbar/browser' },
  { moduleName: '@myorg/cats', distFolder: 'dist/apps/cats/browser' },
  { moduleName: '@myorg/dogs', distFolder: 'dist/apps/dogs/browser' },
];
const appShellDistFolder = 'dist/apps/app-shell';

(async function pack() {
  // ensure that deployDir exists and is empty
  await fs.emptyDir(deployDir);

  // copy app-shell first
  await fs.copy(join(workspaceRoot, appShellDistFolder), deployDir);

  // copy all modules (host + micro-frontend apps)
  for (const mf of mfModules) {
    await fs.copy(join(workspaceRoot, mf.distFolder), join(deployDir, `mf/${mf.moduleName}`));
  }
})();
