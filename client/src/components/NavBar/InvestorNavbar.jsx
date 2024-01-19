import { Link } from "react-router-dom";
import "./InvestorNavbar.css";
import { useContext } from "react";
import UserContext from "../../contexts/userContext";


const InvestorNavbar = () => {
	const {setIsLoggedIn,setUserType,setManagerUsername,managerUsername}=useContext(UserContext);
 
	const handleLogout=()=>{
		setIsLoggedIn(false);
		setUserType(" ");
    
	}
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
        <div className="navbar-nav ml-auto"> {/* Added a new div for the right-aligned items */}
          <li className="nav-item active">
            <Link className="nav-link logout-link" to="/login" onClick={handleLogout} >   {/* Adjust the link path accordingly */}
              Logout
            </Link>
          </li>
        </div>
      </nav>
    </>
  );
};

export default InvestorNavbar;
