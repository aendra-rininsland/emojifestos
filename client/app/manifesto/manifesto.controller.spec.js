'use strict';

describe('Controller: ManifestoCtrl', function () {

  // load the controller's module
  beforeEach(module('emojifestosApp'));

  var ManifestoCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManifestoCtrl = $controller('ManifestoCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
