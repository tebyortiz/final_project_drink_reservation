import { Routes, Route } from "react-router-dom";
import MenuBar from "./layout/MenuBar";
import ProvidersRegistration from "./components/ProvidersRegistration";
import UsersLogin from "./components/UsersLogin";
import { useState } from "react";
import ClientWelcome from "./components/clients-components/ClientWelcome";
import ProviderWelcome from "./components/providers-components/ProviderWelcome";
import ProviderMenu from "./components/providers-components/ProviderMenu";
import ProviderAreas from "./components/providers-components/ProviderAreas";
import ProviderStock from "./components/providers-components/ProviderStock";
import ClientLocalProviders from "./components/clients-components/ClientLocalProviders";
import ProviderDetails from "./components/clients-components/ProviderDetails";
import OrderDetails from "./components/clients-components/OrderDetails";

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
        <Route
          path="/client_local_providers"
          element={<ClientLocalProviders />}
        />
        <Route
          path="/provider-details/:providerName"
          element={<ProviderDetails />}
        />
        <Route path="/client_purchase" element={<OrderDetails />} />
        <Route path="/provider_home" element={<ProviderWelcome />} />
        <Route path="/provider_menu" element={<ProviderMenu />} />
        <Route path="/provider_areas" element={<ProviderAreas />} />
        <Route path="/provider_stock" element={<ProviderStock />} />
      </Routes>
    </div>
  );
}

export default App;