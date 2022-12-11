import { Box, Title } from "react-bulma-companion";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers, getAllUsers } from "../store/users";
import { useEffect } from "react";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  console.log(users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <Box>
      <Title size="5">Connected Users</Title>
      {users.length !== 0
        ? users.map((user) => {
            return <p key={user._id}>{user.username}</p>;
          })
        : null}
    </Box>
  );
};

export default Users;
