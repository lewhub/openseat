(function(){
    angular.module("open_seat")
        .controller("SignUpCtrl", SignUpCtrl)

        SignUpCtrl.$inject = ["user_fac"];

        function SignUpCtrl(user_fac){
            var vm = this;
            vm.title = "signup title"; 

            vm.errorCall = function(res){
                console.log("error >>>>", res)
            }

            vm.new_user = new Object();

            vm.new_user_info = function(user){
                if (user.email && user.password){
                        user_fac.create(user).then(function(res){
                        console.log("signup successful!", res.data)
                    }, vm.errorCall)
                } 
            }



        }



})()