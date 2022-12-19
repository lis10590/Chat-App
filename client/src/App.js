import "bulma/css/bulma.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ChatLogin from "./components/ChatLogin";
import ChatPage from "./components/ChatPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import UserPage from "./components/UserPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="registerPage" element={<RegisterPage />} />
        <Route path="/userPage" element={<UserPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
