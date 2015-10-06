var app = angular.module('scavengerHunt', ['ngRoute']);

// app.config(function(uiGmapGoogleMapApiProvider) {
//     uiGmapGoogleMapApiProvider.configure({
//            key: 'AIzaSyAWPfjYh-56R7wyA-atoO46DH7O2JEfvV0',
//            v: '3.20', //defaults to latest 3.X anyhow
//            libraries: 'weather,geometry,visualization'
//     });
// });

// app.run(function ($rootScope, $location, $route, clueServices) {
//     $rootScope.$on('$routeChangeStart', function (event, next, current) {
//       if (next.access.restricted && clueServices.isLoggedIn() === false) {
//         $location.path('/login');
//         $route.reload();
//       }
//     });
//   });
