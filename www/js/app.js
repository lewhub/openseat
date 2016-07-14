angular.module('library_app', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
     var isWebView;
     if (ionic.Platform.platform() === "macintel" || ionic.Platform.platform() === "win32" || ionic.Platform.platform() === "linux"){
       isWebView = true;
     } else {
       isWebView = false;
     }
     console.log(ionic.Platform.platform())
      console.log("visiting on web>>>", isWebView)
      console.log("hello world")
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport from snapping when text inputs are focused. Ionic handles this internally for a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

   

  });
})
