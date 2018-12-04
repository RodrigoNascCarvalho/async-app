window.AsyncComponents['${name}'] = function(props) {
  return hyperHTML.wire(props)`
      <a  href=${props.link}
          target="_blank"
          rel="noopener">
        <img alt="Random Image" src="${props.imgSrc}"/>
        <div class="slide-text">
          <h1>${props.title}</h1>
          <h2>${props.subTitle}</h2>
        </div>
       </a>
    `;
};
