import { Link } from "react-router-dom";
import "./InvestorNavbar.css";

const InvestorNavbar = ({ onLogout }) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/investor-home">
          Investor Platform
        </Link>
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/deal-room">
                Deal Room
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/chat-room">
                Chat-room
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/investor-forum">
                Investor Forum
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/investor-profile">
                Profile
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link className="nav-link logout-link" to="/" onClick={onLogout}>
              Logout
            </Link>
          </li>
        </div>
      </nav>
    </>
  );
};

export default InvestorNavbar;
