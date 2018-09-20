document.addEventListener('DOMContentLoaded',()=>{

    const storeduser = localStorage.getItem('user');
    const storedroom = localStorage.getItem('room');

    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    

    socket.on('connect',()=>{
        //not running second time
        socket.emit('join',{'user':storeduser,'room':storedroom});

        socket.emit('load message',{'room':storedroom});
   
        document.querySelector('#message-submit').onclick = ()=>{
            const msg = document.querySelector('#message').value;
            document.querySelector('#message').value='';
            socket.emit('message',{'user':storeduser,'message':msg,'room':storedroom});
            console.log(storedroom);
            return false;
        }

        document.querySelector('#myfiles').onchange=function(){
            var file = document.querySelector('#myfiles').files[0];
            var image_type = /image.*/;
            var myblob =  new Blob([file]);
            console.log(myblob);

            if(file.type.match(image_type))
            {
                
                console.log('emitting file')
                socket.emit('submit file',{'selection':myblob,'room':storedroom});
               

            }
            else
            {
                socket.emit('submit file',{'selection':'file not supported'});

            }
        }


        
                 
    });

    socket.on('chat',(data)=>{

        console.log('welcome to chat')
         const li = document.createElement('li');
         console.log('printing online')
         li.innerHTML=`${data.username} is online`
         document.querySelector('#tasks').append(li);   
                 
         
         const x = data.users;
         const y= data.channel;
         
         x.forEach(element => {
        const list = document.createElement('li');
        list.innerHTML = element;
        document.querySelector('#add-users').append(list);  
        });

        y.forEach(element => {
            const list2 = document.createElement('li');
            list2.innerHTML = element;
            document.querySelector('#add-channels').append(list2);  
            });
         
        });


    socket.on('send message',(data)=>{
        console.log(data.message);
        const li = document.createElement('li');       
        li.innerHTML=`${data.username}:${data.message}`;
        document.querySelector('#tasks').append(li);
       });
    

       socket.on('announce file',(data)=>{
        
        var blob = new Blob([data.selection]);
        console.log(blob);
        var reader = new FileReader();
        reader.onloadend = function(){      
            var img = new Image(width="500");
            img.src = reader.result;
            tasks.appendChild(img);

        };  
        reader.readAsDataURL(blob);	         
        
    });


    socket.on('unload message',(data)=>{
        //clear space
    console.log('unloading now');
    document.querySelector('#tasks').innerHTML ='';
    const z  = data.msg;
    console.log(z);

     z.forEach(element => {
        const list3 = document.createElement('li');
        console.log(element);
        list3.innerHTML = element;
        document.querySelector('#tasks').append(list3);  
        });

    });

   
});