import { Panel, Button } from "react-bulma-companion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroups, selectAllGroups } from "../store/groups";
import { getAllUsers, selectAllUsers } from "../store/users";
import { useParams, Link } from "react-router-dom";

const Groups = () => {
  const dispatch = useDispatch();
  const groups = useSelector(selectAllGroups);
  const users = useSelector(selectAllUsers);
  let groupId = useParams();

  useEffect(() => {
    dispatch(getAllGroups());
    dispatch(getAllUsers());
  }, [dispatch]);

  const getGroupMembers = (memberIds) => {
    const members = [];
    for (const id of memberIds) {
      for (const user of users) {
        if (id === user._id) {
          members.push(user.username);
        }
      }
    }

    return members;
  };

  return (
    <div>
      <Button className="mb-6 mt-4" color="primary" rounded>
        +
      </Button>
      <Panel>
        {groups.map((group) => {
          groupId = group._id;
          return (
            <Panel.Block
              key={group._id}
              component={Link}
              to={`/groups/${groupId}`}
            >
              <img style={{ height: "5rem" }} src={group.profile_pic} />
              {group.name}
            </Panel.Block>
          );
        })}
      </Panel>
    </div>
  );
};

export default Groups;
