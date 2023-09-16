import { Routes, Route } from "react-router-dom";
import MenuBar from "./layout/MenuBar";
import Registration from "./components/Registration";

function App() {
  return (
    <div className="App">
      <MenuBar />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;
