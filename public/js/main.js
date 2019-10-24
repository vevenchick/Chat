console.log("hi!");
var db = firebase.firestore();
//var messages = db.collection("messages").get();
var showOtherMes=db.collection("messages").orderBy("timeStamp","desc").limit(30).onSnapshot(function(snapshot)
{ snapshot.docChanges().reverse().forEach(function(change) {
    if (change.type === "added") {
        var newMes=change.doc.data();
        console.log ("New message: ",newMes);
        showMessage(newMes.userName,newMes.Text,newMes.timeStamp)
    }})
})

//console.log(messages);


function onGetMessages(snapshot) {
    //console.log(snapshot.docs[0].data());
     for(var i=snapshot.docs.length-1;i >= 0;i--)
     {
        var message = snapshot.docs[i].data();
         showMessage(message.userName,message.Text,message.timeStamp);
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
//  messages.then(onGetMessages);
   


function saveMessage(userName, messageText, timeStamp) {
    console.log("Сообщение " + messageText + "отослано " + userName);
    return db.collection('messages').add({ userName: userName, Text: messageText, timeStamp: timeStamp });

}

function sendMessage() 
{
    var messageText = document.getElementById("messageText").value;
    var userName = document.getElementById("userName").value;
    var timeStamp = new Date().toLocaleString();
    saveMessage(userName,messageText,timeStamp);
    
}

