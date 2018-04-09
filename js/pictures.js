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
'Вот это тачка!']

/**
 * конструктор объекта фотографии
 */
var Photo = function(n) {
  this.url = 'photos/' + (n + 1) + '.jpg';
  this.likes = getRandomNum(LIKES_MIN, LIKES_MAX);
  this.comments = generateComment(getRandomNum(1, COMMENTS.length));
  this.description =DESCRIPTION[getRandomNum(0, DESCRIPTION.length)];
};

/**
 * получаем случайное число
 * @param  {number} min минимальное число
 * @param  {number} max максимальное число
 * @return {number}     случайное число
 */
var getRandomNum = function(min, max) {
  var num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

/**
 * создаем массив с комментариями
 * @param  {number} n количество комментариев
 * @return {array}   массив с комментариями
 */
var generateComment = function(n) {
  var comments = [];

  for (var i = 0; i < n; i++) {
    comments.push(COMMENTS[getRandomNum(0, COMMENTS.length)]);
  }

  return comments;
}

for(var i = 0; i < PHOTOS_MAX; i++) {
  photos.push(new Photo(i));
}

var pictureList = document.querySelector('.pictures');
var picturesTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

var renderPhoto = function(photo){
  var photoElement = picturesTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
  photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;

  return photoElement;
};

var fragment = document.createDocumentFragment();

for(var n = 0; n < PHOTOS_MAX; n++) {
  fragment.appendChild(renderPhoto(photos[n]));
}

pictureList.appendChild(fragment);

// большое фото
var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

bigPicture.querySelector('.big-picture__img img').src = photos[0].url;
bigPicture.querySelector('.likes-count').textContent = photos[0].likes;
bigPicture.querySelector('.comments-count').textContent = photos[0].comments.length;


// комментарии
var commentsContainer = document.querySelector('.social__comments');

if(photos[0].comments[1] === undefined) {
  commentsContainer.removeChild(commentsContainer.lastElementChild);
}

var userComments = commentsContainer.children;

for(var i = 0; i < userComments.length; i++) {
  userComments[i].src = 'img/avatar-' + getRandomNum(1, (AVATARS_MAX + 1)) + '.svg';
  userComments[i].childNodes[2].data = photos[0].comments[i];
}

// прячем блоки
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
