'use strict';

var LIKES_MIN = 15;
var LIKES_MAX = 200;
var PHOTOS_MAX = 25;

var AVATARS_MAX = 6;

var RESIZE_STEP = 25;
var RESIZE_MIN = 25;
var RESIZE_MAX = 100;

var SLIDER_WIDTH = 495;
var SCALE_MAX = 100;

var HASHTAGS_MAX_NUM = 5;
var HASHTAG_MAX_LENGTH = 20;

var photos = [];

var COMMENTS = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var DESCRIPTION = ['Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'];

/**
 * конструктор объекта фотографии
 * @param  {number} n текущий номер объекта
 */
var Photo = function (n) {
  this.url = 'photos/' + (n + 1) + '.jpg';
  this.likes = getRandomNum(LIKES_MIN, LIKES_MAX);
  this.comments = generateComment(getRandomNum(1, COMMENTS.length));
  this.description = DESCRIPTION[getRandomNum(0, DESCRIPTION.length)];
};

/**
 * получаем случайное число
 * @param  {number} min минимальное число
 * @param  {number} max максимальное число
 * @return {number}     случайное число
 */
var getRandomNum = function (min, max) {
  var num = Math.floor(Math.random() * (max - min)) + min;
  return num;
};

/**
 * создаем массив с комментариями
 * @param  {number} n количество комментариев
 * @return {array}   массив с комментариями
 */
var generateComment = function (n) {
  var comments = [];
  var commentsCopy = COMMENTS.slice();

  for (var i = 0; i < n; i++) {
    var a = getRandomNum(0, commentsCopy.length);
    comments.push(commentsCopy[a]);
    commentsCopy.splice(a, 1);
  }

  return comments;
};

for (var i = 0; i < PHOTOS_MAX; i++) {
  photos.push(new Photo(i));
}

var pictureList = document.querySelector('.pictures');
var picturesTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

var renderPhoto = function (num) {
  var photoElement = picturesTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photos[num].url;
  photoElement.querySelector('.picture__stat--likes').textContent = photos[num].likes;
  photoElement.querySelector('.picture__stat--comments').textContent = photos[num].comments.length;
  photoElement.querySelector('.picture__img').dataset.id = num;

  return photoElement;
};

var fragment = document.createDocumentFragment();

for (var n = 0; n < PHOTOS_MAX; n++) {
  fragment.appendChild(renderPhoto(n));
}

pictureList.appendChild(fragment);

// большое фото
var bigPicture = document.querySelector('.big-picture');
var pictureLinks = document.querySelectorAll('.picture__link');
var bigPictureClose = bigPicture.querySelector('#picture-cancel');

// прячем блоки
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');

// комментарий
var commentsContainer = document.querySelector('.social__comments');

/**
 * генерируем комментарий к большому фото
 * @param  {num} l номер комментария
 * @param  {m} m номер фото
 * @return {element}   элемент разметки с комментарием
 */
var renderComment = function (l, m) {
  var commentElement = document.createElement('li');
  commentElement.classList.add('social__comment', 'social__comment--text');

  var imgElement = document.createElement('img');
  imgElement.classList.add('social__picture');
  imgElement.src = 'img/avatar-' + getRandomNum(1, (AVATARS_MAX + 1)) + '.svg';
  imgElement.alt = 'Аватар комментатора фотографии';
  imgElement.width = '35';
  imgElement.height = '35';
  commentElement.appendChild(imgElement);

  var textElement = document.createTextNode(photos[m].comments[l]);
  commentElement.appendChild(textElement);

  return commentElement;
};

var onPhotoClick = function (evt) {
  var photoId = evt.target.dataset.id;

  bigPicture.classList.remove('hidden');

  bigPicture.querySelector('.big-picture__img img').src = photos[photoId].url;
  bigPicture.querySelector('.social__caption').textContent = photos[photoId].description;
  bigPicture.querySelector('.likes-count').textContent = photos[photoId].likes;
  bigPicture.querySelector('.comments-count').textContent = photos[photoId].comments.length;

  for (var j = commentsContainer.children.length; j > 0; j--) {
    commentsContainer.removeChild(commentsContainer.lastElementChild);
  }

  for (var k = 0; (k < photos[photoId].comments.length) && (k < 2); k++) {
    commentsContainer.appendChild(renderComment(k, photoId));
  }
};

// обработчики для фото
pictureLinks.forEach(function (picture) {
  picture.addEventListener('click', onPhotoClick);
});

bigPictureClose.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
});

// /////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////

var uploadFile = document.querySelector('#upload-file');
var uploadCancel = document.querySelector('#upload-cancel');
var imageUploadElement = document.querySelector('.img-upload__overlay');

var onUploadFileClick = function () {
  imageUploadElement.classList.remove('hidden');
  resizeControlValue.value = '100%';
  imageSlider.classList.add('hidden');
  scalePin.style.left = '100%';
  scaleLevel.style.width = '100%';
  scaleValue.value = '100';
  resizeControl.style.zIndex = 1;
};

var onUploadCancelClick = function () {
  imageUploadElement.classList.add('hidden');
  imageUploadImg.removeAttribute('style');
  imageUploadImg.removeAttribute('class');
  uploadFile.value = '';
};

uploadFile.addEventListener('change', onUploadFileClick);
uploadCancel.addEventListener('click', onUploadCancelClick);

// /////////////////////////////////////////////////////////

var imageUploadEffects = imageUploadElement.querySelector('.effects__list');
var imageUploadImg = imageUploadElement.querySelector('.img-upload__preview img');
var imageSlider = imageUploadElement.querySelector('.img-upload__scale');

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

var resizeControl = imageUploadElement.querySelector('.resize');
var resizeControlValue = imageUploadElement.querySelector('.resize__control--value');
var resizeControlMinus = imageUploadElement.querySelector('.resize__control--minus');
var resizeControlPlus = imageUploadElement.querySelector('.resize__control--plus');

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

var scalePin = imageUploadElement.querySelector('.scale__pin');
var scaleLevel = imageUploadElement.querySelector('.scale__level');
var scaleValue = imageUploadElement.querySelector('.scale__value');

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

var hashtagElement = imageUploadElement.querySelector('.text__hashtags');

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
