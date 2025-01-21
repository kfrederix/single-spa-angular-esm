import { formatFiles, Tree, names, getProjects } from '@nx/devkit';
import { applicationGenerator } from '@nx/angular/generators';
import { MifeNgApplicationGeneratorSchema } from './schema';
import { deleteFolderOrFile } from '../../utils/delete-folder';
import { updateTsConfigType, updateTsConfigCompileOption } from '../../utils/add-vite-types-config';
import { updateImportmapJson } from '../../utils/importmaps-helpers';
import { updateProjectJson } from '../../utils/update-project';
import { addFiles } from '../../utils/add-files';
import path from 'path';

function updateImportmapMfJson(tree: Tree, options: MifeNgApplicationGeneratorSchema) {
  const templateNames = names(options.name);
  const filePath = 'apps/app-shell/public/importmaps/importmap-mf.prod.json';
  const importmap: { [key: string]: string } = {
    [`@myorg/${templateNames.fileName}`]: `./mf/${templateNames.fileName}/main.js`,
  };
  updateImportmapJson(tree, filePath, importmap);
}

function updateImportmapMfProdJson(tree: Tree, options: MifeNgApplicationGeneratorSchema) {
  const templateNames = names(options.name);
  const filePath = 'apps/app-shell/public/importmaps/importmap-mf.json';
  const importmap: { [key: string]: string } = {
    [`@myorg/${templateNames.fileName}`]: `http://localhost:${options.port}/main.js`,
  };
  updateImportmapJson(tree, filePath, importmap);
}

export async function mifeNgApplicationGenerator(tree: Tree, options: MifeNgApplicationGeneratorSchema) {
  //generator consts
  const serializedNames = names(options.name);
  const serializedDirectoryNames = names(options.directory);
  const projects = getProjects(tree);

  //dir consts
  const appDir = `${serializedDirectoryNames.fileName}/${serializedNames.fileName}`;
  const tsConfigAppPath = `${appDir}/tsconfig.app.json`;
  const tsConfigEditorPath = `${appDir}/tsconfig.editor.json`;
  const tsConfigRootPath = `${appDir}/tsconfig.json`;
  const projectJsonPath = `${appDir}/project.json`;

  if (projects.has(serializedNames.fileName)) {
    throw new Error(`Project '${serializedNames.fileName}' already exists.`);
  }

  //generate angular application
  await applicationGenerator(tree, {
    name: serializedNames.fileName,
    directory: `${serializedDirectoryNames.fileName}/${serializedNames.fileName}`,
    prefix: serializedNames.fileName,
    bundler: 'esbuild',
    port: options.port,
    skipTests: options.skipTests,
    addTailwind: options.addTailwind,
    style: options.style,
    unitTestRunner: options.unitTestRunner,
    e2eTestRunner: options.e2eTestRunner,
    linter: options.linter,
    tags: options.tags,
  });

  //delete unnecessary files/dirs
  deleteFolderOrFile(tree, `${appDir}/src/app`);
  deleteFolderOrFile(tree, `${appDir}/src/index.html`);
  deleteFolderOrFile(tree, `${appDir}/src/main.ts`);
  deleteFolderOrFile(tree, `${appDir}/public`);

  //add files from template
  addFiles(tree, path.join(__dirname, 'files'), options);

  //update tsconfig files to fit the template
  updateTsConfigType(tree, tsConfigAppPath, ['vite/client']);
  updateTsConfigType(tree, tsConfigEditorPath, ['vite/client']);
  updateTsConfigCompileOption(tree, tsConfigRootPath, {}, true);

  //update the app-shell importmaps files
  updateImportmapMfJson(tree, options);
  updateImportmapMfProdJson(tree, options);

  //update project.json
  updateProjectJson(tree, options, projectJsonPath);

  await formatFiles(tree);
}

export default mifeNgApplicationGenerator;
