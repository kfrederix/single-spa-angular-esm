# Single-Spa with Angular v17+ and native ESM


## What is this?

This is an example Nx monorepo demonstrating how single-spa can be used for microfrontends with the new Angular builder based on Vite/esbuild.

Goals:
- [x] Angular micro-frontend apps, served/bundled as native ES Modules by Vite/esbuild
- [x] Leverage native browser importmap support
- [x] Support for having multiple importmaps (thanks to [import-map-injector](https://github.com/single-spa/import-map-injector))
- [x] Support for external importmaps (thanks to [import-map-injector](https://github.com/single-spa/import-map-injector))
- [x] Route-based loading of micro-frontends (handled by [single-spa](https://single-spa.js.org))
- [x] live-reload functionality during development
- [ ] TODO: share dependencies between Angular micro-frontends (it seems simply using the `externalDependencies` option with `@nx/angular:application` is not fully working yet...?)


## Want to learn more?

I've written some more in-depth background in a seprate markdown doc. I encourage you to read it if you are interested to learn more about the reasoning behind all of this: [background.md](./doc/background.md)


## Try it out

To get started, first we need to install our dependencies:

``` bash
pnpm i
```

> NOTE: I chose `pnpm` for this repo because of personal preference, but nothing should stop us from using plain `npm`, `yarn` or even `bun`.

To run the application, we need to start the dev-server on each of the apps in the repo:
 - the app-shell (the root html file with importmaps etc)
 - the host module (MF orchestration logic, or in simple terms: some vanilla JS that calls `singleSpa.registerApplication()`)
 - the navbar MF
 - the 2 main MF apps (cats and dogs)

To do this, we could open 5 separate terminal windows and run the `serve` target for each of these apps separately (e.g. `pnpm nx serve app-shell` etc).

OR, to make it easier, we can run the `dev` script which leverages Nx to start them all at once in parallel:

``` bash
pnpm dev
```

Give it a few seconds until all the dev servers are up-and-running. Then we are ready to see it in action by opening the app-shell url in our browser: `http://localhost:4300/`
