import AbstractView from './abstract-view';

const createShowButtonTemplate = () => '<button class="films-list__show-more">Show more</button>';

class ShowButtonView extends AbstractView {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createShowButtonTemplate();
  }

  setClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().addEventListener('click', this._clickHandler);
  }

  _clickHandler(evt) {
    evt.preventDefault();

    this._callback.click();
  }
}

export default ShowButtonView;
