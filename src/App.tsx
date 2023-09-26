import { Routes, Route } from "react-router-dom";
import MenuBar from "./layout/MenuBar";
import ProvidersRegistration from "./components/ProvidersRegistration";
import UsersLogin from "./components/UsersLogin";

function App() {
  return (
    <div className="App">
      <MenuBar />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/registration" element={<ProvidersRegistration />} />
        <Route path="/login" element={<UsersLogin />} />
      </Routes>
    </div>
  );
}

export default App;
