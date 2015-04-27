'use strict';

angular.module('emojifestosApp')
  .controller('MainCtrl', function ($scope, $http, Auth, $sce) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    var getKey = function(obj) {
      var keys = Object.keys(obj);
      var key = keys[Math.floor(Math.random()*keys.length)];
      var item = obj[key];
      return item.trim().match(/:$/) === null ? key : getKey(obj);
    };
    
    $http.get('/api/manifestos').success(function(res){
      console.dir(res);
      $scope.chosenParty = res.name;
      $scope.chosenSection = res.section;
      var keys = Object.keys(res.data);
      var pieceKey = getKey(res.data);
      var listCheck = pieceKey.match(/^(?:u|o)l_(\d)$/);
      if ( listCheck !== null) {
        console.dir(listCheck);
        var prev = keys.filter(function(d){
          var prevIndex = parseInt(listCheck[1]) - 1;
          var reg = new RegExp('^.*?_' + prevIndex + '$', 'g');
          return d.match(reg) !== null;
        })[0];
        var text = '<strong>' + res.data[prev] + '</strong><br />';
        var items = angular.element(res.data[pieceKey]);
        var item = items[Math.floor(Math.random()*items.length)];
        text += '• <em>' + item.innerText + '</em>';
        $scope.chosenManifesto = $sce.trustAsHtml(text);
      } else if (res.data[pieceKey].trim() === ''){
        pieceKey = keys.indexOf(pieceKey) + 1 < keys.length ? keys.indexOf(pieceKey) + 1 : keys.indexOf(pieceKey) - 1 ;
        console.log('empty');
        console.log(pieceKey);
        $scope.chosenManifesto = res.data[pieceKey];
      } else {
        console.log('normal');
        $scope.chosenManifesto = res.data[pieceKey];
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
