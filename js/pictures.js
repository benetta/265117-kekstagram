'use strict';

var LIKES_MIN = 15;
var LIKES_MAX = 200;
var PHOTOS_MAX = 25;

var AVATARS_MAX = 6;

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

var renderPhoto = function (photo) {
  var photoElement = picturesTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
  photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;

  return photoElement;
};

var fragment = document.createDocumentFragment();

for (var n = 0; n < PHOTOS_MAX; n++) {
  fragment.appendChild(renderPhoto(photos[n]));
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

// обработчики для фото
pictureLinks.forEach(function (picture, num) {
  picture.addEventListener('click', function () {
    bigPicture.classList.remove('hidden');

    bigPicture.querySelector('.big-picture__img img').src = photos[num].url;
    bigPicture.querySelector('.social__caption').textContent = photos[num].description;
    bigPicture.querySelector('.likes-count').textContent = photos[num].likes;
    bigPicture.querySelector('.comments-count').textContent = photos[num].comments.length;

    for (var j = commentsContainer.children.length; j > 0; j--) {
      commentsContainer.removeChild(commentsContainer.lastElementChild);
    }

    for (var k = 0; (k < photos[num].comments.length) && (k < 2); k++) {
      commentsContainer.appendChild(renderComment(k, num));
    }
  });
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

};

var onUploadCancelClick = function () {
  imageUploadElement.classList.add('hidden');
  uploadFile.value = '';
};

uploadFile.addEventListener('change', onUploadFileClick);
uploadCancel.addEventListener('click', onUploadCancelClick);

// /////////////////////////////////////////////////////////

var imageUploadEffects = imageUploadElement.querySelector('.effects__list');
var imageUploadImg = imageUploadElement.querySelector('.img-upload__preview img');
var imageSlider = imageUploadElement.querySelector('.img-upload__scale');

var onEffectsRadioClick = function (evt) {
  var none = imageUploadEffects.querySelector('#effect-none');
  var chrome = imageUploadEffects.querySelector('#effect-chrome');
  var sepia = imageUploadEffects.querySelector('#effect-sepia');
  var marvin = imageUploadEffects.querySelector('#effect-marvin');
  var phobos = imageUploadEffects.querySelector('#effect-phobos');
  var heat = imageUploadEffects.querySelector('#effect-heat');

  var setEffect = function (eff) {
    imageUploadImg.className = '';
    var effect = 'effects__preview--' + eff;
    imageUploadImg.classList.add(effect);
    imageSlider.classList.remove('hidden');
    resizeControl.style.zIndex = 1;
  };

  switch (evt.target) {
    case none:
      imageUploadImg.removeAttribute('class');
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
var resizeControlMinus = imageUploadElement.querySelector('.resize__control--minus');
var resizeControlValue = imageUploadElement.querySelector('.resize__control--value');
var resizeControlPlus = imageUploadElement.querySelector('.resize__control--plus');

var resizeImg = function (evt) {
  var scale;
  var currentValue = Number.parseInt(resizeControlValue.value, 10);

  if (evt.target === resizeControlMinus) {
    if (currentValue > 25) {
      currentValue -= 25;
    }
  } else if (evt.target === resizeControlPlus) {
    if (currentValue < 100) {
      currentValue += 25;
    }
  }

  scale = 'scale(0.' + currentValue + ')';

  resizeControlValue.value = (currentValue + '%');
  imageUploadImg.style.transform = scale;

  if (currentValue === 100) {
    imageUploadImg.style.transform = 'scale(1)';
  }
};

resizeControlMinus.addEventListener('click', resizeImg);
resizeControlPlus.addEventListener('click', resizeImg);

// /////////////////////////////////////////////////////////

var scalePin = imageUploadElement.querySelector('.scale__pin');
var scaleLevel = imageUploadElement.querySelector('.scale__level');
var scaleValue = imageUploadElement.querySelector('.scale__value');

// получаем положение пина (scalePin.style.left)

var setSaturation = function () {
  var pinPosition = Number.parseInt(scalePin.style.left, 10);
  scaleValue.value = pinPosition;

  var filterName = imageUploadImg.classList.value;
  filterName = filterName.split('--');
  filterName = filterName[1];

  var result;

  switch (filterName) {
    case 'chrome':
      result = 'grayscale(' + (pinPosition / 100) + ');';
      break;
    case 'sepia':
      result = 'sepia(' + (pinPosition / 100) + ');';
      break;
    case 'marvin':
      result = 'invert(' + pinPosition + '%);';
      break;
    case 'phobos':
      result = 'blur(' + (pinPosition * 3 / 100) + 'px);';
      break;
    case 'heat':
      result = 'brightness(' + ((pinPosition * 2 / 100) + 1) + ');';
      break;
  }

  // console.log(result);
  imageUploadImg.style.filter = result;
};

scalePin.addEventListener('mouseup', setSaturation);
