$(document).ready(function() {
  // initFirebase() is defined in initFirebase.js and imported with header.ejs.
  var firebase = initFirebase();
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      
    }
    else {
      window.location.replace('/');
    }
  });

  $('#sign-out').on('click', function() {
    firebase.auth().signOut()
      .then(function() {
        $('#sign-out-status').text('You have signed out.');
      })
      .catch(function(error) {
        // An error happened.
      });
  });
  
  $('#create-document').on('click', this, function(event) {
    event.preventDefault();
    window.location.href = '/createDocument';
  });
});
    