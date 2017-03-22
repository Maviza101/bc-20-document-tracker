'use strict';

$(document).ready(function() {
    // Reusable variables.
    var firebaseUiContainer = $('#firebaseui-auth-container');
  
    // initFirebase() is defined in initFirebase.js and imported with header.ejs.
    var firebase = initFirebase();
    firebase.auth().onAuthStateChanged(function(user) {
      var signInContainer = $('#sign-in-container');
      var signedInContainer = $('#signed-in-container');
      if (user === null) {
        signedInContainer.hide();
        signInContainer.show();
        // FirebaseUI config.
        var uiConfig = {
          signInSuccessUrl: 'http://localhost:5000/users',
          signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
          ]
        };

        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        ui.start('#firebaseui-auth-container', uiConfig);
      }
      else {
        signInContainer.hide();
        signedInContainer.show();
        // Redirect signed in users to their dashboard.
        window.location.replace('/users');
      }
    });
    
    
  });
