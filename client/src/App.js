import "bulma/css/bulma.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ChatLogin from "./components/ChatLogin";
import ChatPage from "./components/ChatPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ChatLogin />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
