myApp.controller('shiftsTableController', ['$scope', 'shiftsApi', '$window', '$localStorage',
 function($scope, shiftsApi, $window, $localStorage){

  if ($localStorage.userId == undefined){
    $window.location.href = '#!/login';
  }

  $scope.deleteShift = function(id){

    if ($window.confirm("Are you sure you want to delete this shift?")){

      shiftsApi.deleteShift({ "id" : id }).
        then(function successCallback(response){

          var myDate = new Date();
          getShifts({
            "user_id" : $localStorage.userId,
            "month": (myDate.getMonth() + 1),
            "year": myDate.getFullYear()
           });

        }, function errorCallback(response){

      });

    }

  };

  // Calculate wage from hours
  $scope.calculateWage = function(hours){

    var a = hours.split(':');
    var temp = (+a[0]) * 60 + (+a[1]);
    return (temp * ($localStorage.userHourlyWage / 60)).toFixed(2);

  }; //end calculateWage function

  $scope.$on('updateShiftsEvent', function(event, args) {

    getShifts(args);

  });

  function getShifts(shiftsInfo) {

    shiftsApi.getShifts(shiftsInfo).
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

        var parentScope = $scope.$parent;
        parentScope.child = $scope.shifts;

      }, function errorCallback(response){

    });
  };

}]);
