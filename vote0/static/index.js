//code running on user machine
document.addEventListener('DOMContentLoaded',()=>{

    //connect to web socket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
//once connected,connect event is emitted
    

//listen for connect event
    socket.on('connect',()=>{
        document.querySelectorAll('button').forEach(button=>{
            button.onclick = ()=>{

                const selection = button.dataset.vote;
        //emit new event
                socket.emit('submit vote',{'selection':selection});

            };
        });
    });


    socket.on('announce vote',data=>{
        const li = document.createElement('li');
        li.innerHTML = `vote recorded :${data.selection}`;
        document.querySelector('#votes').append(li);

    });



});