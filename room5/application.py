import os
import requests

from flask import Flask,jsonify,render_template,request
from flask_socketio import SocketIO,emit,join_room,leave_room,send

from werkzeug import secure_filename



app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio=SocketIO(app)


#channel = []


@app.route("/")
def index():
    return render_template("index.html")

 
@socketio.on('join')
def on_join(data):
    username = data['user']
    room = data['room']
    join_room(room)    
    emit('chat',{'username':username},room=room)
    

@socketio.on('message')
def on_message(data):   
    username = data['user']
    print(username)
    room = data['room']
    print(room)
    message = data['message']
    print(message)
   
    emit('send message',{'username':username,'message':message},room=room)


                          


    
    
    
    
                    


                        
