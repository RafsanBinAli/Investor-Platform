import React, { useState, useEffect } from "react";
import "./sLogin.css";
import { useContext } from "react";
import StartupImage from "./startup.png";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/userContext";

const SLogin = () => {
	const {
		setIsLoggedIn,
		setUserType,
		isLoggedIn,
		setUser,
		managerUsername,
		setManagerUsername,
		socket,
	} = useContext(UserContext);

	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleChangeUsername = (event) => {
		setUsername(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const response = await fetch("http://localhost:4000/startup/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		});

		console.log(response);
		const data = await response.json();

		if (response.ok) {
			alert("Login Successful");
			setIsLoggedIn(true);
			console.log("New isLoggedIn:", isLoggedIn);
			navigate("/startup/home");
			setUserType("startup");
			setManagerUsername(username);
			socket.emit("authenticate", username);
		} else {
			console.error("Server returned an error:", response.status);
		}
	};

	return (
		<>
			<div className="main-body">
				<div className="form-body">
					<div className="left">
						<img className="login-pic" src={StartupImage} alt="abc" />
					</div>
					<div className="right">
						<h1 className="form-heading">Stratup Manager Login</h1>
						<form className="login-form" onSubmit={handleSubmit}>
							<input
								type="text"
								name="Username"
								placeholder="Username"
								onChange={handleChangeUsername}
							/>

							<input
								type="password"
								name="Password"
								placeholder="password"
								onChange={handlePasswordChange}
							/>

							<button type="submit"> Login</button>
						</form>

						<div className="new">
							<div className="no-account"> Don't have any account?</div>
							<div className="open">
								<Link to="/startup/signup">New Account</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default SLogin;
