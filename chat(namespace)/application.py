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



@socketio.on("submit text")
def text(data):
    
    selection = data["selection"]
    user = data["user"]
    userlist[user]=request.sid
    
        
    

    emit("announce text",{"selection":selection,"user":user,"userlist":userlist},broadcast=True)







