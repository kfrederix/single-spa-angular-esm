import { workspaceRoot } from '@nx/devkit';
import fs from 'fs-extra';
import { join } from 'path';

const deployDir = join(workspaceRoot, 'dist/deploy');
const mfApps = ['navbar', 'cats', 'dogs'];

(async function pack() {
  // ensure that deployDir exists and is empty
  await fs.emptyDir(deployDir);

  // copy app-shell first
  await fs.copy(join(workspaceRoot, 'dist/apps/app-shell'), deployDir);

  // create dir for micro-frontends
  await fs.ensureDir(join(deployDir, 'mf'));

  // copy "host" module
  await fs.copy(join(workspaceRoot, 'dist/apps/host'), join(deployDir, 'mf/host'));

  // copy all MF apps
  for (const mf of mfApps) {
    await fs.copy(join(workspaceRoot, `dist/apps/${mf}/browser`), join(deployDir, `mf/${mf}`));
  }

  // apply prod importmap (uses relative paths)
  await fs.move(join(deployDir, 'importmaps/importmap-mf.prod.json'), join(deployDir, 'importmaps/importmap-mf.json'), {
    overwrite: true,
  });
})();
