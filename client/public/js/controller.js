
app.controller('MainController',['$scope', '$location', '$http', function($scope, $location, $http) {
  $scope.title = "Welcome!";
  $scope.message = "Test meeee!";
}]);

app.controller('HeaderController',['$scope', '$location', function($scope, $location) {
  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };
}]);
