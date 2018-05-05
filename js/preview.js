'use strict';

(function () {
  var ENTER_KEY = 13;
  var AVATARS_MAX = 6;
  var COMMENTS_MIN = 5;

  var body = document.querySelector('body');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('#picture-cancel');
  var commentsContainer = document.querySelector('.social__comments');
  var loadMoreButton = document.querySelector('.social__comment-loadmore');
  var commentsCount = document.querySelector('.social__comment-count');

  /**
   * генерируем комментарий к большому фото
   * @param  {num}       cNum номер комментария
   * @param  {m}         pNum номер фото
   * @return {element}   элемент разметки с комментарием
   */
  var renderComment = function (cNum, pNum) {
    var comment = document.createElement('li');
    comment.classList.add('social__comment', 'social__comment--text');

    var avatar = document.createElement('img');
    avatar.classList.add('social__picture');
    avatar.src = 'img/avatar-' + window.common.getRandomNum(1, (AVATARS_MAX + 1)) + '.svg';
    avatar.alt = 'Аватар комментатора фотографии';
    avatar.width = '35';
    avatar.height = '35';
    comment.appendChild(avatar);

    var textNode = document.createTextNode(window.common.photos[pNum].comments[cNum]);
    comment.appendChild(textNode);

    return comment;
  };

  var loadComments = function (amount) {
    var step;
    var id = bigPicture.dataset.id - 1;
    var photo = window.common.photos[id];
    var commentsLoaded = amount;

    if (photo.comments.length - commentsLoaded > 5) {
      step = 5;
    } else {
      step = photo.comments.length - commentsLoaded;
    }

    var fragment = document.createDocumentFragment();

    for (var j = 0; j < step; j++) {
      var commentId = ((photo.comments.length - 1) - commentsLoaded) - j;
      fragment.appendChild(renderComment(commentId, id));
    }
    commentsContainer.appendChild(fragment);

    commentsLoaded = commentsLoaded + step;
    if (commentsLoaded > photo.comments.length) {
      commentsLoaded = photo.comments.length;
    }

    commentsCount.firstChild.textContent = commentsLoaded + ' из ';

    if (commentsLoaded === photo.comments.length) {
      loadMoreButton.classList.add('hidden');
    }
  };

  var onPhotoClick = function (evt) {
    var photoId = evt.currentTarget.dataset.id - 1;
    var photo = window.common.photos[photoId];

    body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');

    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.social__caption').textContent = photo.comments[0];
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.dataset.id = evt.currentTarget.dataset.id;

    commentsCount.firstChild.textContent = COMMENTS_MIN + ' из ';
    loadMoreButton.classList.remove('hidden');

    for (var i = commentsContainer.children.length; i > 0; i--) {
      commentsContainer.removeChild(commentsContainer.lastElementChild);
    }

    var fragment = document.createDocumentFragment();

    for (var j = 0; (j < photo.comments.length) && (j < COMMENTS_MIN); j++) {
      var commentId = (photo.comments.length - 1) - j;
      fragment.appendChild(renderComment(commentId, photoId));
    }

    commentsContainer.appendChild(fragment);

    document.addEventListener('keydown', onBigPictureEscPress);
  };

  var onCloseWindowClick = function () {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === window.common.ESC_KEY) {
      onCloseWindowClick();
    }
  };

  bigPictureClose.addEventListener('click', onCloseWindowClick);

  var onLoadMoreButtonClick = function () {
    var commentsLoaded = commentsCount.firstChild.textContent.split(' ')[0];
    loadComments(parseInt(commentsLoaded, 10));
  };

  var onLoadMoreButtonEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEY) {
      onLoadMoreButtonClick();
    }
  };

  loadMoreButton.addEventListener('click', onLoadMoreButtonClick);
  loadMoreButton.addEventListener('keydown', onLoadMoreButtonEnterPress);

  // обработчики для фото

  window.common.renderPreviewListeners = function () {
    window.common.pictureLinks.forEach(function (picture) {
      picture.addEventListener('click', onPhotoClick);
    });
  };
})();
