app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '../views/home.html',
      controller: 'MainController',
      access: {restricted: false}
    })
    .when('/loginPage', {
      templateUrl: '../views/login.html',
      controller: 'MainController',
      access: {restricted: false}
    })
    .when('/about', {
      templateUrl: '../views/about.html',
      controller: 'MainController',
      access: {restricted: false}
    })
    .when('/admin', {
      templateUrl: '../views/admin.html',
      controller: 'MainController',
      access: {restricted: true}
    })
    .when('/showClues', {
      templateUrl: '../views/clues.html',
      controller: 'MainController',
      access: {restricted: true}
    })
     .when('/start', {
      templateUrl: '../views/start.html',
      controller: 'MainController',
      access: {restricted: false}
    })
      .otherwise({redirectTo: '/'
    });


}]);
