'use strict';

(function () {
  var parentEl = window.common.imageUploadElement;
  var imagePreview = window.common.imageUploadImg;

  var uploadFile = document.querySelector('#upload-file');
  var uploadCancel = document.querySelector('#upload-cancel');
  var hashtagElement = document.querySelector('.text__hashtags');
  var commentsInput = parentEl.querySelector('.text__description');

  var resizeControl = parentEl.querySelector('.resize');
  var resizeControlValue = parentEl.querySelector('.resize__control--value');

  var imageSlider = parentEl.querySelector('.img-upload__scale');

  var scalePin = parentEl.querySelector('.scale__pin');
  var scaleLevel = parentEl.querySelector('.scale__level');
  var scaleValue = parentEl.querySelector('.scale__value');

  var onUploadFileClick = function () {
    parentEl.classList.remove('hidden');
    resizeControlValue.value = '100%';
    imageSlider.classList.add('hidden');
    scalePin.style.left = '100%';
    scaleLevel.style.width = '100%';
    scaleValue.value = '100';
    resizeControl.style.zIndex = 1;

    document.addEventListener('keydown', onUploadElementEscPress);
  };

  var onUploadCancelClick = function () {
    parentEl.classList.add('hidden');
    imagePreview.removeAttribute('style');
    imagePreview.removeAttribute('class');
    uploadFile.value = '';

    document.removeEventListener('keydown', onUploadElementEscPress);
  };

  var onUploadElementEscPress = function (evt) {
    if (evt.keyCode === window.common.ESC_KEY && evt.target !== hashtagElement && evt.target !== commentsInput) {
      onUploadCancelClick();
    }
  };

  uploadFile.addEventListener('change', onUploadFileClick);
  uploadCancel.addEventListener('click', onUploadCancelClick);
})();
