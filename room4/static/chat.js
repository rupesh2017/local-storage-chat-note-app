document.addEventListener('DOMContentLoaded',()=>{

    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);


    

       
    socket.on('chat',(data)=>{

        console.log('welcome to chat')
     const li = document.createElement('li');
     li.innerHTML=`${data.username} is online`
     document.querySelector('#tasks').append(li);

    });
    
    
});