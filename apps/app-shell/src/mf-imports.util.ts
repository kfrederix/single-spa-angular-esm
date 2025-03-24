const modules = [
  { name: '@myorg/host', port: 4200 },
  { name: '@myorg/cats', port: 4201 },
  { name: '@myorg/dogs', port: 4202 },
  { name: '@myorg/navbar', port: 4203 },
];

export const getMfImports = (isProd: boolean) =>
  modules.reduce((acc, { name, port }) => {
    const url = isProd ? `./mf/${name}/main.js` : `http://localhost:${port}/main.js`;
    return { ...acc, [name]: url };
  }, {});
