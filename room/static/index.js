//code running on user machine
document.addEventListener('DOMContentLoaded',()=>{

    //connect to web socket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
//once connected,connect event is emitted



//disable message button

    socket.on('connect',()=>{
        document.querySelector('#submit-user').onclick= ()=>{
         const user = document.querySelector('#user').value;
        
          return false;
        
        };
        
        //onclick first then onchange does not work

       
        document.querySelector('#channel-list').onchange = function() {
            const  sendchannel = this.value;
            document.querySelector('#submit-user').onclick=function(){
                
                
                const selection = document.querySelector('#new-user').value;
                
                
                socket.emit('join',{'selection':selection,'sendchannel':sendchannel});
              
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



//load another page
//add user and channel(room) to html
//load chat.html




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