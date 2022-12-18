import io from "socket.io-client";
import { Columns, Column, Button } from "react-bulma-companion";
import Users from "./Users";
import { useSelector, useDispatch } from "react-redux";
import ChatBox from "./ChatBox";
import { socket } from "../api/socket";

// const socket = io.connect("http://localhost:5000");

const ChatPage = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.users.username);
  const room = useSelector((state) => state.users.room);
  console.log(username);
  console.log(room);

  return (
    <div>
      <Columns>
        <Column size="one-quarter">
          <Users />
        </Column>
        <Column>
          <ChatBox socket={socket} username={username} room={room} />
        </Column>
      </Columns>
    </div>
  );
};

export default ChatPage;
