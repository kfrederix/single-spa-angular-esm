import angularBabelLinker from '@angular/compiler-cli/linker/babel';
import { transformAsync } from '@babel/core';
import { workspaceRoot } from '@nx/devkit';
import { build } from 'esbuild';
import * as fs from 'fs';
import * as path from 'path';
import { flattenEntryPoints, type PackageInfo } from './package-info.util';

export const preProcessSharedPackages = async (packageInfos: PackageInfo[], outputDir: string): Promise<void> => {
  console.log('Cleaning output directory');
  cleanDir(outputDir);

  const jobName = 'Processing shared packages';
  console.log(`START: ${jobName}`);
  console.time(jobName);

  const externals = packageInfos.map((pkgInfo) => pkgInfo.name);

  for (const pkgInfo of packageInfos) {
    const entryPoints = flattenEntryPoints(pkgInfo).map((entryPoint) => path.join(pkgInfo.rootDir, entryPoint.file));
    await buildWithEsbuild(
      entryPoints,
      externals,
      `${outputDir}/${pkgInfo.name}@${pkgInfo.version}`,
      path.resolve(workspaceRoot, 'node_modules', pkgInfo.name)
    );
  }

  console.log(`DONE: ${jobName}`);
  console.timeEnd(jobName);
};

function cleanDir(dir: string): void {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true });
  }
  fs.mkdirSync(dir, { recursive: true });
}

async function buildWithEsbuild(
  entryPoints: string[],
  externals: string[],
  outdir: string,
  outbase: string
): Promise<void> {
  await build({
    entryPoints,
    outdir,
    outbase,
    format: 'esm',
    target: 'es2022',
    sourcemap: true,
    minify: true,
    legalComments: 'eof',
    bundle: true,
    external: externals,
    supported: {
      // Downlevel native `async/await` so that ZoneJS can intercept it.
      'async-await': false,
    },
    define: {
      ngDevMode: 'false',
      ngI18nClosureMode: 'false',
      ngJitMode: 'false',
    },
    plugins: [
      {
        name: 'angular-babel-linker-esbuild-plugin',
        setup(build) {
          build.onLoad({ filter: /\.[cm]?js$/ }, async (args) => {
            const linkedCode = await linkWithBabel(args.path);
            return {
              contents: linkedCode,
            };
          });
        },
      },
    ],
  });
}

async function linkWithBabel(filePath: string): Promise<string> {
  const content = await fs.promises.readFile(filePath, 'utf8');
  const { code } = await transformAsync(content, {
    filename: filePath,
    filenameRelative: filePath,
    plugins: [angularBabelLinker],
    // Sourcemaps are generated inline so that ESBuild can process them.
    sourceMaps: 'inline',
    compact: false,

    configFile: false,
    babelrc: false,
    browserslistConfigFile: false,
  });
  return code;
}
