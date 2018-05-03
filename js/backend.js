'use strict';

(function () {
  var TIMEOUT = 5000;
  var GET_URL = 'https://js.dump.academy/kekstagram/data';
  var POST_URL = 'https://js.dump.academy/kekstagram';

  var Code = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL: 500,
    BAD_GETAWAY: 502,
    SERVICE_UNAVAILABLE: 503
  };

  // получаем данные с сервера
  var getData = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case Code.SUCCESS:
          onLoad(xhr.response);
          break;
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
          error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', GET_URL);
    xhr.send();
  };

  var sendData = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case Code.SUCCESS:
          onLoad(xhr.response);
          break;
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
          error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('POST', POST_URL);
    xhr.send(data);
  };

  window.backend = {
    getData: getData,
    sendData: sendData
  };
})();
