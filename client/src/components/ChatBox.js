import { Box, Button, Container, Input } from "react-bulma-companion";
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import "../styles/Chat.css";

const ChatBox = (props) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  // const sendMessage = async () => {
  //   if (currentMessage !== "") {
  //     const messageData = {
  //       room: props.room,
  //       author: props.username,
  //       message: currentMessage,
  //       time:
  //         new Date(Date.now()).getHours() +
  //         ":" +
  //         new Date(Date.now()).getMinutes(),
  //     };

  //     await props.socket.emit("message", messageData);
  //     // setMessageList((list) => [...list, messageData]);
  //     setCurrentMessage("");
  //   }
  // };

  // useEffect(() => {
  //   props.socket.on("message", (data) => {
  //     console.log(data);
  //     console.log(messageList);
  //     setMessageList((list) => [...list, data]);
  //   });
  // }, [props.socket]);

  return (
    // <Box className="chat-window">
    <Container className="chat-body">
      <ScrollToBottom>
        {messageList.map((messageContent, index) => {
          return (
            <div
              key={index}
              className="message"
              id={props.username === messageContent.author ? "you" : "other"}
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
            // onChange={(event) => {
            //   setCurrentMessage(event.target.value);
            // }}
            // onKeyPress={(event) => {
            //   event.key === "Enter" && sendMessage();
            // }}
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
          <Button
            rounded
            size="normal"
            color="primary" /*onClick={sendMessage}*/
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </div>
      </ScrollToBottom>
    </Container>
    /* </Box> */
  );
};

export default ChatBox;
