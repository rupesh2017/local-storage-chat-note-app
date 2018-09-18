document.addEventListener('DOMContentLoaded',()=>{

   
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);


    socket.on('connect',()=>{
        document.querySelector('#submit-user').onclick= ()=>{
         const user = document.querySelector('#user').value;
         
          socket.emit('submit user',{'user':user});      
          return false;
        
        };
        
    
    
            document.querySelector('#new-message').onclick=function(){
            
                const selection = document.querySelector('#message').value;
                socket.emit('submit message',{'selection':selection,'senduser':senduser});
                return false;
            };
               
    });

    socket.on('announce user',(data)=>{
        const option = document.createElement('option');        
       option.innerHTML=`${data.user}`;
       
        document.querySelector('#add-user').append(option);

    });

    socket.on('announce message',(data)=>{
        const li = document.createElement('li');
        li.innerHTML=`${data.selection}`;
        document.querySelector('#add-message').append(li);
    });

      
});