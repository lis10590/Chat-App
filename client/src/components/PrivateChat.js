import { Card, Button, Buttons } from "react-bulma-companion";
import {
  getAllUsers,
  selectAllUsers,
  addBlocked,
  removeBlocked,
} from "../store/users";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ChatBox from "./ChatBox";
import { socket } from "../api/socket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBan } from "@fortawesome/free-solid-svg-icons";

const PrivateChat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectAllUsers);
  console.log(users);
  let { userId } = useParams();
  console.log(userId);
  let [user] = users.filter((user) => user._id === userId);
  const username = useSelector((state) => state.auth.user);
  const [block, setBlock] = useState(false);
  const [currentUser] = username.blocked.filter((item) => item.id === userId);
  console.log(currentUser);

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

  const onBlock = () => {
    setBlock(!block);
    const obj = {
      id: username._id,
      contactId: userId,
    };

    for (const item of users) {
      if (item.username === username.username) {
        console.log(item.username);
        for (const item2 of item.blocked) {
          if (item2.id === userId) {
            console.log(item2);
            if (item2.blocked) {
              dispatch(removeBlocked(obj));
            } else {
              dispatch(addBlocked(obj));
            }
          }
        }
      }
    }
  };

  const findUser = () => {
    let blockedArr = [];
    for (const item of users) {
      if (item.username === username.username) {
        blockedArr = item.blocked;
      }
      for (const item2 of blockedArr) {
        if (item2.id === userId) {
          return item2;
        }
      }
    }
  };
  return (
    <div className="is-flex is-justify-content-center">
      <Card style={{ width: "50rem", marginTop: "5rem" }}>
        <Card.Header className="is-justify-content-space-between">
          <div className="ml-4">
            <img src={user.profile_pic} style={{ height: "4rem" }} />
            <div>
              {user.username}{" "}
              {findUser().blocked ? (
                <FontAwesomeIcon icon={faBan} style={{ color: "red" }} />
              ) : null}
            </div>
          </div>
          <Buttons>
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
            <Button
              color="danger"
              size="small"
              rounded
              className="mt-6 mr-4"
              onClick={onBlock}
            >
              <FontAwesomeIcon icon={faBan} />
              {findUser().blocked ? "UnBlock" : "Block"}
            </Button>
          </Buttons>
        </Card.Header>
        <Card.Content>
          <ChatBox socket={socket} id={userId} room={user.username} />
        </Card.Content>
      </Card>
    </div>
  );
};

export default PrivateChat;
