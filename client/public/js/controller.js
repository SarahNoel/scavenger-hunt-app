// //game functions
app.controller('MainController',['$scope', '$location', '$http', 'ClueServices', 'LoginServices', function($scope, $location, $http, ClueServices, LoginServices) {
  $scope.currentClue = {};
  $scope.currentClue.latitude = 40;
  $scope.currentClue.longitude = -100;
  $scope.zoom = 2;
  $scope.index = 0;
  $scope.editGameInput = {};
  $scope.error = false;


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
//   $scope.formInput = {};
//   $scope.place = {};
//   $scope.gameInput = {};

//   //show all game clues
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
  // $scope.showAllClues();

}]);
























