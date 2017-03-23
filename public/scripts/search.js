$(document).ready(function() {
  var firebase = initFirebase();
  var database = firebase.database();
  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      
    } else {
      // Redirect non-signed in users to the homepage.
      window.location.replace('/');
      return;
    }
  });
  
  $('#search-department-btn').on('click', this, function() {
    var departmentInput = $('.single-department:radio:checked');
    var department = departmentInput.val();
    
    var departmentRef = database.ref('documents/' + department);
    database.ref('documents/' + department).once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
    });
});
  });
});