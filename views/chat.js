//MAKE CONNECTION
const socket = io.connect('http://localhost:5555'); //Front-End socket:

var message = document.getElementById('message'),
handle = document.getElementById('handle'),
btn = document.getElementById('send'),
output = document.getElementById('output'),
feedback = document.getElementById('feedback');

btn.addEventListener('click',()=>{
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
})

//Typing event
message.addEventListener('keypress',()=>{
    socket.emit('Typing...', handle.value)
}) 

//Listen for event:
socket.on('chat', (data)=>{
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong> ' + data.handle +  ': </strong>'+ data.message + '</p>';
    handle.value = '';
    message.value = '';
})

socket.on('Typing...', (data)=>{
    // feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';    
    feedback.innerHTML = '<p><em><strong>' + data + '</strong> is typing... </em></p>'; 

})