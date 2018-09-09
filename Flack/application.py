import os
import requests

from flask import Flask,jsonify,render_template,request
from flask_socketio import SocketIO,emit,join_room,leave_room

from werkzeug import secure_filename



app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio=SocketIO(app)

userlist ={}
users=[]
channel = []

@app.route("/")
def index():
    return render_template("index.html")


@socketio.on("submit user-channel")
def text(data):
    user = data["user"]
    users.append(user)
    userlist[user]=request.sid
    emit("announce user",{"user":user,"userlist":userlist,"users":users},broadcast=True)









@app.route("/chat")
@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    send(username + ' has entered the room.', room=room)
    

@app.route("/chat")
@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', room=room)







