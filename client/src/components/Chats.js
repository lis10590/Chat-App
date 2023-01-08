import { Panel, Button } from "react-bulma-companion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, selectAllUsers } from "../store/users";
import { useParams, useNavigate } from "react-router-dom";
import { socket } from "../api/socket";

const Chats = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectAllUsers);
  let userId = useParams();
  const user = useSelector((state) => state.auth.user);
  const [modal, setModal] = useState(false);
  console.log(userId);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const openModal = () => {
    setModal(true);
  };

  const onClickDelete = () => {
    setModal(false);
  };

  const addUser = () => {};

  const onUserClick = (username, userId) => {
    const data = {
      username: user.username.split("@")[0],
      room: username,
    };
    socket.emit("join", data);
    navigate(`/chats/${userId}`);
  };

  const getContacts = () => {
    let contactsArr = [];
    let contactsFinal = [];
    for (const item of users) {
      if (item.username === user.username) {
        contactsArr = item.contacts;
      }
    }

    for (const item of users) {
      for (const contact of contactsArr) {
        if (contact === item._id) {
          const obj = {
            _id: contact,
            username: item.username,
            profile_pic: item.profile_pic,
          };

          contactsFinal.push(obj);
        }
      }
    }
    return contactsFinal;
  };

  return (
    <div>
      <Button className="mb-6 mt-4" color="primary" rounded onClick={openModal}>
        +
      </Button>
      <Panel>
        {getContacts().map((user) => {
          userId = user._id;
          return (
            <Panel.Block
              key={user._id}
              component="a"
              onClick={() => onUserClick(user.username, user._id)}
            >
              <img src={user.profile_pic} style={{ height: "5rem" }} />
              {user.username}
            </Panel.Block>
          );
        })}
      </Panel>
    </div>
  );
};

export default Chats;
