import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroups, selectAllGroups } from "../store/groups";
import { getAllUsers, selectAllUsers } from "../store/users";
import {
  Box,
  Input,
  Columns,
  Column,
  Title,
  Panel,
  Button,
  Control,
  Icon,
  Field,
} from "react-bulma-companion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import AddMember from "./AddMember";

const GroupPage = () => {
  let { groupId } = useParams();
  console.log(groupId);
  const dispatch = useDispatch();
  const groups = useSelector(selectAllGroups);
  const users = useSelector(selectAllUsers);
  let [group] = groups.filter((group) => group._id === groupId);
  console.log(group);

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

  const getGroupMembers = () => {
    let members = [];
    for (const memberId of group.members) {
      for (const user of users) {
        if (memberId === user._id) {
          members.push(user);
        }
      }
    }
    return members;
  };

  return (
    <div className="is-flex is-justify-content-center">
      <Box style={{ width: "50rem", marginTop: "5rem" }}>
        <Columns>
          <Column size="two-fifths">
            <Title size="5">{group.name}-Members</Title>
            <Button
              color="primary"
              rounded
              size="small"
              className="mb-4"
              onClick={openModal}
            >
              +
            </Button>
            <Panel>
              {getGroupMembers().map((member, index) => {
                return (
                  <Panel.Block key={index}>
                    <img src={member.profile_pic} style={{ height: "2rem" }} />
                    {member.username}
                  </Panel.Block>
                );
              })}
            </Panel>
          </Column>

          <Column className="is-flex is-flex-direction-column is-justify-content-flex-end is-align-content-stretch">
            <Field>
              <Control iconsRight>
                <Input type="text" />
                <Icon size="small" align="right">
                  <FontAwesomeIcon icon={faPaperPlane} />
                </Icon>
              </Control>
            </Field>
          </Column>
        </Columns>
      </Box>
      <AddMember modal={modal} onDelete={onClickDelete} id={groupId} />
    </div>
  );
};

export default GroupPage;
