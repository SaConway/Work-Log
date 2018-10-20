myApp.controller('shiftsController', ['$scope', '$http', 'shiftsApi', '$timeout', '$localStorage', '$window',
 function($scope, $http, shiftsApi, $timeout, $localStorage, $window) {

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const years = ["2018", "2019", "2020"];

  $scope.months = monthNames;
  $scope.years = years;
  $scope.selectedYear = "2018";
  const d = new Date();
  $scope.selectedMonth = monthNames[d.getMonth()];

  if ($localStorage.userId == undefined){
    $window.location.href = '#!/login';
  }

  $scope.$parent.showHeader = true;

  $scope.selectedYearChanged = function(){
    broadcast();
  };

  $scope.selectedMonthChanged = function(){
    broadcast();
  };

  function broadcast(){

    $scope.$broadcast('updateShiftsEvent', {
      "user_id" : $localStorage.userId,
      "month": (monthNames.findIndex(month => month === $scope.selectedMonth) + 1),
      "year": $scope.selectedYear
    });

  };

  $timeout(function(){
      broadcast();
  });


}]);
