app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '../views/home.html',
      controller: 'MainController',
      access: {restricted: false}
    })
     .when('/loginpage', {
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
      templateUrl: '../views/gamedash.html',
      controller: 'ClueController',
      access: {restricted: true}
    })
    .when('/gameedit', {
      templateUrl: '../views/editByGame.html',
      controller: 'ClueController',
      access: {restricted: false}
    })
      .when('/addClues', {
      templateUrl: '../views/addClue.html',
      controller: 'ClueController',
      access: {restricted: true}
    })
      .when('/newclue', {
      templateUrl: '../views/addClue.html',
      controller: 'ClueController',
      access: {restricted: true}
    })
      .when('/showClues', {
      templateUrl: '../views/showClues.html',
      controller: 'ClueController',
      access: {restricted: true}
    })
       .when('/newgame', {
      templateUrl: '../views/newGame.html',
      controller: 'MainController',
      access: {restricted: true}
    })
     .otherwise('/');
}]);
