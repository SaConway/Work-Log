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
  $scope.monthShifts = {};

  if ($localStorage.userId == undefined){
    $window.location.href = '#!/login';
    return;
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

  $scope.DownloadExcel = function(){

    var wb = XLSX.utils.book_new();
    wb.SheetNames.push("Shifts Summary");

    var arr = [['Start', 'End', 'Hours', 'Date'], []];
    ($scope.monthShifts).forEach(function(shift){
      var row = [shift.start, shift.end, shift.hours, shift.date];
      arr.push(row);
    });

    arr.push([],[$scope.totalHours + " hours"]);
    var ws_data = arr;

    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Shifts Summary"] = ws;
    var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), $scope.selectedMonth + " " + $scope.selectedYear + " Shifts" + '.xlsx');

  };  // end DownloadExcel function

  function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }

}]);
