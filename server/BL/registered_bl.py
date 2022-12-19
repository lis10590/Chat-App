from DAL.registered_dal import *


class RegisteredsersBL:
    def __init__(self):
        self.__registered_dal = RegisteredDal()

    def get_users(self):
        users = self.__registered_dal.get_all_registered()
        return users

    def add_new_user(self, user):
        new_user = self.__registered_dal.add_new_user(user)
        return new_user

   
