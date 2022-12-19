from flask import Blueprint, jsonify, request
from BL.registered_bl import RegisteredsersBL


registered = Blueprint('registered', __name__)

registered_bl = RegisteredsersBL()


@registered.route("/getRegUsers", methods=['GET'])
def get_all_users():
    users = registered_bl.get_users()
    return jsonify(users)


@registered.route("/newRegUser", methods=['POST'])
def add_user():
    user = request.json
    result = registered_bl.add_new_user(user)
    return jsonify(result)

