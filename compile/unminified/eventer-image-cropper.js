/*!
 * Wrapper for Image Cropper v0.0.1
 * https://maesens.by/
 *
 * Copyright (c) 2016 Val Grom
 * License: MIT
 *
 * Generated at Sunday, January 3rd, 2016, 11:36:29 PM
 */
(function() {
'use strict';

angular.module('eImageCropper', ['ngImgCrop'])
  .directive('eImageCropper', function () {
    return {
      restrict: 'E',
      scope: {
        resultImage: '=',
        typeCropper: '@',
        templateUrl: '=',
        cropSize: '='
      },
      templateUrl: function (elem, attrs) {
        return attrs.templateUrl;
      },
      controller: ['$scope', function ($scope) {
        var default_crop_size = {w: 200, h: 200};
        $scope.type_cropper = $scope.typeCropper ? $scope.typeCropper : 'square';
        if ($scope.type_cropper == 'rectangle') {
          default_crop_size = [{w: 200, h: 200}, {w: 200, h: 200}];
        }
        $scope.crop_size = $scope.cropSize ? $scope.cropSize : default_crop_size;

        $scope.data_image = '';
        $scope.result_data_image = '';
        $scope.res_blob = {};
        $scope.url_blob = {};
        $scope.image_format = 'image/png';
        $scope.image_quality = 1;
        $scope.min_size = 100;
        var handleFileSelect = function (evt) {

          var file = evt.currentTarget.files[0],
            reader = new FileReader();
          if (navigator.userAgent.match(/iP(hone|od|ad)/i)) {
            var canvas = document.createElement('canvas'),
              mpImg = new MegaPixImage(file);

            canvas.width = mpImg.srcImage.width;
            canvas.height = mpImg.srcImage.height;

            EXIF.getData(file, function () {
              var orientation = EXIF.getTag(this, 'Orientation');

              mpImg.render(canvas, {
                maxHeight: $scope.resImgSize,
                orientation: orientation
              });
              setTimeout(function () {
                var tt = canvas.toDataURL("image/jpeg", 1);
                $scope.$apply(function ($scope) {
                  $scope.imageDataURI = tt;

                });
              }, 100);
            });
          } else {
            reader.onload = function (evt) {
              $scope.$apply(function ($scope) {
                $scope.imageDataURI = evt.target.result;
              });
            };
            reader.readAsDataURL(file);
          }

        };
        angular.element(document.querySelector('#fileInputImage')).on('change', handleFileSelect);
        $scope.$watch('result_data_image', function () {
          if ($scope.result_data_image != '') {
            $scope.resultImage = $scope.result_data_image;
          }

        });

      }],

    };
  });
}());