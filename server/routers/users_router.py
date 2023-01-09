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


@users.route("/updateRoom", methods=['PUT'])
def update_room():
    user = request.json
    result = users_bl.update_rooms(user)
    return jsonify(result)


@users.route("/addBlocked", methods=['PUT'])
def add_to_blocked():
    user = request.json
    result = users_bl.add_blocked(user)
    return jsonify(result)


@users.route("/removeBlocked", methods=['PUT'])
def remove_from_blocked():
    user = request.json
    result = users_bl.remove_blocked(user)
    return jsonify(result)


@users.route("/addContact", methods=['PUT'])
def add_contact():
    user = request.json
    result = users_bl.add_new_contact(user)
    return jsonify(result)


@users.route("/getContacts", methods=['GET'])
def get_contacts():
    id = request.json["id"]
    result = users_bl.get_all_contacts(id)
    return jsonify(result)


@users.route("/addGroup", methods=['PUT'])
def add_group():
    obj = request.json
    result = users_bl.add_group_to_user(obj)
    return jsonify(result)
