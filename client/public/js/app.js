var app = angular.module('scavengerHunt', ['ngRoute', 'ngMap', 'flow']);

app.config(['flowFactoryProvider', function (flowFactoryProvider) {
  flowFactoryProvider.defaults = {
    target: 'upload.php',
    permanentErrors: [404, 500, 501],
    maxChunkRetries: 1,
    chunkRetryInterval: 5000,
    simultaneousUploads: 4,
    singleFile: true
  };
  flowFactoryProvider.on('catchAll', function (event) {
  });
}]);

app.run(['$rootScope', '$location', '$route', 'LoginServices', function ($rootScope, $location, $route, LoginServices) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (next.access.restricted && LoginServices.isLoggedIn() === false) {
      $route.reload();
      $location.path('/loginPage');
    }
  });
}]);
