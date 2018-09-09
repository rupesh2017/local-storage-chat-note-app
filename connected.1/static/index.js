//code running on user machine
document.addEventListener('DOMContentLoaded',()=>{

    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);



       socket.on('my response',(data2)=>{
        const li = document.createElement('li');
        //mistake was here
        console.log(data2.data)
        const now = new Date();
        li.innerHTML=`text is here from  ${data2.data} at ${now}`;
        //mistake was here


        document.querySelector('#tasks').append(li);

    });

});