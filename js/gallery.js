'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var body = document.querySelector('body');

  var filtersContainer = document.querySelector('.img-filters');
  var filtersForm = document.querySelector('.img-filters__form');

  var onLoad = function (data) {
    window.common.photos = data;

    renderGallery(window.common.photos);
    window.common.renderPreviewListeners();
    filtersContainer.classList.remove('img-filters--inactive');
  };

  var onError = function (status) {
    var error = window.common.setMessage(status);

    var errorElement = document.createElement('div');
    errorElement.classList.add('error');
    errorElement.textContent = error;

    body.appendChild(errorElement);
  };

  // получаем данные
  window.backend.getData(onLoad, onError);

  // начинаем рендер
  var pictureList = document.querySelector('.pictures');
  var picturesTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

  var renderPhoto = function (num, arr) {
    var photoElement = picturesTemplate.cloneNode(true);

    var regexp = /[0-9]+/;
    var newId = arr[num].url.match(regexp);

    photoElement.querySelector('.picture__img').src = arr[num].url;
    photoElement.querySelector('.picture__stat--likes').textContent = arr[num].likes;
    photoElement.querySelector('.picture__stat--comments').textContent = arr[num].comments.length;
    photoElement.dataset.id = newId[0];

    return photoElement;
  };

  var fragment = document.createDocumentFragment();

  var renderGallery = function (arr) {
    for (var n = 0; n < window.common.PHOTOS_MAX; n++) {
      fragment.appendChild(renderPhoto(n, arr));
    }

    pictureList.appendChild(fragment);
    window.common.pictureLinks = document.querySelectorAll('.picture__link');
  };

  var sortPhotos = function (evt) {
    var typeOfFilter = evt.target.id;

    var photosCopy = Array.from(window.common.photos).slice(0, window.common.PHOTOS_MAX);

    var deletePhotos = function () {
      for (var i = window.common.photos.length; i > 0; i--) {
        pictureList.removeChild(pictureList.lastElementChild);
      }
    };

    var sortPopular = function () {
      photosCopy.sort(function (a, b) {
        if (a.likes < b.likes) {
          return 1;
        } else if (a.likes > b.likes) {
          return -1;
        }
        return 0;
      });
    };

    var sortDiscussed = function () {
      photosCopy.sort(function (a, b) {
        if (a.comments.length < b.comments.length) {
          return 1;
        } else if (a.comments.length > b.comments.length) {
          return -1;
        }
        return 0;
      });
    };

    var sortRandom = function () {
      for (var i = photosCopy.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = photosCopy[i];
        photosCopy[i] = photosCopy[j];
        photosCopy[j] = temp;
      }
    };

    switch (typeOfFilter) {
      case 'filter-random':
        sortRandom(photosCopy);
        break;
      case 'filter-discussed':
        sortDiscussed();
        break;
      case 'filter-popular':
        sortPopular();
        break;
      case 'filter-recommended':
        photosCopy = window.common.photos;
        break;
    }

    deletePhotos();
    renderGallery(photosCopy);
    window.common.renderPreviewListeners();
  };

  var lastTimeout;

  var onFiltersClick = function (evt) {
    var currentFilter = document.querySelector('.img-filters__button--active');

    evt.target.classList.add('img-filters__button--active');
    if (evt.target !== currentFilter) {
      currentFilter.classList.remove('img-filters__button--active');
    }

    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(function () {
      sortPhotos(evt);
    }, DEBOUNCE_INTERVAL);
  };

  filtersForm.addEventListener('click', onFiltersClick);
})();
