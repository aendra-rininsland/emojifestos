'use strict';

angular.module('emojifestosApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('manifesto', {
        url: '/manifesto/:party',
        templateUrl: 'app/manifesto/manifesto.html',
        controller: 'ManifestoCtrl'
      });
  });
