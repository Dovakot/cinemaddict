/*eslint no-undef: "error"*/
/*eslint-env node*/

import {
  AppConfig
} from 'const';

import {
  getRandomObjects
} from 'utils/common';

import {
  render
} from 'utils/render';

import FilmsModel from 'model/films';

import FilmsPresenter from 'presenter/films';

import UserLevelView from 'view/user-level';
import MenuView from 'view/menu';
import FilterView from 'view/filter';
import FooterStatisticsView from 'view/footer-statistics';

import generateCard from 'mock/film-card';
import generateComment from 'mock/comment';
import {
  generateFilter
} from 'mock/filter';

const containerHeader = document.querySelector('.header');
const containerMain = document.querySelector('.main');
const containerFooter = document.querySelector('.footer');

const cardData = getRandomObjects(generateCard, AppConfig.MAX_CARDS);
const cardCount = cardData.length;

const commentData = getRandomObjects(generateComment, AppConfig.MAX_COMMENTS);
const filterData = generateFilter(cardData);

const filter = new FilterView(filterData).getTemplate();
render(containerMain, new MenuView(filter));
render(containerFooter, new FooterStatisticsView(cardCount));

if (cardCount) {
  const [, userHistory] = filterData;

  render(containerHeader, new UserLevelView(userHistory));
}

const filmsModel = new FilmsModel();
filmsModel.setFilms(cardData, commentData);

const filmsPresenter = new FilmsPresenter(containerMain, filmsModel);

filmsPresenter.init();
