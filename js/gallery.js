'use strict';

(function () {
// начинаем рендер
var pictureList = document.querySelector('.pictures');
var picturesTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

var renderPhoto = function (num) {
  var photoElement = picturesTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = window.common.photos[num].url;
  photoElement.querySelector('.picture__stat--likes').textContent = window.common.photos[num].likes;
  photoElement.querySelector('.picture__stat--comments').textContent = window.common.photos[num].comments.length;
  photoElement.querySelector('.picture__img').dataset.id = num;

  return photoElement;
};

var fragment = document.createDocumentFragment();

for (var n = 0; n < window.common.PHOTOS_MAX; n++) {
  fragment.appendChild(renderPhoto(n));
}

pictureList.appendChild(fragment);
})();
