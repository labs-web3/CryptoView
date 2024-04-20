import Home from "./pages/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Detailed from "./pages/Detailed.jsx";
import Trading from "./pages/Trading.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Sidebar from "./components/Sidebar";
import { SidebarItem } from "./components/Sidebar";
import {
  LifeBuoy,
  Receipt,
  Boxes,
  Package,
  UserCircle,
  BarChart3,
  LayoutDashboard,
  Settings,
  Wallet,
} from "lucide-react";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar>
          <SidebarItem
            to="/"
            icon={<LayoutDashboard size={20} />}
            text="Home"
          />
          <SidebarItem
            icon={<Wallet size={20} />}
            text="Portfolio"
            to="/Portfolio"
          />
          <SidebarItem
            icon={<UserCircle size={20} />}
            text="Trading"
            to="/Trading"
          />
          <SidebarItem
            icon={<UserCircle size={20} />}
            text="Se Connecter"
            to="/SignIn"
          />
          <SidebarItem
            icon={<UserCircle size={20} />}
            text="S'inscrire"
            to="/SignUp"
          />
          <hr className="my-3" />
          <SidebarItem icon={<Settings size={20} />} text="Settings" />
          <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
        </Sidebar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Portfolio" element={<Portfolio />}></Route>
          <Route path="/Trading" element={<Trading />}></Route>
          <Route path="/SignIn" element={<SignIn />}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
          <Route path="/:id" element={<Detailed />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
