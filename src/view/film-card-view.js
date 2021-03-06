import AbstractView from './abstract-view';

import {
  AppConfig,
  DateFormat
} from 'const';

import {
  getYear,
  getTime
} from 'utils/date-util';

import {
  truncateText,
  reportError
} from 'utils/common-util';

const CONTROL_BUTTON = 'film-card__controls-item';

const setClass = (flag) => flag ? `${CONTROL_BUTTON}--active` : '';

const createFilmCardTemplate = (
  {title, poster, description, rating, runtime, genres, release: {date}},
  {isWatchlist, isWatched, isFavorite},
  commentCount,
) => (
  `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">
        ${getYear(date)}
      </span>
      <span class="film-card__duration">
        ${getTime(runtime, DateFormat.TIME)}
      </span>
      <span class="film-card__genre">
        ${genres[0]}
      </span>
    </p>
    <img src="./${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">
      ${truncateText(description.trim(), AppConfig.MAX_NUMBER_CHAR)}
    </p>
    <a class="film-card__comments">
      ${commentCount} comment${commentCount === 1 ? '' : 's'}
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${setClass(isWatchlist)}" name="watchlist" type="button">
        Add to watchlist
      </button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${setClass(isWatched)}" name="watched" type="button">
        Mark as watched
      </button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${setClass(isFavorite)}" name="favorite" type="button">
        Mark as favorite
      </button>
    </div>
  </article>`
);

class FilmCardView extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._commentCount = film.comments.length;

    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film.filmInfo, this._film.userDetails, this._commentCount);
  }

  setClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().addEventListener('click', this._clickHandler);
  }

  shake(value) {
    const controlButton = this.getElement().querySelector(`[name="${value}"]`);

    controlButton.disabled = false;
    reportError(controlButton);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    const target = evt.target;

    if (target.classList.contains(CONTROL_BUTTON)) {
      target.disabled = true;
    }

    this._callback.click(evt);
  }
}

export default FilmCardView;
