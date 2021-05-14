import {
  isEscEvent
} from 'utils/common-util';

import {
  render,
  remove
} from 'utils/render-util';

import DetailsComponentView from 'view/film-details/film-details-view';
import FilmDetailsControlsView from 'view/film-details/film-details-controls-view';

import AbstractFilmPresenter from './abstract-film-presenter';
import CommentsPresenter from 'presenter/comments-presenter';

class FilmDetailsPresenter extends AbstractFilmPresenter {
  constructor(changeMode, changeData) {
    super();
    this._controlsContainer = null;
    this._filmDetailsComponent = null;
    this._filmControlsComponent = null;
    this._commentsPresenter = null;

    this._changeData = changeData;
    this._changeMode = changeMode;

    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._changeHandler = this._changeHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._keyHandler = this._keyHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film, comments) {
    this._film = film;
    this._comments = comments;

    return this._filmDetailsComponent
      ? this._renderFilmControls() : this._openFilmDetails();
  }

  destroy() {
    remove(this._filmDetailsComponent);
  }

  _createFilmDetails() {
    this._filmDetailsComponent = new DetailsComponentView(this._film.filmInfo, {
      closeClick: this._closeClickHandler,
      formChange: this._changeHandler,
      formSubmit: this._submitHandler,
      fieldKeyDown: this._keyHandler,
    });
  }

  _renderFilmDetails() {
    this._controlsContainer = this._filmDetailsComponent.getElement()
      .querySelector('.film-details__top-container');

    this._renderFilmControls();
    this._renderFilmComments();
    render(document.body, this._filmDetailsComponent);
  }

  _renderFilmControls() {
    if (this._filmControlsComponent) remove(this._filmControlsComponent);

    this._filmControlsComponent = new FilmDetailsControlsView(this._film.userDetails);
    render(this._controlsContainer, this._filmControlsComponent);
  }

  _renderFilmComments() {
    const commentsContainer = this._filmDetailsComponent.getElement()
      .querySelector('.film-details__bottom-container');

    this._commentsPresenter = new CommentsPresenter(commentsContainer);
    this._commentsPresenter.init(this._film.comments, this._comments);
  }

  _openFilmDetails() {
    document.body.classList.add('hide-overflow');

    this._createFilmDetails();
    this._renderFilmDetails();

    this._filmDetailsComponent.setHandlers();
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _closeFilmDetails() {
    document.body.classList.remove('hide-overflow');
    this._changeMode();

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    return isEscEvent(evt) ? this._closeFilmDetails() : false;
  }

  _closeClickHandler() {
    this._closeFilmDetails();
  }

  _changeHandler({target}) {
    return target.classList.contains('film-details__control-input')
      ? this._changeFilmStatus(target) : this._commentsPresenter.changeComments(target);

  }

  _keyHandler() {
    // получает данные после нажатия Ctrl/Command + Enter
    // console.log(this._commentsPresenter.getComment())
  }

  _submitHandler() {
    // отменяет отправление формы по Enter
    // возможно понадобиться в будушем, если нет, то реализация переедет во вьюху
  }
}

export default FilmDetailsPresenter;
