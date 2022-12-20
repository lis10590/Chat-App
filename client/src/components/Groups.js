import { Panel, Button } from "react-bulma-companion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroups, selectAllGroups } from "../store/groups";

const Groups = () => {
  const dispatch = useDispatch();
  const groups = useSelector(selectAllGroups);

  useEffect(() => {
    dispatch(getAllGroups());
  }, [dispatch]);

  return (
    <div>
      <Button>+</Button>
      <Panel>
        {groups.map((group) => {
          return (
            <Panel.Block>
              <img style={{ height: "5rem" }} src={group.profile_pic} />
            </Panel.Block>
          );
        })}
      </Panel>
    </div>
  );
};

export default Groups;
