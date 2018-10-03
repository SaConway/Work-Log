myApp.factory('user', function(){

  var mFullName = null;
  var mId = null;
  var mHourlyWage = null;

  return {

    setFullName : function(fullName){
      this.mFullName = fullName;
    },
    setId : function(id){
      this.mId = id;
    },
    setHourlyWage : function(hourlyWage){
      this.mHourlyWage = hourlyWage;
    },
    getUser : function(){
      return {
        "fullName": this.mFullName,
        "id": this.mId,
        "hourlyWage": this.mHourlyWage
      };
    }
  };

});
