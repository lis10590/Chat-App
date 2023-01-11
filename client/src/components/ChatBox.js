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
        author: user._id,
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
  }, [props.socket, dispatch, messageList]);

  const arrangeMessages = () => {
    let messagesArr = [];
    let destination = "";
    for (const item of users) {
      if (item._id === props.id) {
        destination = item.username;
      }
    }
    for (const message of messages) {
      if (message.author === user._id && message.destination === props.id) {
        const obj = {
          author: user.username,
          message: message.message,
          destination: destination,
          date: message.date,
        };
        messagesArr.push(obj);
      }
      if (message.author === props.id) {
        const obj = {
          author: destination,
          message: message.message,
          destination: user.username,
          date: message.date,
        };
        messagesArr.push(obj);
      }
    }
    console.log(messagesArr);
    return messagesArr.sort((a, b) => a.date - b.date);
  };

  return (
    <Box className="chat-window">
      <Container className="chat-body">
        <ScrollToBottom className="scroller">
          {arrangeMessages().map((messageContent, index) => {
            return (
              <div
                key={index}
                className="message"
                id={user.username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">
                      {new Date(messageContent.date).getHours() +
                        ":" +
                        new Date(messageContent.date).getMinutes()}
                    </p>
                    <p id="author">{messageContent.author.split("@")[0]}</p>
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
