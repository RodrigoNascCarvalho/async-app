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
  const componentId = generateUUID();
  element.setAttribute('data-component-id', componentId);

  return content.replace(/\${id}/g, componentId);
};

export const processAsyncElement = (element) => {
  const externalResources = [
    {
      attribute: 'data-script-url',
      handler: loadExternalScript,
    }, {
      attribute: 'data-style-url',
      handler: loadExternalStyle,
    }];

  externalResources.forEach((externalResource) => {
    const resourcePath = element.getAttribute(externalResource.attribute);

    if (resourcePath) {
      getResource(resourcePath)
          .then((resourceContent) =>
            processResourceIdentifier(element, resourceContent))
          .then((treatedContent) =>
            externalResource.handler(element, treatedContent))
          .catch(window.console.error);
    }
  });
};
