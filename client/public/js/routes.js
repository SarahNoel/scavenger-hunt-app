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
      controller: 'EditNoUserController',
      access: {restricted: false}
    })
    .when('/logoutpage', {
      templateUrl: '../views/logoutPage.html',
      controller: 'MainController',
      access: {restricted: true}
    })

     .otherwise('/');
}]);
