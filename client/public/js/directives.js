app.directive('headerDetails', function() {
  return {
    restrict:'E',
    templateUrl: 'views/directives/header.html',
    controller: ['$scope', '$location', function($scope, $location) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
      };
    }]
  };
});

// app.directive('userGameTable', function() {
//   return {
//     restrict:'E',
//     templateUrl: 'views/directives/gameTable.html',
//     controller: ['$scope', '$location', '$http', function($scope, $location, $http) {

//       $scope.showUserGames = function(id){
//         $http.get('/game/user/' + id)
//           .catch(function(){
//             $scope.gameError = "Error!";})
//           .then(function(data){
//             $scope.allGamesData = data.data.games;
//           });
//       };

//       //delete one game
//       $scope.deleteOneGame = function(id, userid){
//         $http.delete('/game/'+id)
//           .then(function(data){
//             $http.get('/game/user/' + userid)
//               .then(function(data){
//               $scope.allGamesData = data.data.games;
//             });
//           });
//         };

//       //show one game
//       $scope.showOneGame = function(gameid){
//         // $scope.editing = true;
//         $http.get('/game/'+gameid)
//           .then(function(data){
//             $scope.editGameInput= data.data;
//         });
//       };

//       //show all game clues
//       $scope.showGameClues = function(gameid){
//         $http.get('/gameclues/'+ gameid)
//           .then(function(data){
//             $scope.gameClues =  data.data;
//           });
//       };

//       //update one game
//       $scope.updateOneGame = function(id, userid){
//         $http.put('/game/'+ id, $scope.editGameInput)
//           .then(function(data){
//             $http.get('/game/user/' + userid)
//               .then(function(data){
//                 $scope.allGamesData = data.data.games;
//             });
//         });
//       };

//       $scope.showUserGames("5617ef66267102313f4da6b2");
//     }]
//   };
// });

app.directive('updateClueDetails', function() {
  return {
    restrict:'E',
    templateUrl: 'views/directives/updateClueForm.html',
    controller: ['$scope', '$location', '$http', 'MapServices' , function($scope, $location, $http, MapServices) {

     //show game specific clues
      $scope.showUserClues = function(gameid){
        $http.get('/game/'+gameid);
      };

     //show all clues
      $scope.showAllClues = function(){
        $http.get('/clues')
        .then(function(data){
          $scope.allCluesData =  data.data;
        });
      };

      //get one clue
      $scope.getOne= function(id){
        $scope.editClue = true;
        $http.get('/clue/' + id)
        .then(function(data) {
          var clue = data.data;
          $scope.formInput = clue;
          $scope.id = clue._id;
        });
      };

      // //delete one clue
      // $scope.deleteOne = function(id){
      //   $http.delete('/clue/'+id)
      //   .then(function(data){
      //     $http.get('/clues')
      //     .then(function(data){
      //       $scope.allCluesData =  data.data;
      //     });
      //   });
      // };

      //update a single clue
      $scope.updateOne = function(id, gameid){
        var updatedClue= $scope.formInput;
        $http.put('/clue/' + this.id, updatedClue)
          .then(function(data){
            $http.get('/gameclues/' + gameid)
              .then(function(data){
                $scope.gameClues =  data.data;
              });
          });
        $scope.formInput = '';
        $scope.hideForm = $scope.showWarning = false;
        $scope.showAll = true;
      };

      //add a new clue
      $scope.addNewClue = function(gameid){
        $scope.showAll = true;
        $scope.showWarning = $scope.hideForm = false;
        $scope.formInput.hints = $scope.formInput.hints.split(',');
        for (var i = 0; i < $scope.formInput.hints.length; i++) {$scope.formInput.hints[i] = $scope.formInput.hints[i].trim();
        }
        $scope.formInput.answer = $scope.formInput.answer.split(',');
        for (var j = 0; j < $scope.formInput.answer.length; j++) {$scope.formInput.answer[j] = $scope.formInput.answer[j].trim();
        }
        var newClue = $scope.formInput;
        $http.post('/clues/'+ gameid, newClue)
        .then(function(data){
          $http.get('/clues')
          .then(function(data){
            $scope.allCluesData =  data.data;
          });
        });
        $scope.formInput = $scope.place = '';
      };
      //find lat and long based on user input
      $scope.search = function() {
        $scope.showWarning = true;
        $scope.apiError = false;
        MapServices.search($scope.formInput.location)
        .then(
            function(res) {
                MapServices.addMarker(res);
                $scope.formInput.latitude = res.geometry.location.lat();
                $scope.formInput.longitude = res.geometry.location.lng();
        });
      };

      //on-load functions
      MapServices.init();
      // $scope.showAllClues();
    }]
  };
});





app.directive('addGameDetails', function() {
  return {
    restrict:'E',
    templateUrl: 'views/directives/addGameForm.html',
    controller: ['$scope', '$location', '$http', function($scope, $location, $http) {

     // add new game to user
      $scope.addNewGame = function(){
        $scope.gameError = '';
        $http.post('/makegame', $scope.gameInput)
        .catch(function(){
          $scope.gameError = "Error!";})
        .then(function(data){
          console.log(data);
          // $location.path('/gamedash');
        });
      };
    }]
  };
});


app.directive('registerDetails', function() {
  return {
    restrict:'E',
    templateUrl: 'views/directives/registerForm.html',
    controller: ['$scope', '$location', 'LoginServices', function($scope, $location, LoginServices) {
        $scope.error = false;
        //register User

        $scope.register = function () {
        // initial values
        $scope.error = false;
        // call register from service
        LoginServices.register($scope.registerForm.username, $scope.registerForm.password)
          .then(function(){
          console.log('WHY WONT YOU FIND MEEEEE')
        });
          $scope.error = true;
          $scope.errorMessage = "Registered!  Please login.";
          $scope.registering = false;
        // LoginServices.login($scope.registerForm.username, $scope.registerForm.password)
        //   // handle success
        //   .then(function (data) {
        //     $rootScope.userid = data.user._id;
        //     $scope.showUser = data.user.username;
        //     $location.path('/gamedash');
        //     $scope.registerForm = {};
        //   });
        };

    }]
  };
});


app.directive('loginDetails', function() {
  return {
    restrict:'E',
    templateUrl: 'views/directives/loginForm.html',
    controller: ['$rootScope', '$scope', '$location', '$http', 'LoginServices', function($rootScope, $scope, $location, $http, LoginServices) {
      $scope.loginForm = {};
      $scope.register = {};

      console.log(LoginServices.getUserStatus());

      //user login
      $scope.login = function () {
        $scope.error = false;
        $scope.disabled = true;

        // call login from service
        LoginServices.login($scope.loginForm.username, $scope.loginForm.password)
          // handle success
          .then(function (data) {
            $rootScope.userid = data.user._id;
            $scope.showUser = data.user.username;
            $location.path('/gamedash');
            $scope.loginForm = {};
          })
          // handle error
          .catch(function () {
            $scope.error = true;
            $scope.errorMessage = "Invalid username and/or password";
            $scope.disabled = false;
            $scope.loginForm = {};
          });
      };

    }]
  };
});


app.directive('addClue', function() {
  return {
    restrict:'E',
    templateUrl: 'views/directives/clueForm.html',
    controller:  ['$scope', '$location', '$http', 'MapServices', 'ClueServices', function($scope, $location, $http, MapServices, ClueServices) {
      $scope.formInput = {};
      $scope.place = {};
      $scope.gameInput = {};

      // //show all game clues
      // $scope.showGameClues = function(gameid){
      //   $http.get('/gameclues/'+ gameid)
      //   .then(function(data){
      //     $scope.gameClues =  data.data;
      //   });
      // };

      //get one clue
      $scope.getOne= function(id){
        $scope.editClue = true;
        $http.get('/clue/' + id)
        .then(function(data) {
          var clue = data.data;
          $scope.formInput = clue;
          $scope.id = clue._id;
        });
      };

      //delete one clue
      $scope.deleteOne = function(id){
        $http.delete('/clue/'+id)
        .then(function(data){
          $http.get('/clues')
          .then(function(data){
            $scope.allCluesData =  data.data;
          });
        });
      };

      //update a single clue
      $scope.updateOne = function(id, gameid){
        var updatedClue= $scope.formInput;
        $http.put('/clue/' + this.id, updatedClue)
          .then(function(data){
            $http.get('/gameclues/' + gameid)
              .then(function(data){
                $scope.allCluesData =  data.data;
              });
          });
        $scope.formInput = '';
        $scope.editing = $scope.hideForm = false;
        $scope.showAll = true;
      };

      //add a new clue
      $scope.addNewClue = function(gameid){
        $scope.showAll = true;
        $scope.showWarning = $scope.hideForm = false;
        $scope.formInput.hints = $scope.formInput.hints.split(',');
        for (var i = 0; i < $scope.formInput.hints.length; i++) {$scope.formInput.hints[i] = $scope.formInput.hints[i].trim();
        }
        $scope.formInput.answer = $scope.formInput.answer.split(',');
        for (var j = 0; j < $scope.formInput.answer.length; j++) {$scope.formInput.answer[j] = $scope.formInput.answer[j].trim();
        }
        var newClue = $scope.formInput;
        $http.post('/clues/'+ gameid, newClue)
        .then(function(data){
          $http.get('/clues')
          .then(function(data){
            $scope.allCluesData =  data.data;
          });
        });
        $scope.formInput = $scope.place = '';
      };

      //find lat and long based on user input
      $scope.search = function() {
        $scope.showWarning = true;
        $scope.apiError = false;
        MapServices.search($scope.formInput.location)
        .then(
            function(res) {
              MapServices.addMarker(res);
              $scope.formInput.latitude = res.geometry.location.lat();
              $scope.formInput.longitude = res.geometry.location.lng();
        });
      };

      //on-load functions
      MapServices.init();
    }]
  };
});




