import requests
from pymongo import MongoClient
from bson import ObjectId


class GroupsDal:
    def __init__(self):
        self.__client = MongoClient(port=27017)
        self.__db = self.__client["chat-app"]
        self.__collection = self.__db["Groups"]

    def get_all_groups(self):
        groups = list(self.__collection.find({}))
        return groups

    def get_members_from_group(self,id):
        group = self.__collection.find_one({"_id": ObjectId(id)}) 
        members = group["members"]
        return members  

    def add_new_group(self, group):
        self.__collection.insert_one(
            {"name": group["name"]})
        groups = list(self.__collection.find({}))
        return groups

    def add_member_to_group(self, obj):

        self.__collection.update_one({"_id": ObjectId(obj["id"])}, {
                                     "$push": {"members": obj["user"]}})
        groups = list(self.__collection.find({}))
        return groups

    def delete_group(self, id):
        self.__collection.delete_one({"_id": ObjectId(id)})
        return id
