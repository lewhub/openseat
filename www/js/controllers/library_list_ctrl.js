(function(){
    angular.module("library_app")
        .controller("LibraryListCtrl", LibraryListCtrl)

        // name, address, photo, phone number, hours, distance from user in miles

        LibraryListCtrl.$inject = ["$ionicPopup", "$rootScope", "$state", "$window"]

        function LibraryListCtrl($ionicPopup, $rootScope, $state, $window){
            var vm = this;
            vm.title = "library list title";

            
            // vm.deregister = function(){
            //     $rootScope.$on("$stateChangeStart", function(event){
            //         event.preventDefault()
            //         console.log(event)
            //         vm.deregister();
            //     })
            // } 

            // vm.go_to_library_feed = function(){
            //      var aaa = $rootScope.$on("$stateChangeStart", function(event){
            //         event.preventDefault()
            //        $state.go("library_feed")
            //         aaa();
            //     })
            // }


            vm.all_libraries = [
                { name: "Astronomy Library", address: "6515 Sterling Hall 475", address_two: "N. Charter St.", phone: "(608)-262-1320", hours: "9:00am - 5:00pm", photo: "https://lh5.googleusercontent.com/proxy/I2oxzAbxqknvSt5bTndGkvzNISnc3vweGga8ofROIqU8TEFTHeptfd7mwViAa1ap8xA_tZI5YRN7XNVSVgXNntlAEzf0oA=w408-h306"},
                { name: "Art Library", address: "160 Conrad A. Elvehjem", address_two: "Building, 800 University Ave.", phone: "(608)-263-2258", hours: "9:00am - 4:45pm", photo: "https://lh4.googleusercontent.com/proxy/MQAVpUmqd49E7gWYmLtNfDv0m74lwCFHvJDCv4zt4JsokO7-R5eU2eLK52BqKXMhQgVIhgyoQEqyAXh8b3dFcg77xrxGr5bZNEeBu53I4wMmsUu1mmQPk-2BAXMTmCUzg-SpJzPVEoiiQC8FcaWltYzS9xSnYVU=w408-h305" },
                { name: "Business Library", address: "Rm 2200 Grainger Hall", address_two: "975 University Ave.", phone: "(608)-262-5935", hours: "9:00am - 5:00pm", photo: "https://lh4.googleusercontent.com/proxy/PWL5yO5fmJjEN3BfRM_hmkN6o8YAm2SdGOY0uZ8iKfEcWRL_x-Zz4agSSV5RJlI10W3aBfyxgZQWfh8DzaH8_uVvCzzZdltlWYQxBR83-515haTSFXPTfxVx6uM_fHROrVk81gzef6K2tC5cwX3oAKYujoqS7w=w408-h305" },
                { name: "Chemistry Library", address: "1101 University Ave.", address_two: "Chemistry Building 2361", phone: "(608)-262-2942", hours: "9:00am - 5:00pm", photo: "https://geo2.ggpht.com/cbk?panoid=r3sEaWAJi8S3yU81ywvruA&output=thumbnail&cb_client=search.TACTILE.gps&thumb=2&w=408&h=256&yaw=177.65123&pitch=0" },
                { name: "College Library", address: "Helen C. White", address_two: "Hall, 600 N. Park St.", phone: "(608)-262-3245", hours: "8:30am - 6:00pm", photo: "http://www.roadarch.com/11/8/mbrut.jpg" },
                { name: "Ebling Library", address: "Health Sciences Learning", address_two: "Center, 750 Highland Ave.", phone: "(608)-262-2020", hours: "7:30am - 5:45pm", photo: "https://lh5.googleusercontent.com/-DnVaLR2UbiU/Ud7z2z-ZNzI/AAAAAAAAZAk/RxOjd47gG14sywuDuwVQl1z6p1idCGe6w/s408-k-no/" },
                { name: "Geography Library", address: "550 N. Park St.", phone: "(608)-262-1706", hours: "9:00am - 4:30pm", photo: "https://geo3.ggpht.com/cbk?panoid=p7mRLdtR9BNbBRLCPb8_Ew&output=thumbnail&cb_client=search.TACTILE.gps&thumb=2&w=408&h=256&yaw=253.67703&pitch=0" },
                { name: "Law Library", address: "975 Bascom Mall", phone: "(608)-262-1128", hours: "8:30am - 6:00pm", photo: "https://lh4.googleusercontent.com/-3CrXcfscRWE/VsXh7iFbe1I/AAAAAAAAAB8/Vt56DhjTtR4TCI3RlFTOge1q4zzNU1now/s408-k-no/" },
                { name: "Limnology Library", address: "680 N. Park St.", phone: "(608)-262-4439", hours: "8:30am - 4:30pm", photo: "https://lh5.googleusercontent.com/-7hoDUcAvQv4/V2RKS5xBPYI/AAAAAAAAQH4/WwpE-NVX9Xk0AmC531P0yq1UyMDF1RHHQCLIB/s408-k-no/" },
                { name: "Math Library", address: "B224 Van Vleck", address_two: "Hall, 480 Lincoln Dr.", phone: "(608)-262-3596", hours: "8:30am - 5:00pm", photo: "https://lh6.googleusercontent.com/-fbQIQr9QxPk/Vkuh1G2ks4I/AAAAAAAACQ0/tbkGr-GxUuEkONS3Ss15CkkP3l9oqgRaw/s455-k-no/" },
                { name: "Memorial Library", address: "728 State St.", phone: "(608)-262-3193", hours: "8:00am - 9:45pm", photo: "http://www.kraemerbrothers.com/shop/kraemer.hitsinabox.pro/images/12169_0_0.jpg" },
                { name: "MERIT Library", address: "368 Teacher Education", address_two: "Bldg, 225 N. Mills St.", phone: "(608)-263-4750", hours: "8:00am - 5:00pm", photo: "https://lh5.googleusercontent.com/-CCwBo-35UNM/Vk9pHxSvqLI/AAAAAAAACWQ/KtxMw-5tfP48PHyeKSw-qMSFwTHvT6Ofw/s455-k-no/" },
                { name: "Physics Library", address: "4220 Chamberlin Hall,", address_two: "1150 University Ave.", phone: "(608)-262-9500", hours: "8:30am - 4:30pm", photo: "https://lh3.googleusercontent.com/-JcqcI5qlB7Y/VkuDT4DAumI/AAAAAAAACdQ/qr5zFyQZ_VYhlkW9orrqd10rv0m9T9tPg/s455-k-no/" },
                { name: "Social Science Reference Library", address: "8432 Social Science", address_two: "Building, 1180 Observatory Dr.", phone: "(608)-262-6195", hours: "10:00am - 4:00pm", photo: "https://geo2.ggpht.com/cbk?panoid=AYjvwBZMkxkgQGhONfgjJA&output=thumbnail&cb_client=search.TACTILE.gps&thumb=2&w=408&h=256&yaw=0.10509339&pitch=0" },
                { name: "Zoological Museum Research Library", address: "250 N Mills St.", phone: "(608)-262-3766", hours: "8:30am - 4:30pm", photo: "https://lh6.googleusercontent.com/-R69mYE5hsEA/UdsFDFHJ9FI/AAAAAAAARCE/U4Qtry9vHBAqZ93YOaGl_XdbQDfIaMisQ/s408-k-no/" }
            ]

            vm.show_modal = function(library_name, phone_num){
                console.log(phone_num)
                $ionicPopup.confirm({
                    title: library_name,
                    template: "<p style='text-align: center; margin-top: -10px;'>Do you want to call this library?</p><br>" +  "<h3 style='text-align: center; margin-top: -18px;'>" + phone_num + "</h3>",
                    okText: "CALL",
                    okType: "button-calm",
                    cancelText: "Cancel",
                    cancelType: "button-assertive"
                })
                
            }

            vm.passName = function(name){
                $window.localStorage["library_name"] = name
                console.log(name)
            }

            //  vm.showPartAddress = function(address){
            //     var addr_array = address.split(" ")
            //     var sum = 0;
            //     var temp_array = addr_array;
            //     var add_array = new Array();
            //     for (var i = 0; i < addr_array.length; i++){
            //         var temp_sum = sum + addr_array[i].length;
            //         if (sum < 30){
            //             if (temp_sum < 30){
            //                 sum += addr_array[i].length;
            //                 add_array.push(addr_array[i])
            //             } else {
            //                 console.log(address)
            //                 add_array.pop()
            //             }
            //         }
            //     }
            //     // console.log(add_array)
        
            //     return add_array.join(" ");
            //  }
        }

       

})()