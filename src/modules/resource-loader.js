const {getResource} = require('./resource-store');
const {generateUUID} = require('./uuid');

const processComponentDefinition = (element, content, componentScriptName) => {
  return content.replace(/\${name}/g, componentScriptName);
};

const loadExternalScript = (element, code) => {
  const script = document.createElement('script');
  const componentScriptName = element.getAttribute('data-script-url');
  const namedCode = processComponentDefinition(
      element,
      code,
      componentScriptName
  );

  if (!window.AsyncComponents[componentScriptName]) {
    script.appendChild(document.createTextNode(namedCode));
    script.type = 'text/javascript';
    document.body.prepend(script);
  }

  const componentData = JSON.parse(element.getAttribute('data-model'));
  const componentFunction = window.AsyncComponents[componentScriptName];
  const componentDefinition = componentFunction(componentData);
  hyperHTML.bind(element)`${componentDefinition}`;
};

const loadExternalStyle = (element, code) => {
  const style = document.createElement('style');

  style.appendChild(document.createTextNode(code));
  document.body.prepend(style);
};

const processResourceIdentifier = (element, content) => {
  const componentId = element.getAttribute('data-component-id') ||
    generateUUID();
  element.setAttribute('data-component-id', componentId);

  return content.replace(/\${id}/g, componentId);
};

export const processAsyncElement = async (element) => {
  const externalResources = [
    {
      attribute: 'data-script-url',
      handler: loadExternalScript,
    }, {
      attribute: 'data-style-url',
      handler: loadExternalStyle,
    }];

  const promises = externalResources.map(async (externalResource) => {
    const resourcePath = element.getAttribute(externalResource.attribute);

    try {
      if (!resourcePath) {
        return null;
      }

      const resource = await getResource(resourcePath);
      const resourceContent = processResourceIdentifier(element, resource);
      const treatedContent = externalResource.handler(element, resourceContent);
      return treatedContent;
    } catch (err) {
      throw err;
    }
  });

  // eslint-disable-next-line no-undef
  await Promise.all(promises);
};
