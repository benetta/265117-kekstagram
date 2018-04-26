'use strict';

(function () {
  var ESC_KEY = 27;
  var PHOTOS_MAX = 25;

  var photos;

  var imageUploadElement = document.querySelector('.img-upload__overlay');
  var imageUploadImg = document.querySelector('.img-upload__preview img');

  /**
   * получаем случайное число в диапзаоне min-max
   * @param  {number}     min
   * @param  {nuber}      max
   * @return {number}     случайное число
   */
  var getRandomNum = function (min, max) {
    var num = Math.floor(Math.random() * (max - min)) + min;
    return num;
  };

  var picturesTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

  var renderPhoto = function (num) {
    var photoElement = picturesTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = window.common.photos[num].url;
    photoElement.querySelector('.picture__stat--likes').textContent = window.common.photos[num].likes;
    photoElement.querySelector('.picture__stat--comments').textContent = window.common.photos[num].comments.length;
    photoElement.querySelector('.picture__img').dataset.id = num;

    return photoElement;
  };

  var body = document.querySelector('body');

  var onError = function (message) {
    // запретить клики?

    var errorElement = document.createElement('div');
    errorElement.classList.add('error');
    errorElement.textContent = message;

    body.appendChild(errorElement);
  };

  window.common = {
    ESC_KEY: ESC_KEY,
    PHOTOS_MAX: PHOTOS_MAX,

    photos: photos,

    getRandomNum: getRandomNum,
    renderPhoto: renderPhoto,
    onError: onError,

    imageUploadElement: imageUploadElement,
    imageUploadImg: imageUploadImg
  };
})();
