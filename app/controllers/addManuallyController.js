myApp.controller('addManuallyController', ['$scope', 'shift', '$localStorage', 'shiftsApi',
  function($scope, shift, $localStorage, shiftsApi){

  $scope.OnSave = function(){

    var newShift = new shift();
    newShift.setStart($scope.startShift);
    newShift.setEnd($scope.endShift);
    newShift.setDate($scope.dateShift);
    newShift.setUserId($localStorage.userId);

    shiftsApi.addShift(newShift.getShift()).
      then(function successCallback(response){

        if (response.data == "Updated Successfully"){
          $scope.updatedSuccessfully = true;
          $scope.updateFailed = false;
        }
        else{
          $scope.updatedSuccessfully = false;
          $scope.updateFailed = true;
        }

      }, function errorCallback(response){

        $scope.updatedSuccessfully = false;
        $scope.updateFailed = true;

    });

  }; // end OnSave function

}]);  // end addManuallyController
