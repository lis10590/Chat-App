import requests
from pymongo import MongoClient
from bson import ObjectId


class RegisteredDal:
    def __init__(self):
        self.__client = MongoClient(port=27017)
        self.__db = self.__client["chat-app"]
        self.__collection = self.__db["Registered"]

    def get_all_registered(self):
        users = list(self.__collection.find({}))
        return users

    def add_new_user(self, user):
        self.__collection.insert_one(
            {"username": user["username"], "password": user["password"]})
        users = list(self.__collection.find({}))
        return users

 
