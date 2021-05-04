const CONTROL_BUTTONS = {
  watchlist: 'isWatchlist',
  watched: 'isWatched',
  favorite: 'isFavorite',
};

class AbstractFilm {
  constructor() {
    if (new.target === AbstractFilm) {
      throw new Error('Can\'t instantiate Abstract, only concrete one.');
    }

    this._changeData = null;
  }

  _changeFilmStatus(button) {
    const key = CONTROL_BUTTONS[button.name];
    const changedData = Object.assign({}, this._card.userDetails);
    changedData[key] = !this._card.userDetails[key];

    this._changeData(Object.assign(
      {},
      this._card,
      {userDetails: changedData},
    ));
  }
}

export default AbstractFilm;