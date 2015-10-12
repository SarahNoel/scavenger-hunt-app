// //game functions
app.controller('MainController',['$scope', '$location', '$http', 'ClueServices', 'LoginServices', function($scope, $location, $http, ClueServices, LoginServices) {
  $scope.currentClue = {};
  $scope.gameLoginInput = {};
  $scope.editGameInput = {};
  $scope.currentClue.latitude = 40;
  $scope.currentClue.longitude = -100;
  $scope.zoom = 2;
  $scope.index = 0;
  $scope.error = false;
  $scope.begin = false;
  $scope.hintsUsed = 0;
  $scope.giveUps = 0;
  $scope.addErrorMessage = '';

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
    $scope.allHints = $scope.userAnswer = $scope.userResults =  '';
    $scope.noHints = false;
    $http.get('/gameclues/' + gameid)
    .then(function(data){
      var length = data.data.length;
      if(num++ === length){
        $scope.results = true;
        $scope.startSearch = false;
      }
      else{
        var cluesArray = data.data;
        for (var i = 0; i < cluesArray.length; i++) {
          if(cluesArray[i].order === num)
            $scope.currentClue = data.data[i];
          }
        }
        $scope.zoom = '14';
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
  $scope.editGameInput = {};
  $scope.editGameData = {};
  $scope.newGameForm = {};

  $scope.editGameLogin = function(){
    var loginGame = $scope.editGameInput;
    $scope.showLoginError = false;
    $http.get('/game/name/' + loginGame.name)
    .then(function(data){
      var game = data.data;
      if(game === null){
        $scope.showLoginError = true;
        $scope.loginError = "Sorry, game not found.";
      }
      else if(game.editPassword === loginGame.password){
        $scope.editGameData = game;
        $http.get('/gameclues/' + game._id)
        .then(function(data){
          $scope.editGameClues = data.data;
        });
        $scope.editing = true;
        $scope.gameLogged = true;
        $scope.editGameLogin = {};
      }
      else{
        $scope.showLoginError = true;
        $scope.loginError = "Sorry, incorrect password.";
      }
    });
  };

  //game update without users
  $scope.updateOneGameNoUser = function(id){
    $scope.showMessage = false;
    $http.put('/game/' + id, $scope.editGameData)
    .catch(function(){

    })
    .then(function(data){
      $scope.showMessage = true;
      $scope.updateMessage = "Game Updated!";
    });
  };

  //delete one game
  $scope.deleteOneGame = function(id, userid){
    $http.delete('/game/'+id)
      .then(function(data){
        $location.path('/#/');
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

  //update a single clue
  $scope.updateOne = function(id, gameid){
    var updatedClue= $scope.formInput;
    $http.put('/clue/' + this.id, updatedClue)
      .then(function(data){
        $http.get('/gameclues/' + gameid)
          .then(function(data){
            $scope.editGameClues =  data.data;
          });
      });
    $scope.formInput = '';
    $scope.hideForm = $scope.showWarning = $scope.updateClue = false;
    $scope.showAll = true;
  };

  //delete one clue
  $scope.deleteOne = function(id, gameid){
    $http.delete('/clue/'+id)
    .then(function(data){
      $http.get('/gameclues/'+gameid)
      .then(function(data){
        $scope.editGameClues =  data.data;
      });
    });
  };


  // make new Game
  $scope.makeGame = function(){
    $scope.addErrorMessage = '';
    var addGame = $scope.newGameInput;
    if(addGame.editPassword === addGame.playPassword){
      $scope.addErrorMessage = "Error! Edit and play passwords must be different.";
    }
    else{
    $http.post('/games', $scope.newGameInput)
      .then(function(data){
        if(data.data === ''){
          $scope.addErrorMessage = "Sorry, that game name already exists.  Please try a different name.";
        }
        else{
          $scope.editGameData = data.data;
          $scope.editing = true;
          $scope.makeNew = false;
        }
      });
    }
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

 //show all clues
  $scope.showAllClues = function(){
    $http.get('/clues')
    .then(function(data){
      $scope.allCluesData =  data.data;
    });
  };

  //get one clue
  $scope.getOne= function(id){
    $scope.editClue = $scope.updateClue = true;
    $scope.newClue = false;
    $http.get('/clue/' + id)
    .then(function(data) {
      var clue = data.data;
      $scope.formInput = clue;
      $scope.id = clue._id;
    });
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
      $http.get('/gameclues/' +gameid)
      .then(function(data){
        $scope.editGameClues = data.data;
        $scope.editClue = $scope.newClue = false;
      });
    });
    $scope.formInput = $scope.place = '';
  };

  //find lat and long based on user input
  $scope.search = function() {
    $scope.showWarning = true;
    $scope.apiError = false;
    MapServices.search($scope.formInput.location)
    .then(function(res) {
      MapServices.addMarker(res);
      $scope.formInput.latitude = res.geometry.location.lat();
      $scope.formInput.longitude = res.geometry.location.lng();
    });
  };

  //on-load functions
  MapServices.init();

}]);
