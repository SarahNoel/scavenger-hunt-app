var app = angular.module('scavengerHunt', ['ngRoute']);


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '../views/home.html',
      controller: 'MainController'
    })
    .when('/login', {
      templateUrl: '../views/login.html',
      controller: 'MainController'
    })
      .otherwise({redirectTo: '/'
    });


}]);
