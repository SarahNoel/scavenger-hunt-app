app.controller('HeaderController',['$scope', '$location', function($scope, $location) {
  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };
}]);

app.controller('MainController',['$scope', '$location', '$http', 'ClueServices', function($scope, $location, $http, ClueServices) {
  // $scope.showAll = false;
  $scope.formInput = {};

//show all clues
  $scope.showAllClues = function(){
    $http.get('/clues')
    .then(function(data){
      $scope.allCluesData =  data.data;
    });
  };

//get one clue
  $scope.getOne= function(id){
    $scope.editing = $scope.hideForm = true;
    $scope.showAll = false;
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
    console.log(updatedClue);
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
  $scope.addNewClue = function(){
    $scope.showAll = true;
    $scope.hideForm = false;
    var newClue= $scope.formInput;
    $http.post('/clues', newClue)
    .then(function(data){
      $http.get('/clues')
      .then(function(data){
        $scope.allCluesData =  data.data;
      });
    });
    $scope.formInput = '';
  };


//move on to next question
  $scope.progressClue = function(num){
    $http.get('/clues')
    .then(function(data){
      var length = data.data.length;
      console.log(num, length);
      if(num === length){
        $scope.results = true;
      }
      else{
        num++;
        $http.get('/clueNum/'+num)
        .then(function(data){
          $scope.currentClue = data.data;
        });
      }
    });

  };

}]);


