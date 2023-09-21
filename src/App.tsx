import { Routes, Route } from "react-router-dom";
import MenuBar from "./layout/MenuBar";
import UsersRegistration from "./components/UsersRegistration";
import UsersLogin from "./components/UsersLogin";

function App() {
  return (
    <div className="App">
      <MenuBar />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/registration" element={<UsersRegistration />} />
        <Route path="/login" element={<UsersLogin />} />
      </Routes>
    </div>
  );
}

export default App;
