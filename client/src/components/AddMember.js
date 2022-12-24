import { Modal, Dropdown, Delete, Button, Icon } from "react-bulma-companion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { getAllUsers, selectAllUsers } from "../store/users";
import { useDispatch, useSelector } from "react-redux";

const AddMember = (props) => {
  const [dropdown, setDropdown] = useState(false);
  const [title, setTitle] = useState("Members");

  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const onClickDropdown = () => {
    setDropdown(!dropdown);
  };
  const onChangeTitle = (e) => {
    setTitle(e.target.innerHTML);
    setDropdown(false);
  };
  return (
    <Modal active={props.modal ? true : false}>
      <Modal.Background />
      <Modal.Card style={{ height: "25rem" }}>
        <Modal.CardHead>
          <Modal.CardTitle>Add Member</Modal.CardTitle>
          <Delete onClick={props.onDelete} />
        </Modal.CardHead>
        <Modal.CardBody>
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
        </Modal.CardBody>
        <Modal.CardFoot>
          <Button color="success">Add Member</Button>
          <Button onClick={props.onDelete}>Cancel</Button>
        </Modal.CardFoot>
      </Modal.Card>
    </Modal>
  );
};

export default AddMember;
