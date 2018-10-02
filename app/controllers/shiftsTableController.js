myApp.controller('shiftsTableController', ['$scope', 'shiftsApi', function($scope, shiftsApi){

  $scope.deleteShift = function(id){

    shiftsApi.deleteShift({ "id" : id }).
      then(function successCallback(response){

        var myDate = new Date();
        getShifts({"month": (myDate.getMonth() + 1), "year": myDate.getFullYear()});

      }, function errorCallback(response){

    });

  };

  $scope.$on('updateShiftsEvent', function(event, args) {

    getShifts(args);

  });

  function getShifts(monthAndYear) {

    shiftsApi.getShifts(monthAndYear).
      then(function successCallback(response){

        if (response.data.length > 0){
            $scope.isShifts = true;
            $scope.$parent.isShifts = true;
        }
        else{
          $scope.isShifts = false;
          $scope.$parent.isShifts = false;
        }

        $scope.shifts = response.data;
        $scope.$parent.$broadcast('reCalculateStatisticsEvent', $scope.shifts);

      }, function errorCallback(response){

    });
  };

}]);
