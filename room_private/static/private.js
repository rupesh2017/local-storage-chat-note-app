document.addEventListener('DOMContentLoaded',()=>{

   
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    const senduser =localStorage.getItem('usersid');
    
    socket.on('connect',()=>{

            document.querySelector('#new-message').onclick=function(){
            
                const selection = document.querySelector('#message').value;
                console.log(senduser);
                socket.emit('submit message',{'selection':selection,'senduser':senduser});
                return false;
            };
               
    });


    socket.on('announce message',(data)=>{
        const li = document.createElement('li');
        li.innerHTML=`${data.selection}`;
        document.querySelector('#add-message').append(li);
    });

      
});