import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Registration from "./components/InvestorRegistration/Registration";
import DefaultNavbar from "./components/NavBar/DefaultNavbar";
import NothingFound from "./pages/NothingFound";
import InvestorHome from "./pages/InvestorHome";
import DealRoom from "./pages/DealRoom";
import StartupHome from "./pages/StartupHome";
import StartupNavbar from "./components/NavBar/StartupNavbar";
import StartupForm from "./components/StartupUpload/StartupForm";
import InvestorProfile from "./components/InvestorProfile/InvestorProfile";
import StartupManagerProfile from "./components/StartupManagerProfile/StartupManagerProfile";
import ChatRoom from "./pages/ChatRoom";
import NotificationView from "./components/NotificationView/NotificationView";
import InvestorNavbar from "./components/NavBar/InvestorNavbar";
import ManagerRegistration from "./components/StartupManagerRegistration/ManagerRegistration";
import ManagerLogin from "./components/StartupLogin/ManagerLogin";
import StartupInfo from "./pages/StartupInfo";
import { useEffect, useState } from "react";
import {
  PrivateRouteAuthenticated,
  PrivateRouteUnauthenticated,
} from "./components/PrivateRoute";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const type = localStorage.getItem("userType");
    const username = localStorage.getItem("username");

    setIsLoggedIn(loggedIn);
    setUserType(type || "");
    setUsername(username || "");
  }, []);

  const handleLogin = (type, username) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userType", type);
    localStorage.setItem("username", username);

    setIsLoggedIn(true);
    setUserType(type);
    setUsername(username);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    localStorage.removeItem("username");

    setIsLoggedIn(false);
    setUserType("");
    setUsername("");
  };

  return (
    <Router>
      {isLoggedIn && userType === "investor" ? (
        <InvestorNavbar onLogout={handleLogout} username={username} />
      ) : isLoggedIn && userType === "manager" ? (
        <StartupNavbar onLogout={handleLogout} username={username} />
      ) : (
        <DefaultNavbar />
      )}

      <Routes>

        <Route
          element={
            <PrivateRouteUnauthenticated
              isAuthenticated={isLoggedIn}
              userType={userType}
            />
          }
        >
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Registration />} />
          <Route
            path="/startup/login"
            element={<ManagerLogin onLogin={handleLogin} />}
          />
          <Route path="/startup/signup" element={<ManagerRegistration />} />
        </Route>

        {/* Public route */}
        <Route path="/" element={<Home />} />

        {/* Investor routes */}
        <Route
          element={
            <PrivateRouteAuthenticated 
              isAuthenticated={isLoggedIn} 
              userType={userType}
            />
          }
        >
          <Route path="/investor-home" element={<InvestorHome />} />
          <Route path="/deal-room" element={<DealRoom />} />
          <Route path="/investor-profile" element={<InvestorProfile />} />
        </Route>

        {/* Startup routes */}
        <Route
          element={
            <PrivateRouteAuthenticated 
              isAuthenticated={isLoggedIn} 
              userType={userType}
            />
          }
        >
          <Route path="/startup/home" element={<StartupHome />} />
          <Route path="/startup/upload" element={<StartupForm />} />
          <Route path="/startup/profile" element={<StartupManagerProfile />} />
        </Route>

        {/* Common authenticated routes */}
        <Route
          element={
            <PrivateRouteAuthenticated 
              isAuthenticated={isLoggedIn} 
              userType={userType}
            />
          }
        >
          <Route path="/startup-info/:tinNumber" element={<StartupInfo />} />
          <Route path="/chat-room" element={<ChatRoom />} />
          <Route path="/notifications" element={<NotificationView />} />
        </Route>


        {/* Catch-all route */}
        <Route path="*" element={<NothingFound />} />
      </Routes>
    </Router>
  );
};

export default App;
