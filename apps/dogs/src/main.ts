import { bootstrapApplication } from '@angular/platform-browser';
import { NavigationStart, Router } from '@angular/router';
import { loadViteClient } from '@single-spa-angular-esm/shared-utils';
import type { AppProps } from 'single-spa';
import { singleSpaAngular } from 'single-spa-angular';
import { DogsAppRootComponent } from './app/app-root.component';
import { appConfig } from './app/app.config';

if (import.meta.env?.MODE === 'development') {
  loadViteClient();
}

const lifecycles = singleSpaAngular<AppProps>({
  bootstrapFunction: async (/*singleSpaProps: AppProps*/) => {
    const appRef = await bootstrapApplication(DogsAppRootComponent, appConfig);

    const listener = () => appRef.tick();
    window.addEventListener('popstate', listener);

    appRef.onDestroy(() => {
      window.removeEventListener('popstate', listener);
    });

    return appRef;
  },
  template: '<dogs-app-root />',
  domElementGetter: () => document.getElementById('single-spa:main') as HTMLElement,
  Router,
  NgZone: 'noop',
  NavigationStart,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
