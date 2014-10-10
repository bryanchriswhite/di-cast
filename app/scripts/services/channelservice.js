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
    var currentChannel = null;

    this.list = function list() {
      return $http.get('http://listen.di.fm/public1')
//      return $http.get('/public1')
    };

    this.setChannel = function(channelName){
      var deferred = Q.defer();

      currentChannel = {
        name: channelName,
//        flashUrl: 'https://localhost:9009/di_' + channelName ,//+ '_aac?type=.flv',
//        castUrl: 'https://localhost:9009/di_' + channelName
        flashUrl: 'http://pub1.di.fm:80/di_' + channelName + '_aac?type=.flv',
        castUrl: 'http://pub1.di.fm/di_' + channelName
      };
      deferred.resolve(currentChannel);

      return deferred.promise;
    };

    this.channel = function(){
      return currentChannel;
    };
  });
