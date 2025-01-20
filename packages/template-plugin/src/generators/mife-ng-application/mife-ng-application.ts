import { formatFiles, generateFiles, Tree, names } from '@nx/devkit';
import * as path from 'path';
import { MifeNgApplicationGeneratorSchema } from './schema';

export async function mifeNgApplicationGenerator(tree: Tree, options: MifeNgApplicationGeneratorSchema) {
  const projectRoot = `${options.directory}/${options.name}`;
  const templateNames = names(options.name)
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {template: '', ...templateNames});
  await formatFiles(tree);
}

export default mifeNgApplicationGenerator;
