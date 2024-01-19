// NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
	return (
		<nav>
			{/* Your navbar content goes here */}
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
				{/* Add more navbar items as needed */}
				<li>
					<Link className="nav-link" to="/login">
						Login
					</Link>
				</li>
				<li>
					<Link className="nav-link" to="/signup">
						{" "}
						Sign Up
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
