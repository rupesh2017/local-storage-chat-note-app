//code running on user machine
document.addEventListener('DOMContentLoaded',()=>{

    //connect to web socket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
//once connected,connect event is emitted





    socket.on('connect',()=>{
        document.querySelector('#submit').onclick= ()=>{
         const selection = document.querySelector('#task').value;
         const user = document.querySelector('#user').value;
         console.log(socket.id);

        
          
          //emit new event
          socket.emit('submit text',{'selection':selection,'user':user});
        
          return false;
        
        };
    });



   


    socket.on('announce text',(data)=>{
        const li = document.createElement('li');
        //mistake was here
        li.innerHTML=`text is here from  ${data.user}:${data.selection}`;
        //mistake was here
        document.querySelector('#tasks').append(li);

    });

});