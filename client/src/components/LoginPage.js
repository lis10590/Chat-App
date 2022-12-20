import {
  Box,
  Field,
  Input,
  Label,
  Control,
  Button,
  Title,
} from "react-bulma-companion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { regUserAddition } from "../store/registered";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const onChangeUser = (e) => {
    const { name, value } = e.target;

    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onLoginClick = () => {
    dispatch(regUserAddition(user));
    navigate("/userPage");
  };

  return (
    <div>
      <Title>Chat App Login</Title>
      <Box
        style={{
          width: "20rem",
          marginTop: "2rem",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Field>
          <Label size="small">Username</Label>
          <Control className="has-icons-left">
            <Input
              name="username"
              type="text"
              size="small"
              onChange={onChangeUser}
            />
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon={faUser} />
            </span>
          </Control>
        </Field>
        <Field>
          <Label size="small">Password</Label>
          <Control className="has-icons-left">
            <Input
              name="password"
              type="password"
              size="small"
              onChange={onChangeUser}
            />
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon={faLock} />
            </span>
          </Control>
        </Field>
        <Field>
          <Control>
            <div className="is-flex is-justify-content-center">
              <Button onClick={onLoginClick} color="primary">
                Login
              </Button>
            </div>
          </Control>
        </Field>
        <div className="is-flex is-justify-content-center">
          <Field component={Link} to="/registerPage">
            New User? Create Account
          </Field>
        </div>
      </Box>
    </div>
  );
};

export default LoginPage;
