// This is reusable code.
function initFirebase() {
  var config = {
      apiKey: 'AIzaSyDTLsprvv9GcYCmMHygGph-fXsA1BvEwF4',
      authDomain: 'document-tracker-cohort-20.firebaseapp.com',
      databaseURL: 'https://document-tracker-cohort-20.firebaseio.com',
      storageBucket: 'document-tracker-cohort-20.appspot.com',
      messagingSenderId: '409648985148'
  };
  firebase.initializeApp(config);
  return firebase;
}
