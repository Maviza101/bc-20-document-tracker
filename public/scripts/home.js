$(document).ready(function() {
    // initFirebase() is defined in initFirebase.js and imported with header.ejs.
    var firebase = initFirebase();
    firebase.auth().onAuthStateChanged(function(user) {
      var logInContainer = $('#log-in-container');
      var loggedInContainer = $('#logged-in-container');
      if (user === null) {
        loggedInContainer.hide();
        logInContainer.show();
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
        logInContainer.hide();
        loggedInContainer.show();
        // Redirect users to their dashboard.
        window.location.replace('/users');
      }
    });
  });
