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

@app.route("/")
def index():
    return render_template("index.html")


@socketio.on("submit user")
def text(data):
    user = data["user"]
    users.append(user)
    userlist[user]=request.sid
    emit("announce user",{"user":user,"userlist":userlist,"users":users},broadcast=True)


@socketio.on("submit file")
def image(data): 
    selection = data["selection"]
    senduser = data["senduser"]
    sid = userlist[senduser]
    
    
    
    emit("announce file",{"selection":selection,"senduser":senduser,"sid":sid},room=sid)









