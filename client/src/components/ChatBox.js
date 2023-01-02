import { Box, Button, Container, Input } from "react-bulma-companion";
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  messageAddition,
  selectAllMessages,
  getAllMessages,
} from "../store/messages";
import { getAllUsers, selectAllUsers } from "../store/users";
import "../styles/Chat.css";

const ChatBox = (props) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const users = useSelector(selectAllUsers);
  const messages = useSelector(selectAllMessages);
  console.log(messages);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: props.room,
        author: user.username.split("@")[0],
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      const obj = {
        room: props.room,
        author: user.username,
        message: currentMessage,
        date: Date.now(),
        destination: props.id,
      };
      dispatch(messageAddition(obj));

      await props.socket.emit("message", messageData);
      // setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    props.socket.on("message", (data) => {
      console.log(data);
      console.log(messageList);
      setMessageList((list) => [...list, data]);
    });
    dispatch(getAllMessages());
    dispatch(getAllUsers());
  }, [props.socket]);

  const arrangeMessages = () => {
    let authorMessages = [];
    let destinationMessages = [];
    let username = "";

    for (const message of messages) {
      if (message.username === user.username) {
        for (const item of message.history) {
          if (item.destination === props.id) {
            authorMessages.push(item);
          }
        }
      }
    }
    for (const item of users) {
      if (item._id === props.id) {
        username = item.username;
      }
    }

    for (const message of messages) {
      if (message.username === username) {
        for (const item of message.history) {
          if (item.destination === user._id) {
            destinationMessages.push(item);
          }
        }
      }
    }

    console.log(authorMessages);
    console.log(destinationMessages);
  };
  arrangeMessages();
  return (
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
              value={currentMessage}
              placeholder="Hey..."
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
            {/* <input
              type="text"
              value={currentMessage}
              placeholder="Hey..."
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            /> */}
            <Button rounded size="normal" color="primary" onClick={sendMessage}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </div>
        </ScrollToBottom>
      </Container>
    </Box>
  );
};

export default ChatBox;
