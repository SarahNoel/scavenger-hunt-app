// //game functions
app.controller('MainController',['$scope', '$location', '$http', 'ClueServices', 'LoginServices', function($scope, $location, $http, ClueServices, LoginServices) {
  $scope.currentClue = {};
  $scope.gameLoginInput = {};
  $scope.currentClue.latitude = 40;
  $scope.currentClue.longitude = -100;
  $scope.zoom = 2;
  $scope.index = 0;
  $scope.editGameInput = {};
  $scope.error = false;
  $scope.begin = false;
  $scope.hintsUsed = 0;
  $scope.giveUps = 0;


  //user logout
  $scope.logout = function () {
    // call logout from service
    LoginServices.logout()
      .then(function () {
        $location.path('/loginPage');
        $scope.error = true;
        $scope.errorMessage = "Successfully logged out!";

      });
  };


  $scope.gaveUp = function(){
    $scope.giveUps++;
  };

  $scope.gameLogin = function(){
    $scope.loggedIn= false;
    var loginGame = $scope.gameLoginInput;
    $scope.showLoginError = false;
    $http.get('/game/name/' + loginGame.name)
    .then(function(data){
      var game = data.data;
      if(game === null){
        $scope.showLoginError = true;
        $scope.loginError = "Sorry, game not found.";
      }
      else if(game.playPassword === loginGame.password){
        $scope.playGame = game;
        $scope.gameLoginInput = {};
        $scope.begin= true;
        $scope.loggedIn= true;

      }
      else{
        $scope.showLoginError = true;
        $scope.loginError = "Sorry, incorrect password.";
      }
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
  $scope.progressClue = function(num, gameid){
    console.log(num);
    $scope.allHints = $scope.userAnswer = $scope.userResults =  '';
    $scope.noHints = false;
    $http.get('/gameclues/' + gameid)
    .then(function(data){
      var length = data.data.length;
      if(num === length){
        $scope.results = true;
        $scope.startSearch = false;
      }
      else{
        console.log(data.data);
        $scope.currentClue = data.data[num];
        $scope.zoom = '14';
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


}]);


//clue functions
app.controller('ClueController',['$scope', '$location', '$http', 'MapServices', function($scope, $location, $http, MapServices){
  $scope.formInput = {};
  $scope.place = {};
  $scope.gameInput = {};
  $scope.notEditing = true;

   $scope.showUserGames = function(id){
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

      //show one game
      $scope.showOneGame = function(gameid){
        $http.get('/game/'+gameid)
          .then(function(data){
            $scope.editGameInput= data.data;
        });
      };

      //show all game clues
      $scope.showGameClues = function(gameid){
        $http.get('/gameclues/'+ gameid)
          .then(function(data){
            $scope.gameClues =  data.data;
          });
        $scope.notEditing = false;
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

  //delete one clue
  $scope.deleteOne = function(id, gameid){
    $http.delete('/clue/'+id)
    .then(function(data){
      $http.get('/gameclues/'+gameid)
      .then(function(data){
        $scope.allCluesData =  data.data;
      });
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

  $scope.showUserGames("5617ef66267102313f4da6b2");

}]);
























