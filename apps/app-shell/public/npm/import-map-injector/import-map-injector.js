// TODO: remove this script after fixing original:
// https://github.com/single-spa/import-map-injector
//
// I have opened 2 PR's on the original repo:
// - https://github.com/single-spa/import-map-injector/pull/13
// - https://github.com/single-spa/import-map-injector/pull/14

/*
Copyright (c) 2023 single-spa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

!function(){"use strict";function t(t,r){(null==r||r>t.length)&&(r=t.length);for(var n=0,o=new Array(r);n<r;n++)o[n]=t[n];return o}function r(r,n){var o="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(!o){if(Array.isArray(r)||(o=function(r,n){if(r){if("string"==typeof r)return t(r,n);var o=Object.prototype.toString.call(r).slice(8,-1);return"Object"===o&&r.constructor&&(o=r.constructor.name),"Map"===o||"Set"===o?Array.from(r):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?t(r,n):void 0}}(r))||n&&r&&"number"==typeof r.length){o&&(r=o);var e=0,i=function(){};return{s:i,n:function(){return e>=r.length?{done:!0}:{done:!1,value:r[e++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,a=!0,s=!1;return{s:function(){o=o.call(r)},n:function(){var t=o.next();return a=t.done,t},e:function(t){s=!0,c=t},f:function(){try{a||null==o.return||o.return()}finally{if(s)throw c}}}}var n=[],o="import-map-injector:",e=document.querySelectorAll("script[type=injector-importmap]"),i=["application/json","application/importmap+json"];function c(t){var n,o={imports:{},scopes:{}},e=r(t);try{for(e.s();!(n=e.n()).done;){var i=n.value;if(i.imports)for(var c in i.imports)o.imports[c]=i.imports[c];if(i.scopes)for(var a in i.scopes)o.scopes[a]=i.scopes[a]}}catch(t){e.e(t)}finally{e.f()}var s=document.createElement("script");s.type="importmap",s.textContent=JSON.stringify(o),document.head.appendChild(s)}e.forEach((function(t){if(t.src)n.push(fetch(t.src).then((function(r){if(r.ok){if(!i.some((function(t){return r.headers.get("content-type").toLowerCase().includes(t)})))throw Error("".concat(o," Import map at url '").concat(t.src,"' does not have the required content-type http response header. Must be 'application/importmap+json'"));return r.json()}throw Error("".concat(o," import map at url '").concat(t.src,"' must respond with a success HTTP status, but responded with HTTP ").concat(r.status," ").concat(r.statusText))})).catch((function(r){throw console.error("".concat(o," Error loading import map from URL '").concat(t.src,"'")),r})));else{if(!(t.textContent.length>0))throw Error("".concat(o,' Script with type "injector-importmap" does not contain an importmap'));var r;try{r=JSON.parse(t.textContent)}catch(t){throw console.error(t),Error("".concat(o,' A <script type="injector-importmap"> element contains invalid JSON'))}n.push(r)}})),n.some((function(t){return t instanceof Promise}))?window.importMapInjector={initPromise:Promise.all(n).then((function(t){c(t)})).catch((function(t){throw console.error("".concat(o,": Unable to generate and inject final import map"),t),t}))}:(c(n),window.importMapInjector={initPromise:Promise.resolve()})}();
//# sourceMappingURL=import-map-injector.js.map

