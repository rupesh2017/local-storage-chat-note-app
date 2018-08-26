//code running on user machine
document.addEventListener('DOMContentLoaded',()=>{

    //connect to web socket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
//once connected,connect event is emitted


    socket.on('connect',()=>{
        document.querySelector('#new-task').onsubmit = ()=>{
          const selection = document.querySelector('#task').value;
          //emit new event
          socket.emit('submit text',{'selection':selection});
        
          return false;
        
        };
    });



   


    socket.on('announce text',data=>{
        const li = document.createElement('li');
        li.innerHTML(`${data.selection}`);
        document.querySelector('#new-task').append('li');

    });

});