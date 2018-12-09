myApp.controller('homeController', ['$scope', '$http', 'shiftsApi', 'shift', '$localStorage', '$timeout', '$window',
 function($scope, $http, shiftsApi, shift, $localStorage, $timeout, $window){

   //-------------------------------------------------
   // INITIALIZE
   //-------------------------------------------------

  var myInterval = null;
  var newshift = null;
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

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

		$("#new-shift-btn").fadeOut("fast");
		$("#end-shift-btn").fadeIn("fast");
    $('#shift-info').fadeIn("fast");

	}; // end OnNewShift function

  // Execute end of new shift process
  $scope.OnEndShift = function(){

    $localStorage.isNewShift = "false";

    newshift.setEnd(new Date());

    clearInterval(myInterval);
    document.getElementById("stopwatch").innerHTML = '';

    shiftsApi.addShift(newshift.getShift()).
      then(function successCallback(response){

        $("#end-shift-btn").fadeOut("fast");
        $("#new-shift-btn").fadeIn("fast");
        $('#shift-info').fadeOut("fast");

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
      return;
    }

    $scope.$parent.showHeader = true;

    if ($localStorage.isNewShift === "true"){
      // New shift was begin

      newshift = new shift();
      newshift.setStart(new Date($localStorage.startShift));
      newshift.setUserId($localStorage.userId);
      newshift.setDate($localStorage.startShift);

      // Update the stopwatch every 1 second
      myInterval = setInterval(stopWatch, 1000);

      $("#end-shift-btn").fadeIn("fast");
      $('#shift-info').fadeIn("fast");
    }
    else{
      // New shift was NOT begin
      $("#new-shift-btn").fadeIn("fast");
    }


    var myDate = new Date();

    $scope.thisMonth = monthNames[myDate.getMonth()];


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

    if (document.getElementById("stopwatch") != null)
      document.getElementById("stopwatch").innerHTML = disHours + " : " + disMinutes + " : " + disSeconds;

  };  // end stopWatch function

  init();


}]);
