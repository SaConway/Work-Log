myApp.controller('settingsController', ['$scope', '$window', 'usersApi', '$localStorage',
  function($scope, $window, usersApi, $localStorage){

  $scope.OnSave= function(){

    usersApi.updateInfo({
      "id": $localStorage.userId,
      "hourlyWage": $scope.hourlyWage
    }).
      then(function successCallback(response){

        if (response.data == "Updated Successfully"){
          $localStorage.userHourlyWage = $scope.hourlyWage;
          $scope.updatedSuccessfully = true;
          $scope.updateFailed = false;
        }
        else {
          $scope.updateFailed = true;
          $scope.updatedSuccessfully = false;
        }

      }, function errorCallback(response){

        $scope.updateFailed = true;
        $scope.updatedSuccessfully = false;

    });
  };  // end OnSave function

  function init(){

    if ($localStorage.userId == undefined){
      $window.location.href = '#!/login';
      return;
    }

    $scope.hourlyWage = $localStorage.userHourlyWage;

  };  // end init function

  init();

}]);
