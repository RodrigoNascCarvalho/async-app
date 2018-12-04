const resourceStore = {};

export const getResource = (resourcePath) => {
  if (resourceStore[resourcePath]) return resourceStore[resourcePath];

  resourceStore[resourcePath] = fetch(resourcePath)
      .then((response) => response.text());

  return resourceStore[resourcePath];
};
