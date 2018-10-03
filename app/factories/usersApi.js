myApp.factory('usersApi', ['$http', function($http){

  return {
    addUser: function(user){ 
      return $http.get('http://localhost/add_user.php',  { params: user});
    }
  }; // end return
}]); // end usersApi factory
