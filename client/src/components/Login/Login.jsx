import React, { useState, useContext } from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import { loginUser } from "../../api/investor";
const imageUrl = "https://i.ibb.co.com/tprVXDRX/investor.jpg";

const Login = () => {
  const { setIsLoggedIn, setUserType, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await loginUser(username, password);

    if (result.success) {
      alert("Login Successful");
      setIsLoggedIn(true);
      setUserType("investor");
      setUser(username);
      navigate("/investor-home");
    } else {
      alert("Login Failed: " + result.error);
    }
  };

  return (
    <div className="main-body">
      <div className="form-body-container">
        <div className="form-body">
          {/* <div className="left">
            <img className="login-pic" src={imageUrl} alt="Investor Login" />
          </div> */}
          <div className="right">
            <h1 className="form-heading">Investor Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Login</button>
            </form>
            <div className="new">
              <div className="no-account">Don't have an account?</div>
              <div className="open">
                <Link to="/signup">New Account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
