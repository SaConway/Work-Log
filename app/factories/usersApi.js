myApp.factory('usersApi', ['$http', function($http){

  return {
    addUser: function(user){
      return $http.get('http://localhost/add_user.php',  { params: user });
    },
    updateInfo: function(user){
      return $http.get('http://localhost/update_user_info.php',  { params: user });
    },
    getUser: function(id){
      return $http.get('http://localhost/get_user.php',  { params: id });
    }
  }; // end return
}]); // end usersApi factory
