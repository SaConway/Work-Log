myApp.controller('logoutController', ['$scope', '$localStorage', '$window',
  function($scope, $localStorage, $window){

    delete $localStorage.userId;
    delete $localStorage.userName;
    delete $localStorage.userHourlyWage;
    $scope.$parent.showHeader = false;
    $window.location.href = '#!/login';

}]);
