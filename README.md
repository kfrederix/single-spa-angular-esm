# Single-Spa with Angular and native ESM


## Introduction

Until now, the recommended setup by the single-spa core team has been based on importmaps in combination with SystemJS. This setup still works great today. But browser technology has evolved, and the single-spa team is currently working on renewing their recommended setup based on native ESM (without SystemJS).


## A quick word about Angular

Since v17, Angular provides an improved builder which is based on [Vite](https://vitejs.dev) (dev server) and [esbuild](https://esbuild.github.io) (output bundling).

Since Vite does not support SystemJS as an output format (and has no plans to ever do so) it makes perfect sense for us to refactor our micro-frontend setup to align with the envisioned native-ESM approach which will be recommended by single-spa core team going forward.


## Solving native importmap shortcomings

Since we don't need to support Internet Explorer anymore, we can now confidently rely on `<script type="importmap">` being [natively supported by all modern browsers](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap).

However, there are 3 features that we would like to encorporate in our architecture that are currently not supported by native importmap implementations:

 - external importmaps: i.e. `<script type="importmap" src="...">`
 - multiple importmaps: native browser implementations support only 1 importmap
 - importmap overrides: we want to enable developers to override certain modules on deployed environments, which creates a really nice dev experience.

To overcome these native importmap limitations, 2 possible solutions come to mind:
 - [es-module-shims](https://github.com/guybedford/es-module-shims) can be used in `shimMode` to add all these features. The downside is that this introduces a very small (~5ms) performance hit. Even though this hit might be negligable, it would be nice if we could stick with pure native ES modules instead.
 - [import-map-injector](https://github.com/single-spa/import-map-injector) combines multiple `<script type="injector-importmap">` elements into 1 final `<script type="importmap">` In this way, it adds support for both multiple and external importmaps.


By choosing for the `import-map-injector` approach, we get all the features that we want, while staying as native to the browser as possible.

Finally, to enable override of importmap modules, we use [import-map-overrides](https://github.com/single-spa/import-map-overrides). This can work together with `import-map-injector` just fine, but it's important to note that the import-map-override script must be loaded before import-map-injector (which makes sense of course because the injector script will only run once and it assumes that all `<script type="injector-importmap">` elements are present in the DOM before it runs).


## Conclusion
By piecing together all of the above, we can achieve an architecture that is ideal to handle our needs:
 - Angular micro-frontend apps, served/bundled as pure ES Modules by Vite/esbuild
 - Native browser importmap support, enhanced by import-map-injector
 - Route-based loading of micro-frontends handled by [single-spa](https://single-spa.js.org)

This repo represents a minimal working POC implementation of this architecture.

To run it, we need to start the dev-server on each of the apps in the repo:
 - the app-shell
 - the host module (also known as "root-config" in single-spa land)
 - the navbar MF
 - both of the main MF apps (cats and dogs)

To do this, we could open 5 separate terminal windows and run the `serve` target for each of these apps separately. Or to make it easier, we can run the `dev` script (defined in package.json) to start them all at once in parallel:

``` bash
pnpm dev
```

Give it some seconds until all the dev servers are up-and-running. We are now ready to see it in action by opening the app-shell url in our browser: `http://localhost:4300/`
