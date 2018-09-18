import os
import requests

from flask import Flask,jsonify,render_template,request
from flask_socketio import SocketIO,emit,join_room,leave_room,send

from werkzeug import secure_filename


channel = []
users = []
userlist = {}
messagebox = {}

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio=SocketIO(app)


@app.route("/")
def index():
    return render_template("index.html")


#logout button
@app.route("/chat")
def chat():
    print("running chat")    
    return render_template("chat.html",channel=channel,users=users)


#return to channel
@app.route("/private")
def private():
    print("private running")
    return render_template("private.html")

    
@socketio.on('join')
def on_join(data):
    username = data['user']
    room = data['room']
    join_room(room)
    if room is not None and room not in channel:
         channel.append(room)
    if username is not None and username not in users:
        users.append(username)
    userlist[username]=request.sid
    print(users)
    print(channel)
    print(request.sid)
    emit('chat',{'username':username,'users':users,'channel':channel},room=room)
   


@socketio.on('message')
def on_message(data):   
    username = data['user']
    print(username)
    room = data['room']
    print(room)
    message = data['message']
    if room not in messagebox and room  is not None:
        messagebox.update({room:[]})

    #print(messagebox)                      
    messagebox[room].append(username +' '+ message)
                          
    print(message)
    emit('send message',{'username':username,'message':message},room=room)




@socketio.on('load message')
def on_load(data):
    room = data['room']
    print('on load function running now')
    if room in messagebox:
        msg = messagebox[room]
        emit('unload message',{'msg':msg},room=room)
        print('let now print msg')
        print(msg)
    
    


@socketio.on("submit file")
def image(data): 
    selection = data["selection"]
    room = data['room']
    print(selection)
    emit("announce file",{"selection":selection},room=room)


#onclick user name


@socketio.on("submit message")
def text(data): 
    selection = data["selection"]
    senduser = data["senduser"]
    sid = userlist[senduser]
    emit("announce message",{"selection":selection,"senduser":senduser,"sid":sid},room=sid)




















    
