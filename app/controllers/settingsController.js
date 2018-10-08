myApp.controller('settingsController', ['$scope', '$http', 'usersApi', '$localStorage',
  function($scope, $http, usersApi, $localStorage){

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

        $scope.updatedSuccessfully = false;
        $scope.updateFailed = true;

    });
  };  // end OnSave function

  function init(){

    $scope.hourlyWage = $localStorage.userHourlyWage;

  };  // end init function

  init();

}]);
