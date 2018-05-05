'use strict';

(function () {
  var FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

  var form = document.querySelector('#upload-select-image');

  var parentSection = window.common.imageUploadOverlay;
  var imagePreview = window.common.imageUploadImg;

  var uploadFile = document.querySelector('#upload-file');
  var uploadCancel = document.querySelector('#upload-cancel');

  var inputOriginal = document.querySelector('#effect-none');

  var hashtagInput = document.querySelector('.text__hashtags');
  var commentsInput = parentSection.querySelector('.text__description');

  var resizeControl = parentSection.querySelector('.resize');
  var resizeControlValue = parentSection.querySelector('.resize__control--value');

  var imageSlider = parentSection.querySelector('.img-upload__scale');

  var scalePin = parentSection.querySelector('.scale__pin');
  var scaleLevel = parentSection.querySelector('.scale__level');
  var scaleValue = parentSection.querySelector('.scale__value');

  var clearForm = function () {
    parentSection.classList.add('hidden');
    imagePreview.removeAttribute('style');
    imagePreview.removeAttribute('class');
    imagePreview.src = '#';

    imageSlider.classList.add('hidden');
    scalePin.style.left = '100%';
    scaleLevel.style.width = '100%';

    form.reset();
  };

  var onUploadFileClick = function () {
    imageSlider.classList.add('hidden');
    parentSection.classList.remove('hidden');
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
    if (evt.keyCode === window.common.ESC_KEY && evt.target !== hashtagInput && evt.target !== commentsInput) {
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

    window.backend.sendData(new FormData(form), onLoad, onError);
  };

  form.addEventListener('submit', onSubmitClick);
})();
