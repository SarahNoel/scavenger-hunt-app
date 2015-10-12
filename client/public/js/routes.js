app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '../views/home.html',
      controller: 'MainController',
      access: {restricted: false}
    })
     .when('/loginPage', {
      templateUrl: '../views/loginPage.html',
      controller: 'MainController',
      access: {restricted: false}
    })
     .when('/start', {
      templateUrl: '../views/start.html',
      controller: 'MainController',
      access: {restricted: false}
    })
    .when('/gamedash', {
      templateUrl: '../views/editByGame.html',
      controller: 'ClueController',
      access: {restricted: true}
    })
     .otherwise('/');
}]);
