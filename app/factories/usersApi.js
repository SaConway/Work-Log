myApp.factory('usersApi', ['$http', function($http){

  return {
    addUser: function(user){
      return $http.get('http://localhost/add_user.php',  { params: user });
    },
    updateInfo: function(user){
      return $http.get('http://localhost/update_user_info.php',  { params: user });
    }
  }; // end return
}]); // end usersApi factory
