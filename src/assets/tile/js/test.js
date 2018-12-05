window.AsyncComponents['${name}'] = function(props) {
  /**
   * Handles click
   * @param {Event} event The click event from the DOM
   */
  function handleClick(event) {
    event.preventDefault();
    window.console.log(`Clicked like crazy on ${props.name}`);
  }

  const onconnected = () => window.LazyLoad.update();
  const imgSrc = `url('${props.imgSrc}')`;

  return hyperHTML.wire(props)`
    <div class="lazy" onconnected=${onconnected} data-bg=${imgSrc}>
      <h1>${props.name}</h1>
      <button onclick=${handleClick}>${props.greeting}</button>
    </div>
  `;
};
