import React, { useState } from "react";
import "./Login.css";
import { useContext } from "react";
import InvestorImage from "./investor.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/userContext";

const Login = () => {
  
  const { setIsLoggedIn, setUserType, setUser } = useContext(UserContext);
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

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Username: username,
        password: password,
      }),
    });


    if (response.ok) {
      alert("Login Successful");

      setIsLoggedIn(true);

      setUserType("investor");
      navigate("/investor-home");
      setUser(username);
    } else {
      console.error("Server returned an error:", response.status);
    }
  };

  return (
    <>
      <div className="main-body">
        <div className="form-body">
          <div className="left">
            <img className="login-pic" src={InvestorImage} alt="abc" />
          </div>
          <div className="right">
            <h1 className="form-heading">Investor Login</h1>
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
                <Link to="/signup">New Account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
