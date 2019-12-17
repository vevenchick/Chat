var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#hi', {
    signInOptions: [
      firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Other config options...
  });
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      var phone = user.phoneNumber;
      document.getElementById('phone').innerHTML=phone;
      document.getElementById('hi').style.display="none";
      document.getElementById('logOut').style.display="block"//оставить номер и кнопкуРАБОЧУЮ
      // ...
    } else {
      document.getElementById('hi').style.display="visibility: visible";//показать ввод       // User is signed out.
      // ...
    }
  });
  function logout(){
    firebase.auth().signOut();}