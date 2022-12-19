import { Box, Title, Button } from "react-bulma-companion";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers, getAllUsers } from "../store/users";
import { useEffect, useState } from "react";
import { deleteOneUser } from "../store/users";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectAllUsers);
  const username = useSelector((state) => state.users.username);
  console.log(users);

  const [chatRoomUsers, setChatRoomUsers] = useState([]);

  const onDisconnect = (id) => {
    // socket.disconnect();
    dispatch(deleteOneUser(username));

    // socket.on("disconnect", username);

    navigate("/");
  };

  useEffect(() => {
    setInterval(() => {
      dispatch(getAllUsers());
    }, 2000);
  }, [dispatch]);
  return (
    <div>
      <Button className="mb-6" color="danger" onClick={onDisconnect}>
        Disconnect
      </Button>
      <Box>
        <Title size="5">Connected Users</Title>
        {users.length !== 0
          ? users.map((user) => {
              return <p key={user._id}>{user.username}</p>;
            })
          : null}
      </Box>
    </div>
  );
};

export default Users;
