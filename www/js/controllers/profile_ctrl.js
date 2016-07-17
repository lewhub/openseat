(function(){
    angular.module("open_seat")
        .controller("ProfileController", ProfileController)
            ProfileController.$inject = ["user_fac", "$ionicPopup", "$scope", "$stateParams", "auth_fac", "$state"];

            function ProfileController(user_fac, $ionicPopup, $scope, $stateParams, auth_fac, $state){
                var vm = this;
                vm.title = "profile ctrl title";
                vm.new_password = new Object();
                vm.additionalInfo = { school: "University of Wisconsin Madison" }

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

                vm.isEditing = false;
                vm.beginEditing = function(){
                    var nav_bar = angular.element( document.querySelector("#login-nav-bar") );
                    if (!vm.isEditing){
                        vm.isEditing = true;
                        nav_bar.css("margin-bottom", "0px")
                        vm.user_changes_info = new Object();
                        vm.user_changes_info.username = vm.user_info.username;
                        vm.user_changes_info.email = vm.user_info.email;
                        vm.user_changes_info.school = vm.user_info.school;
                    } else {
                        vm.isEditing = false;
                    }
                    return
                }

                vm.updateUser = function(){
                    console.log(vm.additionalInfo)
                    user_fac.update($stateParams.id, vm.additionalInfo).then(function(res){
                        console.log(res);
                        $state.go("library_list")
                    }, errCallback)
                }

                vm.save_changes = function(){
                    console.log("changes to save");
                    console.log(vm.user_changes_info);
                    user_fac.update($stateParams.id, vm.user_changes_info)
                    .then(function(res){
                        console.log(res);
                        $state.reload();
                    }, errCallback)
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
                                      if (vm.new_password.new === vm.new_password.confirm_new){
                                          user_fac.update_password($stateParams.id, {password: vm.new_password.old, new_password: vm.new_password.new})
                                          .then(function(res){
                                              console.log(res)
                                          }, errCallback)
                                      }
                                }
                              
                                vm.new_password = {}
                                $state.reload()
                            }
                        }
                    ]
                })

            }

        }
})()