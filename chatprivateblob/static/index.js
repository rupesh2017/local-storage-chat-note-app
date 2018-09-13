document.addEventListener('DOMContentLoaded',()=>{
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    socket.on('connect',()=>{
        document.querySelector('#submit-user').onclick= ()=>{
         const user = document.querySelector('#user').value;
        
          socket.emit('submit user',{'user':user});
        
          return false;
        
        };
    
            document.querySelector('#myfiles').onchange=function(){
                var file = document.querySelector('#myfiles').files[0];
                var file_type = "text/plain";
                var myblob =  new Blob(file);
    
                if(file.type.match(file_type))
                {
                    socket.emit('submit file',{'selection':myblob,'senduser':senduser});

    
                }
                else
                {
                    socket.emit('submit file',{'selection':'file not supported','senduser':senduser});

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


    socket.on('annonce file',(data)=>{
        const div = document.createElement('div');
        var reader = new FileReader();
        reader.addEventListener('loadend',function(){

        div.innerHTML = reader.result;

        });
        reader.readAsText(file);  
    })
     

    

});