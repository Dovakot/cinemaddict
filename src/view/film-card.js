import {
  truncateText,
  getTimeFromMinutes
} from 'utils';

const createFilmCardTemplate = (card) => {
  const {
    title,
    poster,
    description,
    rating,
    runtime,
    genres,
    release: {date},
  } = card.filmInfo;

  const {
    isWatchlist,
    isWatched,
    isFavorite,
  } = card.userDetails;

  const commentCount = card.comments.size;

  const isActive = (flag) => flag ? 'film-card__controls-item--active' : '';

  return `
    <article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">
          ${new Date(date).getFullYear()}
        </span>
        <span class="film-card__duration">
          ${getTimeFromMinutes(runtime)}
        </span>
        <span class="film-card__genre">
          ${genres.values().next().value}
        </span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">
        ${truncateText(description.trim(), 140)}
      </p>
      <a class="film-card__comments">
        ${commentCount} ${commentCount === 1 ? 'comment' : 'comments'}
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isActive(isWatchlist)}" type="button">
          Add to watchlist
        </button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isActive(isWatched)}" type="button">
          Mark as watched
        </button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isActive(isFavorite)}" type="button">
          Mark as favorite
        </button>
      </div>
    </article>
  `;
};

export default createFilmCardTemplate;