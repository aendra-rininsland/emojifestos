'use strict';

angular.module('emojifestosApp')
  .factory('Translation', function ($resource) {
    return $resource('/api/translations/:id/:controller', {
      id: '@_id'
    },
    {
      submit: {
        method: 'POST',
        params: {
          // controller: 'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
