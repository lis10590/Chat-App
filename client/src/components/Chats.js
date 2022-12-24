import { Panel } from "react-bulma-companion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, selectAllUsers, userAddition } from "../store/users";

const Chats = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const addUser = () => {};

  return (
    <Panel>
      {users.map((user) => {
        return (
          <Panel.Block key={user._id}>
            <img src={user.profile_pic} style={{ height: "5rem" }} />
            {user.username}
          </Panel.Block>
        );
      })}
    </Panel>
  );
};

export default Chats;
