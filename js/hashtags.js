'use strict';

(function () {
  var HASHTAGS_MAX_NUM = 5;
  var HASHTAG_MAX_LENGTH = 20;

  var hashtagElement = document.querySelector('.text__hashtags');

  var checkHashtagValidity = function () {
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

    var message = '';

    if (hashtagArr.length > HASHTAGS_MAX_NUM) {
      message = constraints.noMoreThanFive;
    } else {
      hashtagArr.forEach(function (tag) {
        if (hashtagArr.length === 1 && tag === '') {
          message = '';
        } else if (tag.charAt(0) !== '#') {
          message = constraints.startsWithHash;
        } else if (tag === '#') {
          message = constraints.cantBeOnlyHash;
        } else if (tag.includes('#', 1)) {
          message = constraints.spaceSeparated;
        } else if (tag.length > HASHTAG_MAX_LENGTH) {
          message = constraints.maxLength;
        } else if (doublesNum > 0) {
          message = constraints.cantUseTwice;
        }
      });
    }

    return message;
  };

  hashtagElement.addEventListener('input', function () {
    var message = checkHashtagValidity();

    if (message !== '') {
      hashtagElement.setCustomValidity(message);
      hashtagElement.style.border = '1px solid red';
    } else {
      hashtagElement.setCustomValidity(message);
      hashtagElement.style = null;
    }
  });
})();
