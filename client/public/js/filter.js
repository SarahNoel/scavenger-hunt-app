app.filter('arrayFilter', function(){
  return function(input){
    var array = input;
    array = array.join().replace(/,/g, ', ');
    return array;
  };
});
