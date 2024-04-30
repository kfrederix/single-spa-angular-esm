// In single-spa, the assets need to be loaded from a dynamic location,
// instead of hard coded to `/assets`, we use import.meta.url for this.

import { getOriginUrl } from "../origin-url/origin-url.util";

export const assetUrl = (url = ''): string => {
  const urlPrefix = url.startsWith('/') ? '' : '/';
  return `${getOriginUrl()}/assets${urlPrefix}${url}`;
};
