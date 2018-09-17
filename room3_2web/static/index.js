document.addEventListener('DOMContentLoaded',()=>{

    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    socket.on('chat',(data)=>{

     console.log(data.username);
     const li = document.createElement('li');
     li.innerHTML=`${data.username} is online`
     document.querySelector('#message-list').append(li);

    });
    
});