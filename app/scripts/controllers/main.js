'use strict';

/**
 * @ngdoc function
 * @name diCastApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the diCastApp
 */
angular.module('diCastApp')
  .controller('MainCtrl', function ($scope, $timeout, $sce, channelService) {
    channelService.list()
      .success(function (channels) {
        $scope.channels = channels;
      })
      .error(function (reason) {
        console.error('couldn\'t fetch channels: ', reason)
      })

    $scope.player = {
      channel: null,
      volume : 25,
      playing: false
    };

    $scope.playPause = function(){
      $scope.player.playing = !$scope.player.playing;
    };

//    $scope.$watch('player.volumeSlider', function (newVal) {
//      $scope.player.volume = newVal / 100;
//      $scope.player.element.volume = newVal / 100;
//    });

    var initializeCastApi = function () {
      var sessionRequest = new chrome.cast.SessionRequest(chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
      var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
        sessionListener,
        receiverListener);
      chrome.cast.initialize(apiConfig, onInitSuccess, onError);

      chrome.cast.requestSession(onRequestSessionSuccess, onLaunchError);
    };

    (function init() {
      if (!chrome.cast || !chrome.cast.isAvailable) {
        $timeout(init, 1000);
      } else {
        initializeCastApi();
      }
    }());

    function receiverListener(e) {
      if (e === chrome.cast.ReceiverAvailability.AVAILABLE) {
      }
    }

    function sessionListener(e) {
      console.log('sessoinlistener')
      console.log(e);
      $scope.session = e;
    }

    function onInitSuccess() {
      console.log('onInitSuccess: ', [].slice.apply(arguments).join(', '))
    }

    function onRequestSessionSuccess(e) {
      console.log('resuestsessionsuccess')
      console.log(e)
    }

    function onError() {
      console.log('onError: ', [].slice.apply(arguments).join(', '))
    }

    function onLaunchError(reason) {
      console.error('launchError: ', reason)
    }

    function onMediaDiscovered() {
      console.log('onMediaDiscovered called!')
    }

    function onMediaError(reason) {
      console.error('onMediaError: ', reason)
    }

    $scope.$watch('player.channel', function (newVal) {
      if (newVal) {
        channelService.setChannel(newVal)
          .then(function (channel) {
            var mediaInfo = new chrome.cast.media.MediaInfo(channel.castUrl, 'audio/mpeg')
              , request = new chrome.cast.media.LoadRequest(mediaInfo)
              ;

            if ($scope.session) {
              $scope.session.loadMedia(request,
                onMediaDiscovered.bind(this, 'loadMedia'),
                onMediaError);
            }

//          $scope.audioSrc = $sce.trustAsResourceUrl(flashUrl);
          });
      }
    });
  });
