console.log("hi!");
var db = firebase.firestore();
var messages = db.collection("messages").get();
console.log(messages);
function onGetMessages(snapshot) {
    console.log(snapshot.docs[0].data());

}
function showMessage(userName, messageText, timeStamp) {
    var chat = document.getElementById("chat");
    chat.innerHTML += `<div>
    <span class='un'>`+ userName + `</span>
    <span class='tm'>-(`+ timeStamp + `)-</span>
    <span class='text'>`+ messageText + `</span></div>`
}
messages.then(onGetMessages);
function saveMessage(userName, messageText, timeStamp) {
    console.log("Сообщение " + messageText + "отослано " + userName);
    return db.collection('messages').add({ userName: userName, Text: messageText, timeStamp: timeStamp });

}
saveMessage(userName,messageText,timeStamp);
showMessage(userName,messageText,timeStamp);

