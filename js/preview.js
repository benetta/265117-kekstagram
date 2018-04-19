'use strict';

(function () {
  var AVATARS_MAX = 6;

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('#picture-cancel');
  var pictureLinks = document.querySelectorAll('.picture__link');
  var commentsContainer = document.querySelector('.social__comments');

  // прячем блоки
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');

  /**
   * генерируем комментарий к большому фото
   * @param  {num} l номер комментария
   * @param  {m} m номер фото
   * @return {element}   элемент разметки с комментарием
   */
  var renderComment = function (l, m) {
    var commentElement = document.createElement('li');
    commentElement.classList.add('social__comment', 'social__comment--text');

    var imgElement = document.createElement('img');
    imgElement.classList.add('social__picture');
    imgElement.src = 'img/avatar-' + window.common.getRandomNum(1, (AVATARS_MAX + 1)) + '.svg';
    imgElement.alt = 'Аватар комментатора фотографии';
    imgElement.width = '35';
    imgElement.height = '35';
    commentElement.appendChild(imgElement);

    var textElement = document.createTextNode(window.common.photos[m].comments[l]);
    commentElement.appendChild(textElement);

    return commentElement;
  };

  var onPhotoClick = function (evt) {
    var photoId = evt.target.dataset.id;
    var photo = window.common.photos[photoId];

    bigPicture.classList.remove('hidden');

    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;

    for (var j = commentsContainer.children.length; j > 0; j--) {
      commentsContainer.removeChild(commentsContainer.lastElementChild);
    }

    for (var k = 0; (k < photo.comments.length) && (k < 2); k++) {
      commentsContainer.appendChild(renderComment(k, photoId));
    }

    document.addEventListener('keydown', onBigPictureEscPress);
  };

  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === window.common.ESC_KEY) {
      window.common.closeWindow(bigPicture, onBigPictureEscPress);
    }
  };

  // обработчики для фото
  pictureLinks.forEach(function (picture) {
    picture.addEventListener('click', onPhotoClick);
  });

  bigPictureClose.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
  });
})();
