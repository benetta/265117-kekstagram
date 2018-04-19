'use strict';

(function () {
  var LIKES_MIN = 15;
  var LIKES_MAX = 200;

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
    this.likes = window.common.getRandomNum(LIKES_MIN, LIKES_MAX);
    this.comments = generateComment(window.common.getRandomNum(1, COMMENTS.length));
    this.description = DESCRIPTION[window.common.getRandomNum(0, DESCRIPTION.length)];
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
      var a = window.common.getRandomNum(0, commentsCopy.length);
      comments.push(commentsCopy[a]);
      commentsCopy.splice(a, 1);
    }

    return comments;
  };

  for (var i = 0; i < window.common.PHOTOS_MAX; i++) {
    window.common.photos.push(new Photo(i));
  }
})();
