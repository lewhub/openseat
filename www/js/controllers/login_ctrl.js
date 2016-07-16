(function(){
    angular.module("open_seat")
        .controller("LoginCtrl", LoginCtrl)

        LoginCtrl.$inject = ["$state", "user_fac", "$window"]

        function LoginCtrl($state, user_fac, $window){
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
                        $window.localStorage["current_user_id"] = res.data.user._id
                        $state.go("library_list");
                    }, vm.errorCall) 
                }
            }
        }
})()