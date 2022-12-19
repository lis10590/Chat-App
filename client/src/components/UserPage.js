import { Navbar } from "react-bulma-companion";

const UserPage = () => {
  return (
    <div>
      <Navbar>
        <Navbar.Menu>
          <Navbar.Start>
            <Navbar.Item tab>Chats</Navbar.Item>
            <Navbar.Item tab>Groups</Navbar.Item>
          </Navbar.Start>
        </Navbar.Menu>
      </Navbar>
    </div>
  );
};

export default UserPage;
