from flask import Blueprint, jsonify, request
from BL.users_bl import UsersBL


users = Blueprint('users', __name__)

users_bl = UsersBL()


@users.route("/getUsers", methods=['GET'])
def get_all_users():
    users = users_bl.get_users()
    result = {"users": users}
    return jsonify(result)


@users.route("/newUser", methods=['POST'])
def add_user():
    user = request.json
    result = users_bl.add_new_user(user)
    response = {"users": result["users"],
                "username": result["username"], "room": result["room"]}
    return jsonify(response)

# Delete User


@users.route("/deleteUser", methods=['DELETE'])
def delete_user():
    username = request.json["username"]
    result = users_bl.delete_user(username)
    return jsonify(result)
