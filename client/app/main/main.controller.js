'use strict';

angular.module('emojifestosApp')
  .controller('MainCtrl', function ($scope, $http, Auth, $sce, $window, Translation, $state) {
    $scope.isOSX = function(){
      return navigator.platform.indexOf('Mac') > -1;
    };
    
    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
    
    $scope.submitTranslation = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        var submit = function(translation, party, section, key, text, callback) {
          var cb = callback || angular.noop;
          return Translation.submit({}, {
            translation: translation,
            text: text,
            party: party,
            section: section,
            key: key,
            user: Auth.getCurrentUser()
          }, function(res) {
            console.dir(res);
            return cb(res);
          }, function(err) {
            console.dir(err);
            return cb(err);
          }).$promise;
        };
        
        submit($scope.userTranslation, $scope.chosenParty, $scope.chosenSection, $scope.pieceKey, $scope.chosenManifesto)
        .then( function(res) {
          console.dir('succcess');
          $scope.message = 'Translation successfully submitted.';
          $state.go('translation', {id: res._id});
        })
        .catch( function() {
          console.dir('mong error');
          form.submission.$setValidity('mongoose', false);
          $scope.errors.other = 'Problem submitting.';
          $scope.message = '';
        });
      }
    };
    
    $scope.isLoggedIn = Auth.isLoggedIn;
    
    
    var getKey = function(obj) {
      var keys = Object.keys(obj);
      var key = keys[Math.floor(Math.random()*keys.length)];
      var item = obj[key];
      return item.trim().match(/:$/) === null ? key : getKey(obj);
    };
    
    $http.get('/api/manifestos').success(function(res){
      $scope.chosenParty = res.name;
      $scope.chosenSection = res.section;
      var keys = Object.keys(res.data);
      $scope.pieceKey = getKey(res.data);
      var listCheck = $scope.pieceKey.match(/^(?:u|o)l_(\d)$/);
      if ( listCheck !== null) { // Is a list item
        var prev = keys.filter(function(d){
          var prevIndex = parseInt(listCheck[1]) - 1;
          var reg = new RegExp('^.*?_' + prevIndex + '$', 'g');
          return d.match(reg) !== null;
        })[0];
        var text = '<strong>' + res.data[prev] + '</strong><br />';
        var items = angular.element(res.data[$scope.pieceKey]);
        var itemIndex = Math.floor(Math.random()*items.length);
        var item = items[itemIndex];
        text += '• <em>' + item.innerText + '</em>';
        $scope.chosenManifesto = $sce.trustAsHtml(text);
        $scope.pieceKey = $scope.pieceKey + '__' + itemIndex;
      } else if (res.data[$scope.pieceKey].trim() === ''){ // empty key
        $scope.pieceKey = keys.indexOf($scope.pieceKey) + 1 < keys.length ? keys.indexOf($scope.pieceKey) + 1 : keys.indexOf($scope.pieceKey) - 1 ;
        $scope.chosenManifesto = res.data[$scope.pieceKey];
      } else { // normal key
        $scope.chosenManifesto = res.data[$scope.pieceKey];
      }
      
      
    });
    // $http.get('/api/things').success(function(awesomeThings) {
    //   $scope.awesomeThings = awesomeThings;
    // });
    // 
    // $scope.addThing = function() {
    //   if($scope.newThing === '') {
    //     return;
    //   }
    //   $http.post('/api/things', { name: $scope.newThing });
    //   $scope.newThing = '';
    // };
    // 
    // $scope.deleteThing = function(thing) {
    //   $http.delete('/api/things/' + thing._id);
    // };
  });
