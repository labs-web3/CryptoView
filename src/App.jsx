import { useBearStore } from "./zustand/store";
import Home from "./pages/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Detailed from "./pages/Detailed.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/detailed/:id" element={<Detailed />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
