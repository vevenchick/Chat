firebase.firestore();
function saveMessage(userName,messageText)
{
console.log("Сообщение " +messageText+ "отослано" +userName);
return firebase.firestore().collection( 'messages').add({ userName:userName,Text:messageText,timeStamp:new Date()});

}
function sendMessage()
{
var messageText=document.getElementById("messageText").value;
var userName=document.getElementById("userName").value;
saveMessage(userName,messageText);
}
