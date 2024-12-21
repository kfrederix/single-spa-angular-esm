import { loadViteClient } from '@single-spa-angular-esm/shared-utils';
import { registerApplication, start } from 'single-spa';

if (import.meta.env.MODE === 'development') {
  loadViteClient();
}

registerApplication(
  'navbar',
  // @ts-expect-error: cannot find module
  () => import('@myorg/navbar'),
  () => true
);

registerApplication(
  'cats',
  // @ts-expect-error: cannot find module
  () => import('@myorg/cats'),
  (location) => location.pathname.startsWith('/cats') || ['', '/'].includes(location.pathname)
);

registerApplication(
  'dogs',
  // @ts-expect-error: cannot find module
  () => import('@myorg/dogs'),
  (location) => location.pathname.startsWith('/dogs')
);

start({ urlRerouteOnly: false });
