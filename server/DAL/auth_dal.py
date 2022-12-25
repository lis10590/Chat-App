import requests
from pymongo import MongoClient
from bson import ObjectId
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import decode_token

class AuthDal:
    def __init__(self):
        self.__client = MongoClient(port=27017)
        self.__db = self.__client["chat-app"]
        self.__collection = self.__db["Users"]

    def register_user(self, username, password):
        self.__collection.insert_one(
            {"username": username, "password": password})
        new_user = self.__collection.find_one({"username": username})
        return new_user

    def __check_user(self, username, password):

        user = self.__collection.find_one({"username": username})
        if user and user["password"] == password:
            return str(user["_id"])
        else:
            return None    

    def get_token(self, username, password):
        user_id = self.__check_user(username, password)  
        token = None
        if user_id is not None:
            token = create_access_token(identity=user_id)

        return token 

    def verify_token(self):

        user_id = get_jwt_identity()
        if user_id:
            return {"boolean": True, "id": user_id}
        else:
            return False     
