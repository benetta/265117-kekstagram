'use strict';

(function () {
  var ESC_KEY = 27;
  var PHOTOS_MAX = 25;

  var photos;

  var imageUploadOverlay = document.querySelector('.img-upload__overlay');
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

  var Code = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL: 500,
    BAD_GETAWAY: 502,
    SERVICE_UNAVAILABLE: 503
  };

  var setMessage = function (status) {
    if (typeof (status) !== 'number') {
      return status;
    }
    var error;

    switch (status) {
      case Code.BAD_REQUEST:
        error = 'Неверный запрос';
        break;
      case Code.NOT_FOUND:
        error = 'Ничего не найдено';
        break;
      case Code.INTERNAL:
        error = 'Внутренняя ошибка сервера';
        break;
      case Code.BAD_GETAWAY:
        error = 'Плохой шлюз';
        break;
      case Code.SERVICE_UNAVAILABLE:
        error = 'Сервис недоступен';
        break;
      default:
        error = 'Статус ответа: ' + status;
    }

    return error;
  };

  window.common = {
    ESC_KEY: ESC_KEY,
    PHOTOS_MAX: PHOTOS_MAX,

    photos: photos,

    getRandomNum: getRandomNum,
    setMessage: setMessage,

    imageUploadOverlay: imageUploadOverlay,
    imageUploadImg: imageUploadImg
  };
})();
