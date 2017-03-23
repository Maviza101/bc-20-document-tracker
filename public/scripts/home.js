$(document).ready(function() {
    // Reusable variables.
    var firebaseUiContainer = $('#firebaseui-auth-container');
  
    // initFirebase() is defined in initFirebase.js and imported with header.ejs.
    var firebase = initFirebase();
    firebase.auth().onAuthStateChanged(function(user) {
      var signInContainer = $('#sign-in-container');
      var signedInContainer = $('#signed-in-container');
      
      if (user) {
        
        signInContainer.hide();
        signedInContainer.show();
        
        // Redirect signed in users to their dashboard.
        window.location.replace('/users');
      } else {
        signedInContainer.hide();
        signInContainer.show();
        
        // FirebaseUI config.
        var uiConfig = {
          signInSuccessUrl: 'http://localhost:5000/users',
          signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            {
              provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
              scopes: [
                'public_profile',
                'email'
              ]
            }
          ]
        };
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        ui.start('#firebaseui-auth-container', uiConfig);
      }
    });
  });
