myApp.controller('noConnectionController', ['$scope', '$window', 'connectionApi',
 function($scope, $window, connectionApi){

  $scope.OnTryAgain = function(){

    connectionApi.check().
      then(function successCallback(response){
        $window.location.href = '#!/login';
      },
       function errorCallback(response){
       });

  };

}]);
