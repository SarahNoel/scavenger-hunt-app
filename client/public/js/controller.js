app.controller('HeaderController',['$scope', '$location', function($scope, $location) {
  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };
}]);

app.controller('MainController',['$scope', '$location', '$http', 'ClueServices', function($scope, $location, $http, ClueServices) {
  // $scope.showAll = false;
  $scope.formInput = {};

  $scope.showAllClues = function(){
    $http.get('/clues')
    .then(function(data){
      $scope.allCluesData =  data.data;
    });
  };

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

  $scope.deleteOne = function(id){
    $http.delete('/clue/'+id)
    .then(function(data){
      $http.get('/clues')
      .then(function(data){
        $scope.allCluesData =  data.data;
      });
    });
  };

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




}]);


