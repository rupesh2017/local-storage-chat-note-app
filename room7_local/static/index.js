document.addEventListener('DOMContentLoaded',()=>{

    let messagebox = localStorage.getItem('room')?JSON.parse(localStorage.getItem('room')):[];
    localStorage.setItem('room',JSON.stringify(messagebox));
    let data = JSON.parse(localStorage.getItem('room'));

    function display(){
        data.forEach(element => {
            const li = document.createElement('li');
            li.innerHTML = element;
            document.querySelector('#tasks').append(li);               
        });     
    }

    

    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);



        socket.on('connect',()=>{
            document.querySelector('#channel-list').onchange=function(){
                const user = document.querySelector('#user').value;
                const room = this.value;
                console.log(user);
                console.log(room);
                if( display(localStorage.getItem(room)))
                {
                    display();
                }
                document.querySelector('#submit').onclick = ()=>{
                socket.emit('join',{'user':user,'room':room});  
                return false;          
                };

                }
               

        //on change room , clear page and load message

        //store room list in backend


        document.querySelector('#message-submit').onclick = ()=>{
            const msg = document.querySelector('#message').value;
            console.log('helllllo i '+ msg);
            messagebox.push(msg);
            localStorage.setItem(room.value,JSON.stringify(messagebox));
            console.log('hello');
            console.log(user.value);
            console.log(room.value);
            console.log('end');
            socket.emit('message',{'user':user.value,'message':msg,'room':room.value});
            return false;
        }
       
        //store in backend
        document.querySelector('#channel-submit').onclick =()=>{
            console.log('hurry man');
            // const li = document.createElement('li');
             const channel = document.querySelector('#channel').value;
            // li.innerHTML = channel;
             console.log(channel);
            // document.querySelector('#channel-list').append(li);
             socket.emit('create room',{'channel':channel});
             console.log('emitted');
             return false;
             
        }
        //load from backend when page connect (index.html)


        
        //save message in local storage and store in backend
    
       
    });

    socket.on('chat',(data)=>{

    console.log('welcome to chat')
     const li = document.createElement('li');
     li.innerHTML=`${data.username} is online`
     
     messagebox.push(data.username + ' is online');
     localStorage.setItem(room.value,JSON.stringify(messagebox));
     document.querySelector('#tasks').append(li);

    });


    socket.on('send message',(data)=>{

     console.log('now chat');
     console.log('i am back');
     console.log(data.username);
     const li = document.createElement('li');
     //add time 
     console.log('i am printing  '+ data.username);
     console.log('i am printing   message  '+ data.message);
     console.log(data.message);
     const now = new Date();
     li.innerHTML=`[${now}] ${data.username}:${data.message}`;

     document.querySelector('#tasks').append(li);

    });
   
});