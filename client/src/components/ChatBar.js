import { Columns, Column, Title, Button, Box } from "react-bulma-companion";

const ChatBar = () => {
  return (
    <Box
      style={{
        width: "60rem",
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: "5rem",
      }}
    >
      <Columns>
        <Column size="one-quarter">
          <Title size="3">Chat App</Title>
          <Title size="4">Active users</Title>
        </Column>
        <Column>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Title size="5"> Group Name</Title>

            <Button>Leave Chat</Button>
          </div>
          <Box style={{ height: "30rem" }}></Box>
        </Column>
      </Columns>
    </Box>
  );
};

export default ChatBar;
