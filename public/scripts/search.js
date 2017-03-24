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

  $('#sign-out').on('click', function() {
    firebase.auth().signOut();
  });
  
  $('#search-department-btn').on('click', this, function() {
    var departmentInput = $('.single-department:radio:checked');
    var department = departmentInput.val();
    
    var departmentRef = database.ref('documents/' + department);
    departmentRef.once('value', function(snapshot) {
      var databaseRecords = snapshot.val();
      updateSearchResults(department, databaseRecords, 'department-search-results-target');
    });
  });
  
  $('#search-keyword-btn').on('click', this, function() {
    var keywordInput = $('#search-keyword');
    var keyword = keywordInput.val().trim();
    
    var keywordRef = database.ref('keywords/' + keyword);
    keywordRef.once('value', function(snapshot) {
      var databaseRecords = snapshot.val();
      updateSearchResults(keyword, databaseRecords, 'keyword-search-results-target');
    });
  });
  
  $('#search-title-btn').on('click', this, function() {
    var titleInput = $('#search-title');
    var title = titleInput.val().trim();
    
    var titleRef = database.ref('titles/' + title);
    console.log(titleRef);
    titleRef.once('value', function(snapshot) {
      var databaseRecords = snapshot.val();
      updateSearchResults(title, databaseRecords, 'title-search-results-target');
    });
  });
  
  function updateSearchResults(department, records, targetId) {
    var recordKeys = Object.keys(records);
    var resultsDestination = $('#' + targetId);

    for (var i = 0; i < recordKeys.length; i++) {
      var key = recordKeys[i];
      var record = records[key];
      var row = $('<tr>');

      var titleCell = $('<td>');
      titleCell.text(record.title);

      var urlCell = $('<td>');
      var urlElement = $('<a>');
      urlElement.text('Link');
      urlElement.attr('href', record.url);
      urlCell.append(urlElement);

      var departmentCell = $('<td>');
      departmentCell.text(department);

      var keywordsCell = $('<td>');
      keywordsCell.text(record.keywords);

      row.append(titleCell)
        .append(urlCell)
        .append(departmentCell)
        .append(keywordsCell);

      resultsDestination.append(row);
    }
  }
  
});
  