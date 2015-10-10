app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '../views/home.html',
      controller: 'MainController',
      access: {restricted: false}
    })
    .when('/newgame', {
      templateUrl: '../views/newGamePage.html',
      controller: 'MainController',
      access: {restricted: true}
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
    .when('/newclue', {
      templateUrl: '../views/addClue.html',
      controller: 'MainController',
      access: {restricted: true}
    })
     .when('/start', {
      templateUrl: '../views/start.html',
      controller: 'MainController',
      access: {restricted: true}
    })
     .when('/showClues', {
      templateUrl: '../views/showClues.html',
      controller: 'MainController',
      access: {restricted: true}
    })
     .when('/gamedash', {
      templateUrl: '../views/gamedash.html',
      controller: 'MainController',
      access: {restricted: true}
    })
     .when('/gameedit', {
      templateUrl: '../views/gameEdit.html',
      controller: 'MainController',
      access: {restricted: true}
    })
      .when('/addClues', {
      templateUrl: '../views/addClue.html',
      controller: 'MainController',
      access: {restricted: true}
    })
     .otherwise('/');
}]);
