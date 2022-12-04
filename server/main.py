from flask import Flask
import json
from flask_cors import CORS
from bson import ObjectId


class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return json.JSONEncoder.default(self, obj)


app = Flask(__name__)
CORS(app)

app.json_encoder = JSONEncoder

app.run()
