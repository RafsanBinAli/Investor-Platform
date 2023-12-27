import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/userContext";


const StartupNavbar = () => {
    const { setIsLoggedIn, setUserType,setManagerUsername,managerUsername} =useContext(UserContext)
	console.log(managerUsername)
    const handleLogout=()=>{
            setIsLoggedIn(false)
            setManagerUsername("")
    }
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
							<Link className="nav-link" to="/startup/profile">
								Profile
							</Link>
						</li>
					</ul>
				</div>
				<div className="navbar-nav ml-auto">
					{" "}
					{/* Added a new div for the right-aligned items */}
					<li className="nav-item active">
						<Link className="nav-link logout-link" to="/startup/login" onClick={handleLogout} >
							Logout
						</Link>
					</li>
				</div>
			</nav>
		</>
	);
};

export default StartupNavbar;
