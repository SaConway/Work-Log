myApp.controller('statisticsController', ['$scope', function($scope){

  $scope.$on('reCalculateStatisticsEvent', function(event, args) {


    var seconds = 0;

    // Calculate total hours of this month
    args.forEach(function(shift, index, shifts){
      if (shift.hours !== null && shift.hours !== ""){

        var a = shift.hours.split(':');
        var temp = (+a[0]) * 60 * 60 + (+a[1]) * 60;// + (+a[2]);
        seconds = seconds + temp;
      }
    });

    $scope.totalHours = toHHMMSS(seconds);
    $scope.totalShifts = args.length;

  });

  // Convert seconds of type String to format hh:mm:ss
  function toHHMMSS(seconds) {
    var sec_num = parseInt(seconds, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    //var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {hours = "0" + hours;}
    if (minutes < 10) {minutes = "0" + minutes;}
    //if (seconds < 10) {seconds = "0" + seconds;}
    return hours + ':' + minutes;// + ':' + seconds;
  }

}]); // end controller
