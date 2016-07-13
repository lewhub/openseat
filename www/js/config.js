(function(){
    angular.module("library_app")
        .config(function($stateProvider, $urlRouterProvider, $httpProvider){
            $httpProvider.interceptors.push("authInterceptor");
            $urlRouterProvider.otherwise("/signup");
            
            $stateProvider
                .state("signup", {
                    url: "/signup",
                    templateUrl: "partials/signup.html",
                    controller: "SignUpCtrl as signup_ctrl"
                })
                .state("confirm-email", {
                    url: "/confirm",
                    templateUrl: "partials/confirm_email.html"
                })
                .state("login", {
                    url: "/login",
                    templateUrl: "partials/login.html",
                    controller: "LoginCtrl as login_ctrl"
                })
                .state("library_list", {
                    url: "/library-list",
                    templateUrl: "partials/library_list.html",
                    controller: "LibraryListCtrl as library_list_ctrl"
                })
                .state("library_feed", {
                    url: "/library-feed",
                    templateUrl: "partials/library_feed.html",
                    controller: "LibraryFeedCtrl as library_feed_ctrl"
                })
                .state("floor_blueprint", {
                    url: "/floor-blueprint",
                    templateUrl: "partials/floor_blueprint.html"
                })
         

        })
})()
