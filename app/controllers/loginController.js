myApp.controller('loginController', ['$scope', '$http', '$localStorage', '$window', 'usersApi', 'user',
  function($scope, $http, $localStorage, $window, usersApi, user){

    delete $localStorage.userId;

  $scope.OnLoginBtn = function(){

    user.setFullName($scope.fullName);
    user.setId($scope.id);
    if ($scope.hourlyWage != undefined) user.setHourlyWage($scope.hourlyWage);

    usersApi.addUser(user.getUser()).
      then(function successCallback(response){

        console.log(response);

        $localStorage.userId = $scope.id;
        $window.location.href = '#!/home';

      }, function errorCallback(response){
    });

  }; // end OnLoginBtn function

  function init(){

    console.log($localStorage.userId);

    if ($localStorage.userId != undefined){
      $window.location.href = '#!/home';
    }

  };  // end init function



  init();

}]);
