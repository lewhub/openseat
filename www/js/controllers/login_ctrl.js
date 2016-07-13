(function(){
    angular.module("library_app")
        .controller("LoginCtrl", LoginCtrl)

        LoginCtrl.$inject = ["$state", "user_fac"]

        function LoginCtrl($state, user_fac){
            var vm = this;
            vm.title = "login ctrl title";

            vm.errorCall = function(res){
                console.log("error >>>>", res);
            }
            
            vm.user_info = new Object();

            vm.login_user = function(user){
                if (user.email && user.password){
                    user_fac.login(user).then(function(res){
                        console.log("login successful!", res.data)
                        $state.go("library_list");
                    }, vm.errorCall)
                    
                }
            }
        }
})()