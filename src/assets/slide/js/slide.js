// eslint-disable-next-line no-undef
asyncPage.component('${name}', function(props) {
  const onconnected = () => window.LazyLoad.update();

  return hyperHTML.wire(props)`
      <a  href=${props.link}
          target="_blank"
          rel="noopener"
          onconnected=${onconnected}>
        <img class="lazy" alt="Random Image" data-src="${props.imgSrc}"/>
        <div class="slide-text">
          <h1>${props.title}</h1>
          <h2>${props.subTitle}</h2>
        </div>
       </a>
    `;
});
