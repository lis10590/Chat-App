import io from "socket.io-client";
import { useState } from "react";
import ChatBox from "./ChatBox";
import { userAddition } from "../store/users";
import { useDispatch } from "react-redux";
import { Columns, Column } from "react-bulma-companion";
import Users from "./Users";
import "../styles/ChatLogin.css";

const socket = io.connect("http://localhost:5000");
const ChatLogin = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const dispatch = useDispatch();

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      const userDetails = {
        username,
        room,
      };

      socket.emit("join", userDetails);
      dispatch(userAddition(userDetails));
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Columns>
          <Column>
            <Users />
          </Column>
          <Column></Column>
          <ChatBox socket={socket} username={username} room={room} />
        </Columns>
      )}
    </div>
  );
};

export default ChatLogin;
