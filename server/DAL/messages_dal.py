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

    def get_messages_by_username(self, username):
        messages = self.__collection.find_one({"username": username})
        return messages

    def add_message(self, obj):
        self.__collection.update_one({"_id": ObjectId(obj["id"])}, {
                                     "$push": {"history":  obj["user"]}})
