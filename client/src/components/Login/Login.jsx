import { useState } from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/investor";

const Login = ({ onLogin}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await loginUser(username, password);

    if (result.success) {
      
      // Save user data to localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userType', 'investor');
      localStorage.setItem('username', username);
      localStorage.setItem('auth_token',result.token)
      
      
      // Update state
      onLogin("investor", username);
      
      // Show success message and navigate
      alert("Login Successful");
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
