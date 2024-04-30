/**
 * 
 * @returns current ES module's origin url in the form of http://localhost:4201
 */
export const getOriginUrl = () => {
  return new URL(import.meta.url).origin;
};
