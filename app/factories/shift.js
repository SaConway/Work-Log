myApp.factory('shift', function(){

  return function() {

    this.mStart = null;
    this.mEnd = null;
    this.mHours = null;
    this.mUserId = null;

    this.setStart = function(start){
      this.mStart = start;
    };
    this.setEnd = function(end){
      this.mEnd = end;
    };
    this.setHours = function(hours){
      this.mHours = hours;
    };
    this.setUserId = function(userId){
      this.mUserId = userId;
    };
    this.getShift = function(){
      return {
        "start": formatTime(this.mStart.getHours() + ":" + this.mStart.getMinutes()),
        "end": formatTime(this.mEnd.getHours() + ":" + this.mEnd.getMinutes()),
        "date": formatDate(this.mStart),
        "hours": formatTime(this.mHours),
        "userId": this.mUserId
      };
    };
    this.getStart = function(){
      return this.mStart;
    };
  }; // end shift function

  function formatTime(time){

    var a = time.toString().split(':');
    var hours = a[0];
    var minutes = a[1];

    if (hours < 10) {hours = "0" + hours;}
    if (minutes < 10) {minutes = "0" + minutes;}

    return hours + ':' + minutes;
  };

  function formatDate(date){
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

}); // end shift factory
