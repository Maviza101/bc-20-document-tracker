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
      else {
        signInContainer.hide();
        signedInContainer.show();
        // Redirect signed in users to their dashboard.
        window.location.replace('/users');
      }
    });
    /* // TODO: Use event.preventDefault() in all click event.
    // For the sign in/register with email section.
    $('.tabs').on('click', 'li a', function(e) {
    e.preventDefault();
    var currentTabLink = $(this);
    var targetPane = currentTabLink.attr('href');

     $('.active').removeClass('active');
     currentTabLink.addClass('active');

     $('.show').removeClass('show')
        .addClass('hide')
        .hide();

      $(targetPane).removeClass('hide')
        .addClass('show')
        .hide()
        .fadeIn(550);
    });
    
    $('#email-auth-start-btn').on('click', this, function() {
      $(this).hide();
      firebaseUiContainer.hide();
      $('#email-auth-forms-container').show(500);
    });
  
    $('.cancel-email-auth').on('click', this, function() {
      $('#email-auth-forms-container').hide();
      firebaseUiContainer.show(500);
      $('#email-auth-start-btn').show(500);
    });
  
    // Validation functions 
    function isValidEmail(email) {
      // Trivial case. The shortest email is of the form a@p.cr, which is 6 chars long.
      if (email.length < 7) {
        return false;
      }
      // FUTURE: Use 63 as the upper limit of the length of a TLD. 
      // See http://data.iana.org/TLD/tlds-alpha-by-domain.txt for all current TLDs
      var emailReg = /^([\w-\.]+@([\w-]+\.)+[s\w-]{2,20})?$/;
      return emailReg.test(email);
    }
    function isValidPassword(password) {
      // Each password must have an uppercase letter, symbol and number, and be at least 8 chars in length.
      if (password.length < 8) {
        return false;
      }
      if (/[A-Z].*[A-Z]/.test(password) == false) {
        return false;
      }
      if (/[0-9].*[0-9]/.test(password) == false) {
        return false;
      }
      if (/[^a-zA-Z0-9].*[^a-zA-Z0-9]/.test(password) == false) {
        return false;
      }
      return true;
    }
    // End of validation functions
  
    // Sign in with email and password 
    $('#email-auth-sign-in-btn').on('click', this, function() {
      $('#email-auth-wrong-account-details').hide();
      var emailInput = $('#sign-in-email');
      var email = emailInput.val();
      if (!isValidEmail(email)) {
        emailInput.attr('style', 'outline: 2px solid #ff2222');
        $('#sign-in-email-error').show();
        return;
      }
      else {
        emailInput.attr('style', 'outline: 1px solid #22ff22');
        $('#sign-in-email-error').hide();
      }
      
      var passwordInput = $('#sign-in-password');
      var password = passwordInput.val();
      if (!isValidPassword(password)) {
        passwordInput.attr('style', 'outline: 2px solid #ff2222');
        $('#sign-in-password-error').show();
        return;
      }
      else {
        passwordInput.attr('style', 'outline: 1px solid #22ff22');
        $('#sign-in-password-error').hide();        
      }
      
      // If everything is valid...
      $(this).attr('style', 'visibility: hidden');
      $('#email-sign-in-loading-img').attr('style', 'display: inline-block');
      
      firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
        window.location.replace('/users');
      })
      .catch(function(error) {
        // Handle Errors here.
        console.log(error);
        // NB: The meaning of $(this) that was used above has changed in this context. 
        $('#email-auth-sign-in-btn').attr('style', 'visibility: visible');
        $('#email-sign-in-loading-img').attr('style', 'display: none');
        $('#email-auth-wrong-account-details').show();
        
      });
      
    });
    // End of sign in with email and password. 
  
    $('#email-auth-register-btn').on('click', this, function() {
      
    });
*/
  });
