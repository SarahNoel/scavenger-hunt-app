var app = angular.module('scavengerHunt', ['ngRoute']);


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '../views/home.html',
      controller: 'MainController'
    })
    .when('/loginPage', {
      templateUrl: '../views/login.html',
      controller: 'MainController'

    })
    .when('/showClues', {
      templateUrl: '../views/clues.html',
      controller: 'MainController'

    })
    .when('/about', {
      templateUrl: '../views/about.html',
      controller: 'MainController'

    })
      .otherwise({redirectTo: '/'
    });


}]);
