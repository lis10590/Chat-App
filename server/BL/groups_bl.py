from DAL.groups_dal import *


class GroupsBL:
    def __init__(self):
        self.__groups_dal = GroupsDal()

    def get_groups(self):
        groups = self.__groups_dal.get_all_groups()
        return groups

    def add_new_group(self, group):
        new_group = self.__groups_dal.add_new_group(group)
        return new_group

    def add_member_to_group(self, obj):
        groups = self.__groups_dal.add_member_to_group(obj)
        return groups

    def delete_group(self, id):
        id = self.__groups_dal.delete_group(id)
        return id
