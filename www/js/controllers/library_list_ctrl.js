(function(){
    angular.module("open_seat")
        .controller("LibraryListCtrl", LibraryListCtrl)

        // name, address, photo, phone number, hours, distance from user in miles

        LibraryListCtrl.$inject = ["$ionicPopup", "$rootScope", "$state", "$window", "user_fac"]

        function LibraryListCtrl($ionicPopup, $rootScope, $state, $window, user_fac){
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

            var errCallback = function(res){
                console.log("error >>>", res)
            }

            vm.getUserInfo = function(){
                var current_user_id = $window.localStorage["current_user_id"]
                user_fac.show(current_user_id).then(function(res){
                    console.log(res.data.user.school)
                    vm.current_school = res.data.user.school;
                    vm.show_current_library_feed = function(){
                        switch (vm.current_school){
                            case "University of Wisconsin Madison":
                                vm.all_libraries = vm.wisconsin_libraries;
                                break;
                            case "University of California Berkeley":
                                vm.all_libraries = vm.berkeley_libraries;
                                break;
                            case "Howard University":
                                vm.all_libraries = vm.howard_libraries;
                                break;
                            case "Michigan State University":
                                vm.all_libraries = vm.michigan_state_libraries;
                                break;
                            default:
                                console.log("school >>>", vm.current_school)
                                console.log("unable to find school in database");
                                break;
                        }
                    }
                    vm.show_current_library_feed();
                }, errCallback)
            }
            vm.getUserInfo();
            
            vm.all_libraries = new Array();

            vm.wisconsin_libraries = [
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

            vm.berkeley_libraries = [
                {name: "Anthropology Library", address: "230 Kroeber Hall", phone: "510-642-2400", hours: "10am - 5pm" , photo: "http://www.lib.berkeley.edu/hours/system/pictures/134/medium/kroeber.jpg?1309378446"},
                {name: "Art History/Classics Library", address: "308 Doe Library", phone: "510-642-7361", hours: "11am - 5pm" , photo: "http://www.lib.berkeley.edu/hours/system/pictures/123/medium/doe.jpg?1309378443"},
                {name: "BAMPFA Film Library & Study Center", address: "2155 Center Street", phone: "510-642-1437", hours: "1pm - 5pm" , photo: "http://www.lib.berkeley.edu/hours/system/pictures/141/medium/pacific-film-archive.jpg?1452017510"},
                {name: "Bancroft Library/University Archives", address: "The Bancroft Library", phone: "510-642-6481", hours: "10am - 5pm" , photo: "http://www.lib.berkeley.edu/hours/system/pictures/125/medium/bancroft.jpg?1309378444"},
                {name: "Berkeley Law Library", address: "Floor 2, Boalt Hall", phone: "510-642-4044", hours: "8am -9pm" , photo: "http://www.lib.berkeley.edu/hours/system/pictures/154/medium/berkeley-law.jpg?1387403099"},
                {name: "Bioscience & Natural Resources Library", address: "2101 Valley Life Sciences Building", phone: "510-642-2531", hours: "9am - 5pm" , photo: "http://www.lib.berkeley.edu/hours/system/pictures/146/medium/vlsb.jpg?1309378448"},
                {name: "Business Library", address: "Haas School of Business", phone: "510-642-0400", hours: "10am - 6pm" , photo: "http://www.lib.berkeley.edu/hours/system/pictures/129/medium/haasbusiness.jpg?1309378445"},
                {name: "Career Counseling Library", address: "2222 Bancroft Way", address_two: "(courtyard of the Tang Center)", phone: "510-642-2367", hours: "10am - 5pm" , photo: "http://www.lib.berkeley.edu/hours/system/pictures/143/medium/tang.jpg?1309378448"},
                {name: "CED Visual Resources Center", address: "492 Wurster Hall", phone: "510-642-3439", hours: "1pm - 5pm" , photo: "http://www.lib.berkeley.edu/hours/system/pictures/147/medium/wurster.jpg?1309378449"},
                {name: "Chemistry and Chemical Engineering Library", address: "100 Hildebrand Hall", phone: "510-642-3753", hours: "9am - 5pm" , photo: "http://www.lib.berkeley.edu/hours/system/pictures/132/medium/hildebrand.jpg?1309378445"},
                {name: "Copy Center", address: "321 Moffitt Library", phone: "510-643-7427", hours: "9am - 5pm" , photo: "http://www.lib.berkeley.edu/hours/system/pictures/139/medium/moffitt.jpg?1309378447"},
                {name: "Data Lab", address: "189 Doe Annex", phone: "510-423-3282", hours: "By Appointment" , photo: "http://www.lib.berkeley.edu/hours/system/pictures/123/medium/doe.jpg?1309378443"},
                {name: "Doe Library", address: "Doe Library", phone: "510-642-6657", hours: "9am - 9pm" , photo: "http://www.lib.berkeley.edu/hours/system/pictures/123/medium/doe.jpg?1309378443"},
                {name: "Earth Sciences & Map Library", address: "50 McCone Hall", phone: "510-642-2997", hours: "9am - 5pm" , photo: "http://www.lib.berkeley.edu/hours/system/pictures/136/medium/mccone.jpg?1309378446"},
                {name: "East Asian Library", address: "C.V. Starr Library", phone: "510-642-2556", hours: "9am - 5pm" , photo: "http://www.lib.berkeley.edu/hours/system/pictures/124/medium/eal.jpg?1309378444"},
                {name: "Education Psychology Library", address: "2600 Tolman Hall", phone: "510-642-4209", hours: "9am - 5pm" , photo: "http://www.lib.berkeley.edu/hours/system/pictures/144/medium/tolman.jpg?1309378448"}
            ]

            vm.howard_libraries = [
                {name: "Founders Library", address: "500 Howard Pl NW", phone: "202.499.4542", hours: "8:00am - 7:00pm", photo: "http://s3.amazonaws.com/libapps/customers/206/images/foundersicon.jpg"},
                {name: "School of Business Library", address: "500 Howard Pl NW", phone: "202.499.4542", hours: "8:00am - 5:00pm", photo: "http://s3.amazonaws.com/libapps/customers/206/images/business2.jpg"},
                {name: "School of Divinity Library", address: "500 Howard Pl NW", phone: "202.499.4542", hours: "9:00am - 4:30pm", photo: "http://s3.amazonaws.com/libapps/customers/206/images/Lawatnighticon.jpg"},
                {name: "School of Social Work Library", address: "500 Howard Pl NW", phone: "202.499.4542", hours: "8:00am - 5:00pm", photo: "http://s3.amazonaws.com/libapps/customers/206/images/socialworkicon.jpg"},
                {name: "Undergraduate Library", address: "500 Howard Pl NW", phone: "202.499.4542", hours: "9:00am - 4:30pm", photo: "http://s3.amazonaws.com/libapps/customers/206/images/Undergradicon.jpg"},
                {name: "Louis Stokes Health Sciences Library", address: "500 Howard Pl NW", phone: "202.499.4542", hours: "9:00am - 4:30pm", photo: "http://s3.amazonaws.com/libapps/customers/206/images/louisstokesicon.jpg"},
                {name: "School of Law Library", address: "500 Howard Pl NW", phone: "202.499.4542", hours: "9:00am - 4:30pm", photo: "http://s3.amazonaws.com/libapps/customers/206/images/lawicon.jpg"}
            ]

            vm.michigan_state_libraries = [
                {name: "Main Library", address: "366 W. Circle Drive", phone: "(517) 432-6123", hours: "8:00am - 5:00pm", photo: "https://geo3.ggpht.com/cbk?panoid=IwmBEhR_jrCQAOQF5lSvFA&output=thumbnail&cb_client=search.TACTILE.gps&thumb=2&w=408&h=256&yaw=166.25699&pitch=0"},
                {name: "Gast Business Library", address: "648 N. Shaw Lane", phone: "(517) 355-3380", hours: "8:00am - 10:00pm", photo: "https://lh4.googleusercontent.com/-_UDZJtLr3Zs/UrRxNsy8mWI/AAAAAAAAABE/jKtKiSWGq9QrYynAjnxxTj9X7CY2STuPQ/s408-k-no/"},
                {name: "Gull Lake Library", address: "3700 East Gull Lake Dr.", phone: "(269) 671-2310", hours: "8:00am - 5:00pm", photo: "https://geo0.ggpht.com/cbk?panoid=FV1rw5ocmVvC6cC5pk_NMg&output=thumbnail&cb_client=search.TACTILE.gps&thumb=2&w=408&h=256&yaw=168.55988&pitch=0"},
                {name: "Law College Library", address: "648 N Shaw Ln", phone: "(517) 432-6800", hours: "8:00am - 12:00am", photo: "https://geo3.ggpht.com/cbk?panoid=A8XPR_fnIsFkxWkgUitjbA&output=thumbnail&cb_client=search.TACTILE.gps&thumb=2&w=408&h=256&yaw=196.15596&pitch=0"},
                {name: "University Archives and Historical Collections", address: "Conrad Hall, 888 Wilson Road", phone: "(517) 355-2330", hours: "8:00am - 5:00pm", photo: "https://lh6.googleusercontent.com/proxy/9UIBsP77ofuHlUZ3JQeN0IDMQ_g25ICGt3ryCCT2h1o2pBgiDQX4HGPC8_QHdMM7DS84gJtZofLjFQQQ5pVTpbPJBBsSBxjCHuQWcv6phZx0O_A96EMP_29NUPc9hlz7C88Hci0nZ2s3qA-OGZuR0H1eqgA-9w=w434-h256"},
                {name: "Map Library", address: "Main Library, 3rd Floor, West Wing", phone: "(517) 884-6467", hours: "8:00am - 8:00pm", photo: "https://lh3.googleusercontent.com/proxy/9QWbxQxD84ZKaoBMQbAuZ3DmuACylXthtuEVXlOSW-q-2WB1Q6dD0fsK6mFCXXImlRK_WkYrg8wfowfhtFWmhMKVNMysjZBgeSxZGvWWcZIU0sPUPLFzqpDB4J5MWydplV06AX9VRM1l2L53qFQ7qW7_q4Nv4uc=w521-h256"},
                {name: "Vincent Voice Library", address: "Main Library, 4th Floor, West Wing", phone: "(517) 884-6470", hours: "8:00am - 5:00pm", photo: "https://tic.msu.edu/images/beardcollection.jpg"}
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

            vm.goToProfile = function(){
                var user_id = $window.localStorage["current_user_id"];
                $state.go("user-profile", { id: user_id });
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