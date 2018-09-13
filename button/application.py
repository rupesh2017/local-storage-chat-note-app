import os
import requests

from flask import Flask,jsonify,render_template,request


from werkzeug import secure_filename



app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")



@app.route("/")
def index():
    return render_template("index.html")


@app.route("/chat")
def chat():
    return render_template("chat.html")
