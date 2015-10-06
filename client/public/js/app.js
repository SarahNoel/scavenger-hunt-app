var app = angular.module('scavengerHunt', ['ngRoute', 'ngMap']);

// app.run(function ($rootScope, $location, $route, clueServices) {
//     $rootScope.$on('$routeChangeStart', function (event, next, current) {
//       if (next.access.restricted && clueServices.isLoggedIn() === false) {
//         $location.path('/login');
//         $route.reload();
//       }
//     });
//   });
