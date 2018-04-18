'use strict';

(function (){
  var SLIDER_WIDTH = 495;
  var SCALE_MAX = 100;

  var imageEl = window.common.imageUploadElement;
  var imagePreview = window.common.imageUploadImg;
  var imageUploadEffects = imageEl.querySelector('.effects__list');
  var imageSlider = imageEl.querySelector('.img-upload__scale');

  var scalePin = imageEl.querySelector('.scale__pin');
  var scaleLevel = imageEl.querySelector('.scale__level');
  var scaleValue = imageEl.querySelector('.scale__value');

  var resizeControlValue = imageEl.querySelector('.resize__control--value');

  var onEffectsRadioClick = function (evt) {
    // сбрасываю класс и стиль
    imagePreview.className = '';
    imagePreview.style = 'null';

    // возвращаю на место ресайз
    var resize = Number.parseInt(resizeControlValue.value, 10);
    imagePreview.style.transform = 'scale(' + (resize / 100) + ')';

    var none = imageUploadEffects.querySelector('#effect-none');
    var chrome = imageUploadEffects.querySelector('#effect-chrome');
    var sepia = imageUploadEffects.querySelector('#effect-sepia');
    var marvin = imageUploadEffects.querySelector('#effect-marvin');
    var phobos = imageUploadEffects.querySelector('#effect-phobos');
    var heat = imageUploadEffects.querySelector('#effect-heat');

    var setEffect = function (eff) {
      // задаю новый класс
      var effect = 'effects__preview--' + eff;
      imagePreview.classList.add(effect);

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

  var setSaturation = function (position) {
    var filterName = imagePreview.classList.value;
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

    imagePreview.style.filter = result;
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
  })();
