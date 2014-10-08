'use strict';

/**
 * @ngdoc overview
 * @name diCastApp
 * @description
 * # diCastApp
 *
 * Main module of the application.
 */
angular
  .module('diCastApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.select',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller : 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller : 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

