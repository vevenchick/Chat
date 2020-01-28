var ui = new firebaseui.auth.AuthUI(firebase.auth());

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
    document.getElementById("choose").style.display="none";
    //document.getElementById('phone').style.display='block'
    //document.getElementById('hi').style.display = "block"
    //document.getElementById('logout').style.display = "block"
    changeState(3);
  } else {
    //document.getElementById('phone').style.display='none'
    //  document.getElementById('logout').style.display = "none"
    uiStart();

  }
  return false;
});

function logout() {
  firebase.auth().signOut();
}
function uiStart() {
  ui.start('#hi', {
    callbacks: {
      signInSuccess: () => false,
    },
    signInOptions: [
      firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],

  });
}

