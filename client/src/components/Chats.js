import { Panel } from "react-bulma-companion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, selectAllUsers, userAddition } from "../store/users";
import { Link, useParams } from "react-router-dom";

const Chats = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  let userId = useParams();
  console.log(userId);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const addUser = () => {};

  return (
    <Panel>
      {users.map((user) => {
        userId = user._id;
        return (
          <Panel.Block key={user._id} component={Link} to={`/chats/${userId}`}>
            <img src={user.profile_pic} style={{ height: "5rem" }} />
            {user.username}
          </Panel.Block>
        );
      })}
    </Panel>
  );
};

export default Chats;
