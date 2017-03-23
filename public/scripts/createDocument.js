$(document).ready(function() {
  var firebase = initFirebase();
  var database = firebase.database();
  var currentUserId = null;
  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      currentUserId = user.uid;
    } else {
      window.location.replace('/');
    }
  });
  
  $('#create-document-btn').on('click', this, function() {
    var title = $('#document-title').val();
    var url = $('#document-url').val();
    var department = $('#document-department').val();
    var keywords = $('#document-keywords').val();
    
    // For IE 8 and such browsers.
    if (!Date.now) {
      Date.now = function now() {
        var date = new Date();
        return date.getTime();
      };
    }
    
    var currentTimeMillis = Date.now();
    createDocument(database, currentTimeMillis, currentUserId, title, url, department, keywords);
  });
  
  function createDocument(targetDatabase, creationTime, userId, title, url, department, keywords) {
    var ref = targetDatabase.ref('documents/' + department);
    var data = {
      creation_time: creationTime,
      uid: userId,
      title: title,
      url: url,
      keywords: keywords
    };
    
    ref.push(data);
  }
  
});
