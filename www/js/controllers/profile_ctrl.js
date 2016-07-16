(function(){
    angular.module("open_seat")
        .controller("ProfileController", ProfileController)
            ProfileController.$inject = ["user_fac", "$ionicPopup", "$scope", "$stateParams", "auth_fac", "$state"];

            function ProfileController(user_fac, $ionicPopup, $scope, $stateParams, auth_fac, $state){
                var vm = this;
                vm.title = "profile ctrl title";
                vm.new_password = new Object();

                vm.errCallback = function(res){
                    console.log("error >>>", res);
                }

                vm.getUserInfo = function(){
                    user_fac.show($stateParams.id).then(function(res){
                        console.log("user info", res.data)
                        vm.user_info = res.data.user;
                    }, errCallback)
                }
                vm.getUserInfo();

                var errCallback = function(res){
                    console.log("error >>>", res);
                }

                 vm.logout = function(){
                    auth_fac.logout();
                    $state.go("signup");
                 }

                vm.confirm_delete = function(){
                $ionicPopup.confirm({
                    title: "Please Confirm",
                    template: "<p style='text-align: center; margin-top: -10px;'>Are you sure you want to delete your Account?</p><br>",
                    okText: "Delete",
                    okType: "button-calm",
                    cancelText: "Cancel",
                    cancelType: "button-assertive"
                }).then(function(confirmed){
                    if (confirmed){
                        user_fac.delete_user($stateParams.id).then(function(res){
                            console.log(res)
                            vm.logout();
                            console.log("account successfully deleted!")
                        }, errCallback)
                    }
                })
            }
            vm.change_password = function(){
              $ionicPopup.show({
                    title: "Change Your Password",
                    templateUrl: "partials/change_password_form.html",
                    scope: $scope,
                    buttons: [
                        {
                            text: "Cancel",
                            type: "button-assertive",
                            onTap: function(event){
                                vm.new_password = {}
                            }
                        },
                        {
                            text: "Change",
                            type: "button-calm",
                            onTap: function(event){
                                if (vm.new_password.new && vm.new_password.old && vm.new_password.confirm_new){
                                      console.log(vm.new_password)
                                }
                              
                                vm.new_password = {}
                            }
                        }
                    ]
                })

            }

        }
})()