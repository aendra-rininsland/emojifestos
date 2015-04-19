'use strict';

describe('Directive: emoji', function () {

  // load the directive's module and view
  beforeEach(module('emojifestosApp'));
  beforeEach(module('components/emoji/emoji.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<emoji></emoji>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the emoji directive');
  }));
});