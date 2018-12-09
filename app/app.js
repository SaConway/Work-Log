var myApp = angular.module('myApp', ['ngRoute', 'ngStorage', 'ngAnimate']);

myApp.config(['$routeProvider', function($routeProvider){

  $routeProvider
    .when('/login', {
      title: 'Login | Work Log',
      templateUrl: 'app/features/login/login.html',
      controller: 'loginController'
    })
    .when('/home', {
      title: 'Home | Work Log',
      templateUrl: 'app/features/home/home.html',
      controller: 'homeController'
    })
    .when('/add_manually', {
      title: 'Add Manually | Work Log',
      templateUrl: 'app/features/add_manually/add_manually.html',
      controller: 'addManuallyController'
    })
    .when('/settings', {
      title: 'Settings | Work Log',
      templateUrl: 'app/features/settings/settings.html',
      controller: 'settingsController'
    })
    .when('/logout', {
      templateUrl: 'app/features/logout/logout.html',
      controller: 'logoutController'
    })
    .when('/no_connection', {
      templateUrl: 'app/features/no_connection/no_connection.html',
      controller: 'noConnectionController'
    })
    .when('/shifts', {
      title: 'Shifts | Work Log',
      templateUrl: 'app/features/shifts/shifts.html',
      controller: 'shiftsController'
    }).otherwise({
      redirectTo: '/login'
    });

}]);

myApp.run(['$rootScope', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);
