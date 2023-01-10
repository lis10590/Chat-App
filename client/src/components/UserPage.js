import { Navbar, Box, Button, Title } from "react-bulma-companion";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../store/auth";
import Chats from "./Chats";
import Groups from "./Groups";

const UserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [chatsPage, setChatPage] = useState(true);
  const [groupsPage, setGroupsPage] = useState(false);
  const user = sessionStorage.getItem("user");

  useEffect(() => {
    console.log(user);
  }, [user]);

  const onChatPage = () => {
    setChatPage(true);
    setGroupsPage(false);
  };

  const onGroupsPage = () => {
    setGroupsPage(true);
    setChatPage(false);
  };

  const onLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="is-flex is-flex-direction-column is-align-items-center">
      <Title className="mt-6" style={{ fontFamily: "Dancing Script, cursive" }}>
        Hi {user ? user.split("@")[0] : null}
      </Title>
      <Box style={{ width: "50rem", marginTop: "2rem" }}>
        <Button color="primary" rounded onClick={onLogout}>
          Logout
        </Button>
        <Navbar>
          <Navbar.Menu>
            <Navbar.Start>
              <Navbar.Item
                onClick={onChatPage}
                tab
                active={chatsPage ? true : false}
              >
                Chats
              </Navbar.Item>
              <Navbar.Item
                onClick={onGroupsPage}
                tab
                active={groupsPage ? true : false}
              >
                Groups
              </Navbar.Item>
            </Navbar.Start>
          </Navbar.Menu>
        </Navbar>
        {chatsPage ? <Chats /> : <Groups />}
      </Box>
    </div>
  );
};

export default UserPage;
