(function(){
    angular.module("open_seat")
        .controller("ProfileController", ProfileController)
            ProfileController.$inject = ["user_fac", "$ionicPopup", "$scope"];

            function ProfileController(user_fac, $ionicPopup, $scope){
                var vm = this;
                vm.title = "profile ctrl title";
                vm.new_password = new Object();

                vm.confirm_delete = function(){
                $ionicPopup.confirm({
                    title: "Please Confirm",
                    template: "<p style='text-align: center; margin-top: -10px;'>Are you sure you want to delete your Account?</p><br>",
                    okText: "Delete",
                    okType: "button-calm",
                    cancelText: "Cancel",
                    cancelType: "button-assertive"
                }).then(function(data){
                    console.log(data)
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