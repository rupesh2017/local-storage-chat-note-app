document.addEventListener('DOMContentLoaded',()=>{

    let messagebox = localStorage.getItem('message-list')?JSON.parse(localStorage.getItem('message-list')):[];
    localStorage.setItem('message-list',JSON.stringify(messagebox));
    let data = JSON.parse(localStorage.getItem('message-list'));

    function display(){
        data.forEach(element => {
            const li = document.createElement('li');
            li.innerHTML = element;
            document.querySelector('#tasks').append(li);               
        });     
    }

    display();

    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);


    socket.on('connect',()=>{
        document.querySelector('#submit').onclick= ()=>{
        
         const user = document.querySelector('#user').value;
         const room = document.querySelector('#room').value;
          socket.emit('join',{'user':user,'room':room});            
          return false;
        
        };

        //load room from backend
        //on change room , clear page and load message

        //store room list in backend


        document.querySelector('#message-submit').onclick = ()=>{
            const msg = document.querySelector('#message').value;
            console.log('helllllo i '+ msg);
            messagebox.push(msg);
            localStorage.setItem('message-list',JSON.stringify(messagebox));
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
     localStorage.setItem('message-list',JSON.stringify(messagebox));
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