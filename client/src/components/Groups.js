import { Panel, Button } from "react-bulma-companion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroups, selectAllGroups } from "../store/groups";
import { getAllUsers, selectAllUsers } from "../store/users";
import { useParams, Link } from "react-router-dom";
import AddGroup from "./AddGroup";

const Groups = () => {
  const dispatch = useDispatch();
  const groups = useSelector(selectAllGroups);
  const users = useSelector(selectAllUsers);
  let groupId = useParams();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(getAllGroups());
    dispatch(getAllUsers());
  }, [dispatch]);

  const openModal = () => {
    setModal(true);
  };

  const onClickDelete = () => {
    setModal(false);
  };

  return (
    <div>
      <Button className="mb-6 mt-4" color="primary" rounded onClick={openModal}>
        +
      </Button>
      <Panel>
        {groups.map((group) => {
          groupId = group._id;
          return (
            <Panel.Block
              key={group._id}
              component={Link}
              to={`/groups/${groupId}`}
            >
              <img style={{ height: "5rem" }} src={group.profile_pic} />
              {group.name}
            </Panel.Block>
          );
        })}
      </Panel>
      <AddGroup modal={modal} onDelete={onClickDelete} />
    </div>
  );
};

export default Groups;
