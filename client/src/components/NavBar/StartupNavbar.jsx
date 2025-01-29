import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import "./StartupNavbar.css";

const StartupNavbar = () => {
  const {
    setIsLoggedIn,
    setManagerUsername,

    socket,
  } = useContext(UserContext);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setManagerUsername("");
  };

  useEffect(() => {
    socket.on("valoni", (data) => {
      console.log("at last");
    });
  });

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/startup/home">
          Investor Platform
        </Link>
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/startup/upload">
                Upload
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/chat-room">
                Chat Room
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/startup/profile">
                Profile
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/notifications">
              <button type="button" className="icon-button">
                <span className="material-icons">notifications</span>
              </button>
            </Link>
          </li>
          <li className="nav-item active">
            <Link
              className="nav-link logout-link"
              to="/startup/login"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </li>
        </div>
      </nav>
    </>
  );
};

export default StartupNavbar;
