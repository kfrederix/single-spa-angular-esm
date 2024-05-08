import { loadViteClient } from '@single-spa-angular-esm/shared-utils';
import { registerApplication, start } from 'single-spa';

if (import.meta.env.MODE === 'development') {
  loadViteClient();
}

registerApplication(
  'navbar',
  () => import('@myorg/navbar'),
  () => true
);

registerApplication(
  'cats',
  () => import('@myorg/cats'),
  (location) => location.pathname.startsWith('/cats') || ['', '/'].includes(location.pathname)
);

registerApplication(
  'dogs',
  () => import('@myorg/dogs'),
  (location) => location.pathname.startsWith('/dogs')
);

start();
