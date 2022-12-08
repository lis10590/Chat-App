from DAL.users_dal import *


class UsersBL:
    def __init__(self):
        self.__users_dal = UsersDal()

    def get_users(self):
        users = self.__users_dal.get_all_users()
        return users

    def add_new_user(self, user):
        new_user = self.__users_dal.add_new_user(user)
        return new_user
