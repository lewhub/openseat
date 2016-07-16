(function(){
    angular.module("open_seat")
        .controller("ConfirmEmailCtrl", ConfirmEmailCtrl)

        ConfirmEmailCtrl.$inject = ["$scope", "user_fac", "$window", "$state"]

        function ConfirmEmailCtrl($scope, user_fac, $window, $state){
            var vm = this;
            vm.title = "confirm email ctrl title";

            var errCallback = function(res){
                var temp_user_id = $window.localStorage["temp_user_id"];
                console.log("error >>>", res);
                var pTag = angular.element( document.querySelector("#p-tag-test") )
                    pTag.text(temp_user_id);
                     $scope.$broadcast("scroll.refreshComplete");
            }

            vm.checkTempUser = function(){
                var temp_user_id = $window.localStorage["temp_user_id"];
                user_fac.show(temp_user_id).then(function(res){
                    console.log(res.data)
                    // var pTag = angular.element( document.querySelector("#p-tag-test") )
                    // pTag.text(res.data);
                    user_fac.grant_token({email: res.data.user.email}).then(function(res){
                        console.log(res);
                         var pTag = angular.element( document.querySelector("#p-tag-test") )
                         pTag.text("Success!!!");
                        $window.localStorage["current_user_id"] = temp_user_id;
                        $window.localStorage.removeItem("temp_user_id");
                        $state.go("library_list")
                        $scope.$broadcast("scroll.refreshComplete");
                    }, errCallback)

                  
                }, errCallback)
                
            }
           
        }
})()