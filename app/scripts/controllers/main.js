'use strict';

/**
 * @ngdoc function
 * @name diCastApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the diCastApp
 */
angular.module('diCastApp')
  .controller('MainCtrl', function ($scope) {
    $scope.stations = [
      {
        name: 'Chillstep',
        key: 'chillstep',
      },
      {
        name: 'Epic Trance',
        key: 'epictrance',
      },
      {
        name: 'Bass And Jackin\' House',
        key: 'baseandjackinhouse',
      },
    ];
  });
