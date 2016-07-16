(function(){
    angular.module("open_seat")
        .controller("SignUpCtrl", SignUpCtrl)

        SignUpCtrl.$inject = ["user_fac", "$window", "temp_fac"];

        function SignUpCtrl(user_fac, $window, temp_fac){
            var vm = this;
            vm.title = "signup title"; 

            vm.errorCall = function(res){
                console.log("error >>>>", res)
            }

            vm.new_user = new Object();

            vm.new_user_info = function(user){
                if (user.email && user.password){
                        temp_fac.signup(user).then(function(res){
                        $window.localStorage["temp_user_id"] = res.data.user._id
                        console.log("temporary signup successful!", res.data)
                    }, vm.errorCall)
                } 
            }



        }



})()