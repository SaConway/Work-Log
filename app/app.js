var myApp = angular.module('myApp', ['ngRoute', 'ngStorage', 'ngAnimate']);

myApp.config(['$routeProvider', function($routeProvider){

  $routeProvider
    .when('/login', {
      title: 'Login | Work Log',
      templateUrl: 'views/login.html',
      controller: 'loginController'
    })
    .when('/home', {
      title: 'Home | Work Log',
      templateUrl: 'views/home.html',
      controller: 'homeController'
    })
    .when('/add_manually', {
      title: 'Add Manually | Work Log',
      templateUrl: 'views/add_manually.html',
      controller: 'addManuallyController'
    })
    .when('/settings', {
      title: 'Settings | Work Log',
      templateUrl: 'views/settings.html',
      controller: 'settingsController'
    })
    .when('/logout', {
      templateUrl: 'views/logout.html',
      controller: 'logoutController'
    })
    .when('/shifts', {
      title: 'Shifts | Work Log',
      templateUrl: 'views/shifts.html',
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
