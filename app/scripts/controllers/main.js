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

    $scope.channel = {
      key: null
    };

    var initializeCastApi = function () {
      var sessionRequest = new chrome.cast.SessionRequest('2722D3A6');
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
    }())

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

    $scope.$watch('channel.key', function (newVal) {
      if (newVal) {
        var url = 'http://pub1.di.fm/di_' + newVal
          , mediaInfo = new chrome.cast.media.MediaInfo(url, 'audio/mpeg')
          , request = new chrome.cast.media.LoadRequest(mediaInfo)
          ;

        if ($scope.session) {
          $scope.session.loadMedia(request,
            onMediaDiscovered.bind(this, 'loadMedia'),
            onMediaError);
        }

        $scope.audioSrc = $sce.trustAsResourceUrl(url);
      }
    })
  });
