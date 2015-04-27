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
          // Ranges via: http://apps.timwhitlock.info/emoji/tables/unicode
          var ranges = [
            '\ud83d[\ude01-\ude4f]',  // 1. Emoticons ( 1F601 - 1F64F )
            '[\u2702-\u27b0]',  // 2. Dingbats ( 2702 - 27B0 )
            '\ud83d[\ude80-\udec0]',  // 3. Transport and map symbols ( 1F680 - 1F6C0 ) 
            '\ud83c[\udd70-\ude51]',  // 4. Enclosed characters ( 1F170 - 1F251 )
            '[\u00A9-\u00AE]',  // 5. Uncategorized
            '[\u203C-\u2049]',
            '[\u0030-\u0039]',
            '[\u2122-\u21aa]',
            '[\u231A-\u23F3]',
            '[\u25AA-\u25FE]',
            '[\u2600-\u26FD]',
            '[\u2934-\u2935]',
            '[\u2B05-\u2B55]',
            '[\u3030-\u303D]',
            '[\u3297-\u3299]',
            '\ud83c[\udc04-\udff0]',
            '\ud83d[\udc0c-\uddff]',
            '\ud83d[\ude00-\ude36]',  // 6a. Additional emoticons ( 1F600 - 1F636 )
            '\ud83d[\ude81-\udec5]',  // 6b. Additional transport and map symbols ( 1F681 - 1F6C5 )
            '\ud83c[\udf0d-\udfe4]',  // 6c. Other additional symbols ( 1F30D - 1F567 )
            '\ud83d[\udc00-\udd67]'
          ];
          console.log(ranges.join('|'))
          var EMOJI_REGEXP = new RegExp('^(?:' + ranges.join('|') + ')+$', 'g');
          console.log(EMOJI_REGEXP);
          
          if (ctrl.$isEmpty(modelValue)) {
            // consider empty models to be valid
            return true;
          }

          if (EMOJI_REGEXP.test(viewValue)) {
            // it is valid
            return true;
          }

          // it is invalid
          modelValue = modelValue.substring(0, modelValue.length - 1);
          return false;
        };
        
        // element.bind('keyup', function(e){
        //   console.log(e.which);
        //   var allowed = [37, 38, 39, 40, 32];
        //   var isValid = ctrl.$validators.emoji(e.which, e.which);
        //   if (allowed.indexOf(e.which) === -1 && !isValid) {
        //     $scope
        //   }
        //   
        // });
      }
    };
  });
