(function(){
    angular.module("open_seat")
        .factory("user_fac", user_fac)

        user_fac.$inject = ["$http"];

        function user_fac($http){
            // must change to "https://open-seat.herokuapp.com/users/" when deploying to Heroku
            // must change to "/users/ when testing locally"
            var api = "https://open-seat.herokuapp.com/users/";
            var service = {
                index: index,
                create: create,
                show: show,
                update: update,
                delete_user: delete_user,
                login: login,
                grant_token: grant_token
            }
            return service;

            function index(){
                return $http.get(api);
            }
            function create(data){
                return $http.post(api, data);
            }
            function show(id){
                return $http.get(api + id);
            }
            function update(id, data){
                return $http.patch(api + id, data);
            }
            function delete_user(id){
                return $http.delete(api + id);
            }
            function login(data){
                return $http.post(api + "login", data)
            }
            function grant_token(email){
                return $http.post(api + "grant-token", email)
            }
        }
})()