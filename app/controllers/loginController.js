myApp.controller('loginController', ['$scope', '$http', '$localStorage', '$window', 'usersApi', 'user',
  function($scope, $http, $localStorage, $window, usersApi, user){

  $scope.OnLoginBtn = function(){

    $username = toFullNameCase($scope.fullName.trim());
    $userid = $scope.id.trim();

    user.setFullName($username);
    user.setId($userid);

    usersApi.addUser(user.getUser()).
      then(function successCallback(response){

        if (response.data != 'Wrong name'){
          $localStorage.userId = $scope.id;
          $window.location.href = '#!/home';
        }
        else {
          $scope.isValid = false;
        }

      }, function errorCallback(response){
    });

  }; // end OnLoginBtn function

  function init(){

    $scope.isValid = true;

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
