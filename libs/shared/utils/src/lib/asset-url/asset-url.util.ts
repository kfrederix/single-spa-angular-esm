// In single-spa, the assets need to be loaded from a dynamic location,
// instead of hard coded to `/assets`, we use import.meta.url for this.

import { getUrlPathToModule } from '../module-url/module-url.util';

export const assetUrl = (url = ''): string => {
  const urlPrefix = url.startsWith('/') ? '' : '/';
  return `${getUrlPathToModule()}/assets${urlPrefix}${url}`;
};
