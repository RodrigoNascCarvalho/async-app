/* eslint-disable require-jsdoc */
asyncPage.component('${name}', (function() {
  const {
    hyper,
  } = hyperHTML;

  /**
   * Creates Slide component used by Carousel
   * @param { Object } slideProps
   * @param { Number } index
   * @return { HTMLElement }
   */
  function slide(slideProps, index) {
    return hyperHTML.wire(slideProps, `slide--${index}`)`
          <a  class="slide"
              href=${slideProps.link}
              target="_blank"
              rel="noopener">
            <img class="lazy" alt="Random Image" data-src="${slideProps.imgSrc}"/>
          <div class="slide-text">
              <h1>${slideProps.title}</h1>
              <h2>${slideProps.subTitle}</h2>
            </div>
          </a>
        `;
  }

  /** Class for Carousel component */
  class Carousel extends hyper.Component {
    get defaultState() {
      return {
        currentIndex: 0,
      };
    }

    /**
     * Constructor for Carousel component receives props
     * @param {Object} props
     */
    constructor({
      components,
    }) {
      super();
      this.components = components;
    }

    onconnected() {
      this.interval = setInterval(() => {
        this.nextSlide();
      }, 2000);
      window.LazyLoad.update();
    }

    updateSlide(newIndex) {
      this.setState({
        currentIndex: newIndex,
      });

      clearInterval(this.interval);
      this.onconnected();
      this.render();
    }

    nextSlide(event) {
      if (this.state.currentIndex + 1 < this.components.length) {
        this.updateSlide(this.state.currentIndex + 1);
      } else {
        this.updateSlide(0);
      }
    }

    previousSlide(event) {
      if (this.state.currentIndex - 1 >= 0) {
        this.updateSlide(this.state.currentIndex - 1);
      } else {
        this.updateSlide(this.components.length - 1);
      }
    }

    /**
     * Renders component.
     * @return { HTMLElement } carousel HTML
     */
    render() {
      const showSlide = (index) => index === this.state.currentIndex ?
        'display:block;' : 'display:none;';
      const activeSlide = (index) => index === this.state.currentIndex ?
        'active' : '';

      return this.html `<div onconnected=${this}>
             ${ this.components.map((currentSlide, index) =>
    hyperHTML.wire(currentSlide)`<div class="carousel-slide"
                                      style="${showSlide(index)}">${slide(currentSlide)}</div>`) }
             <button onclick=${(e) => this.previousSlide()} class="arrow left">
             </button>
             <button onclick=${(e) => this.nextSlide()} class="arrow right">
             </button>
             <div class="nav">
               ${ this.components.map((currentSlide, index) =>
    hyperHTML.wire(currentSlide)`
      <button onclick=${(e) => this.updateSlide(index)} class=${activeSlide(index)} data-slider=${index}></button>`) }
             </div>
            </div>
           `;
    }
  }

  return function(carouselProps) {
    return hyperHTML.wire(
        carouselProps)`${ new Carousel(carouselProps) }`;
  };
}()));

