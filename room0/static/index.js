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

        
          
       //with message
          socket.emit('submit text',{'selection':selection,'user':user,'socketid':socket.id});
        
          return false;
        
        };
    });




    socket.on('announce text',(data)=>{
        const li = document.createElement('li');
        //mistake was here
        li.innerHTML=`text is here from  ${data.user}:${data.selection}`;
        //mistake was here
        console.log(data.userlist) //request.sid output


        document.querySelector('#tasks').append(li);

    });

});