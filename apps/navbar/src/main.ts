import { NgZone, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { NavigationStart, Router } from '@angular/router';
import { loadViteClient } from '@single-spa-angular-esm/shared-utils';
import type { AppProps } from 'single-spa';
import { singleSpaAngular } from 'single-spa-angular';
import { appConfig } from './app/app.config';
import { NavRootComponent } from './app/nav-root.component';

if (isDevMode()) {
  loadViteClient();
}

const lifecycles = singleSpaAngular<AppProps>({
  bootstrapFunction: (/*singleSpaProps: AppProps*/) => {
    return bootstrapApplication(NavRootComponent, appConfig);
  },
  template: '<nav-root />',
  domElementGetter: () =>
    document.getElementById('single-spa:nav') as HTMLElement,
  Router,
  NgZone,
  NavigationStart,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
