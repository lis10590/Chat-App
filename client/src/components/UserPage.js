import { Navbar, Box } from "react-bulma-companion";
import { useState } from "react";
import Chats from "./Chats";
import Groups from "./Groups";

const UserPage = () => {
  const [chatsPage, setChatPage] = useState(true);
  const [groupsPage, setGroupsPage] = useState(false);

  const onChatPage = () => {
    setChatPage(true);
    setGroupsPage(false);
  };

  const onGroupsPage = () => {
    setGroupsPage(true);
    setChatPage(false);
  };

  return (
    <div className="is-flex is-justify-content-center">
      <Box style={{ width: "50rem", marginTop: "5rem" }}>
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
