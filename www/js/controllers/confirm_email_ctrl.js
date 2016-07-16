(function(){
    angular.module("open_seat")
        .controller("ConfirmEmailCtrl", ConfirmEmailCtrl)

        ConfirmEmailCtrl.$inject = ["$scope", "user_fac", "$window", "$state"]

        function ConfirmEmailCtrl($scope, user_fac, $window, $state){
            var vm = this;
            vm.title = "confirm email ctrl title";

            var errCallback = function(res){
                console.log("error >>>", res);
                var pTag = angular.element( document.querySelector("#p-tag-test") )
                    pTag.text(res);
                     $scope.$broadcast("scroll.refreshComplete");
            }

            vm.checkTempUser = function(){
                var temp_user_id = $window.localStorage["temp_user_id"];
                user_fac.show(temp_user_id).then(function(res){
                    console.log(res.data)
                    // var pTag = angular.element( document.querySelector("#p-tag-test") )
                    // pTag.text(res.data);
                    user_fac.grant_token(res.data.user.email).then(function(res){
                        console.log(res);
                        $scope.$broadcast("scroll.refreshComplete");
                        $state.go("library_list")
                    }, errCallback)

                  
                }, errCallback)
                
            }
           
        }
})()