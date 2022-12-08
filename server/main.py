from flask import Flask, jsonify
import json
from flask_cors import CORS
from bson import ObjectId
from flask_socketio import SocketIO
from flask_socketio import join_room, leave_room
from flask_socketio import send, emit
from routers.users_router import users


class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return json.JSONEncoder.default(self, obj)


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

app.json_encoder = JSONEncoder


@socketio.on('connect')
def test_connect(auth):
    emit('my response', {'data': 'Connected'})


@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')


@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    # send(username + 'has entered the room.')
    print(username + " entered room " + room)


@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)


@socketio.on('message')
def handle_message(data):
    room = data["room"]
    # join_room(room)
    emit("message", data, broadcast=True, to=room)
    print(data)
    # send(data, room=room, broadcast=True)


# @socketio.on('recieve_message')
# def handle_message(data):
#     room = data["room"]
#     emit("receive_message", {"data": data}, broadcast=True)
#     print(data)
#     send(data, room=room)


# app.run()
app.register_blueprint(users, url_prefix="/users")
socketio.run(app)
