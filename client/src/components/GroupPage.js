import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroups, selectAllGroups } from "../store/groups";
import { getAllUsers, selectAllUsers } from "../store/users";
import {
  Box,
  Input,
  Columns,
  Column,
  Title,
  Panel,
  Button,
  Buttons,
  Container,
} from "react-bulma-companion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import AddMember from "./AddMember";
import { socket } from "../api/socket";
import ScrollToBottom from "react-scroll-to-bottom";
import "../styles/Chat.css";

const GroupPage = () => {
  let { groupId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const groups = useSelector(selectAllGroups);
  const users = useSelector(selectAllUsers);
  let [group] = groups.filter((group) => group._id === groupId);
  const user = useSelector((state) => state.auth.user);
  const [modal, setModal] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    dispatch(getAllGroups());
    dispatch(getAllUsers());
    socket.on("message", (data) => {
      console.log(data);
      console.log(messageList);
      setMessageList((list) => [...list, data]);
    });
  }, [dispatch, messageList]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: groupId,
        author: user.username.split("@")[0],
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("message", messageData);
      // setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  const openModal = () => {
    setModal(true);
  };

  const onClickDelete = () => {
    setModal(false);
  };

  const getGroupMembers = () => {
    let members = [];
    for (const memberId of group.members) {
      for (const user of users) {
        if (memberId === user._id) {
          members.push(user);
        }
      }
    }
    return members;
  };

  const onClickBack = () => {
    const data = {
      username: user.username.split("@")[0],
      room: groupId,
    };

    socket.emit("leave", data);
    navigate("/userPage");
  };

  return (
    <div className="is-flex is-justify-content-center">
      <Box style={{ width: "50rem", marginTop: "5rem" }}>
        <Columns>
          <Column size="two-fifths">
            <Title size="5">{group.name}-Members</Title>
            <Buttons>
              <Button
                color="primary"
                rounded
                size="small"
                className="mb-4"
                onClick={openModal}
              >
                +
              </Button>
              <Button
                size="small"
                color="primary"
                rounded
                className="mb-4 is-justify-content-space-between"
                onClick={onClickBack}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                Back
              </Button>
            </Buttons>

            <Panel>
              {getGroupMembers().map((member, index) => {
                return (
                  <Panel.Block key={index}>
                    <img src={member.profile_pic} style={{ height: "2rem" }} />
                    {member.username}
                  </Panel.Block>
                );
              })}
            </Panel>
          </Column>

          <Column className="is-flex is-flex-direction-column is-justify-content-flex-end is-align-content-stretch">
            <Box className="chat-window">
              <Container className="chat-body">
                <ScrollToBottom>
                  {messageList.map((messageContent, index) => {
                    return (
                      <div
                        key={index}
                        className="message"
                        id={
                          user.username.split("@")[0] === messageContent.author
                            ? "you"
                            : "other"
                        }
                      >
                        <div>
                          <div className="message-content">
                            <p>{messageContent.message}</p>
                          </div>
                          <div className="message-meta">
                            <p id="time">{messageContent.time}</p>
                            <p id="author">{messageContent.author}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="chat-footer">
                    <Input
                      type="text"
                      onChange={(event) => {
                        setCurrentMessage(event.target.value);
                      }}
                      onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                      }}
                    />
                    <Button
                      className="ml-2"
                      color="primary"
                      rounded
                      onClick={sendMessage}
                    >
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </Button>
                  </div>
                </ScrollToBottom>
              </Container>
            </Box>
          </Column>
        </Columns>
      </Box>
      <AddMember modal={modal} onDelete={onClickDelete} id={groupId} />
    </div>
  );
};

export default GroupPage;
