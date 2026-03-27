import { Routes } from "react-router";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
    </Routes>
  );
}

export default App;
