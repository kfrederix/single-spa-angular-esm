# Background

## Introduction

Until now, the recommended setup by the single-spa core team has been based on importmaps in combination with SystemJS. This setup still works great today. But browser technology has evolved, and the single-spa team is currently working on renewing their recommended setup based on native ESM (without SystemJS).

## A quick word about Angular

Since v17, Angular provides an improved builder which is based on [Vite](https://vitejs.dev) (dev server) and [esbuild](https://esbuild.github.io) (output bundling).

Since esbuild does not support SystemJS as an output format (and likely never will) it makes perfect sense for us to refactor our micro-frontend setup to align with the envisioned native-ESM approach which will be recommended by single-spa core team going forward.

## Solving native importmap shortcomings

Since we don't need to support Internet Explorer anymore, we can now confidently rely on `<script type="importmap">` being [natively supported by all modern browsers](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap).

However, be aware that browser-native import maps still have some limitations:

- **multiple importmaps**: support for multiple import maps is coming. It already landed for Chrome but not yet for Firefox or Safari (at the time of writing this)
- **external importmaps**: this is not supported (i.e. `<script type="importmap" src="...">`)

The current implementation in this repo works with a full-native single importmap which is injected into the root html file at build time. I currently recommend sticking to a single, inline, native import map if you can because it avoids additional network roundtrips to fetch the importmaps before your application can start bootstrapping. However, if such an approach does not align with your envisioned architecture, then the following 2 options can provide a possible solution:

- [es-module-shims](https://github.com/guybedford/es-module-shims) can be used in `shimMode` to add all these features at the cost of a _very_ minimal performance hit. I think this is probably negligable when you already accept the added network-roundtrips as well. (+ you must use the `importShim()` function instead of `import()` for all dynamic imports)
- [import-map-injector](https://github.com/single-spa/import-map-injector) can combine multiple `<script type="injector-importmap">` elements into 1 final `<script type="importmap">` In this way, it adds support for both multiple and external importmaps. One downside with import-map-injector is that it only works when your import maps are served with Content-Type `application/json+importmap` (i.e. you can't use normal json files for the import maps).

## Overriding specific modules on deployed environments

We want to enable developers to override certain modules on deployed environments, because this creates a really nice dev experience.
To make this possible, we use [import-map-overrides](https://github.com/single-spa/import-map-overrides). (Note: this can also work together with es-module-shims or import-map-injector just fine)

## Additional challenges

While setting up this proof-of-concept repo, some additional challenges came up. We'll go over them here, so that you can understand the reasoning behind certain choices that were made here.

### Live-reload

During development, we want to see our code changes reflected in the browser as quickly as possible. Vite usually takes care of that for us out-of-the-box, when we are working on a "normal" application. The way Vite does that, is by auto-injecting a `<script type="module" src="@vite/client">` at the top of the app's index.html file. This `@vite/client` script will then set up the websockets communication with the Vite dev server and it will reload the page when the Vite dev server notifies the client that a change was made.

However, things are a bit different when working with this MF (micro-frontend) architecture. More specifically, when working in this way each MF is an app that will get loaded by dynamically importing the micro-frontend's entry javascript module file. This means that we are not using any index.html file that belongs to specific MF apps (and therefore no out-of-the-box websocket communication with the MF dev-server).

Fortunately, we can very easily import the `@vite/client` module ourselves, from each module's main JS file, during development. We only need to know the `origin` url for each MF module, and thanks to [import.meta](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta) we have that information available at our fingertips. This works flawlessly, and we have made a tiny helper function `loadViteClient` that we use within this repo.

### Static asset urls

Any static assets, like images, that we use in our micro-frontends must be referred to using absolute urls. Relative urls will not work, because these assets are relative to the MF module. Not relative to the app-shell page.

For example: consider the app-shell page running on URL http://localhost:4300. This app-shell now loads a micro-frontend which can be served from a different url like http://localhost:4201/main.js. In case this micro-frontend would refer to a static asset in a relative way, like `<img src="/assets/cat.jpg">` then the browser would resolve the image url to http://localhost:4300/assets/cat.jpg and it would result in a 404 because the image is really located at http://localhost:4201/assets/cat.jpg.

So how can we refer to assets using absolute urls, without the need to hard-code the full final url? That's right: [import.meta](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta) comes to rescue us again here. In the same way that we used it to load the `@vite/client`, we can also rely on it to correctly resolve the full static asset urls.

### Global styles for Angular micro-frontends

When we have a global stylesheet (e.g. `styles.css`) that we want to use with our Angular micro-frontend apps, another problem arises. Normally, we would reference these global stylesheets from the `angular.json` file (or `project.json` in case of Nx). For example:

```json
"targets": {
  "build": {
    "options": {
      "styles": [
        "apps/cats/src/styles.css"
      ],
    }
  }
}
```

However, when using the [angular application builder](https://angular.io/guide/esbuild#using-the-application-builder) this will result in a _separate_ `styles.css` file which Angular expects us to reference from a `<link rel="stylesheet">` tag in the index.html file. But that is not what we want. We would prefer these styles to be included in our main JS bundle and get injected into the DOM automatically when we `import()` our micro-frontend module at runtime.

To work around this problem, we could take a slightly different approach. First, we remove the global stylesheet(s) again from our project.json file:

```diff
"targets": {
  "build": {
    "options": {
      "styles": [
-        "apps/cats/src/styles.css"
      ],
    }
  }
}
```

Then, we can create a small wrapper component at the top level of our app as follows:

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { AppComponent } from './app.component';

@Component({
  imports: [AppComponent],
  selector: 'app-root',
  template: `<app-main />`,
  styleUrls: ['../styles.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppRootComponent {}
```

Finally, we can use this wrapper component to bootstrap our app:

```typescript
bootstrapApplication(AppRootComponent, appConfig);
```

Note that we referenced our global stylesheet from this wrapper component, in combination with `ViewEncapsulation.None`. This will cause Angular to do exactly what we want: injecting the global styles into the DOM when we are bootstrapping our micro-frontend app at runtime.

## Conclusion

By piecing together all of the above, we can achieve an architecture that is ideal to handle our needs:

- Angular micro-frontend apps, served/bundled as pure ES Modules by Vite/esbuild
- Native browser importmap support
- Route-based loading of micro-frontends handled by [single-spa](https://single-spa.js.org)
- live-reload functionality handled by manually importing `@vite/client` from our MF modules at runtime (only during development)
