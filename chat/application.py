import os
import requests

from flask import Flask,jsonify,render_template,request
from flask_socketio import SocketIO,emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio=SocketIO(app)


@app.route("/")
def index():
    return render_template("index.html")


@socketio.on("submit text")
def text(data):
    selection= data["selection"]
    emit("announce text",{"selection":selection},broadcast=True)


