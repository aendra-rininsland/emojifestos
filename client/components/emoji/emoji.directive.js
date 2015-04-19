'use strict';

// Thanks to: http://crocodillon.com/blog/parsing-emoji-unicode-in-javascript
angular.module('emojifestosApp')
  .directive('emoji', function () {
    return {
      // templateUrl: 'components/emoji/emoji.html',
      restrict: 'EA',
      require: 'ngModel',
      link: function (scope, element, attrs, ctrl) {
        ctrl.$validators.emoji = function(modelValue, viewValue) {
          var ranges = /^(\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff])+$/
          var EMOJI_REGEXP = new RegExp(ranges.join('|'), 'g');
          
          if (ctrl.$isEmpty(modelValue)) {
            // consider empty models to be valid
            return true;
          }

          if (EMOJI_REGEXP.test(viewValue)) {
            // it is valid
            return true;
          }

          // it is invalid
          return false;
        };
      }
    };
  });
