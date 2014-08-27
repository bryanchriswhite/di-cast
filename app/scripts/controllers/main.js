'use strict';

/**
 * @ngdoc function
 * @name diCastApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the diCastApp
 */
angular.module('diCastApp')
  .controller('MainCtrl', function ($scope, channelService) {
    channelService.list()
      .success(function (channels) {
        $scope.channels = channels;
      })
      .error(function (reason) {
        console.error('couldn\'t fetch channels: ', reason)
      })
  });
