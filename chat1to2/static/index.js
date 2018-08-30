//code running on user machine
document.addEventListener('DOMContentLoaded',()=>{

    //connect to web socket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
//once connected,connect event is emitted



//disable message button

    socket.on('connect',()=>{
        document.querySelector('#submit-user').onclick= ()=>{
         const user = document.querySelector('#user').value;
         //disable  user button
         //enable message button

         console.log(socket.id);
          //emit new event
          socket.emit('submit user',{'user':user});
        
          return false;
        
        };

        document.querySelector('#submit-message').onclick=()=>{
            const selection = document.querySelector('#message').value;
            socket.emit('submit message',{'selection':selection});
            console.log(selection)
            return false;

        };

        
    });

    socket.on('announce user',(data)=>{
        const li = document.createElement('li');
        //mistake was here
        li.innerHTML=`${data.user}`;
        //mistake was here
        console.log(data.userlist) //request.sid output


        document.querySelector('#add-user').append(li);

    });





    socket.on('announce message',(data)=>{
        const li = document.createElement('li');
        
        li.innerHTML=`${data.selection}`;
        
        document.querySelector('#add-message').append(li);

    });


    

});


