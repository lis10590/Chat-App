from flask import Blueprint, jsonify, request
from BL.groups_bl import GroupsBL


groups = Blueprint('groups', __name__)

groups_bl = GroupsBL()


@groups.route("/getGroups", methods=['GET'])
def get_all_groups():
    groups = groups_bl.get_groups()
    return jsonify(groups)

@groups.route("/getMembers", methods=['GET'])
def get_members_of_group():
    id = request.json
    members = groups_bl.get_members_from_group(id)
    return jsonify(members)    


@groups.route("/newGroup", methods=['POST'])
def add_group():
    group = request.json
    result = groups_bl.add_new_group(group)
    return jsonify(result)


@groups.route("/addMember", methods=['PUT'])
def add_member_to_group():
    obj = request.json
    result = groups_bl.add_member_to_group(obj)
    response = {"groups":result["groups"],"group_members":result["group_members"]}
    return jsonify(response)


@groups.route("/deleteGroup", methods=['DELETE'])
def delete_user():
    id = request.json
    result = groups_bl.delete_group(id)
    return jsonify(result)
