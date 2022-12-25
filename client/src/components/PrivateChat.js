import { Card } from "react-bulma-companion";
import { getAllUsers, selectAllUsers } from "../store/users";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatBox from "./ChatBox";
import { socket } from "../api/socket";

const PrivateChat = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  let { userId } = useParams();
  let [user] = users.filter((user) => user._id === userId);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="is-flex is-justify-content-center">
      <Card style={{ width: "50rem", marginTop: "5rem" }}>
        <Card.Header>
          <img src={user.profile_pic} style={{ height: "4rem" }} />
          <div>{user.username}</div>
        </Card.Header>
        <Card.Content>
          <ChatBox socket={socket} id={userId} />
        </Card.Content>
      </Card>
    </div>
  );
};

export default PrivateChat;
