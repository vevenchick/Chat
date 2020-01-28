console.log("hi!");
var db = firebase.firestore();

var showOtherMes = db.collection("messages").orderBy("timeStamp", "desc").limit(30).onSnapshot(function (snapshot) {
  snapshot.docChanges().reverse().forEach(function (change) {
    if (change.type === "added") {
      var newMes = change.doc.data();
      console.log("New message: ", newMes);
      showMessage(newMes.userName, newMes.Text, newMes.timeStamp)
    }
  })
})
function onGetMessages(snapshot) {

  for (var i = snapshot.docs.length - 1; i >= 0; i--) {
    var message = snapshot.docs[i].data();
    showMessage(message.userName, message.Text, message.timeStamp);
  }
}

function showMessage(userName, messageText, timeStamp) {
  var chat = document.getElementById("chat");
  chat.innerHTML += `<div>
    <span class='un'>`+ userName + `</span>
    <span class='tm'>-(`+ timeStamp + `)-</span>
    <span class='text'>`+ messageText + `</span></div>`
  chat.scrollTop = 99999;

}




function saveMessage(userName, messageText, timeStamp) {
  console.log("Сообщение " + messageText + "отослано " + userName);
  return db.collection('messages').add({ userName: userName, Text: messageText, timeStamp: timeStamp });

}

function sendMessage() {
  var messageText = document.getElementById("messageText").value;
  var userName = document.getElementById("userName").value;
  var timeStamp = new Date().toLocaleString();
  saveMessage(userName, messageText, timeStamp);

}


function registrate() {
  var login = document.getElementById("login").value;
  var phoneNumber = document.getElementById("phoneNumber").value;
  var age = document.getElementById("age").value;
  var sex1 = document.getElementById("sex").value;
  console.log("Пользвователь " + login + " зарегистрирован с номером:" + phoneNumber);

  var phoneNumber = document.getElementById('phoneNumber').value;
  var appVerifier = window.recaptchaVerifier;
  firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function (confirmationResult) {
      $('#confirmCode').modal({});
      $('#checkCode').on('click', function (e) {
        var code = document.getElementById('verCode').value;
        confirmationResult.confirm(code).then(function (result) {

          var user = result.user;
          console.log('okey')
          changeState(4);
        }).catch(function (error) {
          console.log('error')

        });
      })
      console.log('send')
      window.confirmationResult = confirmationResult;
    }).catch(function (error) {

    });
  return false;

}
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha', {
  'size': 'normal',
  'callback': function (response) {


  },
  'expired-callback': function () {

  }
});
recaptchaVerifier.render().then(function (widgetId) {
  window.recaptchaWidgetId = widgetId;
});
function changeState(a) {
  var choose = document.getElementById("choose")
  var Registercontainer = document.getElementById("Registercontainer")
  var chatPage = document.getElementById("chatPage")
  var LogInContainer = document.getElementById("LogInContainer")
  if (a == 1) {
    choose.style.display = "none";
    LogInContainer.style.display = "block"
  }
  if (a == 2) {
    choose.style.display = "none";
    Registercontainer.style.display = "block";
  }
  if (a == 3) {
    LogInContainer.style.display = "none";
    chatPage.style.display = "block"
    if (a == 4) {
      Registercontainer.style.display = "none";
      chatPage.style.display = "block"

    }
    if (a == 5) {
      chatPage.style.display = "none"
      choose.style.display = "block";
    }
  }
}
