import { formatFiles, generateFiles, Tree, names } from '@nx/devkit';
import * as path from 'path';
import { MifeNgApplicationGeneratorSchema } from './schema';

export async function mifeNgApplicationGenerator(tree: Tree, options: MifeNgApplicationGeneratorSchema) {
  const templateNames = names(options.name)
  const projectRoot = `${options.directory}/${templateNames.fileName}`;
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {template: '', ...templateNames, projectRoot});
  await formatFiles(tree);
}

export default mifeNgApplicationGenerator;
