'use strict';

/**
 * @ngdoc service
 * @name diCastApp.channelService
 * @description
 * # channelService
 * Service in the diCastApp.
 */
angular.module('diCastApp')
  .service('channelService', function channelService($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.list = function list() {
      return $http.get('http://listen.di.fm/public1')
    }
  });
