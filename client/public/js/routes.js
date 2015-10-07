app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '../views/home.html',
      controller: 'GameController',
      access: {restricted: false}
    })
    .when('/loginPage', {
      templateUrl: '../views/login.html',
      controller: 'LoginController',
      access: {restricted: false}
    })
    .when('/about', {
      templateUrl: '../views/about.html',
      controller: 'GameController',
      access: {restricted: false}
    })
    .when('/admin', {
      templateUrl: '../views/admin.html',
      controller: 'MainController',
      access: {restricted: true}
    })
    .when('/newclue', {
      templateUrl: '../views/clues.html',
      controller: 'AddClueController',
      access: {restricted: true}
    })
     .when('/start', {
      templateUrl: '../views/start.html',
      controller: 'GameController',
      access: {restricted: false}
    })
     .when('/showClues', {
      templateUrl: '../views/showClues.html',
      controller: 'ClueController',
      access: {restricted: true}
    });


}]);
