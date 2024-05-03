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

!function(){"use strict";function t(t,r){(null==r||r>t.length)&&(r=t.length);for(var o=0,n=new Array(r);o<r;o++)n[o]=t[o];return n}function r(r,o){var n="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(!n){if(Array.isArray(r)||(n=function(r,o){if(r){if("string"==typeof r)return t(r,o);var n=Object.prototype.toString.call(r).slice(8,-1);return"Object"===n&&r.constructor&&(n=r.constructor.name),"Map"===n||"Set"===n?Array.from(r):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?t(r,o):void 0}}(r))||o&&r&&"number"==typeof r.length){n&&(r=n);var e=0,i=function(){};return{s:i,n:function(){return e>=r.length?{done:!0}:{done:!1,value:r[e++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,a=!0,s=!1;return{s:function(){n=n.call(r)},n:function(){var t=n.next();return a=t.done,t},e:function(t){s=!0,c=t},f:function(){try{a||null==n.return||n.return()}finally{if(s)throw c}}}}var o=[],n="import-map-injector:",e=document.querySelectorAll("script[type=injector-importmap]"),i=["application/json","application/importmap+json"];function c(t){var o,n={imports:{},scopes:{}},e=r(t);try{for(e.s();!(o=e.n()).done;){var i=o.value;if(i.imports)for(var c in i.imports)n.imports[c]=i.imports[c];if(i.scopes)for(var a in i.scopes)n.scopes[a]=i.scopes[a]}}catch(t){e.e(t)}finally{e.f()}var s=document.createElement("script");s.type="importmap",s.textContent=JSON.stringify(n),document.head.appendChild(s)}e.forEach((function(t){if(t.src)o.push(fetch(t.src).then((function(r){if(r.ok){if(!i.includes(r.headers.get("content-type").toLowerCase()))throw Error("".concat(n," Import map at url '").concat(t.src,"' does not have the required content-type http response header. Must be 'application/importmap+json'"));return r.json()}throw Error("".concat(n," import map at url '").concat(t.src,"' must respond with a success HTTP status, but responded with HTTP ").concat(r.status," ").concat(r.statusText))})).catch((function(r){throw console.error("".concat(n," Error loading import map from URL '").concat(t.src,"'")),r})));else{if(!(t.textContent.length>0))throw Error("".concat(n,' Script with type "injector-importmap" does not contain an importmap'));var r;try{r=JSON.parse(t.textContent)}catch(t){throw console.error(t),Error("".concat(n,' A <script type="injector-importmap"> element contains invalid JSON'))}o.push(r)}})),o.some((function(t){return t instanceof Promise}))?window.importMapInjector={initPromise:Promise.all(o).then((function(t){c(t)})).catch((function(t){throw console.error("".concat(n,": Unable to generate and inject final import map"),t),t}))}:(c(o),window.importMapInjector={initPromise:Promise.resolve()})}();
