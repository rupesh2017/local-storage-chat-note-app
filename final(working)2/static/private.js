document.addEventListener('DOMContentLoaded',()=>{

   
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    const senduser =localStorage.getItem('usersid');
    
    socket.on('connect',()=>{

            document.querySelector('#new-message').onclick=function(){
                console.log('let me run');
                const selection = document.querySelector('#message').value;
                const li = document.createElement('li');
                li.innerHTML = selection;
                document.querySelector('#add-message').append(li);
                console.log(senduser);
                socket.emit('submit message',{'selection':selection,'senduser':senduser});
                return false;
            };
               
    });


    socket.on('announce message',(data)=>{
        console.log('ok');
        const li = document.createElement('li');
        li.innerHTML=`${data.selection}`;
        document.querySelector('#add-message').append(li);
    });

      
});