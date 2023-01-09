import {
  Modal,
  Input,
  Field,
  Control,
  Label,
  Delete,
  Button,
} from "react-bulma-companion";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, selectAllUsers, addNewContact } from "../store/users";

const AddContact = (props) => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const user = useSelector((state) => state.auth.user);
  const [email, setEmail] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    const newFilter = users.filter((user) =>
      user.username.toLowerCase().includes(email)
    );

    if (e.target.value === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const onClickUser = (user) => {
    setEmail(user);
    setFilteredData([]);
  };

  const onAddContact = () => {};

  return (
    <Modal active={props.modal ? true : false}>
      <Modal.Background />
      <Modal.Card style={{ height: "25rem" }}>
        <Modal.CardHead>
          <Modal.CardTitle>Add Contact</Modal.CardTitle>
          <Delete onClick={props.onDelete} />
        </Modal.CardHead>
        <Modal.CardBody>
          <Field>
            <Label size="small">Contact Email</Label>
            <Control>
              <Input
                name="email"
                type="text"
                size="small"
                onChange={onChangeEmail}
                value={email}
              />
            </Control>
          </Field>
          <ul>
            {filteredData.map((user) => {
              return (
                <li onClick={() => onClickUser(user.username)}>
                  {user.username}
                </li>
              );
            })}
          </ul>
        </Modal.CardBody>
        <Modal.CardFoot>
          <Button color="success" onClick={onAddContact}>
            Add Contact
          </Button>
          <Button onClick={props.onDelete}>Cancel</Button>
        </Modal.CardFoot>
      </Modal.Card>
    </Modal>
  );
};

export default AddContact;
