import { getOriginUrl } from '@single-spa-angular-esm/shared-utils';
import { registerApplication, start } from 'single-spa';

if (import.meta.env.MODE === 'development') {
  import(/* @vite-ignore */ `${getOriginUrl()}/@vite/client`);
}

registerApplication(
  'navbar',
  () => import('@myorg/navbar'),
  () => true
);

registerApplication(
  'cats',
  () => import('@myorg/cats'),
  (location) => location.pathname.startsWith('/cats')
);

registerApplication(
  'dogs',
  () => import('@myorg/dogs'),
  (location) => location.pathname.startsWith('/dogs')
);

start();
