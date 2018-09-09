
document.addEventListener('DOMContentLoaded',()=>{
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    socket.on('connect',()=>{
        document.querySelector('#submit').onclick= ()=>{
        
         const user = document.querySelector('#user').value;
         const room = document.querySelector('#room').value;
          socket.emit('join',{'user':user,'room':room});
    
          return false;
        
        };

        
    
});