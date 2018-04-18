'use strict';

(function () {
  window.common = {
    closeWindow: function(el, func) {
      el.classList.add('hidden');
      document.removeEventListener('keydown', func);
    },
    ESC_KEY: 27,
    PHOTOS_MAX: 25,
    photos: [],
    getRandomNum: function (min, max) {
      var num = Math.floor(Math.random() * (max - min)) + min;
      return num;
    }
  };
})();
