myApp.controller('settingsController', ['$scope', '$http', 'usersApi', '$localStorage',
  function($scope, $http, usersApi, $localStorage){

  $scope.OnSave= function(){

    console.log($scope.hourlyWage);

    usersApi.updateInfo({
      "id": $localStorage.userId,
      "hourlyWage": $scope.hourlyWage
    }).
      then(function successCallback(response){

        if (response.data == "Updated Successfully"){
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

}]);
