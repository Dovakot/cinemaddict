import {
  DAYS_YEARS,
  MAX_COMMENTS
} from 'const';

import {
  getRandomInt,
  getRandomFloat,
  getRandomArrayIndex,
  getRandomArrayElement,
  getRandomArray,
  getRandomDate
} from 'utils';

const FilmInfo = {
  TITLES: [
    'Hogfather',
    'Knockin on Heaven\'s Door',
    'What We Do in the Shadows',
    'Gone Girl',
    'Snatch',
    'Lock, Stock and Two Smoking Barrels',
    'The Road',
    'Valhalla Rising',
    'Manchester by the Sea',
    'Hacksaw Ridge',
    'The Grand Budapest Hotel',
    'K-PAX',
    'A Beautiful Mind',
    'A Little Princess',
    'Joyeux Noël',
  ],
  POSTERS: [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg',
  ],
  DESCRIPTION: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus',
    max: 5,
  },
  DIRECTORS: [
    'Vadim Jean',
    'Kenneth Lonergan',
    'Nicolas Winding Refn',
    'Taika Waititi',
    'Iain Softley',
  ],
  WRITERS: [
    'Cormac McCarthy',
    'Don DeLillo',
    'Jemaine Clement',
    'Rhys Darby',
    'Charles Leavitt',
  ],
  ACTORS: [
    'Christopher Eccleston',
    'David Tennant',
    'Matt Smith',
    'Peter Capaldi',
    'Jodie Whittaker',
  ],
  GENRES: [
    'Action',
    'Adventure',
    'Comedy',
    'Drama',
    'Fantasy',
  ],
  COUNTRIES: [
    'USA',
    'UK',
    'France',
    'Italy',
    'New Zealand',
  ],
  AGE_RATINGS: [
    0,
    6,
    12,
    16,
    18,
  ],
  RUNTIME: {
    min: 40,
    max: 300,
  },
  MAX_RATING: 10,
  MAX_DATE: 50,
};

const getDescription = ({text, max}) => {
  const descriptionList = new Set(
    getRandomArray(text.split('. '), max),
  );
  const textDescription = [...descriptionList].join('. ');

  return textDescription.slice(-1) === '.' ? textDescription : `${textDescription}.`;
};

const generateCard = () => ({
  comments: new Set(getRandomArrayIndex(MAX_COMMENTS)),
  filmInfo: {
    title: getRandomArrayElement(FilmInfo.TITLES),
    poster: getRandomArrayElement(FilmInfo.POSTERS),
    description: getDescription(FilmInfo.DESCRIPTION),
    rating: getRandomFloat(1, FilmInfo.MAX_RATING),
    ageRating: getRandomArrayElement(FilmInfo.AGE_RATINGS),
    runtime: getRandomInt(FilmInfo.RUNTIME.min, FilmInfo.RUNTIME.max),
    director: getRandomArrayElement(FilmInfo.DIRECTORS),
    writers: new Set(getRandomArray(FilmInfo.WRITERS)),
    actors: new Set(getRandomArray(FilmInfo.ACTORS)),
    genres: new Set(getRandomArray(FilmInfo.GENRES)),
    release: {
      date: getRandomDate(-DAYS_YEARS * getRandomInt(1, FilmInfo.MAX_DATE)),
      country: getRandomArrayElement(FilmInfo.COUNTRIES),
    },
  },
  userDetails: {
    isWatchlist: Boolean(getRandomInt(0, 1)),
    isWatched: Boolean(getRandomInt(0, 1)),
    isFavorite: Boolean(getRandomInt(0, 1)),
  },
});

export default generateCard;