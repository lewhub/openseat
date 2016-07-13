(function(){
    angular.module("library_app")
        .factory("auth_fac", auth_fac)

        auth_fac.$inject = ["$window"];

        function auth_fac($window){
            var service = {
                parse_jwt: parse_jwt,
                save_token: save_token,
                get_token: get_token,
                is_authed: is_authed,
                logout: logout
            }
            return service;
            
            function parse_jwt(token){
                var base64Url = token.split(".")[1];
                var base64 = base64Url.replace("-", "+").replace("_", "/");
                return JSON.parse($window.atob(base64));
            }
            function save_token(token){
                $window.localStorage["jwt_token"] = token;
            }
            function get_token(){
                return $window.localStorage["jwt_token"];
            }
            function is_authed(){
                var token = get_token();
                if (token){
                    var params = parse_jwt(token);
                    return Math.round(new Date().getTime() / 1000) <= params.exp;
                } else {
                    return false;
                }
            }
            function logout(){
                $window.localStorage.removeItem("jwt_token");
            }
            
        }
})()