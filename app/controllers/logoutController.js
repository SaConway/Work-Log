myApp.controller('logoutController', ['$scope', '$localStorage', '$window',
  function($scope, $localStorage, $window){

  delete $localStorage.userId;
  $window.location.href = '#!/login';

}]);
