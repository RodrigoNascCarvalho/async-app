const {processAsyncElement} = require('./modules/resource-loader');
const LazyLoad = require('vanilla-lazyload').default;

window.LazyLoad = new LazyLoad({
  elements_selector: '.lazy',
});

const asyncObserver = new MutationObserver((mutations) => {
  const convertNodeListToArray = (nodeList) => [].slice.call(nodeList);
  let allAddedNodes = [];

  for (const mutation of mutations) {
    allAddedNodes = allAddedNodes.concat(
        convertNodeListToArray(mutation.addedNodes)
    );
  }

  allAddedNodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      processAsyncElement(node);
    }
  });
});

window.AsyncComponents = {};
window.asyncPage = {};
window.asyncPage.component = (id, definition) => {
  window.AsyncComponents[id] = definition;
};

asyncObserver.observe(document.documentElement, {
  childList: true,
  subtree: true,
});

window.addEventListener('load', () => {
  asyncObserver.disconnect();
});
