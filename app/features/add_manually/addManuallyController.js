myApp.controller('addManuallyController', ['$scope', '$window', 'shift', '$localStorage', 'shiftsApi',
  function($scope, $window, shift, $localStorage, shiftsApi){

  if ($localStorage.userId == undefined){
    console.log("in")
    $window.location.href = '#!/login';
    return;
  }

  $scope.OnSave = function(){

    if ($scope.startShift == undefined || $scope.endShift == undefined ||
        $scope.dateShift == undefined)
    {
      return;
    }

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
