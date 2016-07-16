(function(){
    angular.module("open_seat")
        .controller("FloorBlueprintCtrl", FloorBlueprintCtrl)

        FloorBlueprintCtrl.$inject = ["$window", "$state"];

        function FloorBlueprintCtrl($window, $state){
            var vm = this;
            vm.title = "floor blueprint ctrl title";

            vm.goToProfile = function(){
                var user_id = $window.localStorage["current_user_id"];
                $state.go("user-profile", { id: user_id });
            }

        }
})()