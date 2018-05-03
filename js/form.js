'use strict';

(function () {
  var formElement = document.querySelector('#upload-select-image');

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

  var clearForm = function (close) {
    resizeControlValue.value = '100%';
    imageSlider.classList.add('hidden');
    scalePin.style.left = '100%';
    scaleLevel.style.width = '100%';
    scaleValue.value = '100';
    imagePreview.removeAttribute('style');
    imagePreview.removeAttribute('class');
    hashtagElement.value = '';
    hashtagElement.style = null;

    if (close) {
      parentEl.classList.add('hidden');
      uploadFile.value = '';
    }
  };

  var onUploadFileClick = function () {
    clearForm(false);
    parentEl.classList.remove('hidden');
    resizeControl.style.zIndex = 1;

    document.addEventListener('keydown', onUploadElementEscPress);
  };

  var onUploadCancelClick = function () {
    clearForm(true);

    document.removeEventListener('keydown', onUploadElementEscPress);
  };

  var onUploadElementEscPress = function (evt) {
    if (evt.keyCode === window.common.ESC_KEY && evt.target !== hashtagElement && evt.target !== commentsInput) {
      onUploadCancelClick();
    }
  };

  uploadFile.addEventListener('change', onUploadFileClick);
  uploadCancel.addEventListener('click', onUploadCancelClick);

  var onLoad = function () {
    clearForm(true);
  };

  var errorElement = document.querySelector('.img-upload__message--error');

  var onError = function (status) {
    var error = window.common.setMessage(status);

    errorElement.classList.remove('hidden');

    var errText = document.createTextNode(error);
    errorElement.replaceChild(errText, errorElement.firstChild);
  };

  var onSubmitClick = function (evt) {
    evt.preventDefault();

    window.backend.sendData(new FormData(formElement), onLoad, onError);
  };

  formElement.addEventListener('submit', onSubmitClick);
})();
