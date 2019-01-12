myApp.controller('loginController', ['$scope', '$localStorage', '$window', 'usersApi', 'user',
  function($scope, $localStorage, $window, usersApi, user){

  $scope.OnLoginBtn = function(){

    if ($scope.fullName == undefined || $scope.id == undefined) return;

    var username = toFullNameCase($scope.fullName.trim());
    var userid = $scope.id.trim();

    user.setFullName(username);
    user.setId(userid);

    usersApi.addUser(user.getUser()).
      then(function successCallback(response){

        if (response.data != 'Wrong name'){
          $localStorage.userId = $scope.id;
          $localStorage.userName = $scope.fullName;

          usersApi.getUser({ "id" : $localStorage.userId }).
            then(function successCallback(response){
              $localStorage.userHourlyWage = Number(response.data.hourly_wage);
            }, function errorCallback(response){

          });

          $window.location.href = '#!/home';
        }
        else {
          $scope.error = 'Error: Full Name or Id are wrong';
        }

      }, function errorCallback(response){
        $scope.error = 'Something went wrong';
    });

  }; // end OnLoginBtn function

  $scope.KeyPress = function($event){

    var keyCode = $event.keyCode;
    if (keyCode === 13) {   // Enter Key
        $scope.OnLoginBtn();
    }

  };  // end KeyPress function

  function init(){

    if ($localStorage.userId != undefined){
      $window.location.href = '#!/home';
    }

  };  // end init function

  function toFullNameCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };  // end toFullNameCase function


  init();

}]);  // end loginController
