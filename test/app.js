'use strict';
angular.module('app', ['ngImgCrop', 'eImageCropper'])
  .controller('Ctrl', function ($scope) {
    $scope.result = '';
  });