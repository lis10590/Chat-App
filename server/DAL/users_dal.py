import requests
from pymongo import MongoClient
from bson import ObjectId


class UsersDal:
    def __init__(self):
        self.__client = MongoClient(port=27017)
        self.__db = self.__client["chat-app"]
        self.__collection = self.__db["Users"]

    def get_all_users(self):
        users = list(self.__collection.find({}))
        return users

    def get_user(self,id):
        user = self.__collection.find_one({"_id": ObjectId(id)}) 
        return user   

    def add_new_user(self, user):
        self.__collection.insert_one(
            {"username": user["username"], "room": user["room"],"profile_pic":user["profile_pic"]})
        username = user["username"]
        room = user["room"]
        users = list(self.__collection.find({}))
        return {"users": users, "username": username, "room": room}

    def delete_user(self, username):
        user = self.__collection.find_one({"username": username})
        id = user["_id"]
        self.__collection.delete_one({"username": username})
        return id
