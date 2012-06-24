'use strict';

var html5mode = function($locationProvider) {
  $locationProvider.html5Mode(true);
}

var routes = function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/app.html', controller: AppCtrl});
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: LoginCtrl});
  $routeProvider.when('/register', {templateUrl: 'partials/register.html', controller: RegisterCtrl});
  $routeProvider.otherwise({redirectTo: '/app'});
}

// Declare app level module which depends on filters, and services
angular.module('canny', ['canny.filters', 'canny.services', 'canny.directives'])
  .config(html5mode)
  .config(routes);
