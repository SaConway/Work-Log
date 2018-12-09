myApp.controller('statisticsController', ['$scope', '$window', '$localStorage',
function($scope, $window, $localStorage){

  if ($localStorage.userId == undefined){
    $window.location.href = '#!/login';
    return;
  }

  $scope.$on('reCalculateStatisticsEvent', function(event, args) {

    var seconds = 0;
    var wage = 0;

    // Calculate total hours of this month
    args.forEach(function(shift, index, shifts){
      if (shift.hours !== null && shift.hours !== ""){

        // Calculate total hours

        var a = shift.hours.split(':');
        var temp = (+a[0]) * 60 * 60 + (+a[1]) * 60;
        seconds += temp;

        // Calculate total wage

        temp = (+a[0]) * 60 + (+a[1]);
        wage += (temp * ($localStorage.userHourlyWage / 60));
      }
    });

    $scope.totalHours = toHHMMSS(seconds);
    $scope.totalShifts = args.length;
    $scope.totalWage = wage.toFixed(2);

    var parentScope = $scope.$parent;
    parentScope.totalHours = $scope.totalHours;

  });

  // Convert seconds of type String to format hh:mm:ss
  function toHHMMSS(seconds) {
    var sec_num = parseInt(seconds, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);

    if (hours < 10) {hours = "0" + hours;}
    if (minutes < 10) {minutes = "0" + minutes;}
    return hours + ':' + minutes;
  }

}]); // end controller
