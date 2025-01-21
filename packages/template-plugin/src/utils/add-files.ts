import { Tree, generateFiles, names } from '@nx/devkit';
import { MifeNgApplicationGeneratorSchema } from '../generators/mife-ng-application/schema';

export function addFiles(tree: Tree, filesDir: string, options: MifeNgApplicationGeneratorSchema) {
  const templateNames = names(options.name);
  const projectRoot = `${options.directory}/${templateNames.fileName}`;
  const templateOptions = {
    ...options,
    ...names(options.name),
    template: '',
  };
  generateFiles(tree, filesDir, projectRoot, templateOptions);
}
