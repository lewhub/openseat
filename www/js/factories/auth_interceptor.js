(function(){
    angular.module("open_seat")
        .factory("authInterceptor", authInterceptor)

        authInterceptor.$inject = ["auth_fac"];

        function authInterceptor(auth_fac){
            var service = {
                request: request,
                response: response
            }
            return service;
            function request(config){
                var token = auth_fac.get_token();
                if (token){
                    config.headers["x-access-token"] = token;
                }
                return config;
            }
            function response(response){
                if (response.data.token){
                    auth_fac.save_token(response.data.token);
                }
                return response;
            }
        }
})()