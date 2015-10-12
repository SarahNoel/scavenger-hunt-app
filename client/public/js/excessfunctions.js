// //these functions may be used in re-factoring

// //user logout
// $scope.logout = function () {
//   // call logout from service
//   LoginServices.logout()
//     .then(function () {
//       $location.path('/loginPage');
//       $scope.error = true;
//       $scope.errorMessage = "Successfully logged out!";
//     });
// };

// //show games by user
// $scope.showUserGames = function(id){
//   $http.get('/game/user/' + id)
//     .catch(function(){
//       $scope.gameError = "Error!";})
//     .then(function(data){
//       $scope.allGamesData = data.data.games;
//     });
// };



//extra routes
   // .when('/gamedash', {
   //    templateUrl: '../views/gamedash.html',
   //    controller: 'ClueController',
   //    access: {restricted: true}
   //  })
   //  .when('/about', {
    //   templateUrl: '../views/about.html',
    //   controller: 'MainController',
    //   access: {restricted: false}
    // })
    // .when('/admin', {
    //   templateUrl: '../views/admin.html',
    //   controller: 'MainController',
    //   access: {restricted: true}
    // })
    // .when('/gameedit', {
    //   templateUrl: '../views/gameEdit.html',
    //   controller: 'ClueController',
    //   access: {restricted: true}
    // })
    //   .when('/addClues', {
    //   templateUrl: '../views/addClue.html',
    //   controller: 'ClueController',
    //   access: {restricted: true}
    // })
    //   .when('/newclue', {
    //   templateUrl: '../views/addClue.html',
    //   controller: 'ClueController',
    //   access: {restricted: true}
    // })
    //   .when('/showClues', {
    //   templateUrl: '../views/showClues.html',
    //   controller: 'ClueController',
    //   access: {restricted: true}
    // })
    //    .when('/newgame', {
    //   templateUrl: '../views/newGame.html',
    //   controller: 'MainController',
    //   access: {restricted: true}
    // })
