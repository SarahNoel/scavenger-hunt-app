app.controller('HeaderController',['$scope', '$location', function($scope, $location) {
  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };
}]);


app.controller('LoginController',['$scope', '$location', '$http', 'ClueServices', function($scope, $location, $http, ClueServices) {
  $scope.login = {};
  $scope.register = {};

  //user login
  $scope.login = function(){
    ClueServices.loginUser($scope.login.username, $scope.login.password)
      .then(function(){
        $location.path('/');
      })
      .catch(function(){
        $scope.error = true;
          $scope.errorMessage = "Invalid user name and/or password.";
      });
    $scope.displayUserName = $scope.login.username;
  };

  $scope.register = function(){
    ClueServices.registerUser($scope.register.username, $scope.register.password)
      .then(function(){
        $location.path('/');
      })
      .catch(function(){
        $scope.error = true;
          $scope.errorMessage = "Error, please try again.";
      });
    };
    $scope.logout = function(){
    ClueServices.logoutUser();
    };
}]);



//game controller
app.controller('GameController',['$scope', '$location', '$http', 'ClueServices', function($scope, $location, $http, ClueServices) {
  $scope.lat = 40;
  $scope.long = -100;
  $scope.zoom = 2;
  $scope.index = 0;

 //show all clues
  $scope.showAllClues = function(){
    $http.get('/clues')
    .then(function(data){
      $scope.allCluesData =  data.data;
    });
  };
  //guess answer
  $scope.guessAnswer = function(answerArray){
    var correct = false;
    for (var i = 0; i < answerArray.length; i++) {
      if($scope.userAnswer.toLowerCase().trim()===answerArray[i].trim()){
        correct = true;
        break;
      }
      else{
        correct = false;
      }
    }
    if(correct === false){
      $scope.userGuessed = true;
      $scope.userResults = "Sorry, that's incorrect.  Try again!";
    }
    else{
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
          $scope.lat = data.data.latitude;
          $scope.long = data.data.longitude;
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

}]);

app.controller('ClueController',['$scope', '$location', '$http', 'ClueServices', 'Map', function($scope, $location, $http, ClueServices, Map) {
  $scope.formInput = {};
  $scope.place = {};


 //show all clues
  $scope.showAllClues = function(){
    $http.get('/clues')
    .then(function(data){
      $scope.allCluesData =  data.data;
    });
  };

  //get one clue
  $scope.getOne= function(id){
    $scope.editing = true;
    $http.get('/clue/' + id)
    .then(function(data) {
      var clue = data.data;
      console.log(clue);
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
$scope.showAllClues();
 //show all clues
  $scope.showAllClues = function(){
    $http.get('/clues')
    .then(function(data){
      $scope.allCluesData =  data.data;
    });
  };

 //add a new clue
  $scope.addNewClue = function(){
    $scope.showAll = true;
    $scope.showWarning = $scope.hideForm = false;
    $scope.formInput.hints = $scope.formInput.hints.split(',');
    for (var i = 0; i < $scope.formInput.hints.length; i++) {$scope.formInput.hints[i] = $scope.formInput.hints[i].trim();
    }
    $scope.formInput.answer = $scope.formInput.answer.split(',');
    for (var j = 0; j < $scope.formInput.answer.length; j++) {$scope.formInput.answer[j] = $scope.formInput.answer[j].trim();
    }
    var newClue = $scope.formInput;
    $http.post('/clues', newClue)
    .then(function(data){
      $http.get('/clues')
      .then(function(data){
        $scope.allCluesData =  data.data;
      });
    });
    $scope.formInput = $scope.place = '';
  };

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
  Map.init();

}]);



















