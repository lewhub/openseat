(function(){
    angular.module("open_seat")
        .controller("GlobalController", GlobalController)

        GlobalController.$inject = ["auth_fac", "$rootScope", "$state"];

        function GlobalController(auth_fac, $rootScope, $state){
            var vm = this;
            vm.title = "global ctrl title";

            $rootScope.$on("$stateChangeStart", function(event, toState){
                if ((toState.name === "library_list" && !vm.is_authed()) || (toState.name === "library_feed" && !vm.is_authed()) || (toState.name === "floor_blueprint" && !vm.is_authed())){
                    event.preventDefault();
                    $state.go("signup")
                }
            })

            vm.logout = function(){
                auth_fac.logout();
                $state.go("signup");
            }

            vm.is_authed = function(){
                return auth_fac.is_authed();
            }

        }
})()