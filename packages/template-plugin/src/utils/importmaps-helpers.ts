import { Tree, updateJson } from '@nx/devkit';

export function updateImportmapJson(
  tree: Tree,
  importmapPath: string,
  importmaps: { [key: string]: string },
  override = false
) {
  if (!importmaps) {
    return;
  }

  updateJson(tree, importmapPath, (json) => {
    const existingImports = json.imports || {};
    const newImports = override ? { ...importmaps } : { ...existingImports, ...importmaps };
    return {
      ...json,
      imports: newImports,
    };
  });
}
