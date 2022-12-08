import io from "socket.io-client";
import { Columns, Column } from "react-bulma-companion";
import Users from "./Users";

const socket = io.connect("http://localhost:5000");

const ChatPage = () => {
  return (
    <Columns>
      <Column>
        <Users />
      </Column>
      <Column></Column>
      <ChatBox socket={socket} username={username} room={room} />
    </Columns>
  );
};

export default ChatPage;
