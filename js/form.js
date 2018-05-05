'use strict';

(function () {
  var FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

  var formElement = document.querySelector('#upload-select-image');

  var parentEl = window.common.imageUploadElement;
  var imagePreview = window.common.imageUploadImg;

  var uploadFile = document.querySelector('#upload-file');
  var uploadCancel = document.querySelector('#upload-cancel');

  var inputOriginal = document.querySelector('#effect-none');

  var hashtagElement = document.querySelector('.text__hashtags');
  var commentsInput = parentEl.querySelector('.text__description');

  var resizeControl = parentEl.querySelector('.resize');
  var resizeControlValue = parentEl.querySelector('.resize__control--value');

  var imageSlider = parentEl.querySelector('.img-upload__scale');

  var scalePin = parentEl.querySelector('.scale__pin');
  var scaleLevel = parentEl.querySelector('.scale__level');
  var scaleValue = parentEl.querySelector('.scale__value');

  var clearForm = function () {
    imagePreview.removeAttribute('style');
    imagePreview.removeAttribute('class');
    imagePreview.src = 'img/upload-default-image.jpg';

    resizeControlValue.value = '100%';

    imageSlider.classList.add('hidden');
    scalePin.style.left = '100%';
    scaleLevel.style.width = '100%';
    scaleValue.value = '100';

    inputOriginal.checked = 'true';

    hashtagElement.style = null;
    hashtagElement.value = '';

    commentsInput.value = '';

    uploadFile.removeAttribute('value');
    parentEl.classList.add('hidden');
  };

  var onUploadFileClick = function () {
    imageSlider.classList.add('hidden');
    parentEl.classList.remove('hidden');
    resizeControl.style.zIndex = 1;

    document.addEventListener('keydown', onUploadElementEscPress);

    var file = uploadFile.files[0];

    var isMatch = FILE_TYPES.some(function () {
      return file.type;
    });

    if (isMatch) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imagePreview.src = reader.result;
        imagePreview.width = '586';
        imagePreview.removeAttribute('height');
      });

      reader.readAsDataURL(file);
    }
  };

  var onUploadCancelClick = function () {
    clearForm();

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
    clearForm();
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
