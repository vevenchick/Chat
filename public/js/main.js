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
function saveRegistForm(){
    console.log("Пользвователь" + login + "зарегистрирован");
    return db.collection('users').add({ login,phoneNumbe,age,sex1,sex2 });

}
function registrate(login,phoneNumbe,age,sex1,sex2) {
var login=document.getElementsByName("login");
var phoneNumber=document.getElementsByName("phoneNumber");
var age =document.getElementsByName("age");
var sex1=document.getElementsByName("sex1");
var sex2=document.getElementsByName("sex2");
registrate(login,phoneNumbe,age,sex1,sex2);
}

