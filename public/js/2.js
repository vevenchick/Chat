var ui = new firebaseui.auth.AuthUI(firebase.auth());

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    var phone = user.phoneNumber;
    document.getElementById("choose").style.display = "none";
    getUsersInfo(user.phoneNumber);
    changeState(3);
  } else {

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

