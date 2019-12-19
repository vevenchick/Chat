var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#hi', {
  callbacks: {
    signInSuccess: () => false,
  },
  signInOptions: [
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  // Other config options...
});
firebase.auth().onAuthStateChanged(function (user) {
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
    document.getElementById('phone').innerHTML = phone;
    document.getElementById('hi').style.display = "none";
    document.getElementById('logOut').style.display = "block";
    // ...
  } else {
    document.getElementById('hi').style.display = "block";
    document.getElementById('logOut').style.display = "none";

  }
  return false;
});

function logout() {
  firebase.auth().signOut();
}