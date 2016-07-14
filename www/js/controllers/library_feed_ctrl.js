(function(){
    angular.module("open_seat")
        .controller("LibraryFeedCtrl", LibraryFeedCtrl)

        LibraryFeedCtrl.$inject = ["$window"]

        function LibraryFeedCtrl($window){
            var vm = this;
            vm.title = "library feed title";
            console.log(vm.title);
            
            vm.library_name = $window.localStorage["library_name"];

            vm.vacant_floors = [
                "1st Floor",
                "4th Floor",
                "5th Floor",
                "5M Floor",
                "6th Floor",
                "6M Floor"
            ]
            vm.full_floors = [
                "2nd Floor",
                "3rd Floor",
                "3M Floor",
                "4M Floor",
                "7th Floor",
                "8th Floor",
                "9th Floor"
            ]

        }

})()