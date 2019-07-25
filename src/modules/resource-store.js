const resourceStore = {};

export const getResource = async (resourcePath) => {
  if (resourceStore[resourcePath]) return resourceStore[resourcePath];

  const response = await fetch(resourcePath);
  resourceStore[resourcePath] = await response.text();

  return resourceStore[resourcePath];
};
