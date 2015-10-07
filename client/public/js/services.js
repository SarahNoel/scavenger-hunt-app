app.factory('ClueServices', [ '$http','$q', function($http, $q) {
  var user = null;

  return {
    isLoggedIn: function(){
      if (user){
        return true;
      }
      else {
        return false;
      }
    },
    getUserStatus: function(){
      return user;
    },
    registerUser: function(username, password){
      var q = $q.defer();
      $http.post('/register', {username: username, password: password})
        .success(function(data, status) {
          if (status === 200 && data.status) {
            user = true;
            q.resolve();
          }
          else {
            q.reject();
          }
        })
        .error(function(data){
          q.reject();
        });
        return q.promise;
    },
    loginUser: function(username, password){
      var q = $q.defer();
      $http.post('/login', {username: username, password: password})
        .success(function(data, status){
          if (status === 200 && data.status){
            user = true;
            q.resolve();
          }
          else{
            user = false;
            q.reject();
          }
        })
        .error(function(){
          user = false;
          q.reject();
        });
        return q.promise;
    },
    logoutUser: function(){
      var q = $q.defer();
      $http.get('/logout')
      .success(function(data){
        user = false;
        q.resolve();
      })
      .error(function(data){
        user = false;
        q.reject();
      });
      return q.promise;
    }
  };
}]);



app.service('Map', function($q) {

    this.init = function() {
        var options = {
            center: new google.maps.LatLng(40.7127837, -74.00594130000002),
            zoom: 13,
            disableDefaultUI: true
        };
        this.map = new google.maps.Map(
            document.getElementById("map"), options
        );
        this.places = new google.maps.places.PlacesService(this.map);
    };

    this.search = function(str) {
        var d = $q.defer();
        this.places.textSearch({query: str}, function(results, status) {
            if (status == 'OK') {
                d.resolve(results[0]);
            }
            else d.reject(status);
        });
        return d.promise;
    };

    this.addMarker = function(res) {
        if(this.marker) this.marker.setMap(null);
        this.marker = new google.maps.Marker({
            map: this.map,
            position: res.geometry.location,
            animation: google.maps.Animation.DROP
        });
        this.map.setCenter(res.geometry.location);
    };

});



