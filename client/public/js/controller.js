//Login functions
app.controller('MainController',['$scope', '$location', '$http', 'Map', 'LoginServices', 'ClueServices', function($scope, $location, $http, Map, LoginServices, ClueServices) {
  $scope.loginForm = {};
  $scope.register = {};

  console.log(LoginServices.getUserStatus());

   $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
   };

    //user login
    $scope.login = function () {
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      LoginServices.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          var userName = $scope.loginForm.username;
          $location.path('/gamedash');
          $scope.disabled = false;
          $scope.userName = userName;
          $scope.loginForm = {};
          // Map.init();

        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

    //user logout
    $scope.logout = function () {
      // call logout from service
      LoginServices.logout()
        .then(function () {
          $location.path('/loginPage');
        });
      };


    //register User
    $scope.register = function () {

      // initial values
      $scope.error = false;

      // call register from service
      LoginServices.register($scope.registerForm.username, $scope.registerForm.password)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.registerForm = {};
          // Map.init();
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.registerForm = {};
        });

    };



// }]); //end Login Controller


// //show all games
//   $scope.showGames = function(){
//     $http.get('/games')
//       .then(function(data){
//         console.log('all games: ', data.data);
//       $scope.allGamesData = data.data;
//     });
//   };



//   $scope.gameLogin = function(){
//     $scope.loginError = '';
//     var allGames;
//     var found;
//     var gameName = $scope.gameLoginInput.name;
//     var password = $scope.gameLoginInput.password;
//     $http.get('/games')
//       .then(function(data){
//         allGames = data.data;
//         for (var i = 0; i < allGames.length; i++) {
//             console.log(allGames[i]);
//           if(allGames[i].name === gameName){
//             found = true;
//             if(allGames[i].playPassword === password){
//               $scope.loginError= 'player!';
//               return;
//             }
//             else if(allGames[i].editPassword === password){
//               $scope.loginError= 'admin!';
//               return;
//             }
//             else{
//               $scope.loginError = 'Incorrect password';
//               return;
//             }
//           }
//           else{
//             $scope.loginError = "Game not found";
//           }
//         }

//     });
//   };





  // $scope.addNewGame = function(){
  //   $scope.gameError = '';
  //   if($scope.gameInput.playPassword === $scope.gameInput.editPassword){
  //     $scope.gameError = "Error!  Edit password and play password must be different.";
  //   }
  //   else{
  //     LoginServices.registerGame($scope.gameInput)
  //       .then(function(){
  //         console.log('success!');
  //         $location.path('/#/newclue');
  //       })
  //       .catch(function(){
  //         // $scope.gameError = "Error!  That game name already exists.  Try a different name.";
  //       });
  //     }
  // };


// ]);


//game functions
// app.controller('GameController',['$scope', '$location', '$http', 'ClueServices', function($scope, $location, $http, ClueServices) {
  $scope.currentClue = {};
  $scope.currentClue.latitude = 40;
  $scope.currentClue.longitude = -100;
  $scope.zoom = 2;
  $scope.index = 0;
  $scope.editGameInput = {};

  //show one game
  $scope.showOneGame = function(gameid){
    $scope.editing = true;
    $http.get('/game/'+gameid)
      .then(function(data){
        $scope.editGameInput= data.data;
    });
  };

  // add new game to user
  $scope.addNewGame = function(id){
    $scope.gameError = '';
    $http.post('/game/' + id, $scope.gameInput)
    .catch(function(){
      $scope.gameError = "Error!";})
    .then(function(data){
      $location.path('/gamedash');

    });
  };

  //show user specific games
  $scope.showUserGames = function(id){
    console.log('tester')
    $http.get('/game/user/' + id)
      .catch(function(){
        $scope.gameError = "Error!";})
      .then(function(data){
        $scope.allGamesData = data.data.games;
      });
  };

  //delete one game
  $scope.deleteOneGame = function(id, userid){
    $http.delete('/game/'+id)
      .then(function(data){
        $http.get('/game/user/' + userid)
          .then(function(data){
          $scope.allGamesData = data.data.games;
        });
      });
    };

  //update one game
  $scope.updateOneGame = function(id, userid){
    $http.put('/game/'+ id, $scope.editGameInput)
      .then(function(data){
        $http.get('/game/user/' + userid)
          .then(function(data){
            $scope.allGamesData = data.data.games;
        });
    });
  };

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

  //guess answer
  $scope.guessAnswer = function(answerArray){
    var correct = ClueServices.guessAnswer($scope.userAnswer, answerArray);
    if(correct === false){
      $scope.userGuessed = true;
      $scope.userResults = "Sorry, that's incorrect.  Try again!";
    }
    else if(correct === true){
      $scope.userGuessed = $scope.quit = true;
      $scope.userResults = "You guessed "+ $scope.userAnswer + ". That's correct!";
    }
  };

  //move on to next question
  $scope.progressClue = function(num){
    $scope.allHints = $scope.userAnswer = $scope.userResults =  '';
    $scope.noHints = false;
    $http.get('/clues')
    .then(function(data){
      var length = data.data.length;
      if(num === length){
        $scope.results = true;
        $scope.startSearch = false;
      }
      else{
        num++;
        $http.get('/clueNum/'+num)
        .then(function(data){
          $scope.currentClue = data.data;
          $scope.zoom = '14';
        });
      }
    });
  };

$scope.useHint = function(hints, index){
 var hintsArray = [];
  if (index <= hints.length) {
    for (var i = 1; i < index; i++) {
      hintsArray.push(hints[i]);
    }
  }
  if(hintsArray.length === hints.length-1){
    $scope.noHints=true;
  }
  $scope.allHints = hintsArray;
  $scope.hint = true;
  $scope.hintsUsed++;
};


// }]);


// //clue functions
// app.controller('ClueController',['$scope', '$location', '$http', 'Map', 'ClueServices', function($scope, $location, $http, Map, ClueServices) {
  $scope.formInput = {};
  $scope.place = {};
  $scope.gameInput = {};

  //show all game clues
  $scope.showGameClues = function(gameid){
    $http.get('/gameclues/'+ gameid)
    .then(function(data){
      $scope.gameClues =  data.data;
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
  $scope.updateOne = function(id){
    var updatedClue= $scope.formInput;
    $http.put('/clue/' + this.id, updatedClue)
      .then(function(data){
        $http.get('/clues')
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
    Map.search($scope.formInput.location)
    .then(
        function(res) {
            Map.addMarker(res);
            $scope.formInput.latitude = res.geometry.location.lat();
            $scope.formInput.longitude = res.geometry.location.lng();
    });
  };

  //on-load functions
  // Map.init();
  $scope.showAllClues();

}]);



















