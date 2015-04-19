'use strict';

angular.module('emojifestosApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
      {
        'title': 'About',
        'link': '/'
      },
      {
        'title': 'Submit',
        'link': '/new'
      }
    ];
    
    $scope.parties = [
      {
        'title': 'Conservative',
        'link': 'manifesto/conservative'
      },
      {
        'title': 'Labour',
        'link': 'manifesto/labour'
      },
      {
        'title': 'Liberal Democrat',
        'link': 'manifesto/libdem'
      },
      {
        'title': 'Ukip',
        'link': 'manifesto/ukip'
      },
      {
        'title': 'Green',
        'link': 'manifesto/green'
      },
      {
        'title': 'SNP',
        'link': 'manifesto/snp'
      },
      {
        'title': 'Plaid Cymru',
        'link': 'manifesto/plaid'
      }
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
