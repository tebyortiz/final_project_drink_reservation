import { Routes, Route } from "react-router-dom";
import MenuBar from "./layout/MenuBar";
import ProvidersRegistration from "./components/ProvidersRegistration";
import UsersLogin from "./components/UsersLogin";
import { useState } from "react";
import ClientWelcome from "./components/clients-components/ClientWelcome";
import ProviderWelcome from "./components/providers-components/ProviderWelcome";

function App() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [_userType, setUserType] = useState<string>("");

  
  const handleUserTypeChange = (type: string) => {
    setUserType(type);
  };
  
  return (
    <div className="App">
      <MenuBar loginSuccess={loginSuccess} />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/registration" element={<ProvidersRegistration />} />
        <Route
          path="/login"
          element={
            <UsersLogin
              setLoginSuccess={setLoginSuccess}
              onUserTypeChange={handleUserTypeChange}
            />
          }
        />
        <Route path="/client_home" element={<ClientWelcome />} />
        <Route path="/provider_home" element={<ProviderWelcome />} />
      </Routes>
    </div>
  );
}

export default App;