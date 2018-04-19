'use strict';

(function () {
  var RESIZE_STEP = 25;
  var RESIZE_MIN = 25;
  var RESIZE_MAX = 100;

  var resizeControlValue = document.querySelector('.resize__control--value');
  var resizeControlMinus = document.querySelector('.resize__control--minus');
  var resizeControlPlus = document.querySelector('.resize__control--plus');

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
    window.common.imageUploadImg.style.transform = scale;

    resizeControlValue.value = (currentValue + '%');
  };

  resizeControlMinus.addEventListener('click', onResizeControlClick);
  resizeControlPlus.addEventListener('click', onResizeControlClick);
})();
