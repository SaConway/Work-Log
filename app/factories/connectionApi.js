myApp.factory('connectionApi', function($http){

  return {
    check: function(){
      return $http.get('http://localhost/connect.php');
    }
  }; // end return
}); // end connectionApi factory
