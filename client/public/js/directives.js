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

app.directive('logoutDetails', function() {
  return {
    restrict:'E',
    templateUrl: 'views/directives/logout.html',
    controller: ['$scope', '$location', 'LoginServices', function($scope, $location, LoginServices) {

        LoginServices.logout()
          .then(function () {
          $location.path('/loginpage');
        });
    }]
  };
});


app.directive('registerDetails', function() {
  return {
    restrict:'E',
    templateUrl: 'views/directives/registerForm.html',
    controller: ['$scope', '$location', 'LoginServices', '$rootScope', function($scope, $location, LoginServices, $rootScope) {
        $scope.error = false;
        //register User

        $scope.register = function () {
          // initial values
          $scope.error = false;
          // call register from service
          LoginServices.register($scope.registerForm.username, $scope.registerForm.password)
            .then(function(data){
              console.log(data);
              $rootScope.userid = data.user._id;
              $scope.showUser = data.user.username;
              $scope.registering = false;
              $location.path('/gamedash');
          }).catch(function (data){
            $scope.error = true;
            $scope.errorMessage = data.err.message;
            });
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


app.directive('gameLoginDetails', function() {
  return {
    restrict:'E',
    templateUrl: 'views/directives/gameLoginForm.html',
  };
});

app.directive('showCluesDetails', function() {
  return {
    restrict:'E',
    templateUrl: 'views/directives/clueTable.html',
  };
});

app.directive('editClueDetails', function() {
  return {
    restrict:'E',
    templateUrl: 'views/directives/editClueForm.html',
  };
});

app.directive('playGameLoginDetails', function() {
  return {
    restrict:'E',
    templateUrl: 'views/directives/playGameLoginForm.html',
  };
});

app.directive('gameResultsDetails', function() {
  return {
    restrict:'E',
    templateUrl: 'views/directives/gameResults.html',
  };
});

app.directive('photoUploaderDetails', function() {
  return {
    restrict:'E',
    templateUrl: 'views/directives/photoUploader.html',
  };
});

app.directive('gameClueDetails', function() {
  return {
    restrict:'E',
    templateUrl: 'views/directives/gameClue.html',
  };
});



