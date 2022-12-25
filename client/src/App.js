import "bulma/css/bulma.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ChatLogin from "./components/ChatLogin";
import ChatPage from "./components/ChatPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import UserPage from "./components/UserPage";
import GroupPage from "./components/GroupPage";
import PrivateChat from "./components/PrivateChat";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="registerPage" element={<RegisterPage />} />
        <Route path="/userPage" element={<UserPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/groups/:groupId" element={<GroupPage />} />
        <Route path="/chats/:userId" element={<PrivateChat />} />
      </Routes>
    </div>
  );
}

export default App;
