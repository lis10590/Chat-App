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

    def delete_user(self, username):
        id = self.__users_dal.delete_user(username)
        return id

    def update_rooms(self, user):
        users = self.__users_dal.update_rooms(user)
        return users

    def update_profile_pic(self, user):
        users = self.__users_dal.update_profile_pic(user)
        return users
