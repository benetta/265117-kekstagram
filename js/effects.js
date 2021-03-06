'use strict';

(function () {
  var SCALE_MAX = 100;

  var imagePreview = window.common.imageUploadImg;
  var imageUploadEffects = document.querySelector('.effects__list');
  var imageSlider = document.querySelector('.img-upload__scale');

  var scaleLine = document.querySelector('.scale__line');
  var scalePin = document.querySelector('.scale__pin');
  var scaleLevel = document.querySelector('.scale__level');
  var scaleValue = document.querySelector('.scale__value');

  var resizeControlValue = document.querySelector('.resize__control--value');

  var onEffectsRadioClick = function (evt) {
    var none = imageUploadEffects.querySelector('#effect-none');
    var chrome = imageUploadEffects.querySelector('#effect-chrome');
    var sepia = imageUploadEffects.querySelector('#effect-sepia');
    var marvin = imageUploadEffects.querySelector('#effect-marvin');
    var phobos = imageUploadEffects.querySelector('#effect-phobos');
    var heat = imageUploadEffects.querySelector('#effect-heat');

    var setEffect = function (eff) {
      var effects = ['chrome', 'sepia', 'marvin', 'phobos', 'heat'];

      if (eff) {
        imagePreview.className = '';
        imagePreview.style = 'null';

        // сбрасываю значения слайдера
        scalePin.style.left = '100%';
        scaleLevel.style.width = '100%';
        scaleValue.value = '100';
      }

      if (eff === 'none') {
        imageSlider.classList.add('hidden');
      } else if (effects.includes(eff)) {
        var effect = 'effects__preview--' + eff;
        imagePreview.classList.add(effect);

        // показываю слайдер
        imageSlider.classList.remove('hidden');
      }

      // возвращаю на место ресайз
      var resize = Number.parseInt(resizeControlValue.value, 10);
      imagePreview.style.transform = 'scale(' + (resize / 100) + ')';
    };

    switch (evt.target) {
      case none:
        setEffect('none');
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
      default:
        setEffect(false);
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

    var startX = evt.clientX;

    var scaleLineWidth = scaleLine.offsetWidth;
    var pinPosition = Number.parseInt(scalePin.style.left, 10);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftX = startX - moveEvt.clientX;

      var diff = shiftX / scaleLineWidth * SCALE_MAX;

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
