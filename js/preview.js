'use strict';

(function () {
  var AVATARS_MAX = 6;

  var bodyElement = document.querySelector('body');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('#picture-cancel');
  var commentsContainer = document.querySelector('.social__comments');

  /**
   * генерируем комментарий к большому фото
   * @param  {num}       cNum номер комментария
   * @param  {m}         pNum номер фото
   * @return {element}   элемент разметки с комментарием
   */
  var renderComment = function (cNum, pNum) {
    var commentElement = document.createElement('li');
    commentElement.classList.add('social__comment', 'social__comment--text');

    var imgElement = document.createElement('img');
    imgElement.classList.add('social__picture');
    imgElement.src = 'img/avatar-' + window.common.getRandomNum(1, (AVATARS_MAX + 1)) + '.svg';
    imgElement.alt = 'Аватар комментатора фотографии';
    imgElement.width = '35';
    imgElement.height = '35';
    commentElement.appendChild(imgElement);

    var textElement = document.createTextNode(window.common.photos[pNum].comments[cNum]);
    commentElement.appendChild(textElement);

    return commentElement;
  };

  var onPhotoClick = function (evt) {
    var photoId = evt.currentTarget.dataset.id - 1;
    var photo = window.common.photos[photoId];

    bodyElement.classList.add('modal-open');
    bigPicture.classList.remove('hidden');

    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.social__caption').textContent = photo.comments[0];
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;

    for (var i = commentsContainer.children.length; i > 0; i--) {
      commentsContainer.removeChild(commentsContainer.lastElementChild);
    }

    for (var j = 0; (j < photo.comments.length) && (j < 2); j++) {
      var commentId = (photo.comments.length - 1) - j;
      commentsContainer.appendChild(renderComment(commentId, photoId));
    }

    document.addEventListener('keydown', onBigPictureEscPress);
  };

  var onCloseWindowClick = function () {
    bigPicture.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === window.common.ESC_KEY) {
      onCloseWindowClick();
    }
  };

  // обработчики для фото

  window.common.renderPreviewListeners = function () {
    window.common.pictureLinks.forEach(function (picture) {
      picture.addEventListener('click', onPhotoClick);
    });
  };

  bigPictureClose.addEventListener('click', onCloseWindowClick);
})();
