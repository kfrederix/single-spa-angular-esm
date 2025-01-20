import { formatFiles, generateFiles, Tree, names, readJson, writeJson } from '@nx/devkit';
import * as path from 'path';
import { angularInitGenerator } from '@nx/angular/generators';
import { MifeNgApplicationGeneratorSchema } from './schema';

function addFiles(tree: Tree, options: MifeNgApplicationGeneratorSchema) {
  const templateNames = names(options.name);
  const projectRoot = `${options.directory}/${templateNames.fileName}`;
  const templateOptions = {
    ...options,
    ...names(options.name),
    template: '',
  };

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, templateOptions);
}

function updateJsonFile(tree: Tree, filePath: string, key: string, value: string) {
  if (!tree.exists(filePath)) {
    tree.write(filePath, JSON.stringify({}, null, 2));
  }
  try {
    const json = readJson(tree, filePath);
    json[key] = value;
    writeJson(tree, filePath, json);
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error);
    throw new Error(`Failed to update JSON at ${filePath}`);
  }
}

function updateImportmapMfJson(tree: Tree, options: MifeNgApplicationGeneratorSchema) {
  const templateNames = names(options.name);
  const filePath = 'apps/app-shell/public/importmaps/importmap-mf.prod.json';
  const key = `@myorg/${templateNames.fileName}`;
  const value = `./mf/${templateNames.fileName}/main.js`;

  updateJsonFile(tree, filePath, key, value);
}

function updateImportmapMfProdJson(tree: Tree, options: MifeNgApplicationGeneratorSchema) {
  const templateNames = names(options.name);
  const filePath = 'apps/app-shell/public/importmaps/importmap-mf.json';
  const key = `@myorg/${templateNames.fileName}`;
  const value = `http://localhost:${options.port}/main.js`;

  updateJsonFile(tree, filePath, key, value);
}

export async function mifeNgApplicationGenerator(tree: Tree, options: MifeNgApplicationGeneratorSchema) {
  angularInitGenerator(tree, { skipFormat: true });
  addFiles(tree, options);
  updateImportmapMfJson(tree, options);
  updateImportmapMfProdJson(tree, options);
  await formatFiles(tree);
}

export default mifeNgApplicationGenerator;
