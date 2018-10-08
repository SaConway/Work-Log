myApp.controller('logoutController', ['$scope', '$localStorage', '$window',
  function($scope, $localStorage, $window){

    delete $localStorage.userId;
    delete $localStorage.userName;
    delete $localStorage.userHourlyWage;
    $window.location.href = '#!/login';

}]);
