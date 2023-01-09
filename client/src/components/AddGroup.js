import {
  Modal,
  Input,
  Field,
  Control,
  Label,
  Dropdown,
  Delete,
  Button,
  Icon,
} from "react-bulma-companion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { getAllUsers, selectAllUsers, addNewGroup } from "../store/users";
import { useDispatch, useSelector } from "react-redux";

const AddGroup = (props) => {
  const [dropdown, setDropdown] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [title, setTitle] = useState("Members");
  const [members, setMembers] = useState([]);
  const [userIds, setUserIds] = useState([]);

  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const findIds = () => {
    let idArray = [];
    for (const member of members) {
      for (const user of users) {
        if (user.username === member) {
          idArray.push(user._id);
        }
      }
    }
    return idArray;
  };

  const onChangeName = (e) => {
    setGroupName(e.target.value);
  };

  const onClickDropdown = () => {
    setDropdown(!dropdown);
  };

  const onAddMember = () => {
    setMembers((prevState) => [...prevState, title]);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.innerHTML);
    setDropdown(false);
  };
  const onAddGroup = () => {
    const ids = findIds();
    setUserIds(ids);
    const obj = {
      name: groupName,
      members: ids,
      userId: user._id,
    };

    dispatch(addNewGroup(obj));
    props.onDelete();
  };

  return (
    <Modal active={props.modal ? true : false}>
      <Modal.Background />
      <Modal.Card style={{ height: "25rem" }}>
        <Modal.CardHead>
          <Modal.CardTitle>Add Group</Modal.CardTitle>
          <Delete onClick={props.onDelete} />
        </Modal.CardHead>
        <Modal.CardBody>
          <Field>
            <Label size="small">Group Name</Label>
            <Control>
              <Input
                name="name"
                type="text"
                size="small"
                onChange={onChangeName}
                value={groupName}
              />
            </Control>
          </Field>
          <Dropdown active={dropdown ? true : false}>
            <Dropdown.Trigger>
              <Button
                aria-haspopup="true"
                aria-controls="dropdown-menu"
                onClick={onClickDropdown}
              >
                <span>{title}</span>
                <Icon size="small">
                  <FontAwesomeIcon icon={faAngleDown} />
                </Icon>
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Menu id="dropdown-menu" role="menu">
              <Dropdown.Content>
                {users.map((user) => {
                  return (
                    <Dropdown.Item
                      key={user._id}
                      onClick={onChangeTitle}
                      component="a"
                    >
                      {user.username}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Content>
            </Dropdown.Menu>
          </Dropdown>
          <Button color="primary" className="ml-2" onClick={onAddMember}>
            Add Member
          </Button>
          {members.map((member) => {
            return <div>{member}</div>;
          })}
        </Modal.CardBody>
        <Modal.CardFoot>
          <Button color="success" onClick={onAddGroup}>
            Add Group{" "}
          </Button>
          <Button onClick={props.onDelete}>Cancel</Button>
        </Modal.CardFoot>
      </Modal.Card>
    </Modal>
  );
};

export default AddGroup;
