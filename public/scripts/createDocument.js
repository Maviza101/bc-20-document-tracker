'use strict';

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
  
  // Functions for validating the properties of each field of a new document.
  function isValidTitle(title) {
    // Strip away all whitespace.
    var allChars = title.split(/\s+/).join('');
    if (allChars.length < 4) {
      return false;
    }

    return true;
  }
  
  function isValidUrl(url) {
    /*
      Use jQuery's trim() instead of the native trim() so to 
      support browsers that don't have the latter installed.
    */
    var trimmedUrl = $.trim(url);
    
    /*
      This is the regex used by the jQuery Validator plugin. Link is: 
      https://github.com/jzaefferer/jquery-validation/blob/f37c2d8131ca0e3c2af0093f6fd9d2c40c282663/src/core.js#L1159
      
      Also, note that I chose to leave the test for ftp addresses, as some can be 
      accessed via a browser. An example is: 
      ftp.vim.org/ftp/os/OpenBSD/songs/
    */
    var correctUrlPatter = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
    
    return correctUrlPatter.test(trimmedUrl);    
  }
  
  function isValidDepartment(department) {
    switch (department) {
      case 'success':
      case 'learning':
      case 'operations':
      case 'finance':
      case 'recruitment':
      case 'sales':
      case 'marketing':
        return true;
        break;
    }
    return false;
  }
  
  function isValidKeywords(keywords) {
    if (keywords === '') {
      return false;
    }
    
    var keywordsList = keywords.split(',');
    if (keywordsList.length < 1) {
      return false;
    }
    return true;
  }
  
  // End of validation functions.
  
  $('#create-document-btn').on('click', this, function() {
    var titleInput = $('#document-title');
    var title = titleInput.val();
    if (!isValidTitle(title)) {
      titleInput.attr('style', 'outline: 2px solid #ff2222');
      $('#document-title-error').show();
      return;
    } else {
      titleInput.attr('style', 'outline: 1px solid #22ff22');
      $('#document-title-error').hide();      
    }
    
    var urlInput = $('#document-url');
    var url = urlInput.val();
    if (!isValidUrl(url)) {
      urlInput.attr('style', 'outline: 2px solid #ff2222');
      $('#document-url-error').show();
      return;
    } else {
      urlInput.attr('style', 'outline: 1px solid #22ff22');
      $('#document-url-error').hide();      
    }
    
    var departmentInput = $('#document-department');
    var department = departmentInput.val();
    if (!isValidDepartment(department)) {
      departmentInput.attr('style', 'outline: 2px solid #ff2222');
      $('#document-department-error').show();
      return;
    } else {
      departmentInput.attr('style', 'outline: 1px solid #22ff22');
      $('#document-department-error').hide();      
    }
    
    var keywordsInput = $('#document-keywords');
    var rawKeywords = keywordsInput.val();
    var rawKeywordsList = rawKeywords.split(',');
    
    // Filter out invalid or wrongly-typed keywords.
    var keywordsList = rawKeywordsList.map(word => word.trim())
      .map(word => word.replace(/\s+/, ' '))
      .filter(word => word !== '' && word !== ' ');
    
    var keywords = keywordsList.join(',');
    if (!isValidKeywords(keywords)) {
      keywordsInput.attr('style', 'outline: 2px solid #ff2222');
      $('#document-keywords-error').show();
      return;
    } else {
      keywordsInput.attr('style', 'outline: 1px solid #22ff22');
      $('#document-keywords-error').hide();      
    }
    
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
