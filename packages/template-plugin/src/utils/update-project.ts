import { names, Tree, updateJson } from '@nx/devkit';
import { MifeNgApplicationGeneratorSchema } from '../generators/mife-ng-application/schema';

export function updateProjectJson(tree: Tree, options: MifeNgApplicationGeneratorSchema, projectJsonPath: string) {
  const serializedNames = names(options.name);
  const serializedDirectoryNames = names(options.directory);
  updateJson(tree, projectJsonPath, (json) => {
    // Create a new, updated JSON using object spread
    const newJson = {
      ...json,
      targets: {
        ...json.targets,
        build: {
          ...json.targets.build,
          executor: '@nx/angular:application',
          options: {
            ...json.targets.build.options,
            polyfills: [],
            assets: [`${serializedDirectoryNames.fileName}/${serializedNames.fileName}/src/assets`],
            styles: [],
            plugins: ['tools/esbuild/external-dependencies.plugin.ts'],
          },
          configurations: {
            ...json.targets.build.configurations,
            production: {
              ...json.targets.build.configurations.production,
              outputHashing: 'none',
            },
            development: {
              ...json.targets.build.configurations.development,
              namedChunks: true,
            },
          },
        },
        serve: {
          ...json.targets.serve,
          executor: '@nx/angular:dev-server',
          options: {
            ...json.targets.serve.options,
            prebundle: false,
            hmr: false,
          },
        },
      },
    };

    // Remove the serve-static target if it exists
    if (newJson.targets['serve-static']) {
      delete newJson.targets['serve-static'];
    }

    return newJson;
  });
}
