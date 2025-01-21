import { Tree, updateJson } from '@nx/devkit';

export function updateTsConfigType(tree: Tree, tsConfigPath: string, tsConfigTypes: string[], override = false) {
  if (!tsConfigTypes?.length) {
    return;
  }

  updateJson(tree, tsConfigPath, (json) => {
    const existingCompilerOptions = json.compilerOptions || {};
    const existingTypes = Array.isArray(existingCompilerOptions.types) ? existingCompilerOptions.types : [];

    // Deduplicate new types only:
    const uniqueNewTypes = Array.from(new Set(tsConfigTypes));

    // If override, we replace existing types entirely.
    // If not, we merge existing + new, then deduplicate them all.
    const updatedTypes = override ? uniqueNewTypes : Array.from(new Set([...existingTypes, ...uniqueNewTypes]));

    return {
      ...json,
      compilerOptions: {
        ...existingCompilerOptions,
        types: updatedTypes,
      },
    };
  });
}

export function updateTsConfigCompileOption(
  tree: Tree,
  tsConfigPath: string,
  compileOptions: { [key: string]: unknown },
  override = false
) {
  if (!compileOptions) {
    return;
  }

  updateJson(tree, tsConfigPath, (json) => {
    const existingCompilerOptions = json.compilerOptions || {};
    const newCompilerOptions = override ? { ...compileOptions } : { ...existingCompilerOptions, ...compileOptions };
    return {
      ...json,
      compilerOptions: newCompilerOptions,
    };
  });
}
