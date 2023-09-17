import { Routes, Route } from "react-router-dom";
import MenuBar from "./layout/MenuBar";
import ProvidersRegistration from "./components/ProvidersRegistration";

function App() {
  return (
    <div className="App">
      <MenuBar />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/registration" element={<ProvidersRegistration />} />
      </Routes>
    </div>
  );
}

export default App;
