myApp.factory('shiftsApi', function($http){

  return {
    getShifts: function(monthAndYear){
      return $http.get('http://localhost/get_shifts.php', { params: monthAndYear});
    },
    addShift: function(shift){
      return $http.post('http://localhost/add_shift.php', shift);
    },
    deleteShift: function(id){
      return $http.get('http://localhost/delete_shift.php', { params: id});
    }
  }; // end return
}); // end shiftsApi factory
