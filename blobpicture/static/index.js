document.addEventListener('DOMContentLoaded',()=>{
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    socket.on('connect',()=>{
        document.querySelector('#submit-user').onclick= ()=>{
         const user = document.querySelector('#user').value;
        
          socket.emit('submit user',{'user':user});
        
          return false;
        
        };
        

            document.querySelector('#add-user').onchange = function() {
                const  senduser = this.value;
                console.log(senduser);
            document.querySelector('#myfiles').onchange=function(){
                var file = document.querySelector('#myfiles').files[0];
                var image_type = /image.*/;
                var myblob =  new Blob([file]);
                console.log(myblob);
    
                if(file.type.match(image_type))
                {
                    
                    console.log('emitting file')
                    socket.emit('submit file',{'selection':myblob,'senduser':senduser});
                   
    
                }
                else
                {
                    socket.emit('submit file',{'selection':'file not supported','senduser':senduser});

                }
    
            }
        }

        
    });

    socket.on('announce user',(data)=>{
        const option = document.createElement('option');
        
        console.log(data.user)

       option.innerHTML=`${data.user}`;

        console.log(data.userlist) 
        
        document.querySelector('#add-user').append(option);

    });


    socket.on('announce file',(data)=>{
        console.log('reading file')


        var blob = new Blob([data.selection]);
        console.log(blob);
        var reader = new FileReader();
        reader.onloadend = function(){
            
            var img = new Image(width="500");
            img.src = reader.result;
            fileDisplayArea.appendChild(img);

        };  
        reader.readAsDataURL(blob);	

        
    

        
        
    });
     

    

});