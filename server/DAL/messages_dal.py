from pymongo import MongoClient
from bson import ObjectId


class MessagesDal:
    def __init__(self):
        self.__client = MongoClient(port=27017)
        self.__db = self.__client["chat-app"]
        self.__collection = self.__db["Messages"]

    def get_all_messages(self):
        messages = list(self.__collection.find({}))
        return messages

    def get_all_messages_by_username(self, username):
        messages = list(self.__collection.find({"username": username}))
        return messages

    def add_message(self, obj):
        self.__collection.insert_one(
            {"author": obj["author"], "message": obj["message"], "date": obj["date"], "destination": obj["destination"]})

        messages = list(self.__collection.find({}))
        return messages
