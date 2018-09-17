document.addEventListener('DOMContentLoaded',()=>{

    const storeduser = localStorage.getItem('user');
    const storedroom = localStorage.getItem('room');

    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    //get room and username using localstorage

    socket.on('connect',()=>{
        socket.emit('join',{'user':storeduser,'room':storedroom});   
        document.querySelector('#message-submit').onclick = ()=>{
            const msg = document.querySelector('#message').value;
            socket.emit('message',{'user':storeduser,'message':msg,'room':storedroom});
            
            console.log(storedroom);
            return false;
        }
           
    });

    socket.on('chat',(data)=>{

        console.log('welcome to chat')
         const li = document.createElement('li');
         li.innerHTML=`${data.username} is online`
         document.querySelector('#tasks').append(li);    
        });


    socket.on('send message',(data)=>{
        console.log(data.message);
        const li = document.createElement('li');       
        li.innerHTML=`${data.username}:${data.message}`;
        document.querySelector('#tasks').append(li);
       });
    
});