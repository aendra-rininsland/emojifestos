'use strict';

angular.module('emojifestosApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('translation', {
        url: '/translation/:id',
        templateUrl: 'app/translation/translation.html',
        controller: 'TranslationCtrl'
      });
  });