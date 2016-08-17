// (function(){
//     angular.module("open_seat")
//         .controller("FloorBlueprintCtrl", FloorBlueprintCtrl)

//         FloorBlueprintCtrl.$inject = ["$window", "$state"];

//         function FloorBlueprintCtrl($window, $state){
//             var vm = this;
//             vm.title = "floor blueprint ctrl title";

//             vm.goToProfile = function(){
//                 var user_id = $window.localStorage["current_user_id"];
//                 $state.go("user-profile", { id: user_id });
//             }

//         }
// })()

(function(){
    angular.module("open_seat")
        .controller("FloorBlueprintCtrl", FloorBlueprintCtrl)

        FloorBlueprintCtrl.$inject = ["$window", "$state", "$cordovaGeolocation"];

        function FloorBlueprintCtrl($window, $state, $cordovaGeolocation){

            var vm = this;


            vm.goToProfile = function(){
                var user_id = $window.localStorage["current_user_id"];
                $state.go("user-profile", { id: user_id });
            }

            var errCallback = function(res){
                console.log("error... could not get location >>>", res);
            }

            var options = {timeout: 10000, enableHighAccuracy: true};
            $cordovaGeolocation.getCurrentPosition(options)
            .then(function(pos){
                // var latLng = new google.maps.LatLng("43.075685299999996", "-89.3978092");
                var latLng = new google.maps.LatLng(43.07457675206843, -89.40222144126892);
                console.log("current position", pos);
                var mapOptions = {
                    center: latLng,
                    zoom: 18,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }
                // initializing the map
                vm.map = new google.maps.Map(document.querySelector("#map"), mapOptions);

                // vm.map.addListener("click", function(e){
                //     console.log("latitude", e.latLng.lat())
                //     console.log("longitude", e.latLng.lng())
                    
                //     var marker = new google.maps.Marker({
                //         position: e.latLng,
                //         map: vm.map
                //     })
                // })

                var barnard_hall_rectangle = new google.maps.Rectangle({
                    map: vm.map,
                    strokeColor: "black",
                    strokeWeight: 2,
                    fillColor: "darkseagreen",
                    fillOpacity: 0.5,
                    bounds: {
                            north: 43.07485202759886,
                            south: 43.074281882601866,
                            east: -89.4017681479454,
                            west: -89.4028490781784
                    }
                })

                // adding a marker for the current position of the user once the map loads
                google.maps.event.addListenerOnce(vm.map, "idle", function(){
                    var marker = new google.maps.Marker({
                        map: vm.map,
                        animation: google.maps.Animation.DROP,
                        position: latLng
                    })

                    // adding a info window when clicking the marker
                    var infoWindow = new google.maps.InfoWindow({
                        content: "One person is on this floor."
                    })

                    google.maps.event.addListener(marker, "click", function(){
                        
                        infoWindow.open(vm.map, marker);
                    })



                })

            }, errCallback)



            
        }
})()