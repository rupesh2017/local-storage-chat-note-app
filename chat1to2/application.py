import os
import requests

from flask import Flask,jsonify,render_template,request
from flask_socketio import SocketIO,emit,join_room,leave_room

from werkzeug import secure_filename



app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio=SocketIO(app)

userlist ={}

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
    










