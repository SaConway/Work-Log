myApp.controller('homeController', ['$scope', '$http', 'shiftsApi', 'shift', '$localStorage', '$timeout', '$window',
 function($scope, $http, shiftsApi, shift, $localStorage, $timeout, $window){

   //-------------------------------------------------
   // INITIALIZE
   //-------------------------------------------------

  var myInterval = null;
  var newshift = null;

  //-------------------------------------------------
  // SCOPE FUNCTIONS
  //-------------------------------------------------

  // Execute new shift process
  $scope.OnNewShift = function() {

    var date = new Date();
    newshift = new shift();
    newshift.setStart(date);
    newshift.setUserId($localStorage.userId);
    newshift.setDate(date);

    $localStorage.isNewShift = "true";
    $localStorage.startShift = date;

		// Update the stopwatch every 1 second
		myInterval = setInterval(stopWatch, 1000);

		$("#newShiftBtn").fadeOut("fast");
		$("#endShiftBtn").fadeIn("fast");

	}; // end OnNewShift function

  // Execute end of new shift process
  $scope.OnEndShift = function(){

    $localStorage.isNewShift = "false";

    newshift.setEnd(new Date());

    clearInterval(myInterval);
    document.getElementById("stopwatch").innerHTML = '';

    shiftsApi.addShift(newshift.getShift()).
      then(function successCallback(response){

        $("#endShiftBtn").fadeOut("fast");
        $("#newShiftBtn").fadeIn("fast");
        var myDate = new Date();
        $scope.$broadcast('updateShiftsEvent', {
          "user_id": $localStorage.userId,
          "month": (myDate.getMonth() + 1),
          "year": myDate.getFullYear()
         });

      }, function errorCallback(response){
    });

  };  // end OnEndShift function

  //-------------------------------------------------
  // PRIVATE FUNCTIONS
  //-------------------------------------------------

  function init(){

    if ($localStorage.userId == undefined){
      $window.location.href = '#!/login';
    }

    if ($localStorage.isNewShift === "true"){
      // New shift was begin

      newshift = new shift();
      newshift.setStart(new Date($localStorage.startShift));

      // Update the stopwatch every 1 second
      myInterval = setInterval(stopWatch, 1000);

      $("#endShiftBtn").fadeIn("fast");
    }
    else{
      // New shift was NOT begin
      $("#newShiftBtn").fadeIn("fast");
    }

    var myDate = new Date();

    $timeout(function(){
      $scope.$broadcast('updateShiftsEvent', {
        "user_id" : $localStorage.userId,
        "month": (myDate.getMonth() + 1),
        "year": myDate.getFullYear()
       });
    });

  };  // end init function

  function stopWatch(){

    var now = new Date().getTime();

    var distance = now - newshift.getStart().getTime();

    var disHours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var disMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var disSeconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("stopwatch").innerHTML = disHours + " Hours " + disMinutes + " Minutes " + disSeconds + " Seconds";

  };  // end stopWatch function

  init();


}]);
