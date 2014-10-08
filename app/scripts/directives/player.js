'use strict';

/**
 * @ngdoc directive
 * @name diCastApp.directive:player
 * @description
 * # player
 */
angular.module('diCastApp')
  .directive('player', function (channelService) {
    return {
      templateUrl: '/views/_player.html',
      scope      : {
        volume: '=',
        url   : '=',
      },
      restrict   : 'E',
      link       : function postLink(scope, element, attrs) {
        var swf = angular.element.find('object')[0]
          , deferredPlayer = Q.defer()
          , playerPromise = deferredPlayer.promise
          ;

        window.playerReady = function () {
          deferredPlayer.resolve(true);
        };

        scope.$watch(function () {
          return channelService.channel();
        }, function (newVal) {
          if (newVal !== null) {
            playerPromise.then(function () {
              swf._play(newVal.flashUrl);
            })
          }
        });

        scope.$watch('volume', function (newVal) {
          playerPromise.then(function () {
            swf._setVolume(newVal);
          })
        });
      }
    };
  });
