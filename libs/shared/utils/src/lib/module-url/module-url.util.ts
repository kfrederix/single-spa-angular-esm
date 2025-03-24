/**
 * Get current ES module's origin url (in the form of http://localhost:4201)
 *
 * @returns {string} the origin url
 */
export const getModuleOriginUrl = (): string => {
  return new URL(import.meta.url).origin;
};

/**
 * Get the full URL path up until the current ES module file.
 * For example: if current module url was "http://localhost:4201/some/path/module.js" then
 * this function will return "http://localhost:4201/some/path"
 *
 * @returns {string} the url
 */
export const getUrlPathToModule = (): string => {
  const fullUrl = new URL(import.meta.url);
  const path = fullUrl.pathname.substring(0, fullUrl.pathname.lastIndexOf('/'));
  return `${fullUrl.origin}${path}`;
};
