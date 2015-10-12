app.factory('ClueServices', ['$http', '$q', function($http, $q){
  return{
    guessAnswer: function(userAnswer, answerArray){
      var correct = false;
      for (var i = 0; i < answerArray.length; i++) {
        if(userAnswer.toLowerCase().trim()===answerArray[i].trim().toLowerCase()){
          correct = true;
          break;
        }
        else{
          correct = false;
        }
      }
      return correct;
    }
  };
}]);


app.factory('LoginServices', [ '$http','$q', function($http, $q) {
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

    register: function(username, password){
   // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/register', {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve(data);
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;
  },

    login: function(username, password){

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/login', {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            user = true;
            deferred.resolve(data);
          } else {
            user = false;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;
    },

    logout: function() {
      // create a new instance of deferred
      var deferred = $q.defer();

      // send a get request to the server
      $http.get('/user/logout')
        // handle success
        .success(function (data) {
          user = false;
          deferred.resolve();
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });
      // return promise object
      return deferred.promise;
    }

  }; //end return

}]); //end login services



app.service('MapServices', function($q) {

    this.init = function() {
        var options = {
            center: new google.maps.LatLng(40.7127837, -74.00594130000002),
            zoom: 13,
            disableDefaultUI: true
        };
        this.map = new google.maps.Map(
            document.getElementById('map'), options
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



