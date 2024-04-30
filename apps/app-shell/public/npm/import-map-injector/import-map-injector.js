// TODO: remove this script after fixing original:
// https://github.com/single-spa/import-map-injector

'use strict';

const importMapJsons = [];
const errPrefix = 'import-map-injector:';
const injectorImportMaps = document.querySelectorAll(
  'script[type=injector-importmap]'
);
const acceptedImportmapMimeTypes = [
  'application/json',
  'application/importmap+json',
];

injectorImportMaps.forEach((scriptEl) => {
  if (scriptEl.src) {
    importMapJsons.push(
      fetch(scriptEl.src)
        .then((r) => {
          if (r.ok) {
            if (
              !acceptedImportmapMimeTypes.includes(
                r.headers.get('content-type').toLowerCase()
              )
            ) {
              throw Error(
                `${errPrefix} Import map at url '${scriptEl.src}' does not have the required content-type http response header. Must be 'application/importmap+json'`
              );
            }
            return r.json();
          } else {
            throw Error(
              `${errPrefix} import map at url '${scriptEl.src}' must respond with a success HTTP status, but responded with HTTP ${r.status} ${r.statusText}`
            );
          }
        })
        .catch((err) => {
          console.error(
            `${errPrefix} Error loading import map from URL '${scriptEl.src}'`
          );
          throw err;
        })
    );
  } else if (scriptEl.textContent.length > 0) {
    let json;
    try {
      json = JSON.parse(scriptEl.textContent);
    } catch (err) {
      console.error(err);
      throw Error(
        `${errPrefix} A <script type="injector-importmap"> element contains invalid JSON`
      );
    }
    importMapJsons.push(json);
  } else {
    throw Error(
      `${errPrefix} Script with type "injector-importmap" does not contain an importmap`
    );
  }
});
const requiresMicroTick = importMapJsons.some(
  (json) => json instanceof Promise
);
if (requiresMicroTick) {
  window.importMapInjector = {
    initPromise: Promise.all(importMapJsons)
      .then((importMaps) => {
        injectImportMap(importMaps);
      })
      .catch((err) => {
        console.error(
          `${errPrefix}: Unable to generate and inject final import map`,
          err
        );
        throw err;
      }),
  };
} else {
  injectImportMap(importMapJsons);
  window.importMapInjector = {
    // Import map was injected synchronously, so there's nothing to wait on
    initPromise: Promise.resolve(),
  };
}
function injectImportMap(importMaps) {
  const finalImportMap = { imports: {}, scopes: {} };
  for (const importMap of importMaps) {
    if (importMap.imports) {
      for (let key in importMap.imports) {
        finalImportMap.imports[key] = importMap.imports[key];
      }
    }
    if (importMap.scopes) {
      for (let key in importMap.scopes) {
        finalImportMap.scopes[key] = importMap.scopes[key];
      }
    }
  }
  const finalImportMapScriptEl = document.createElement('script');
  finalImportMapScriptEl.type = 'importmap';
  finalImportMapScriptEl.textContent = JSON.stringify(finalImportMap);
  document.head.appendChild(finalImportMapScriptEl);
}
