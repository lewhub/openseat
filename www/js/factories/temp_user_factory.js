(function(){
    angular.module("open_seat")
        .factory("temp_fac", temp_fac)

        temp_fac.$inject = ["$http"];

        function temp_fac($http){
            // must change to "https://open-seat.herokuapp.com/users/" when deploying to Heroku
            // must change to "/temp_users/ when testing locally"
            var api = "https://open-seat.herokuapp.com/users/";
            var service = {
                index: index,
                signup: signup
            }
            return service

            function index(){
                return $http.get(api);
            }

            function signup(data){
                return $http.post(api + "signup", data);
            }
        }
})()