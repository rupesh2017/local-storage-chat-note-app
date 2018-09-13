import os
import requests

from flask import Flask,jsonify,render_template,request
from flask_socketio import SocketIO,emit,join_room,leave_room,send

from werkzeug import secure_filename



app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio=SocketIO(app)

#we don't need userlist or roomlist to maintain list of user within a room 


@app.route("/")
def index():
    return render_template("index.html")




@socketio.on("submit user")
def text(data):
    user = data["user"]
    userlist[user]=request.sid
    emit("announce user",{"user":user,"userlist":userlist},broadcast=True)




@socketio.on("submit message")
def text(data): 
    selection = data["selection"]
    
    emit("announce message",{"selection":selection},broadcast=True)
    




@socketio.on("sendtoUser")
def sendtoUser(data):
    selection = data["selection"]
    sendUser = data["senduser"]
    sidUser = userlist[sendUser]
    emit("personal announce",{"selection":selection},room=sidUser)
    


@socketio.on('connect')
def test_connect():
    emit('redirect', {'url': url_for('chat')})



    
@socketio.on('join')
def on_join(data):
    username = data['user']
    room = data['room']
    join_room(room)
    emit('chat',{'username':username},room=room)



#when broswer closed ,leave room
    
    
