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
    .when('/about', {
      templateUrl: '../views/about.html',
            controller: 'MainController'

    })
    .when('/admin', {
      templateUrl: '../views/admin.html',
      controller: 'MainController',
      access: {restricted: true}
    })

    .when('/showClues', {
      templateUrl: '../views/clues.html',
      controller: 'MainController'

    })
    .when('/newClue', {
      templateUrl: '../views/newClue.html',
      access: {restricted: true},
      controller: 'MainController'
    })
     .when('/start', {
      templateUrl: '../views/start.html',
      controller: 'MainController'
    })
      .otherwise({redirectTo: '/'
    });


}]);
