'use strict';

/**
 * @ngdoc overview
 * @name todoApp
 * @description
 * # todoApp
 *
 * Main module of the application.
 */
angular
  .module('todoApp', [
    'ngAnimate',
    'ngCookies',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule'
  ])
  .config(function ($routeProvider, $locationProvider, localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('todo')
    $routeProvider
      .when('/list/:i', {
        templateUrl: '/views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/', {
        templateUrl: '/views/today.html',
        controller: 'TodayCtrl',
        controllerAs: 'today'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .service('persist', function(localStorageService) {
    return {
      getData: function() {
        var data = localStorageService.get('data');
        if (!data) {
          data = [
            {
              name: 'Todo List',
              items: [{name: 'Item 1'}, {name: 'Item 2'}]
            }
          ]
          this.saveData(data);
        }
        return data;
      },
      saveData: function(data) {
        localStorageService.set('data', data);
      }
    }
  });
