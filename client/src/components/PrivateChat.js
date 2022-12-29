import { Card, Button } from "react-bulma-companion";
import { getAllUsers, selectAllUsers } from "../store/users";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ChatBox from "./ChatBox";
import { socket } from "../api/socket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const PrivateChat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectAllUsers);
  let { userId } = useParams();
  console.log(userId);
  let [user] = users.filter((user) => user._id === userId);
  const username = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const onClickBack = () => {
    const data = {
      username: username.username.split("@")[0],
      room: user.username,
    };

    socket.emit("leave", data);
    navigate("/userPage");
  };

  return (
    <div className="is-flex is-justify-content-center">
      <Card style={{ width: "50rem", marginTop: "5rem" }}>
        <Card.Header className="is-justify-content-space-between">
          <div className="ml-4">
            <img src={user.profile_pic} style={{ height: "4rem" }} />
            <div>{user.username}</div>
          </div>
          <Button
            color="primary"
            size="small"
            rounded
            className="mt-6 mr-4"
            onClick={onClickBack}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back
          </Button>
        </Card.Header>
        <Card.Content>
          <ChatBox socket={socket} id={userId} room={user.username} />
        </Card.Content>
      </Card>
    </div>
  );
};

export default PrivateChat;
