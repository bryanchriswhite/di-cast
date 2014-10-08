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
        volume : '=',
        playing: '=',
      },
      restrict   : 'E',
      link       : function postLink(scope, element, attrs) {
        var swf = angular.element.find('object')[0]
          , deferredPlayer = Q.defer()
          , playerPromise = deferredPlayer.promise
          , play = function () {
              playerPromise.then(function () {
                swf._play(channelService.channel().flashUrl);
                scope.playing = true;
              })
            }
          , pause = function () {
              playerPromise.then(function () {
                swf._pause();
                scope.playing = false;
              })
            }
          ;

        window.playerReady = function () {
          deferredPlayer.resolve(true);
          if (!scope.$$phase) scope.$digest();
        };

        scope.$watch(function () {
          return channelService.channel();
        }, function (newVal) {
          if (newVal !== null) {
            play()
          }
        });


        var volumeTransform = function (x) {
          return Math.pow((x / 100), Math.E) + 0.0099999;
        };

        scope.$watch('volume', function (newVal) {
          playerPromise.then(function () {
            swf._setVolume(volumeTransform(newVal));
          })
        });

        scope.$watch('playing', function (newVal) {
          if (newVal === true) {
            play();
          } else if (newVal === false) {
            pause();
          }
        });
      }
    };
  });
