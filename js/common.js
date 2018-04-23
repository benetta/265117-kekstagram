'use strict';

(function () {
  var ESC_KEY = 27;
  var PHOTOS_MAX = 25;

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

  window.common = {
    ESC_KEY: ESC_KEY,
    PHOTOS_MAX: PHOTOS_MAX,
    photos: [],
    getRandomNum: getRandomNum,
    imageUploadElement: imageUploadElement,
    imageUploadImg: imageUploadImg
  };
})();
