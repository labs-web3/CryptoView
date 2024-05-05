import Home from "./pages/Home.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Detailed from "./pages/Detailed.jsx";
import Trading from "./pages/Trading.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Sidebar from "./components/Sidebar";
import { SidebarItem } from "./components/Sidebar";
import { UserCircle, LayoutDashboard, Wallet } from "lucide-react";
import { Button } from "./components/ui/button.jsx";
import { useLogout } from "./hooks/useLogout.js";
import { useAuthContext } from "./hooks/useAuthContext.js";

function App() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <Router>
      <div className="flex">
        {user && (
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
            <hr className="my-3" />
            {user && (
              <>
                <Button
                  onClick={handleClick}
                  className="w-full bg-slate-900 hover:bg-slate-700 rounded"
                >
                  Log Out
                </Button>
              </>
            )}
          </Sidebar>
        )}
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/SignIn" />}
          ></Route>
          <Route
            path="/page/:pageNumber"
            element={user ? <Home /> : <Navigate to="/SignIn" />}
          ></Route>
          <Route
            path="/Portfolio"
            element={user ? <Portfolio /> : <Navigate to="/SignIn" />}
          ></Route>
          <Route
            path="/Trading"
            element={user ? <Trading /> : <Navigate to="/SignIn" />}
          ></Route>
          <Route
            path="/SignIn"
            element={!user ? <SignIn /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/SignUp"
            element={!user ? <SignUp /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/:id"
            element={user ? <Detailed /> : <Navigate to="/SignIn" />}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
