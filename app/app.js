var myApp = angular.module('myApp', ['ngRoute', 'ngStorage']);

myApp.config(['$routeProvider', function($routeProvider){

  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'homeController'
    })
    .when('/shifts', {
      templateUrl: 'views/shifts.html',
      controller: 'shiftsController'
    }).otherwise({
      redirectTo: '/home'
    });

}]);
