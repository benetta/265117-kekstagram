'use strict';

(function () {
  var RESIZE_STEP = 25;
  var RESIZE_MIN = 25;
  var RESIZE_MAX = 100;

  var SLIDER_WIDTH = 495;
  var SCALE_MAX = 100;

  var HASHTAGS_MAX_NUM = 5;
  var HASHTAG_MAX_LENGTH = 20;

  var uploadFile = document.querySelector('#upload-file');
  var uploadCancel = document.querySelector('#upload-cancel');
  var imageUploadElement = document.querySelector('.img-upload__overlay');
  var commentsInput = imageUploadElement.querySelector('.text__description');

  var resizeControl = imageUploadElement.querySelector('.resize');
  var resizeControlValue = imageUploadElement.querySelector('.resize__control--value');
  var resizeControlMinus = imageUploadElement.querySelector('.resize__control--minus');
  var resizeControlPlus = imageUploadElement.querySelector('.resize__control--plus');

  var imageUploadEffects = imageUploadElement.querySelector('.effects__list');
  var imageUploadImg = imageUploadElement.querySelector('.img-upload__preview img');
  var imageSlider = imageUploadElement.querySelector('.img-upload__scale');

  var scalePin = imageUploadElement.querySelector('.scale__pin');
  var scaleLevel = imageUploadElement.querySelector('.scale__level');
  var scaleValue = imageUploadElement.querySelector('.scale__value');
  var hashtagElement = imageUploadElement.querySelector('.text__hashtags');

  var onUploadFileClick = function () {
    imageUploadElement.classList.remove('hidden');
    resizeControlValue.value = '100%';
    imageSlider.classList.add('hidden');
    scalePin.style.left = '100%';
    scaleLevel.style.width = '100%';
    scaleValue.value = '100';
    resizeControl.style.zIndex = 1;

    document.addEventListener('keydown', onUploadElementEscPress)
  };

  var onUploadCancelClick = function () {
    imageUploadElement.classList.add('hidden');
    imageUploadImg.removeAttribute('style');
    imageUploadImg.removeAttribute('class');
    uploadFile.value = '';

    document.removeEventListener('keydown', onUploadElementEscPress);
  };

  var onUploadElementEscPress = function(evt) {
    if (evt.keyCode === window.common.ESC_KEY && evt.target !== hashtagElement && evt.target !== commentsInput) {
      window.common.closeWindow(imageUploadElement, onUploadElementEscPress);
    }
  }

  uploadFile.addEventListener('change', onUploadFileClick);
  uploadCancel.addEventListener('click', onUploadCancelClick);

  // /////////////////////////////////////////////////////////

  var onEffectsRadioClick = function (evt) {
    // сбрасываю класс и стиль
    imageUploadImg.className = '';
    imageUploadImg.style = 'null';

    // возвращаю на место ресайз
    var resize = Number.parseInt(resizeControlValue.value, 10);
    imageUploadImg.style.transform = 'scale(' + (resize / 100) + ')';

    var none = imageUploadEffects.querySelector('#effect-none');
    var chrome = imageUploadEffects.querySelector('#effect-chrome');
    var sepia = imageUploadEffects.querySelector('#effect-sepia');
    var marvin = imageUploadEffects.querySelector('#effect-marvin');
    var phobos = imageUploadEffects.querySelector('#effect-phobos');
    var heat = imageUploadEffects.querySelector('#effect-heat');

    var setEffect = function (eff) {
      // задаю новый класс
      var effect = 'effects__preview--' + eff;
      imageUploadImg.classList.add(effect);

      // показываю слайдер
      imageSlider.classList.remove('hidden');

      // сбрасываю значения слайдера
      scalePin.style.left = '100%';
      scaleLevel.style.width = '100%';
      scaleValue.value = '100';
    };

    switch (evt.target) {
      case none:
        imageSlider.classList.add('hidden');
        break;
      case chrome:
        setEffect('chrome');
        break;
      case sepia:
        setEffect('sepia');
        break;
      case marvin:
        setEffect('marvin');
        break;
      case phobos:
        setEffect('phobos');
        break;
      case heat:
        setEffect('heat');
        break;
    }

  };

  imageUploadEffects.addEventListener('click', onEffectsRadioClick);

  // /////////////////////////////////////////////////////////

  var onResizeControlClick = function (evt) {
    var scale;
    var currentValue = Number.parseInt(resizeControlValue.value, 10);

    if (evt.target === resizeControlMinus) {
      if (currentValue > RESIZE_MIN) {
        currentValue -= RESIZE_STEP;
      }
    } else if (evt.target === resizeControlPlus) {
      if (currentValue < RESIZE_MAX) {
        currentValue += RESIZE_STEP;
      }
    }

    scale = 'scale(' + (currentValue / 100) + ')';
    imageUploadImg.style.transform = scale;

    resizeControlValue.value = (currentValue + '%');
  };

  resizeControlMinus.addEventListener('click', onResizeControlClick);
  resizeControlPlus.addEventListener('click', onResizeControlClick);

  // /////////////////////////////////////////////////////////

  var setSaturation = function (position) {
    var filterName = imageUploadImg.classList.value;
    filterName = filterName.split('--');
    filterName = filterName[1];

    var result;

    switch (filterName) {
      case 'chrome':
        result = 'grayscale(' + (position / 100) + ')';
        break;
      case 'sepia':
        result = 'sepia(' + (position / 100) + ')';
        break;
      case 'marvin':
        result = 'invert(' + position + '%)';
        break;
      case 'phobos':
        result = 'blur(' + (position * 3 / 100) + 'px)';
        break;
      case 'heat':
        result = 'brightness(' + ((position * 2 / 100) + 1) + ')';
        break;
    }

    imageUploadImg.style.filter = result;
    scaleValue.value = position;
  };

  var onScalePinMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var pinPosition = Number.parseInt(scalePin.style.left, 10);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      var diff = shift.x / SLIDER_WIDTH * SCALE_MAX;

      diff = (pinPosition - Math.round(diff));

      if (diff < 0) {
        diff = 0;
      } else if (diff > SCALE_MAX) {
        diff = SCALE_MAX;
      }

      scalePin.style.left = diff + '%';
      scaleLevel.style.width = diff + '%';

      setSaturation(diff);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  scalePin.addEventListener('mousedown', onScalePinMouseDown);

  // /////////////////////////////////////////////////////////

  var checkHashtagValidity = function (evt) {
    evt.preventDefault();

    var hashtagArr = hashtagElement.value.trim().toLowerCase().split(' ');

    var constraints = {
      startsWithHash: 'хэш-тег начинается с символа # (решётка)',
      cantBeOnlyHash: 'хеш-тег не может состоять только из одной решётки',
      spaceSeparated: 'хэш-теги разделяются пробелами',
      cantUseTwice: 'один и тот же хэш-тег не может быть использован дважды',
      noMoreThanFive: 'нельзя указать больше пяти хэш-тегов',
      maxLength: 'максимальная длина одного хэш-тега 20 символов'
    };

    var doublesNum = 0;
    for (var a = 0; a < hashtagArr.length; a++) {
      var double = hashtagArr[a];
      for (var b = a + 1; b < hashtagArr.length; b++) {
        if (double === hashtagArr[b]) {
          double = hashtagArr[b];
          doublesNum++;
        }
      }
    }

    if (hashtagArr.length > HASHTAGS_MAX_NUM) {
      hashtagElement.setCustomValidity(constraints.noMoreThanFive);
    } else {
      hashtagArr.forEach(function (tag) {
        if (tag.charAt(0) !== '#') {
          hashtagElement.setCustomValidity(constraints.startsWithHash);
        } else if (tag === '#') {
          hashtagElement.setCustomValidity(constraints.cantBeOnlyHash);
        } else if (tag.includes('#', 1)) {
          hashtagElement.setCustomValidity(constraints.spaceSeparated);
        } else if (tag.length > HASHTAG_MAX_LENGTH) {
          hashtagElement.setCustomValidity(constraints.maxLength);
        } else if (doublesNum > 0) {
          hashtagElement.setCustomValidity(constraints.cantUseTwice);
        } else {
          hashtagElement.setCustomValidity('');
        }
      });
    }
  };

  hashtagElement.addEventListener('input', checkHashtagValidity);
})();
