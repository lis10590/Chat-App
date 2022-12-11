import io from "socket.io-client";
import { Columns, Column, Button } from "react-bulma-companion";
import Users from "./Users";
import { useSelector } from "react-redux";
import ChatBox from "./ChatBox";
import { socket } from "../api/socket";
import { useNavigate } from "react-router-dom";

// const socket = io.connect("http://localhost:5000");

const ChatPage = () => {
  const navigate = useNavigate();
  const username = useSelector((state) => state.users.username);
  const room = useSelector((state) => state.users.room);
  console.log(username);
  console.log(room);

  const onDisconnect = () => {
    socket.disconnect();
    // socket.on("disconnect", username);

    navigate("/");
  };
  return (
    <div>
      <Button className="mb-6" color="danger" onClick={onDisconnect}>
        Disconnect
      </Button>
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
