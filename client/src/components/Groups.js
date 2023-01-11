import { Panel, Button } from "react-bulma-companion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroups, selectAllGroups } from "../store/groups";
import { getAllUsers, selectAllUsers } from "../store/users";
import { useParams, useNavigate } from "react-router-dom";
import AddGroup from "./AddGroup";
import { socket } from "../api/socket";

const Groups = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const groups = useSelector(selectAllGroups);
  const users = useSelector(selectAllUsers);
  let groupId = useParams();
  const user = useSelector((state) => state.auth.user);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(getAllGroups());
    dispatch(getAllUsers());
  }, [dispatch]);

  const openModal = () => {
    setModal(true);
  };

  const onClickDelete = () => {
    setModal(false);
  };

  const onClickGroup = (id) => {
    const data = {
      username: user.username.split("@")[0],
      room: id,
    };

    socket.emit("join", data);

    navigate(`/groups/${id}`);
  };

  const findGroups = () => {
    let groupsArr = [];
    let finalArr = [];
    for (const item of users) {
      if (item.username === user.username) {
        groupsArr = item.groups;
      }
    }

    for (const group of groups) {
      for (const item of groupsArr) {
        if (group._id === item) {
          const obj = {
            _id: group._id,
            name: group.name,
            members: group.members,
            profile_pic: group.profile_pic,
          };

          finalArr.push(obj);
        }
      }
    }
    console.log(finalArr);
    return finalArr;
  };

  return (
    <div>
      <Button className="mb-6 mt-4" color="primary" rounded onClick={openModal}>
        +
      </Button>
      <Panel>
        {findGroups().map((group) => {
          groupId = group._id;
          console.log(groupId);
          return (
            <Panel.Block
              key={group._id}
              component="a"
              onClick={() => onClickGroup(group._id)}
            >
              <img style={{ height: "5rem" }} src={group.profile_pic} />
              {group.name}
            </Panel.Block>
          );
        })}
      </Panel>
      <AddGroup modal={modal} onDelete={onClickDelete} />
    </div>
  );
};

export default Groups;
