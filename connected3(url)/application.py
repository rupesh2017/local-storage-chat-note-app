from flask import Flask, render_template ,url_for

from flask_socketio import SocketIO, emit
    
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/chat')
def chat():
    return render_template('chat.html')



@socketio.on('connect')
def test_connect():
    emit('redirect', {'url': url_for('chat')})


