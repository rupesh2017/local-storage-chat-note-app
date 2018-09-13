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

       //  console.log(socket.id);
          //emit new event
          socket.emit('submit user',{'user':user});
        
          return false;
        
        };
        
        //onclick first then onchange does not work

        //disable onclick until user is selected.
        document.querySelector('#add-user').onchange = function() {
            const  senduser = this.value;
            document.querySelector('#new-message').onclick=function(){
                //select message
                
                const selection = document.querySelector('#message').value;
                
                //select user
                socket.emit('submit message',{'selection':selection,'senduser':senduser});
              //  console.log(selection)
                return false;
    
            };
            };

        
    });

    socket.on('announce user',(data)=>{
        const option = document.createElement('option');
        
        console.log(data.user)
        
       option.innerHTML=`${data.user}`;
       
        
        console.log(data.userlist) //request.sid output


        document.querySelector('#add-user').append(option);

    });





    socket.on('announce message',(data)=>{
        const li = document.createElement('li');
        
        li.innerHTML=`${data.selection}`;
        console.log('name of senduser')
        console.log(data.senduser)
        console.log('select user socket id is')
        console.log(data.sid)
        document.querySelector('#add-message').append(li);


    });

     

    

});