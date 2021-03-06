import AbstractView from '../abstract-view';

const createCommentsTitleTemplate = (commentCount) => (
  `<h3 class="film-details__comments-title">
    Comment${commentCount === 1 ? '' : 's'}
    <span class="film-details__comments-count">${commentCount}</span>
  </h3>`
);

class CommentsTitleView extends AbstractView {
  constructor(commentCount) {
    super();
    this._commentCount = commentCount;
  }

  getTemplate() {
    return createCommentsTitleTemplate(this._commentCount);
  }
}

export default CommentsTitleView;
