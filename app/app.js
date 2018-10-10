var myApp = angular.module('myApp', ['ngRoute', 'ngStorage']);

myApp.config(['$routeProvider', function($routeProvider){

  $routeProvider
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'loginController'
    })
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'homeController'
    })
    .when('/add_manually', {
      templateUrl: 'views/add_manually.html',
      controller: 'addManuallyController'
    })
    .when('/settings', {
      templateUrl: 'views/settings.html',
      controller: 'settingsController'
    })
    .when('/logout', {
      templateUrl: 'views/logout.html',
      controller: 'logoutController'
    })
    .when('/shifts', {
      templateUrl: 'views/shifts.html',
      controller: 'shiftsController'
    }).otherwise({
      redirectTo: '/login'
    });

}]);
