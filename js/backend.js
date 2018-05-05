'use strict';

(function () {
  var TIMEOUT = 10000;
  var GET_URL = 'https://js.dump.academy/kekstagram/data';
  var POST_URL = 'https://js.dump.academy/kekstagram';
  var SUCCESS = 200;


  var createRequest = function (type, url, data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      if (xhr.status === SUCCESS) {
        if (!data) {
          onLoad(xhr.response);
        } else {
          onLoad();
        }
      } else {
        onError(xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open(type, url);

    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  var getData = function (onLoad, onError) {
    createRequest('GET', GET_URL, false, onLoad, onError);
  };

  var sendData = function (data, onLoad, onError) {
    createRequest('POST', POST_URL, data, onLoad, onError);
  };

  window.backend = {
    getData: getData,
    sendData: sendData
  };
})();
